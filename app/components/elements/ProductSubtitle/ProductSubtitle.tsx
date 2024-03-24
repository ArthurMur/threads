import React from 'react'
import styles from '@/../styles/product-subtitle/index.module.scss'
import { useLang } from '@/hooks/useLang'
import { IProductSubtitleProps } from '../../../../types/elements'

export default function ProductSubtitle({
  subtitleClassName,
  subtitleRectClassName,
}: IProductSubtitleProps) {
  const { lang, translations } = useLang()
  const descriptionSlicePosition = lang == 'ru' ? 5 : 2

  return (
    <div
      className={`${styles.product_subtitle__subtitle} ${subtitleClassName}`}
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
