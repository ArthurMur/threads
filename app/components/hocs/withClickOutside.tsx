'use client'

import {
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IWrappedComponentProps } from '@/../types/hocs'

export function withClickOutside( // Экспорт функции-обертки withClickOutside
  WrappedComponent: ForwardRefExoticComponent<
    // Объявление обернутого компонента
    IWrappedComponentProps & RefAttributes<HTMLDivElement> // Принимаемые свойства и ссылка на ref
  >
) {
  const Component = () => {
    // Объявление компонента
    const [open, setOpen] = useState(false) // Состояние открытости компонента
    const ref = useRef() as MutableRefObject<HTMLDivElement> // Создание ссылки на DOM-элемент

    /*добавляет слушателя события клика для всего документа.
    Когда происходит клик, проверяется, был ли он сделан внутри компонента.
    Если нет, то вызывается функция setOpen(false), чтобы закрыть компонент.*/
    useEffect(() => {
      // Эффект для обработки клика за пределами компонента
      const handleClickOutside = (e: MouseEvent) => {
        // Обработчик клика за пределами компонента
        if (!ref.current.contains(e.target as HTMLDivElement)) {
          // Проверка, что клик произошел вне компонента
          setOpen(false) // Закрытие компонента
        }
      }

      document.addEventListener('mousedown', handleClickOutside) // Добавление слушателя клика за пределами компонента

      // Удаление слушателя клика при размонтировании компонента
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref]) // Зависимость от изменений ссылки на DOM-элемент

    // Возвращение обернутого компонента с состоянием открытости и ссылкой на DOM-элемент
    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
  }

  return Component // Возвращение компонента
}
