import { createDomain, sample } from 'effector'
import { IUser } from '@/../types/user'
import { loginCheckFx } from '../../api/auth'

// Создание домена для управления состоянием пользователя
const user = createDomain()

// Создание события для проверки входа пользователя
export const loginCheck = user.createEvent<{ jwt: string }>()

// Создание стора для хранения данных о пользователе
export const $user = user
  .createStore<IUser>({} as IUser) // Инициализация стора пустым объектом пользователя
  .on(loginCheckFx.done, (_, { result }) => result) // Обновление данных пользователя при успешной проверке входа

// Создание сэмпла для запуска эффекта проверки входа пользователя
sample({
  clock: loginCheck, // Событие, по которому срабатывает сэмпл
  source: $user, // Состояние, из которого извлекаются данные для проверки входа
  fn: (_, { jwt }) => ({
    // Функция преобразования данных для проверки входа
    jwt,
  }),
  target: loginCheckFx, // Цель, на которую направляются данные для проверки входа
})
