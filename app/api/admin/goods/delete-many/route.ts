import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

// Обработчик GET-запросов для удаления нескольких продуктов по их идентификаторам
export async function GET(req: Request) {
  try {
    // Получение объекта базы данных из промиса клиента MongoDB и данных запроса
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const ids = url.searchParams.get('ids')

    // Если идентификаторы не переданы в запросе, возвращаем ошибку 404
    if (!ids) {
      return NextResponse.json(
        {
          status: 404,
          message: 'Необходимы идентификаторы',
        },
        corsHeaders
      )
    }

    // Разбор строки JSON с идентификаторами продуктов
    const parsedIds = JSON.parse(ids) as string[]

    // Функция для удаления нескольких продуктов из коллекции
    const deleteManyFromCollection = async (collection: string) => {
      await db.collection(collection).deleteMany({
        _id: {
          $in: parsedIds.map((id) => new ObjectId(id)),
        },
      })
    }

    // Асинхронное удаление продуктов из различных коллекций
    await Promise.allSettled([
      deleteManyFromCollection('cloth'),
      deleteManyFromCollection('accessories'),
    ])

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
