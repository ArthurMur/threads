import { useUnit } from 'effector-react'
import { $currentProduct } from '@/context/goods'
import { useState } from 'react'
import { useCartByAuth } from './useCartByAuth'
import { isItemInList, isUserAuth } from '@/lib/utils/common'
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
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )
  // проверка наличия продукта в корзине
  const isProductInCart = isItemInList(currentCartByAuth, product._id)
  // стейт для показа спиннера добавления в корзину
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  // стейт для показа спиннера обновления счетчика
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)

  // функция для добавления товара в корзину
  const handleAddToCart = (countFromCounter?: number) => {
    // если продукт уже есть в корзине
    if (isProductInCart) {
      //если пользователь не авторизован, то добавляем в локальное хранилище
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }
      // если этот товар с размером
      if (cartItemBySize) {
        // получаме токен из localStorage
        const auth = JSON.parse(localStorage.getItem('auth') as string)
        // проверка обновления счетчика товаров
        const count = !!countFromCounter
          ? +cartItemBySize.count !== countFromCounter
            ? countFromCounter
            : +cartItemBySize.count + 1
          : +cartItemBySize.count + 1

        updateCartItemCount({
          jwt: auth.accessToken,
          id: cartItemBySize._id as string,
          setSpinner: setUpdateCountSpinner,
          count,
        })

        addCartItemToLS(product, selectedSize, count)
        return
      }
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

  return {
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    handleAddToCart,
    isProductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
  }
}
