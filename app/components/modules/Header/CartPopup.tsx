import { forwardRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { IWrappedComponentProps } from '@/../types/hocs'
import { useLang } from '@/hooks/useLang'
// Объявление компонента CartPopup с использованием forwardRef для передачи ссылки на DOM-элемент
const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    // состояние открытости и функция для управления состоянием, а также ссылка на DOM-элемент
    const { lang, translations } = useLang() // Получение текущего языка и переводов

    const handleShowPopup = () => setOpen(true) // Обработчик для отображения всплывающего окна
    const handleHidePopup = () => setOpen(false) // Обработчик для скрытия всплывающего окна

    return (
      <div className='cart-popup' ref={ref}>
        <Link
          className='header__links__item__btn header__links__item__btn--cart'
          href='/cart'
          onMouseEnter={handleShowPopup} // Обработчик для отображения всплывающего окна при наведении
        />
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
              />
              <h3 className='cart-popup__title'>
                {translations[lang].breadcrumbs.cart}
                {/* Заголовок всплывающего окна */}
              </h3>
              <ul className='list-reset cart-popup__cart-list'>
                {/* Список товаров в корзине */}
                <li className='cart-popup__cart-list__empty-cart' />
                {/* Элемент для пустой корзины */}
              </ul>
              <div className='cart-popup__footer'>
                {/* Нижняя часть всплывающего окна */}
                <div className='cart-popup__footer__inner'>
                  <span>{translations[lang].common.order_price}:</span>
                  {/* Надпись "Сумма заказа" */}
                  <span>0 ₽</span> {/* Общая сумма заказа */}
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
