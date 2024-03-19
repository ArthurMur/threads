import { useEffect, useState } from 'react'

export const useMenuAnimation = (zIndex: number, popupIsOpen: boolean) => {
  const [popupZIndex, setPopupZIndex] = useState<string | number>(0)

  // Варианты анимации для элементов меню
  const itemVariants = {
    closed: {
      opacity: 0, // Закрыто - непрозрачность равна 0
    },
    open: { opacity: 1 }, // Открыто - непрозрачность равна 1
  }

  // Варианты анимации для боковой панели меню
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05, // Переход между дочерними элементами с задержкой в 0.05 секунд
        staggerDirection: -1, // Направление задержки перехода (в обратном порядке)
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2, // Переход между дочерними элементами с задержкой в 0.2 секунд
        staggerDirection: 1, // Направление задержки перехода (в прямом порядке)
      },
    },
  }

  useEffect(() => {
    // Если всплывающее окно открыто, устанавливаем zIndex и возвращаемся
    if (popupIsOpen) {
      setPopupZIndex(zIndex)
      return
    }

    // В противном случае, устанавливаем zIndex в '-1' через 1 секунду
    const timerId = setTimeout(() => setPopupZIndex('-1'), 1000)

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timerId)
  }, [popupIsOpen, zIndex])

  // Возвращаем значения для использования в компоненте
  return { popupZIndex, itemVariants, sideVariants }
}
