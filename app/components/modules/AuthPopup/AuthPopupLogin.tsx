import { handleSignIn } from '@/context/auth'
import { useAuthForm } from '@/hooks/useAuthForm'
import { IAuthSideProps, IInputs } from '@/../types/authPopup'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthPopupClose from './AuthPopupClose'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { useLang } from '@/hooks/useLang'
import AuthPopupSocials from './AuthPopupSocials'
import { signInFx } from '../../../../api/auth'

// Компонент AuthPopupLogin отображает форму входа в систему во всплывающем окне аутентификации
const AuthPopupLogin = ({ toggleAuth, isSideActive }: IAuthSideProps) => {
  // Получение текущего языка и его переводов
  const { lang, translations } = useLang()

  // Использование кастомного хука useAuthForm для управления формой аутентификации
  const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
    useAuthForm(signInFx.pending, isSideActive, handleSignIn)

  // Функция обработки отправки формы
  const submitForm = (data: IInputs) =>
    handleSignIn({
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-back'>
      {/* Кнопка закрытия всплывающего окна */}
      <AuthPopupClose />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.login_text}
        </h3>
        <p className='card-body__description'>
          {translations[lang].auth_popup.login_description}
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          {/* Поле ввода email */}
          <EmailInput register={register} errors={errors} />
          {/* Поле ввода пароля */}
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button
                className='inner__btn'
                type='submit'
                disabled={spinner}
                aria-label='Login'
              >
                {spinner ? (
                  // Иконка загрузки, если отправка формы в процессе
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  // Текст кнопки, если отправка формы не выполняется
                  translations[lang].auth_popup.login_text
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                {translations[lang].auth_popup.login_question}
              </span>
              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
                aria-label='Register'
              >
                {translations[lang].auth_popup.register}!
              </button>
            </div>
          </div>
        </form>
        {/* Блок социальных кнопок для аутентификации */}
        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
      </div>
    </div>
  )
}
export default AuthPopupLogin
