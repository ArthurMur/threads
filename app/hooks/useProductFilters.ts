import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  $products,
  loadProductsByFilter,
  loadProductsByFilterFx,
} from '@/context/goods'
import {
  checkOffsetParam,
  getSearchParamsUrl,
  updateSearchParam,
} from '@/lib/utils/common'
import { SearchParams } from '@/../types/catalog'
import styles from '@/../styles/catalog/index.module.scss'

// Хук для работы с фильтрами продуктов
export const useProductFilters = (
  searchParams: SearchParams, // Параметры поиска
  category: string, // Категория продуктов
  isCatalog = false // Флаг, указывающий, является ли страница каталогом
) => {
  const products = useUnit($products) // Получение текущих продуктов из состояния
  const isValidOffset = checkOffsetParam(searchParams.offset) // Проверка валидности смещения
  const pagesCount = Math.ceil((products.count || 12) / 12) // Вычисление количества страниц
  const [currentPage, setCurrentPage] = useState(
    // Состояние текущей страницы
    isValidOffset ? +(searchParams.offset || 0) : 0
  )
  const pathname = usePathname() // Получение пути URL
  const productsSpinner = useUnit(loadProductsByFilterFx.pending) // Состояние загрузки продуктов

  useEffect(() => {
    const urlParams = getSearchParamsUrl() // Получение параметров URL

    urlParams.delete('offset') // Удаление параметра "offset" из URL

    // Если смещение невалидно, загружаем продукты с начала списка
    if (!isValidOffset) {
      loadProductsByFilter({
        limit: 12,
        offset: 0,
        additionalParam: urlParams.toString(),
        isCatalog,
        category,
      })

      // Обновляем параметр "offset" в URL и устанавливаем текущую страницу на первую
      updateSearchParam('offset', 0, pathname)
      setCurrentPage(0)
      return
    }

    // Загрузка продуктов с учетом текущего смещения
    loadProductsByFilter({
      limit: 12 * +(searchParams.offset || 0) + 12,
      offset: +(searchParams.offset || 0) * 12,
      additionalParam: urlParams.toString(),
      isCatalog,
      category,
    })

    setCurrentPage(+(searchParams.offset || 0))
  }, []) // Выполняем эффект только при монтировании компонента

  // Обработчик изменения номера страницы
  const handlePageChange = ({ selected }: { selected: number }) => {
    // Получение параметров поиска из URL
    const urlParams = getSearchParamsUrl()

    // Удаление параметра "offset" из URL
    urlParams.delete('offset')

    // Загрузка товаров в соответствии с фильтром
    loadProductsByFilter({
      // Установка лимита товаров на страницу
      limit: 12 * selected + 12,
      // Установка смещения для выборки товаров
      offset: selected * 12,
      // Добавление дополнительных параметров в URL
      additionalParam: urlParams.toString(),
      // Указание, что загрузка товаров происходит в каталоге
      isCatalog,
      // Указание категории товаров
      category,
    })

    // Обновление параметра "offset" в URL
    updateSearchParam('offset', selected, pathname)
    // Установка номера текущей страницы
    setCurrentPage(selected)
  }

  const handleApplyFiltersWithCategory = (categoryType: string) => {
    updateSearchParam('type', categoryType, pathname)
    handlePageChange({ selected: 0 })
  }

  // Конфигурация пагинации
  const paginationProps = {
    containerClassName: `list-reset ${styles.catalog__bottom__list}`, // Классы для контейнера пагинации
    pageClassName: `catalog-pagination-item ${styles.catalog__bottom__list__item}`, // Классы для элементов страницы
    pageLinkClassName: styles.catalog__bottom__list__item__link, // Классы для ссылок на страницы
    // Классы для кнопки "предыдущая страница"
    previousClassName: `catalog-pagination-prev ${styles.catalog__bottom__list__prev}`,
    // Классы для кнопки "следующая страница"
    nextClassName: `catalog-pagination-next ${styles.catalog__bottom__list__next}`,
    breakClassName: styles.catalog__bottom__list__break, // Классы для разделителя страниц
    breakLinkClassName: styles.catalog__bottom__list__break__link, // Классы для ссылки в разделителе страниц
    breakLabel: '...', // Текст разделителя
    pageCount: pagesCount, // Общее количество страниц
    forcePage: currentPage, // Текущая страница
  }

  return {
    paginationProps,
    products,
    pagesCount,
    productsSpinner,
    handlePageChange,
    handleApplyFiltersWithCategory,
  }
}
