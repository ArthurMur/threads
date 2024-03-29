import { NextResponse } from 'next/server'
import { sendMail } from '@/../service/mailService'

export async function POST(req: Request) {
  // Получение данных из тела запроса в формате JSON
  const res = await req.json()

  try {
    // Отправка электронного письма с данными пользователя
    await sendMail(
      'thread', // Тема письма
      res.email, // Адрес электронной почты получателя
      `Ваши данные для входа - пароль: ${res.password}, логин: ${res.email}` // Текст письма с данными для входа
    )

    // Возврат ответа о успешной отправке письма в формате JSON
    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    // Возврат сообщения об ошибке в случае возникновения исключения при отправке письма
    return NextResponse.json({ message: (err as Error).message })
  }
}
