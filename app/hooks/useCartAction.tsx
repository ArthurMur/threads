import { $currentProduct } from '@/context/goods'
import { useUnit } from 'effector-react'
import { useState } from 'react'

// хук для работы с корзиной
export const useCartAction = () => {
  // получаем продукт из стора
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')

  return { product, setSelectedSize, selectedSize }
}
