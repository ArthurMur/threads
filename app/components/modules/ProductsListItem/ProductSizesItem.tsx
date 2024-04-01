'use client'
import { IProductSizesItemProps } from '@/../types/goods'
import styles from '@/../styles/quick-view-modal/index.module.scss'
import ProductCountBySize from './ProductCountBySize'

// Определяем функциональный компонент ProductSizesItem
const ProductSizesItem = ({
  currentSize, // Текущий размер
  selectedSize, // Выбранный размер
  setSelectedSize, // Функция установки выбранного размера
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentCartItems, // Неиспользуемый параметр
}: IProductSizesItemProps) => {
  // Обработчик выбора размера
  const handleSelectSize = () => setSelectedSize(currentSize[0])

  // Возвращаем элемент списка размеров
  return (
    <li
      className={`${styles.modal__right__info__sizes__item} ${
        currentSize[1]
          ? ''
          : styles.modal__right__info__sizes__item__not_available
      }`}
      style={{
        backgroundColor:
          currentSize[0] === selectedSize
            ? '#9466FF' // Цвет фона для выбранного размера
            : 'rgba(255, 255, 255, 0.10)', // Цвет фона для остальных размеров
      }}
    >
      <ProductCountBySize
        size={currentSize[0]}
        products={currentCartItems}
        withCartIcon={false}
      />
      <button className='btn-reset' onClick={handleSelectSize}>
        {/*Отображаем размер в верхнем регистре*/}
        {currentSize[0].toLocaleUpperCase()}
      </button>
    </li>
  )
}

export default ProductSizesItem
