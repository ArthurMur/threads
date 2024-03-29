/* eslint-disable react-hooks/exhaustive-deps */
import { useEarthoOne } from '@eartho/one-client-react'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IInputs, ISignUpFx } from '@/../types/authPopup'

// Кастомный хук для работы с формой аутентификации
export const useAuthForm = (
  initialSpinner: Store<boolean>, // Инициализация стора для состояния спиннера
  isSideActive: boolean, // Флаг активности боковой панели
  event: EventCallable<ISignUpFx> // Событие для обработки формы аутентификации
) => {
  // получение состояния спиннера из стора
  const spinner = useUnit(initialSpinner)
  // работа с Eartho One
  const { isConnected, user, connectWithPopup } = useEarthoOne()
  const {
    register, // Функция регистрации полей формы
    formState: { errors }, // Состояние ошибок формы
    handleSubmit, // Функция обработки отправки формы
  } = useForm<IInputs>() // Использование хука useForm для работы с формой и ее состоянием

  useEffect(() => {
    // Эффект, срабатывающий при изменении состояния подключения к Eartho One
    if (isSideActive) {
      // Проверка активности боковой панели
      if (isConnected) {
        // Проверка подключения к Eartho One
        event({
          // Выполнение события обработки формы аутентификации
          name: user?.user.displayName, // Имя пользователя
          email: user?.user.email, // Email пользователя
          password: user?.user.uid, // Пароль пользователя
          isOAuth: true, // Флаг использования OAuth
        })
      }
    }
  }, [isConnected]) // Зависимость от состояния подключения к Eartho One

  // Функция для запуска процесса аутентификации через OAuth
  const handleSignupWithOAuth = () =>
    connectWithPopup({
      // Вызов функции подключения к Eartho One через всплывающее окно
      access_id: `${process.env.NEXT_PUBLIC_OAUTH_ACCESS_ID}`, // Идентификатор доступа для OAuth
    })

  return {
    spinner, // Состояние спиннера
    register, // Функция регистрации полей формы
    errors, // Состояние ошибок формы
    handleSubmit, // Функция обработки отправки формы
    handleSignupWithOAuth, // Функция для запуска процесса аутентификации через OAuth
  }
}
