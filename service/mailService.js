import nodemailer from 'nodemailer'

// Функция отправки электронной почты
export async function sendMail(subject, toEmail, otpText) {
  // Создание транспортера для отправки электронной почты через сервис Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL, // Имя пользователя для аутентификации SMTP
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PW, // Пароль для аутентификации SMTP
    },
  })

  // Опции для отправки письма
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL, // Адрес отправителя
    to: toEmail, // Адрес получателя
    subject: subject, // Тема письма
    text: otpText, // Текст письма
  }

  // Асинхронная отправка письма с помощью транспортера
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        // Если произошла ошибка при отправке письма, отклоняем промис с ошибкой
        reject(err)
      } else {
        // Если письмо успешно отправлено, разрешаем промис с ответом
        resolve(response)
      }
    })
  })
}
