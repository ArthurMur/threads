'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { $catalogMenuIsOpen, closeCatalogMenu } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogMenuButton from './CatalogMenuButton'
import Accordion from '../Accordion/Accordion'
import CatalogMenuList from './CatalogMenuList'

const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen) // Получение состояния открытости меню каталога
  const [showClothList, setShowClothList] = useState(false) // Состояние для отображения списка одежды
  const [showAccessoriesList, setShowAccessoriesList] = useState(false) // Состояние для отображения списка аксессуаров
  const [activeListId, setActiveListId] = useState(0) // Состояние для отслеживания активного списка
  const { lang, translations } = useLang() // Получение текущего языка и переводов
  const [startTouchX, setStartTouchX] = useState<number | null>(null) // Начальная точка касания
  const [isSwiping, setIsSwiping] = useState(false) // Флаг для отслеживания свайпа
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    11,
    catalogMenuIsOpen
  ) // Получение вариантов анимации меню
  const isMedia450 = useMediaQuery(450) // Получение информации о том, соответствует ли ширина экрана медиа-запросу

  const handleShowClothList = () => {
    // Функция для отображения списка одежды
    setShowClothList(true)
    setShowAccessoriesList(false)
  }

  const handleShowAccessoriesList = () => {
    // Функция для отображения списка аксессуаров
    setShowClothList(false)
    setShowAccessoriesList(true)
  }

  const handleCloseMenu = () => {
    // Функция для закрытия меню
    removeOverflowHiddenFromBody() // Удаление свойства overflow:hidden у body
    closeCatalogMenu() // Закрытие меню каталога
    setActiveListId(0) // Установка активного списка в ноль
  }

  const isActiveList = (id: number) => activeListId === id // Функция для проверки активности списка по id

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchX(e.touches[0].clientX) // Сохранение начальной точки касания
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startTouchX !== null) {
      const touchMoveX = e.touches[0].clientX
      const deltaX = touchMoveX - startTouchX
      if (deltaX < -50) {
        // Если свайп влево достаточно длинный
        setIsSwiping(true) // Установка флага свайпа
      }
    }
  }

  const handleTouchEnd = () => {
    if (isSwiping) {
      // Если был свайп влево
      handleCloseMenu() // Закрытие меню
      setIsSwiping(false) // Сброс флага свайпа
    }
    setStartTouchX(null) // Сброс начальной точки касания
  }

  const items = [
    {
      name: translations[lang].main_menu.cloth,
      id: 1,
      items: [
        translations[lang].comparison['t-shirts'],
        translations[lang].comparison['long-sleeves'],
        translations[lang].comparison.hoodie,
      ],
      handler: handleShowClothList,
    },
    {
      name: translations[lang].main_menu.accessories,
      id: 2,
      items: [
        translations[lang].comparison.bags,
        translations[lang].comparison.headdress,
      ],
      handler: handleShowAccessoriesList,
    },
  ]
  return (
    <div
      className='catalog-menu'
      style={{ zIndex: popupZIndex }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Обертка для анимации при появлении и исчезновении */}
      <AnimatePresence>
        {/* Проверка открытости меню */}
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className='catalog-menu__aside'
          >
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              {/* Кнопка закрытия меню */}
              <motion.button
                className='btn-reset catalog-menu__close'
                variants={itemVariants}
                onClick={handleCloseMenu}
              />
              {/* Заголовок меню */}
              <motion.h2
                variants={itemVariants}
                className='catalog-menu__title'
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                {items.map(({ id, name, items, handler }) => {
                  const buttonProps = (isActive: boolean) => ({
                    handler: handler as VoidFunction,
                    name,
                    isActive,
                  })
                  // Проверка на текущий список
                  const isCurrentList = (
                    showList: boolean,
                    currentId: number
                  ) => showList && id === currentId

                  return (
                    <motion.li
                      key={id}
                      variants={itemVariants}
                      className='catalog-menu__list__item'
                    >
                      {/* Условие для показа кнопок при большом экране */}
                      {!isMedia450 && (
                        <>
                          {id === 1 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(1))}
                            />
                          )}
                          {id === 2 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(2))}
                            />
                          )}
                          {id === 3 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(3))}
                            />
                          )}
                        </>
                      )}
                      {/* Условие для показа кнопок при большом экране */}
                      {!isMedia450 && (
                        <AnimatePresence>
                          {isCurrentList(showClothList, 1) && (
                            <CatalogMenuList
                              items={items}
                              onClick={handleCloseMenu}
                            />
                          )}
                          {isCurrentList(showAccessoriesList, 2) && (
                            <CatalogMenuList
                              items={items}
                              onClick={handleCloseMenu}
                            />
                          )}
                        </AnimatePresence>
                      )}
                      {/* Условие для показа списков при малом экране */}
                      {isMedia450 && (
                        <Accordion
                          title={name}
                          titleClass='btn-reset nav-menu__accordion__item__title'
                        >
                          <ul className='list-reset catalog__accordion__list'>
                            {items.map((title, i) => (
                              <li
                                key={i}
                                className='catalog__accordion__list__item'
                              >
                                <Link
                                  href='/catalog'
                                  className='nav-menu__accordion__item__list__item__link'
                                  onClick={handleCloseMenu}
                                >
                                  {title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CatalogMenu
