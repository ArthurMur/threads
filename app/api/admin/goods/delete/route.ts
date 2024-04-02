import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

// Обработчик GET-запросов для удаления продукта по его идентификатору
export async function GET(req: Request) {
  try {
    // Получение объекта базы данных из промиса клиента MongoDB и данных запроса
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    // Удаление продукта из базы данных по его идентификатору
    await db
      .collection(category as string)
      .deleteOne({ _id: new ObjectId(id as string) })

    // Возвращаем успешный статус 204
    return NextResponse.json(
      {
        status: 204,
      },
      corsHeaders
    )
  } catch (error) {
    // В случае ошибки выбрасываем исключение с сообщением об ошибке
    throw new Error((error as Error).message)
  }
}

// Экспорт переменной dynamic
export const dynamic = 'force-dynamic'
