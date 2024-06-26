'use client'
import { Logo } from '@/components/elements/Logo/Logo'
import { useLang } from '@/hooks/useLang'
// import Link from 'next/link'
import '@/globalStyles/header.scss'
import {
  addOverflowHiddenToBody,
  handleOpenAuthPopup,
  triggerLoginCheck,
} from '@/lib/utils/common'
import { openMenu, openSearchModal } from '@/context/modals'
import Menu from './Menu'
import CartPopup from './CartPopup/CartPopup'
import { useUnit } from 'effector-react'
import { $isAuth } from '@/context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { loginCheckFx } from '@/../api/auth'
import { useEffect } from 'react'
// import { $user } from '@/context/user'
import HeaderProfile from './HeaderProfile'
import {
  addProductsFromLSToCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'
import { setLang } from '@/context/lang'

const Header = () => {
  const isAuth = useUnit($isAuth)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const { lang, translations } = useLang()

  // Обработчик клика на кнопку, который добавляет overflow-hidden к body
  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
  }

  // Обработчик клика на кнопку поиска
  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const cart = JSON.parse(localStorage.getItem('cart') as string)

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (auth?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmpty(true)
        return
      }
      setCartFromLS(cart)
    }
  }, [])

  // эффект для слежки за авторизацией. если пользователь авторизуется, то сихронизируемся с сервером
  useEffect(() => {
    if (isAuth) {
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      //корзина из localStorage
      const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)
      // если есть данные из корзины
      if (cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }
    }
  }, [isAuth])

  return (
    <header className='header'>
      <div className='container header__container'>
        <button
          className='btn-reset header__burger'
          onClick={handleOpenMenu}
          aria-label='Burger'
        >
          {translations[lang].header.menu_btn}
        </button>
        <Menu />
        <div className='header__logo'>
          <Logo />
        </div>
        <ul className='header__links list-reset'>
          <li className='header__links__item'>
            <button
              className='btn-reset header__links__item__btn header__links__item__btn--search'
              onClick={handleOpenSearchModal}
              aria-label='Search'
            />
          </li>
          {/* <li className='header__links__item'>
            <Link
              href='/favorites'
              className='header__links__item__btn header__links__item__btn--favorites'
            />
          </li> */}
          <li className='header__links__item'>
            <CartPopup />
          </li>
          <li className='header__links__item header__links__item--profile'>
            {isAuth ? (
              <HeaderProfile />
            ) : loginCheckSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <button
                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                onClick={handleOpenAuthPopup}
                aria-label='Profile'
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
