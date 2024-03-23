import { MongoClient } from 'mongodb'

// Экспортируем функцию, которая получает доступ к базе данных и телу запроса
export const getDbAndReqBody = async (
  // Промис, который разрешается в объект клиента MongoDB
  clientPromise: Promise<MongoClient>,
  // Объект запроса (Request) или null, представляющий тело запроса
  req: Request | null
) => {
  // Получаем доступ к базе данных с использованием объекта клиента MongoDB
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  // Проверяем, передан ли объект запроса
  if (req) {
    // Если передан, разбираем его тело в формате JSON
    const reqBody = await req.json()
    // Возвращаем объект базы данных и тело запроса
    return { db, reqBody }
  }

  // Если не передан, возвращаем только объект базы данных
  return { db }
}
