import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const BuyersListItems = () => {
  const { lang, translations } = useLang() // Получаем текущий язык и переводы

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/about' // Ссылка на страницу "О нас"
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          {translations[lang].main_menu.about}{' '}
          {/* Перевод "О нас" на текущий язык */}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link href='/blog' className='nav-menu__accordion__item__link'>
          {translations[lang].main_menu.blog}{' '}
          {/* Перевод "Блог" на текущий язык */}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/shipping-and-payment' // Ссылка на страницу "Доставка и оплата"
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.shipping}{' '}
          {/* Перевод "Доставка и оплата" на текущий язык */}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/purchase-returns' // Ссылка на страницу "Возврат товара"
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.returns}{' '}
          {/* Перевод "Возврат товара" на текущий язык */}
        </Link>
      </li>
    </>
  )
}

export default BuyersListItems
