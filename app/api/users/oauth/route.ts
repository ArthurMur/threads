import clientPromise from '@/lib/mongodb'

import {
  getDbAndReqBody,
  findUserByEmail,
  createUserAndGenerateTokens,
  generateTokens,
} from '@/lib/utils/api-routes'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Получение базы данных и тела запроса с помощью функции getDbAndReqBody
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

  // Поиск пользователя в базе данных по email
  const user = await findUserByEmail(db, reqBody.email)

  // Если пользователь не найден
  if (!user) {
    // Создание пользователя и генерация токенов
    const tokens = await createUserAndGenerateTokens(db, reqBody)

    // Возврат ответа в формате JSON с сгенерированными токенами
    return NextResponse.json(tokens)
  }

  // Генерация токенов для существующего пользователя
  const tokens = generateTokens(user.name, reqBody.email)

  // Возврат ответа в формате JSON с сгенерированными токенами
  return NextResponse.json(tokens)
}
