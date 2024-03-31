import { Db, MongoClient, ObjectId } from 'mongodb'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { shuffle } from './common'
import { NextResponse } from 'next/server'

// Экспортируем функцию, которая получает доступ к базе данных и телу запроса
export const getDbAndReqBody = async (
  // Промис, который разрешается в объект клиента MongoDB
  clientPromise: Promise<MongoClient>,
  // Объект запроса (Request) или null, представляющий тело запроса
  req: Request | null
) => {
  // Получаем доступ к базе данных с использованием объекта клиента MongoDB
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  // Проверяем, передан ли объект запроса
  if (req) {
    // Если передан, разбираем его тело в формате JSON
    const reqBody = await req.json()
    // Возвращаем объект базы данных и тело запроса
    return { db, reqBody }
  }

  // Если не передан, возвращаем только объект базы данных
  return { db }
}

export const getNewAndBestsellerGoods = async (db: Db, fieldName: string) => {
  //получаем и преобразуем данные в массив
  const clothes = await db.collection('cloth').find().toArray()
  const accessories = await db.collection('accessories').find().toArray()

  // Эта функция возвращает перетасованный массив одежды и аксессуаров.
  return shuffle([
    ...clothes
      .filter(
        (item) =>
          item[fieldName] && Object.values(item.sizes).some((value) => value)
      )
      .slice(0, 2),
    ...accessories
      .filter(
        (item) => item[fieldName] && Object.values(item).some((value) => value)
      )
      .slice(0, 2),
  ])
}

// Генерируем токены
export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    {
      name,
      email,
    },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    {
      email,
    },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    { expiresIn: '30d' }
  )

  return { accessToken, refreshToken }
}

// Создаем пользователя и генерируем токены
export const createUserAndGenerateTokens = async (
  db: Db,
  reqBody: { name: string; password: string; email: string }
) => {
  // Хэшируем пароль
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)
  // Добавляем пользователя в базу данных
  await db.collection('users').insertOne({
    name: reqBody.name,
    password: hash,
    email: reqBody.email,
    image: '',
    role: 'user',
  })

  return generateTokens(reqBody.name, reqBody.email)
}

// Поиск пользователя по email
export const findUserByEmail = async (db: Db, email: string) =>
  db.collection('users').findOne({ email })

export const getAuthRouteData = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  withReqBody = true
) => {
  const { db, reqBody } = await getDbAndReqBody(
    clientPromise,
    withReqBody ? req : null
  )
  const token = req.headers.get('authorization')?.split(' ')[1]
  const validatedTokenResult = await isValidAccessToken(token)

  return { db, reqBody, validatedTokenResult, token }
}

// Валидация токена
export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: 'Unauthorized',
    status: 401,
  }
  let jwtError = null

  if (!token) {
    return {
      ...baseError,
      error: { message: 'jwt is required' },
    }
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err
      }
    }
  )

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    }
  }

  return { status: 200 }
}

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

export const getDataFromDBByCollection = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  collection: string
) => {
  const { db, validatedTokenResult, token } = await getAuthRouteData(
    clientPromise,
    req,
    false
  )

  if (validatedTokenResult.status !== 200) {
    return NextResponse.json(validatedTokenResult)
  }

  const user = await findUserByEmail(db, parseJwt(token as string).email)
  const items = await db
    .collection(collection)
    .find({ userId: user?._id })
    .toArray()

  return NextResponse.json(items)
}

// обновляем продукты в коллекции
export const replaceProductsInCollection = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  collection: string
) => {
  const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
    clientPromise,
    req
  )

  if (validatedTokenResult.status !== 200) {
    return NextResponse.json(validatedTokenResult)
  }

  if (!reqBody.items) {
    return NextResponse.json({
      message: 'items fields is required',
      status: 404,
    })
  }

  // нахождение пользователя
  const user = await db
    .collection('users')
    .findOne({ email: parseJwt(token as string).email })
  // прикрепляем userId к items
  const items = (reqBody.items as { productId: string }[]).map((item) => ({
    userId: user?._id,
    ...item,
    productId: new ObjectId(item.productId),
  }))

  // очищаем коллекцию
  await db.collection(collection).deleteMany({ userId: user?._id })

  // если нет продуктов в items, возвращаем пустой массив
  if (!items.length) {
    return NextResponse.json({
      status: 201,
      items: [],
    })
  }

  // если есть то добавляем продукты в базу данных
  await db.collection(collection).insertMany(items)

  return NextResponse.json({
    status: 201,
    items,
  })
}
