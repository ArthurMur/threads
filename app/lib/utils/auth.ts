import toast from 'react-hot-toast'
import { setIsAuth } from '@/context/auth'
import { handleCloseAuthPopup } from './common'

// Функция onAuthSuccess, вызываемая при успешной аутентификации
export const onAuthSuccess = <T>(message: string, data: T) => {
  localStorage.setItem('auth', JSON.stringify(data)) // Сохранение данных аутентификации в локальное хранилище
  toast.success(message) // Вывод уведомления об успешной аутентификации
  handleCloseAuthPopup() // Закрытие всплывающего окна аутентификации
  setIsAuth(true) // Установка статуса авторизации в значение "true"
}

// Функция nameValidationRules, задающая правила валидации имени
export const nameValidationRules = (
  message: string, // Пользовательское сообщение об ошибке валидации
  requireMessage?: string // Дополнительное сообщение об ошибке валидации
) => ({
  // Добавление правила обязательности, если передано сообщение об ошибке
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /^[а-яА-Яa-zA-ZёЁ]*$/, // Регулярное выражение для проверки имени на допустимые символы
    message, // Пользовательское сообщение об ошибке валидации
  },
  minLength: 2, // Минимальная длина имени
  maxLength: 15, // Максимальная длина имени
})

// Функция emailValidationRules, задающая правила валидации электронной почты
export const emailValidationRules = (
  message: string, // Пользовательское сообщение об ошибке валидации
  requireMessage?: string // Дополнительное сообщение об ошибке валидации
) => ({
  // Добавление правила обязательности, если передано сообщение об ошибке
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /\S+@\S+\.\S+/, // Регулярное выражение для проверки формата электронной почты
    message, // Пользовательское сообщение об ошибке валидации
  },
})
