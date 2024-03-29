import { FieldErrors, FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

// определяет тип данных для полей ввода формы
export interface IInputs {
  name: string
  email: string
  password: string
}

// определяет тип данных для параметров при регистрации
export interface ISignUpFx {
  password: string
  email: string
  isOAuth?: boolean // Опциональный параметр, указывающий, используется ли OAuth для аутентификации
  name?: string // Опциональное поле для имени пользователя
}

// определяет тип данных для свойств компонента AuthSide
export interface IAuthSideProps {
  toggleAuth: VoidFunction // Функция переключения режима аутентификации
  isSideActive: boolean // Флаг, указывающий, активен ли боковой блок аутентификации
}

// определяет тип данных для свойств компонента AuthInput
export interface IAuthInput {
  register: UseFormRegister<IInputs> // Функция регистрации поля ввода формы
  errors: Partial<FieldErrorsImpl<IInputs>> // Частичные ошибки поля ввода формы
}

// определяет тип данных для свойств компонента NameErrorMessage
export interface INameErrorMessageProps {
  errors: FieldErrors<IInputs & { [index: string]: string }> // Ошибки поля ввода имени
  fieldName: string // Название поля ввода
  className?: string // класс для стилизации
}
