import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  generateTokens,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'

// Функция для логина
export async function POST(req: Request) {
  // получаем данные из тела запроса
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
  // получаем пользователя по почте
  const user = await findUserByEmail(db, reqBody.email)
  // если пользователь не существует, возвращаем ошибку
  if (!user) {
    return NextResponse.json({
      warningMessage: 'Пользователя не существует',
    })
  }
  // если пользователь существует, проверяем пароль
  if (!bcrypt.compareSync(reqBody.password, user.password)) {
    return NextResponse.json({
      warningMessage: 'Неправильный логин или пароль!',
    })
  }
  // если пароль верный, генерируем токены
  const tokens = generateTokens(user.name, reqBody.email)
  // возвращаем токены
  return NextResponse.json(tokens)
}
