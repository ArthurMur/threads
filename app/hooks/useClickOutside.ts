import { MutableRefObject, useEffect, useRef, useState } from 'react'

// Хук для отслеживания клика вне элемента
export const useClickOutside = () => {
  // Создание ссылки на элемент
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  // Состояние для хранения значения, открыт ли элемент
  const [open, setOpen] = useState(false)

  // Функция для переключения состояния элемента
  const toggle = () => setOpen(!open)

  // Эффект для отслеживания клика вне элемента
  useEffect(() => {
    // Обработчик клика вне элемента
    const handleClickOutside = (e: MouseEvent) => {
      // Если клик произошел вне элемента, закрываем его
      if (!ref.current.contains(e.target as HTMLDivElement)) {
        setOpen(false)
      }
    }

    // Добавление обработчика клика на документ
    document.addEventListener('mousedown', handleClickOutside)

    // Удаление обработчика клика при размонтировании компонента
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  // Возвращаем значения и функции для работы с элементом
  return { open, setOpen, toggle, ref }
}
