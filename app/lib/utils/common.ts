import { closeAuthPopup, openAuthPopup, setIsAuth } from '@/context/auth'
import {
  closeSearchModal,
  closeSizeTable,
  showSizeTable,
} from '@/context/modals'
import { loginCheck } from '@/context/user'
import { ICartItem } from '../../../types/cart'
import { IProduct } from '../../../types/common'
import { setCurrentProduct } from '@/context/goods'
import { setSizeTableSizes } from '@/context/sizeTable'

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

// Функция для перемешивания массива
export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

// Функция для форматирования цены
export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// Функция для генерации уникального идентификатора
export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export const closeSizeTableByCheck = (showQuickViewModal: boolean) => {
  if (!showQuickViewModal) {
    removeOverflowHiddenFromBody()
  }

  closeSizeTable()
}

export const handleOpenAuthPopup = () => {
  addOverflowHiddenToBody()
  openAuthPopup()
}

export const handleCloseAuthPopup = () => {
  removeOverflowHiddenFromBody()
  closeAuthPopup()
}

export const closeAuthPopupWhenSomeModalOpened = (
  showQuickViewModal: boolean,
  showSizeTable: boolean
) => {
  if (showQuickViewModal || showSizeTable) {
    closeAuthPopup()
    return
  }

  handleCloseAuthPopup()
}

// авторизован ли пользователь
export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  if (!auth?.accessToken) {
    setIsAuth(false)
    return false
  }

  return true
}

// проверка наличия пользователя
export const triggerLoginCheck = () => {
  if (!isUserAuth()) {
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  loginCheck({ jwt: auth.accessToken })
}

// проверка наличия продукта в корзине
export const isItemInList = (array: ICartItem[], productId: string) =>
  array.some((item) => item.productId === productId)

// открытие модального окна с таблицей размеров
export const handleShowSizeTable = (product: IProduct) => {
  setCurrentProduct(product)
  setSizeTableSizes({ sizes: product.sizes, type: product.type })
  addOverflowHiddenToBody()
  showSizeTable()
}
