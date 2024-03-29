import { createEffect } from 'effector'
import toast from 'react-hot-toast'
import api from './apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { ISignUpFx } from '../types/authPopup'
import { setIsAuth } from '@/context/auth'
import { handleJWTError } from '@/lib/utils/errors'

// Эффект для выполнения аутентификации через OAuth
export const oauthFx = createEffect(
  async ({ name, password, email }: ISignUpFx) => {
    try {
      // Выполнение запроса на аутентификацию через OAuth
      const { data } = await api.post('/api/users/oauth', {
        name,
        password,
        email,
      })

      // Выполнение запроса на отправку email
      await api.post('/api/users/email', {
        password,
        email,
      })

      onAuthSuccess('Авторизация выполнена!', data)

      return data.user
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

// Эффект для выполнения регистрации пользователя
export const signUpFx = createEffect(
  async ({ name, password, email, isOAuth }: ISignUpFx) => {
    // Если выбрана аутентификация через OAuth
    if (isOAuth) {
      // Выполнение аутентификации через OAuth
      await oauthFx({
        email,
        password,
        name,
      })
      return
    }

    // Выполнение запроса на регистрацию пользователя
    const { data } = await api.post('/api/users/signup', {
      name,
      password,
      email,
    })

    // Если есть предупреждение, вывод сообщения об ошибке через toast
    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Регистрация прошла успешно!', data)

    return data
  }
)

// Эффект для выполнения входа пользователя
export const signInFx = createEffect(
  async ({ email, password, isOAuth }: ISignUpFx) => {
    // Если выбрана аутентификация через OAuth
    if (isOAuth) {
      // Выполнение аутентификации через OAuth
      await oauthFx({
        email,
        password,
      })
      return
    }

    // Выполнение запроса на вход пользователя
    const { data } = await api.post('/api/users/login', { email, password })

    // Если есть предупреждение, вывод сообщения об ошибке через toast
    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Вход выполнен!', data)

    return data
  }
)

// Эффект для проверки входа пользователя
export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    // Выполнение запроса на проверку входа пользователя
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    // Если есть ошибка, вызов функции обработки ошибки
    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    // Установка флага аутентификации в контексте приложения
    setIsAuth(true)

    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})

// Эффект для обновления токена пользователя
export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
  // Выполнение запроса на обновление токена пользователя
  const { data } = await api.post('/api/users/refresh', { jwt })

  // Сохранение обновленных данных аутентификации в localStorage
  localStorage.setItem('auth', JSON.stringify(data))

  return data
})
