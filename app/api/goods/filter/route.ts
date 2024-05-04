// import { allowedColors, allowedSizes } from '@/constants/product'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
// import { checkPriceParam, getCheckedArrayParam } from '@/lib/utils/common'
// import { Sort } from 'mongodb'
import { NextResponse } from 'next/server'

// Функция обработки GET-запроса
export async function GET(req: Request) {
  try {
    // Получение доступа к базе данных
    const { db } = await getDbAndReqBody(clientPromise, null)

    // Получение параметров запроса из URL
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 12
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const typeParam = url.searchParams.get('type')
    const categoryParam = url.searchParams.get('category')
    const filter = { ...(typeParam && { type: typeParam }) }

    // Если указан параметр "catalog"
    if (isCatalogParam) {
      // Функция для получения отфильтрованной коллекции товаров
      const getFilteredCollection = async (collection: string) => {
        const goods = await db.collection(collection).find(filter).toArray()

        return goods
      }

      // Параллельный запрос отфильтрованных коллекций для каждой категории товаров
      const [cloth, accessories] = await Promise.allSettled([
        getFilteredCollection('cloth'),
        getFilteredCollection('accessories'),
      ])

      // Если хотя бы один запрос завершился неудачно, возвращаем пустой ответ
      if (cloth.status !== 'fulfilled' || accessories.status !== 'fulfilled') {
        return NextResponse.json({
          count: 0,
          items: [],
        })
      }

      // Объединяем все товары из разных категорий
      const allGoods = [...cloth.value, ...accessories.value]

      // Возвращаем отфильтрованные товары из всех категорий
      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit),
      })
    }

    const currentGoods = await db
      .collection(categoryParam as string)
      .find(filter)
      .toArray()

    return NextResponse.json({
      count: currentGoods.length,
      items: currentGoods.slice(+offset, +limit),
    })
  } catch (error) {
    // В случае ошибки выбрасываем исключение с сообщением об ошибке
    throw new Error((error as Error).message)
  }
}

// Экспорт динамического параметра
export const dynamic = 'force-dynamic'
