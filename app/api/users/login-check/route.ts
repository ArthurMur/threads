import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  getAuthRouteData, // Функция получения данных маршрута аутентификации
  findUserByEmail, // Функция поиска пользователя по email
  parseJwt, // Функция разбора JWT-токена
} from '@/lib/utils/api-routes'

// Экспорт асинхронной функции GET с аргументом req типа Request
export async function GET(req: Request) {
  try {
    // Получение данных маршрута аутентификации, базы данных и токена
    const { db, validatedTokenResult, token } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )

    // Если статус валидации токена не равен 200, возврат результата в формате JSON
    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    // Поиск пользователя в базе данных по email из разобранного JWT-токена
    const user = await findUserByEmail(db, parseJwt(token as string).email)

    // Возврат результата успешной валидации токена в формате JSON
    return NextResponse.json({
      status: 200,
      message: 'token is valid',
      user,
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
