import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  createUserAndGenerateTokens,
  findUserByEmail,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'

// Функция для регистрации
export async function POST(req: Request) {
  try {
    // получаем данные из тела запроса
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    // получаем пользователя по почте
    const user = await findUserByEmail(db, reqBody.email)
    // если пользователь существует, возвращаем ошибку
    if (user) {
      return NextResponse.json({
        warningMessage: 'Пользователь уже существует',
      })
    }
    // если пользователь не существует, создаем пользователя и генерируем токены
    const tokens = await createUserAndGenerateTokens(db, reqBody)
    // возвращаем токены
    return NextResponse.json(tokens)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
