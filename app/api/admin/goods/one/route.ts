import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

// Обработчик GET-запросов для получения информации о продукте по его идентификатору
export async function GET(req: Request) {
  try {
    // Получение объекта базы данных из промиса клиента MongoDB и данных запроса
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')
    // Проверка валидности идентификатора продукта
    const isValidId = ObjectId.isValid(id as string)

    // Если идентификатор продукта невалиден, возвращаем ошибку 404
    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Неверный идентификатор продукта',
          status: 404,
        },
        corsHeaders
      )
    }

    // Получение информации о продукте из базы данных по его идентификатору
    const productItem = await db
      .collection(category as string)
      .findOne({ _id: new ObjectId(id as string) })

    // Возвращаем информацию о продукте
    return NextResponse.json(
      {
        status: 200,
        productItem: {
          ...productItem,
          id: productItem?._id,
          // Преобразование массива изображений продукта
          images: productItem?.images.map((src: string) => ({
            url: src,
            desc: productItem.name,
          })),
        },
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
