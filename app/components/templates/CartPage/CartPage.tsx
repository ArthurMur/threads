'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import styles from '@/../styles/cart-page/index.module.scss'
import cartSkeletonStyles from '@/../styles/cart-skeleton/index.module.scss'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { getCartItemsFx } from '../../../../api/cart'
import { basePropsForMotion } from '@/constants/motion'
import CartList from '@/components/modules/CartPage/CartList'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PromotionalCode from '@/components/modules/CartPage/PromotionalCode'
import { useState } from 'react'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { $shouldShowEmpty } from '@/context/cart'

export default function Cart() {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const { lang, translations } = useLang()
  const currentCartByAuth = useCartByAuth()
  const isMedia930 = useMediaQuery(930)
  const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] =
    useState(false)
  const shouldShowEmpty = useUnit($shouldShowEmpty)
  return (
    <main className={styles.main}>
      {!shouldShowEmpty ? (
        <section className={styles.cart}>
          <div className='conrainer'>
            <HeadingWithCount
              count={countWholeCartItemsAmount(currentCartByAuth)}
              title={translations[lang].breadcrumbs.cart}
              spinner={cartSpinner}
            />
            <div className={styles.cart__inner}>
              <div className={styles.cart__left}>
                {cartSpinner && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={cartSkeletonStyles.skeleton}
                  >
                    {Array.from(new Array(3)).map((_, i) => (
                      <li key={i} className={cartSkeletonStyles.skeleton__item}>
                        <div
                          className={cartSkeletonStyles.skeleton__item__light}
                        />
                      </li>
                    ))}
                  </motion.ul>
                )}
                {!cartSpinner && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={`list-reset ${styles.cart__list}`}
                  >
                    <CartList />
                  </motion.ul>
                )}
              </div>
              <div className={styles.cart__right}>
                <div className={styles.cart__right__order}>
                  <OrderInfoBlock
                    isCorrectPromotionalCode={isCorrectPromotionalCode}
                  />
                </div>
                {isMedia930 && (
                  <PromotionalCode
                    setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                  />
                )}
              </div>
            </div>
            {!isMedia930 && (
              <PromotionalCode
                setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
              />
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.cart_empty}
              description={translations[lang].common.cart_empty_advice}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}
