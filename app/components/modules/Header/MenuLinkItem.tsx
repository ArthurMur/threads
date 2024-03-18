import Link from 'next/link'
import React from 'react'
import { IMenuLinkItemProps } from '@/../types/modules'

// Компонент элемента меню
const MenuLinkItem = ({
  item,
  handleRedirectToCatalog,
}: IMenuLinkItemProps) => {
  // Обработчик перенаправления на страницу каталога при клике
  const onRedirect = () => handleRedirectToCatalog(item.href)

  return (
    <li key={item.id} className='nav-menu__accordion__item__list__item'>
      {/* Ссылка на страницу */}
      <Link
        href={item.href} // URL страницы
        className='nav-menu__accordion__item__list__item__link' // Класс ссылки
        onClick={onRedirect} // Обработчик клика
      >
        {item.text} {/* Текст ссылки */}
      </Link>
    </li>
  )
}

export default MenuLinkItem
