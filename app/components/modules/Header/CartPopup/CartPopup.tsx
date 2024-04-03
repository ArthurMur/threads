import { forwardRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { IWrappedComponentProps } from '@/../types/hocs'
import { useLang } from '@/hooks/useLang'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { getCartItemsFx } from '../../../../../api/cart'
import CartPopupItem from './CartPopupItem'
import { useUnit } from 'effector-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { formatPrice } from '@/lib/utils/common'
// Объявление компонента CartPopup с использованием forwardRef для передачи ссылки на DOM-элемент
const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    // состояние открытости и функция для управления состоянием, а также ссылка на DOM-элемент
    const { lang, translations } = useLang() // Получение текущего языка и переводов
    const spinner = useUnit(getCartItemsFx.pending)
    const currentCartByAuth = useCartByAuth()
    const { animatedPrice } = useTotalPrice()

    const handleShowPopup = () => setOpen(true) // Обработчик для отображения всплывающего окна
    const handleHidePopup = () => setOpen(false) // Обработчик для скрытия всплывающего окна

    return (
      <div className='cart-popup' ref={ref}>
        <Link
          className='header__links__item__btn header__links__item__btn--cart'
          href='/cart'
          onMouseEnter={handleShowPopup} // Обработчик для отображения всплывающего окна при наведении
        />
        {!!currentCartByAuth.length && <span className='not-empty' />}
        <AnimatePresence>
          {/* Компонент для анимации появления и исчезновения дочерних элементов */}
          {open && ( // Условие отображения всплывающего окна
            <motion.div
              initial={{ opacity: 0, scale: 0 }} // Начальные стили анимации
              animate={{ opacity: 1, scale: 1 }} // Анимация при появлении
              exit={{ opacity: 0, scale: 0 }} // Анимация при исчезновении
              className='cart-popup__wrapper' // Класс контейнера всплывающего окна
              onMouseLeave={handleHidePopup} // Обработчик для скрытия всплывающего окна при уходе мыши
            >
              <span className='cart-popup__arrow' />
              {/* Стрелка всплывающего окна */}
              <button
                className='btn-reset cart-popup__close' // Кнопка закрытия всплывающего окна
                onClick={handleHidePopup} // Обработчик для скрытия всплывающего окна при клике на кнопку
                aria-label='Close'
              />
              <h3 className='cart-popup__title'>
                {translations[lang].breadcrumbs.cart}
                {/* Заголовок всплывающего окна */}
              </h3>
              {spinner ? (
                <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='3x' />
              ) : (
                <ul className='list-reset cart-popup__cart-list'>
                  <AnimatePresence>
                    {currentCartByAuth.length ? (
                      currentCartByAuth.map((item) => (
                        <motion.li
                          key={item._id || item.clientId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='cart-list__item'
                        >
                          <CartPopupItem item={item} />
                        </motion.li>
                      ))
                    ) : (
                      <li className='cart-popup__cart-list__empty-cart' />
                    )}
                  </AnimatePresence>
                </ul>
              )}

              <div className='cart-popup__footer'>
                {/* Нижняя часть всплывающего окна */}
                <div className='cart-popup__footer__inner'>
                  <span>{translations[lang].common.order_price}:</span>
                  {/* Надпись "Сумма заказа" */}
                  <span>{formatPrice(animatedPrice)} ₽</span>{' '}
                  {/* Общая сумма заказа */}
                </div>
                <Link href='/order' className='cart-popup__footer__link'>
                  {/* Ссылка на страницу оформления заказа */}
                  {translations[lang].breadcrumbs.order} {/* Текст ссылки */}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
