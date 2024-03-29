import { createDomain, sample } from 'effector'
import { ISignUpFx } from '../../types/authPopup'
import toast from 'react-hot-toast'
import { signInFx, signUpFx } from '../../api/auth'

// Создание домена для управления состоянием аутентификации
const auth = createDomain()

// Создание событий для открытия и закрытия всплывающего окна аутентификации, а также для обработки регистрации и входа
export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()
export const handleSignUp = auth.createEvent<ISignUpFx>()
export const handleSignIn = auth.createEvent<ISignUpFx>()
export const setIsAuth = auth.createEvent<boolean>()

// Создание сторов для управления состоянием всплывающего окна и аутентификации пользователя
export const $openAuthPopup = auth
  .createStore<boolean>(false) // Стандартное состояние: всплывающее окно закрыто
  .on(openAuthPopup, () => true) // Открытие всплывающего окна при вызове события openAuthPopup
  .on(closeAuthPopup, () => false) // Закрытие всплывающего окна при вызове события closeAuthPopup

export const $isAuth = auth
  .createStore(false) // Стандартное состояние: пользователь не аутентифицирован
  .on(setIsAuth, (_, isAuth) => isAuth) // Установка состояния аутентификации при вызове события setIsAuth

export const $auth = auth
  .createStore({}) // Стандартное состояние: пустой объект
  .on(signUpFx.done, (_, { result }) => result) // Обновление состояния при успешной регистрации
  .on(signUpFx.fail, (_, { error }) => {
    // Обработка ошибки при регистрации
    toast.error(error.message) // Отображение сообщения об ошибке
  })
  .on(signInFx.done, (_, { result }) => result) // Обновление состояния при успешном входе
  .on(signInFx.fail, (_, { error }) => {
    // Обработка ошибки при входе
    toast.error(error.message) // Отображение сообщения об ошибке
  })

// Создание сэмплов для обработки событий регистрации и входа
sample({
  clock: handleSignUp, // Событие, по которому срабатывает сэмпл для регистрации
  source: $auth, // Состояние, из которого извлекаются данные для регистрации
  fn: (_, { name, email, password, isOAuth }) => ({
    // Функция преобразования данных для регистрации
    name,
    password,
    email,
    isOAuth,
  }),
  target: signUpFx, // Цель, на которую направляются данные для регистрации
})

sample({
  clock: handleSignIn, // Событие, по которому срабатывает сэмпл для входа
  source: $auth, // Состояние, из которого извлекаются данные для входа
  fn: (_, { email, password, isOAuth, name }) => ({
    // Функция преобразования данных для входа
    email,
    password,
    isOAuth,
    name,
  }),
  target: signInFx, // Цель, на которую направляются данные для входа
})
