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
import { EventCallable } from 'effector'
import toast from 'react-hot-toast'
import { setShouldShowEmpty } from '@/context/cart'

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

// получение количества добавленных в корзину товаров по размеру
export const getCartItemCountBySize = (
  cartItems: ICartItem[],
  currentSize: string
) =>
  cartItems.find((item) => item.size === currentSize.toLocaleLowerCase())
    ?.count || 0

// удаление товаров из localStorage
export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  event: EventCallable<T>,
  message: string,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string)

  if (!items) {
    items = []
  }

  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )

  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)

  if (!updatedItems.length) {
    setShouldShowEmpty(true)
  }
}

// формирование сообщения о количестве добавленных в корзину товаров
export const showCountMessage = (count: string, lang: string) => {
  if (count == '11' || count == '12' || count == '13' || count == '14') {
    return lang === 'ru' ? 'товаров' : 'items'
  }

  if (count.endsWith('1')) {
    return lang === 'ru' ? 'товар' : 'item'
  }

  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
    return lang === 'ru' ? 'товара' : 'items'
  }

  return lang === 'ru' ? 'товаров' : 'items'
}

// Функция для проверки валидности параметра смещения ("offset").
// Возвращает true, если "offset" существует, не является NaN и больше или равен нулю.
export const checkOffsetParam = (offset: string | string[] | undefined) =>
  offset && !isNaN(+offset) && +offset >= 0

// Функция для получения параметров запроса URL.
export const getSearchParamsUrl = () => {
  // Получаем строку параметров из текущего URL.
  const paramsString = window.location.search
  // Создаем объект URLSearchParams из строки параметров.
  const urlParams = new URLSearchParams(paramsString)

  return urlParams
}

// Функция для обновления параметра запроса URL.
// Обновляет параметр с заданным ключом на заданное значение и обновляет URL, соответственно обновляя историю браузера.
export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  // Получаем текущие параметры запроса URL.
  const urlParams = getSearchParamsUrl()
  // Устанавливаем значение заданного ключа в параметрах запроса.
  urlParams.set(key, `${value}`)
  // Формируем новый путь с обновленными параметрами запроса.
  const newPath = `${pathname}?${urlParams.toString()}`
  // Обновляем URL и историю браузера.
  window.history.pushState({ path: newPath }, '', newPath)
}

// Функция для проверки валидности параметра цены ("price").
// Возвращает true, если "price" существует, не является NaN, больше или равен нулю и меньше или равен 10000.
export const checkPriceParam = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

// Функция для получения проверенного массива параметров из строки.
// Принимает строку ("param"), декодирует её из URI и пытается распарсить как JSON.
// Если это успешно и результат является массивом с элементами, возвращает этот массив, иначе возвращает false.
export const getCheckedArrayParam = (param: string) => {
  try {
    // Пытаемся распарсить строку как JSON и декодируем её из URI.
    const sizesArr = JSON.parse(decodeURIComponent(param))

    // Проверяем, является ли результат массивом и содержит ли он элементы.
    if (Array.isArray(sizesArr) && sizesArr.length) {
      return sizesArr
    }
  } catch (error) {
    return false
  }
}
