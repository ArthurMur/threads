import { useLang } from '@/hooks/useLang'
import { INameErrorMessageProps } from '@/../types/authPopup'

const NameErrorMessage = ({
  errors,
  className,
  fieldName,
}: INameErrorMessageProps) => {
  const { lang, translations } = useLang()

  return (
    <>
      {/*Отображение сообщения об ошибке, если оно есть*/}
      {errors[fieldName] && (
        <span className={className}>{errors[fieldName]?.message}</span>
      )}
      {/*Отображение сообщения об ошибке при недостаточной длине имени*/}
      {errors[fieldName] && errors[fieldName]?.type === 'minLength' && (
        <span className={className}>{translations[lang].validation.min_2}</span>
      )}
      {/*Отображение сообщения об ошибке при превышении максимальной длины имени*/}
      {errors[fieldName] && errors[fieldName]?.type === 'maxLength' && (
        <span className={className}>
          {translations[lang].validation.max_15}
        </span>
      )}
    </>
  )
}

export default NameErrorMessage
