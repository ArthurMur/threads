'use client'
import { Logo } from '@/components/elements/Logo/Logo'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Footer = () => {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <footer
      className='footer'
      data-aos='fade-down'
      data-aos-anchor-placement='top-bottom'
      data-aos-duration='1500'
    >
      <div className='footer__top'>
        <div className='container footer__top__container'>
          <div className='footer__logo'>
            <Logo />
          </div>
          <div className='footer__contacts'>
            <span>
              <a href='tel:+79038956680'>+7 (903) 895-66-80</a>
            </span>
            <span>
              <a href='mailto:arturmuradov14@gmail.com'>
                arturmuradov14@gmail.com
              </a>
            </span>
          </div>
          <ul className='list-reset footer__socials'>
            <li className='footer__socials__item'>
              <a
                href='https://t.me/arturasterol'
                className='footer__socials__item__link'
              />
            </li>
            <li className='footer__socials__item'>
              <a
                href='https://vk.com/arturasterol'
                className='footer__socials__item__link'
              />
            </li>
            <li className='footer__socials__item'>
              <a
                href='https://youtube.com'
                className='footer__socials__item__link'
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
