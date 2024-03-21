import Image from 'next/image'
import { IHeroSlideTooltip } from '@/../types/main-page'
import styles from '@/../styles/main-page/index.module.scss'

const HeroSlideTooltip = ({ title, image }: IHeroSlideTooltip) => (
  <div className={`${styles.hero__slider__slide__popup} slide-popup`}>
    {/* Обертка для всплывающей подсказки */}
    <span className={styles.hero__slider__slide__popup__arrow} />
    {/* Стрелка указывающая на изображение */}
    <Image
      className={styles.hero__slider__slide__popup__img} // Класс стилей для изображения
      src={image} // Источник изображения
      alt={title} // Альтернативный текст изображения
    />
    <p className={styles.hero__slider__slide__popup__inner}>
      {/* Обертка для текстового контента */}
      <b className={styles.hero__slider__slide__popup__title}>{title}</b>
      {/* Заголовок всплывающей подсказки */}
      <span className={styles.hero__slider__slide__popup__price}>2500 ₽</span>
      {/* Цена */}
    </p>
  </div>
)

export default HeroSlideTooltip
