import jwt, { VerifyErrors } from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import {
  getDbAndReqBody, // Функция получения базы данных и тела запроса
  findUserByEmail, // Функция поиска пользователя по email
  parseJwt, // Функция разбора JWT-токена
  generateTokens, // Функция генерации токенов
} from '@/lib/utils/api-routes'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Получение базы данных и тела запроса
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    // Проверка наличия JWT-токена в теле запроса
    if (reqBody?.jwt) {
      // Получение refresh-токена из тела запроса
      const refreshToken = reqBody.jwt

      let accessToken = {}
      let tokens = {}
      let error = null

      // Проверка и верификация refresh-токена с помощью библиотеки jwt
      await jwt.verify(
        refreshToken,
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
        async (err: VerifyErrors | null) => {
          // Поиск пользователя в базе данных по email из разобранного JWT-токена
          const user = await findUserByEmail(db, parseJwt(reqBody.jwt).email)

          if (!user) {
            error = { message: 'Invalid jwt token' }
            return
          }

          // Обработка ошибок при верификации токена
          if (err) {
            if (err.name === 'TokenExpiredError') {
              tokens = generateTokens(user.name, user.email)
            }

            error = err
            return
          }

          // Генерация нового access-токена
          accessToken = jwt.sign(
            {
              name: user.name,
              email: user.email,
            },
            process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
            {
              expiresIn: '10m',
            }
          )
        }
      )

      // Если произошла ошибка 'TokenExpiredError', возврат токенов
      if ((error as unknown as VerifyErrors)?.name === 'TokenExpiredError') {
        return NextResponse.json(tokens)
      }

      // Если есть другая ошибка, возврат сообщения об ошибке
      if (error) {
        return NextResponse.json({
          message: 'Unauthorized',
          status: 401,
          error,
        })
      }

      // Возврат access- и refresh-токенов
      return NextResponse.json({ accessToken, refreshToken })
    } else {
      // Возврат сообщения о необходимости JWT-токена
      return NextResponse.json({
        message: 'jwt is required',
        status: 404,
      })
    }
  } catch (error) {
    // Обработка ошибок и возврат сообщения об ошибке
    throw new Error((error as Error).message)
  }
}
