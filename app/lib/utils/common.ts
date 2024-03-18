// Функция для удаления стиля overflow:hidden у body
export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement // Получение элемента body
  body.classList.remove('overflow-hidden') // Удаление класса overflow-hidden
}

// Функция для добавления стиля overflow:hidden к body
export const addOverflowHiddenToBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement // Получение элемента body
  body.classList.add('overflow-hidden') // Добавление класса overflow-hidden
}

// Функция для получения текущей ширины окна браузера
export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 } // Получение ширины окна браузера

  return { windowWidth } // Возвращение ширины окна
}
