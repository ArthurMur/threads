'use client'
import React, { useEffect } from 'react'
import styles from '@/../styles/product-subtitle/index.module.scss'
import { useLang } from '@/hooks/useLang'
import { IProductSubtitleProps } from '../../../../types/elements'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ProductSubtitle({
  subtitleClassName,
  subtitleRectClassName,
}: IProductSubtitleProps) {
  const { lang, translations } = useLang()
  const descriptionSlicePosition = lang == 'ru' ? 5 : 2
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div
      className={`${styles.product_subtitle__subtitle} ${subtitleClassName}`}
      data-aos='fade-right'
      data-aos-duration='2000'
    >
      <div
        className={`${styles.product_subtitle__subtitle__rect} ${subtitleRectClassName}`}
      />
      <span>
        {translations[lang].main_page.product_subtitle_description.slice(
          0,
          descriptionSlicePosition
        )}
        {/* Описание слайда, часть 1 */}
      </span>
      <br />
      <span>
        {translations[lang].main_page.product_subtitle_description.slice(
          descriptionSlicePosition
        )}
        {/* Описание слайда, часть 2 */}
      </span>
    </div>
  )
}
