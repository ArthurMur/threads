'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import img1 from '@/../public/img/categories-img-1.png'
import img2 from '@/../public/img/categories-img-2.png'
import styles from '@/../styles/main-page/index.module.scss'
import useImagePreloader from '@/hooks/useImagePreloader'
import MainSlider from '../MainSlider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Categories = () => {
  const { lang, translations } = useLang()
  const isMedia490 = useMediaQuery(490)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const images = [
    { src: img1, id: 1, title: translations[lang].main_page.category_cloth },
    {
      src: img2,
      id: 2,
      title: translations[lang].main_page.category_accessories,
    },
  ]

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <section className={styles.categories}>
      <div className={`container ${styles.categories__container}`}>
        <h2 className={`site-title ${styles.categories__title}`}>
          {translations[lang].main_page.category_title}
        </h2>
        <div className={styles.categories__inner}>
          {!isMedia490 && (
            <>
              <Link
                href='/catalog/cloth'
                className={`${styles.categories__link} ${styles.categories__img} ${imgSpinnerClass}`}
                data-aos='fade-down'
                data-aos-duration='1000'
              >
                <Image
                  src={img1}
                  alt='Cloth'
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                  width={653}
                  height={636}
                />
                <span>{translations[lang].main_page.category_cloth}</span>
              </Link>
              <Link
                href='/catalog/accessories'
                className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <Image
                  src={img2}
                  alt='Accessories'
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                  width={653}
                  height={636}
                />
                <span>{translations[lang].main_page.category_accessories}</span>
              </Link>
            </>
          )}
          {isMedia490 && <MainSlider images={images} />}
        </div>
      </div>
    </section>
  )
}

export default Categories
