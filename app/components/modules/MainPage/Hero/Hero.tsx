'use client'
import { useEffect } from 'react'
import { useLang } from '@/hooks/useLang'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import styles from '@/../styles/main-page/index.module.scss'
import img1 from '@/../public/img/tshirt1.png'
import img2 from '@/../public/img/tshirt2.png'
import img3 from '@/../public/img/tshirt3.png'
import HeroSlide from './HeroSlide'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Hero = () => {
  const { lang, translations } = useLang()

  useEffect(() => {
    AOS.init()
  }, [])

  const slides = [
    {
      id: 1,
      title: `${translations[lang].main_page.tShirt} «Disorder» ${translations[lang].main_page.white}`,
      image: img1,
    },
    {
      id: 2,
      title: `${translations[lang].main_page.tShirt} «Disorder» ${translations[lang].main_page.black}`,
      image: img2,
    },
    {
      id: 3,
      title: `${translations[lang].main_page.tShirt} «Disorder» ${translations[lang].main_page.pink}`,
      image: img3,
    },
  ]

  const handleSlideClick = (e: SwiperType) => e.slideTo(e.clickedIndex) // Обработчик клика на слайд

  return (
    <section className={styles.hero}>
      <h1 className='visually-hidden'>
        {translations[lang].main_page.hero_hidden_title}
        {/* Скрытый заголовок для скринридеров */}
      </h1>
      <div className={`container ${styles.hero__container}`}>
        <Swiper
          className={styles.hero__slider}
          effect='coverflow' // Эффект слайдера
          coverflowEffect={{
            // Параметры эффекта coverflow
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          slidesPerView='auto' // Количество отображаемых слайдов
          initialSlide={2} // Начальный активный слайд
          autoplay={{ delay: 2000, disableOnInteraction: false }} // Автопрокрутка слайдов
          speed={900}
          loop={false} // Бесконечная прокрутка слайдов
          onClick={handleSlideClick} // Обработчик клика на слайд
          modules={[EffectCoverflow, Autoplay]} // Используемый модуль Swiper
          grabCursor // Изменение курсора при наведении на слайд
          centeredSlides // Центрирование слайдов
        >
          {slides.map((slide) => (
            <SwiperSlide className={styles.hero__slider__slide} key={slide.id}>
              <HeroSlide slide={slide} />
              {/* Передача данных слайда компоненту HeroSlide */}
            </SwiperSlide>
          ))}
        </Swiper>
        <ProductSubtitle />
        <h2
          className={styles.hero__title}
          data-aos='zoom-in'
          data-aos-duration='2000'
        >
          <span className={styles.hero__title__text}>
            {translations[lang].main_page.hero_title} {/* Заголовок слайда */}
          </span>
        </h2>
      </div>
    </section>
  )
}

export default Hero
