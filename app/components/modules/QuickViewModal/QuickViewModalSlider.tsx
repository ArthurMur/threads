/* eslint-disable @next/next/no-img-element */
import styles from '@/../styles/quick-view-modal/index.module.scss'
import QuickViewModalSliderArrow from '@/components/elements/QuickViewModalSliderArrow/QuickViewModalSliderArrow'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Slider from 'react-slick'

const QuickViewModalSlider = ({
  images,
}: {
  images: {
    src: string
    alt: string
    id: string
  }[]
}) => {
  const isMedia1070 = useMediaQuery(1070)
  const isMedia380 = useMediaQuery(380)

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    dotsClass: `list-reset ${styles.modal__left__slider__slide__dots} quick-modal-dots`,
    nextArrow: <QuickViewModalSliderArrow directionClassName={styles.next} />,
    prevArrow: <QuickViewModalSliderArrow directionClassName={styles.prev} />,
    appendDots: (dots: React.ReactNode) => <ul>{dots}</ul>,
    customPaging: () => (
      <button
        className={`btn-reset ${styles.modal__left__slider__slide__dot}`}
        aria-label='Slide dot'
      />
    ),
  }

  return (
    <Slider {...settings} className={styles.modal__left__slider}>
      {images.map((item) => (
        <div
          key={item.id}
          style={{ width: isMedia380 ? 270 : isMedia1070 ? 350 : 480 }}
          className={styles.modal__left__slider__slide}
        >
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default QuickViewModalSlider
