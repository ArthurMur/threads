import Slider from 'react-slick'
import Link from 'next/link'
import { useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import useImagePreloader from '@/hooks/useImagePreloader'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/../styles/main-page/index.module.scss'

const MainSlider = ({
  images, // Параметр images, массив объектов
}: {
  images: {
    src: StaticImageData
    id: number
    title: string
  }[]
}) => {
  const isMedia420 = useMediaQuery(420)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''
  const settings = {
    // Объект настроек слайдера
    dots: false, // Не отображать точки для навигации
    infinite: true, // Зацикленное прокручивание слайдов
    slidesToScroll: 1, // Прокручивать по одному слайду
    variableWidth: true, // Изменяемая ширина слайдов
    autoplay: true, // Автоматическое прокручивание слайдов
    autoplaySpeed: 2700,
    speed: 1400, // Скорость прокручивания слайдов (в миллисекундах)
    arrows: false, // Не отображать стрелки для навигации
  }

  useEffect(() => {
    // Поиск всех элементов с классом styles.categories__slider
    const slider = document.querySelectorAll(`.${styles.categories__slider}`)

    slider.forEach((item) => {
      // Получение элемента .slick-list внутри текущего элемента и приведение к типу HTMLElement
      const list = item.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia420 ? '290px' : '357px' // Изменение высоты слайдера в зависимости от размера экрана
      list.style.marginRight = '-15px' // Установка отрицательного правого отступа для компенсации марджинов
    })
  }, [isMedia420])

  return (
    <Slider {...settings} className={styles.categories__slider}>
      {' '}
      {/* Компонент Slider с передачей настроек и класса */}
      {images.map((item) => (
        <Link
          key={item.id}
          style={{ width: isMedia420 ? 290 : 357 }} // Динамическое определение ширины в зависимости от размера экрана
          className={`${styles.categories__slide} ${styles.categories__img} ${imgSpinnerClass}`}
          href='/catalog'
        >
          <Image
            src={item.src}
            alt={item.title}
            width={357}
            height={357}
            onLoad={handleLoadingImageComplete}
          />
          <span>{item.title.replace(/\s/g, '\u00A0')}</span>{' '}
        </Link>
      ))}
    </Slider>
  )
}

export default MainSlider
