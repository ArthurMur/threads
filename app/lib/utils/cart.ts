import { IProduct } from '@/../../types/common'
import { handleShowSizeTable, idGenerator, isUserAuth } from './common'
import { addProductToCart, setCartFromLS } from '@/context/cart'
import toast from 'react-hot-toast'
import { ICartItem } from '../../../types/cart'
import { productsWithoutSizes } from '@/constants/product'

// Функция для добавления товара в корзину
export const addItemToCart = (
  product: IProduct, // Продукт для добавления в корзину
  setSpinner: (arg0: boolean) => void, // Функция для установки состояния спиннера
  count: number, // Количество товара для добавления
  selectedSize = '' // Выбранный размер товара (по умолчанию - пустая строка)
) => {
  // Проверка, авторизован ли пользователь
  if (!isUserAuth()) {
    addCartItemToLS(product, selectedSize, count) // Добавление товара в локальное хранилище
    return
  }
  // Получение данных об авторизации из локального хранилища
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  // Добавление товара в локальное хранилище и получение идентификатора клиента
  const clientId = addCartItemToLS(product, selectedSize, count, false)

  // Вызов функции добавления товара в корзину с данными о товаре и авторизации
  addProductToCart({
    jwt: auth.accessToken, // JWT-токен авторизации
    setSpinner, // Функция установки состояния спиннера
    productId: product._id, // Идентификатор продукта
    category: product.category, // Категория продукта
    count, // Количество товара
    size: selectedSize, // Выбранный размер товара
    clientId, // Идентификатор клиента
  })
}

// Функция для добавления товара в локальное хранилище
export const addCartItemToLS = (
  product: IProduct, // Продукт для добавления в корзину
  selectedSize: string, // Выбранный размер товара
  count: number, // Количество товара
  withToast = true // Флаг для отображения уведомления (по умолчанию - true)
) => {
  // Получение данных о корзине из локального хранилища или инициализация пустым массивом
  let cartFromLS: ICartItem[] = JSON.parse(
    localStorage.getItem('cart') as string
  )

  const clientId = idGenerator() // Генерация идентификатора клиента

  // Если данные о корзине отсутствуют, то инициализация пустым массивом
  if (!cartFromLS) {
    cartFromLS = []
  }

  // Поиск существующего товара в корзине
  const existingItem = cartFromLS.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  // Если товар уже есть в корзине
  if (existingItem) {
    // Обновление количества товара
    const updatedCount =
      existingItem.count !== count ? count : +existingItem.count + 1

    const updatedCart = cartFromLS.map(
      (
        item // Обновление корзины с учетом изменений
      ) =>
        // Если товар совпадает с существующим и выбранным размером
        item.productId === existingItem.productId && item.size === selectedSize
          ? { ...existingItem, count: updatedCount } // Обновить количество товара
          : item // Вернуть товар без изменений
    )

    localStorage.setItem('cart', JSON.stringify(updatedCart)) // Обновление данных о корзине в локальном хранилище
    setCartFromLS(updatedCart) // Обновление состояния корзины
    toast.success('Добавлено в корзину') // Вывод уведомления об успешном добавлении товара в корзину
    return existingItem.clientId // Возврат идентификатора клиента существующего товара
  }

  // Создание новой записи о товаре в корзине
  const cart = [
    ...cartFromLS, // Предыдущие записи о товарах в корзине
    {
      clientId, // Идентификатор клиента
      productId: product._id, // Идентификатор продукта
      size: selectedSize, // Размер товара
      count, // Количество товара
      image: product.images[0], // Изображение товара
      name: product.name, // Название товара
      price: product.price, // Цена товара
      inStock: product.inStock, // Наличие товара
      category: product.category, // Категория товара
      color: product.characteristics.color, // Цвет товара
    },
  ]
  localStorage.setItem('cart', JSON.stringify(cart)) // Обновление данных о корзине в локальном хранилище
  setCartFromLS(cart as ICartItem[]) // Обновление состояния корзины
  // Вывод уведомления об успешном добавлении товара в корзину (если флаг установлен в true)
  withToast && toast.success('Добавлено в корзину')
  return clientId // Возврат идентификатора клиента новой записи о товаре в корзине
}

// добавляет в корзину согласно таблице размеров
export const addProductToCartBySizeTable = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = ''
) => {
  // если это продукт без размеров, то добавляем в корзину сразу же без вызова таблицы размеров
  if (productsWithoutSizes.includes(product.type)) {
    addItemToCart(product, setSpinner, count)
    return
  }
  // если выбран размер, то вызываем функцию добавления в корзину с выбранным размером
  if (selectedSize) {
    addItemToCart(product, setSpinner, count, selectedSize)
    return
  }
  //если размер не был выбран, то показываем модалку размеров
  handleShowSizeTable(product)
}
