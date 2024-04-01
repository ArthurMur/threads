import { useUnit } from 'effector-react'
import { $currentProduct } from '@/context/goods'
import { useMemo, useState } from 'react'
import { useCartByAuth } from './useCartByAuth'
import { isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'
import { updateCartItemCount } from '@/context/cart'

// хук для работы с корзиной
export const useCartAction = (isSizeTable = false) => {
  // получаем продукт из стора
  const product = useUnit($currentProduct)
  // стейт для выбранного размера
  const [selectedSize, setSelectedSize] = useState('')
  // получаем текущую корзину
  const currentCartByAuth = useCartByAuth()
  // получаем текущие товары в корзине
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  // получаем товары в корзине по размеру
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )
  // получаем текущее количество в корзине
  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )
  // стейт для показа спиннера добавления в корзину
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  // стейт для показа спиннера обновления счетчика
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)
  const [count, setCount] = useState(+(existingItem?.count as string) || 1)

  // функция для добавления товара в корзину
  const handleAddToCart = (countFromCounter?: number) => {
    // если продукт уже есть в корзине
    if (existingItem) {
      //если пользователь не авторизован, то добавляем в локальное хранилище
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }
      // получаме токен из localStorage
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      // проверка обновления счетчика товаров
      const updatedCountWithSize = !!countFromCounter
        ? +existingItem.count !== countFromCounter
          ? countFromCounter
          : +existingItem.count + 1
        : +existingItem.count + 1

      updateCartItemCount({
        jwt: auth.accessToken,
        id: existingItem._id as string,
        setSpinner: setUpdateCountSpinner,
        count: selectedSize.length
          ? updatedCountWithSize
          : +existingItem.count + 1,
      })
      addCartItemToLS(product, selectedSize, countFromCounter || 1)
      return
    }
    // если таблица размеров открыта
    if (isSizeTable) {
      addItemToCart(
        product,
        setAddToCartSpinner,
        countFromCounter || 1,
        selectedSize
      )
      return
    }
    // если мы не в таблице размеров, то
    addProductToCartBySizeTable(
      product,
      setAddToCartSpinner,
      countFromCounter || 1,
      selectedSize
    )
  }

  // функция расчета общей стоимости товаров в корзине
  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  )

  return {
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    existingItem,
    handleAddToCart,
    count,
    setCount,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
    allCurrentCartItemCount,
  }
}
