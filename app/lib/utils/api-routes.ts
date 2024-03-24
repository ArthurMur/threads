import { Db, MongoClient } from 'mongodb'
import { shuffle } from './common'

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
