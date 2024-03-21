import { closeSearchModal } from '@/context/modals'

// Функция для удаления стиля overflow:hidden у body
export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement // Получение элемента body
  body.classList.remove('overflow-hidden') // Удаление класса overflow-hidden
}

// Функция для добавления стиля overflow:hidden к body
export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}

// Функция для получения текущей ширины окна браузера
export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 } // Получение ширины окна браузера

  return { windowWidth } // Возвращение ширины окна
}

// Функция для закрытия модального окна
export const handleCloseSearchModal = () => {
  closeSearchModal()
  removeOverflowHiddenFromBody()
}
