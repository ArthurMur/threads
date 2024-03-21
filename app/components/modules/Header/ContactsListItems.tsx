import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <a
          href='tel:+79038956680'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +7 (903) 895 66 80
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='mailto:test@gmail.com'
          className='nav-menu__accordion__item__link'
        >
          Email
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://t.me/arturasterol'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://vk.com/arturasterol'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.vk}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems
