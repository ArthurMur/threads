import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

// Объявление асинхронной функции GET для обработки GET-запросов
export async function GET(req: Request) {
  try {
    // Получение объекта базы данных из промиса клиента MongoDB и данных запроса
    const { db } = await getDbAndReqBody(clientPromise, null)
    // Получение параметров range и sort из запроса URL или установка значений по умолчанию
    const url = new URL(req.url)
    const rangeParam = url.searchParams.get('range') || JSON.stringify([0, 4])
    const sortParam =
      url.searchParams.get('sort') || JSON.stringify(['name', 'ASC'])
    const range = JSON.parse(rangeParam)
    const sort = JSON.parse(sortParam)

    // Функция для получения фильтрованной коллекции из базы данных
    const getFilteredCollection = async (collection: string) => {
      const goods = await db
        .collection(collection)
        .find()
        .sort({
          [sort[0] === 'id' ? '_id' : sort[0]]: sort[1] === 'ASC' ? 1 : -1,
        })
        .toArray()

      return goods
    }

    // Получение фильтрованных коллекций товаров по категориям
    const [cloth, accessories] = await Promise.allSettled([
      getFilteredCollection('cloth'),
      getFilteredCollection('accessories'),
    ])

    // Если одна из коллекций не была успешно получена, возвращаем пустой ответ
    if (cloth.status !== 'fulfilled' || accessories.status !== 'fulfilled') {
      return NextResponse.json(
        {
          count: 0,
          items: [],
        },
        corsHeaders
      )
    }

    // Объединение всех товаров из разных коллекций
    const allGoods = [...cloth.value, ...accessories.value]

    // Возвращаем ответ с данными о товарах, ограниченными по диапазону и отсортированными
    return NextResponse.json(
      {
        count: allGoods.length,
        items: allGoods
          .slice(range[0], range[1])
          .map((item) => ({ ...item, id: item._id })),
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
