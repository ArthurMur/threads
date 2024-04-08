'use client'
import Link from 'next/link'
import {
  $catalogMenuIsOpen,
  $menuIsOpen,
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import CatalogMenu from '../Header/CatalogMenu'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useUnit } from 'effector-react'

const MobileNavbar = () => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useCartByAuth()
  const isMenuOpen = useUnit($menuIsOpen)
  const isCatalogMenuOpen = useUnit($catalogMenuIsOpen)

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
    } else {
      addOverflowHiddenToBody()
      openMenu()
      closeCatalogMenu()
    }
  }

  const handleToggleCatalogMenu = () => {
    if (isCatalogMenuOpen) {
      closeCatalogMenu()
    } else {
      addOverflowHiddenToBody('0')
      openCatalogMenu()
      closeMenu()
    }
  }

  return (
    <>
      <CatalogMenu />
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          {translations[lang].breadcrumbs.main}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleToggleCatalogMenu}
          aria-label='Catalog'
        >
          {translations[lang].breadcrumbs.catalog}
        </button>
        <Link className='btn-reset mobile-navbar__btn' href='/favorites'>
          {translations[lang].breadcrumbs.favorites}
        </Link>
        <Link className='btn-reset mobile-navbar__btn' href='/cart'>
          {!!currentCartByAuth.length && (
            <span className='not-empty not-empty-mobile' />
          )}
          {translations[lang].breadcrumbs.cart}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleToggleMenu}
          aria-label='Menu'
        >
          {translations[lang].common.more}
        </button>
      </div>
    </>
  )
}

export default MobileNavbar
