/* eslint-disable indent */
'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useLang } from '@/hooks/useLang'
import { IProductsListItemProps } from '@/../types/modules'
import styles from '@/../styles/product-list-item/index.module.scss'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import {
  addOverflowHiddenToBody,
  formatPrice,
  isItemInList,
} from '@/lib/utils/common'
import ProductLabel from './ProductLabel'
// import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import { showQuickViewModal } from '@/context/modals'
import { setCurrentProduct } from '@/context/goods'
import { productsWithoutSizes } from '@/constants/product'
import { useCartAction } from '@/hooks/useCartAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { addProductToCartBySizeTable } from '@/lib/utils/cart'

const ProductsListItem = ({ item, title }: IProductsListItemProps) => {
  const { lang, translations } = useLang()
  const isTitleForNew = title === translations[lang].main_page.new_title
  const { addToCartSpinner, setAddToCartSpinner, currentCartByAuth } =
    useCartAction()
  const isProductInCart = isItemInList(currentCartByAuth, item._id)

  // Обработчик клика на эдемент быстрого просмотра
  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }
  // Обработчик клика на кнопку добавления в корзину
  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Остановка всплытия события, чтобы предотвратить вызов обработчика на родительском элементе
    e.stopPropagation()
    addProductToCartBySizeTable(item, setAddToCartSpinner, 1)
  }

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      {item.characteristics.collection === 'line' &&
      item.type === 't-shirts' ? (
        <li
          className={styles.list__item_ad}
          onClick={handleShowQuickViewModal}
          data-aos='zoom-in'
          data-aos-duration='1000'
        >
          <ProductSubtitle
            subtitleClassName={styles.list__item_ad__subtitle}
            subtitleRectClassName={styles.list__item_ad__subtitle__rect}
          />
          <div className={styles.list__item_ad__img} data-aos='fade-right'>
            <Image src={item.images[0]} alt={item.name} sizes='auto' fill />
          </div>
          <p className={styles.list__item_ad__title}>
            <span>
              {translations[lang].main_page.tShirt} «Disorder»{' '}
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                translations[lang].main_page[
                  item.images[0].split('/img/').join('').split('-')[0]
                ]
              }
            </span>
            <span>{formatPrice(+item.price)} ₽</span>
          </p>
        </li>
      ) : (
        <li
          className={styles.list__item}
          onClick={handleShowQuickViewModal}
          data-aos='zoom-in'
          data-aos-duration='1000'
        >
          {title ? (
            <span
              className={`${styles.list__item__label} ${
                isTitleForNew
                  ? styles.list__item__new
                  : styles.list__item__bestseller
              }`}
            >
              {isTitleForNew
                ? translations[lang].main_page.is_new
                : translations[lang].main_page.is_bestseller}
            </span>
          ) : !item.isNew && !item.isBestseller ? (
            ''
          ) : (
            <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
          )}
          {/* <div className={styles.list__item__actions}>
            <ProductItemActionBtn
              text={translations[lang].product.add_to_favorites}
              iconClass={'actions__btn_favorite'}
            />
          </div> */}
          <div className={styles.list__item__img}>
            <Image
              src={item.images[0]}
              alt={item.name}
              sizes='auto'
              fill
              data-aos='flip-left'
              data-aos-duration='1500'
            />
          </div>
          <div
            className={styles.list__item__inner}
            data-aos='flip-up'
            data-aos-duration='1200'
          >
            <h3 className={styles.list__item__title}>{item.name}</h3>
            <ProductAvailable
              vendorCode={item.vendorCode}
              inStock={+item.inStock}
            />
            <span className={styles.list__item__price}>
              {formatPrice(+item.price)} ₽
            </span>
          </div>
          {productsWithoutSizes.includes(item.type) ? (
            <button
              onClick={addToCart}
              className={`btn-reset ${styles.list__item__cart} ${
                isProductInCart ? styles.list__item__cart_added : ''
              }`}
              disabled={addToCartSpinner}
              style={addToCartSpinner ? { minWidth: 125, height: 48 } : {}}
              aria-label='Add to cart'
            >
              {addToCartSpinner ? (
                <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
              ) : isProductInCart ? (
                translations[lang].product.in_cart
              ) : (
                translations[lang].product.to_cart
              )}
            </button>
          ) : (
            <button
              className={`btn-reset ${styles.list__item__cart}`}
              onClick={addToCart}
              aria-label='Add to cart'
            >
              {translations[lang].product.to_cart}
            </button>
          )}
        </li>
      )}
    </>
  )
}

export default ProductsListItem
