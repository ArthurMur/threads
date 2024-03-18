import { getWindowWidth } from '@/lib/utils/common'
import { useEffect, useState } from 'react'

// Хук для получения текущей ширины окна браузера
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth()) // Состояние для хранения текущей ширины окна

  // Обработчик изменения размера окна
  const handleResize = () => setWindowWidth(getWindowWidth())

  useEffect(() => {
    // Добавление слушателя события resize при монтировании компонента
    window.addEventListener('resize', handleResize, true)

    // Возвращение текущей ширины окна и обработчика изменения размера
    return () => window.removeEventListener('resize', handleResize, true)
  }, [])

  return { windowWidth, handleResize }
}

// Хук для определения медиа-запроса
export const useMediaQuery = (maxWidth: number) => {
  const {
    windowWidth: { windowWidth }, // Текущая ширина окна
    handleResize, // Обработчик изменения размера окна
  } = useWindowWidth()
  const [isMedia, setIsMedia] = useState(false) // Состояние для определения соответствия медиа-запросу

  useEffect(() => {
    // Проверка текущей ширины окна
    if (windowWidth <= maxWidth) {
      setIsMedia(true) // Установка флага, если ширина окна соответствует медиа-запросу
    } else {
      setIsMedia(false) // Сброс флага, если не соответствует
    }
  }, [handleResize, maxWidth, windowWidth]) // Зависимости для пересчёта при изменении ширины окна

  return isMedia // Возвращение значения соответствия медиа-запросу
}
