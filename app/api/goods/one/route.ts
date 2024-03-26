import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

// Функция для получения одного товара
export async function POST(req: Request) {
  try {
    // получаем данные из тела запроса
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    // проверка на валидность id
    const isValidId = ObjectId.isValid(reqBody.productId)
    // если id не валиден, возвращаем ошибку
    if (!isValidId) {
      return NextResponse.json({
        message: 'Wrong product id',
        status: 404,
      })
    }
    // ищем продукт по id
    const productItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.productId) })

    return NextResponse.json({ status: 200, productItem })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
