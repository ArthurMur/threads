import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { useLang } from './useLang'
import { getSearchParamsUrl } from '@/lib/utils/common'
import { $catalogCategoryOptions } from '@/context/catalog'

// Хук для работы с фильтром категорий товаров
export const useCategoryFilter = () => {
  // Получение текущего языка и переводов
  const { lang, translations } = useLang()
  // Получение опций фильтра категорий товаров из глобального состояния
  const catalogCategoryOptions = useUnit($catalogCategoryOptions)
  // Состояние для хранения выбранной опции фильтра
  const [option, setOption] = useState('')
  // Получение текущих опций фильтра категорий товаров
  const currentOptions = Object.values(catalogCategoryOptions)[0]
  // Получение заголовка опции "Все категории"
  const allCategoriesTitle = translations[lang].catalog.all_categories

  // Обработчик выбора опции "Все категории"
  const handleSelectAllCategories = () => setOption(allCategoriesTitle)

  // Эффект для установки выбранной опции фильтра при изменении языка
  useEffect(() => {
    // Получение параметров поиска из URL
    const urlParams = getSearchParamsUrl()
    // Получение параметра "type" из URL
    const typeParam = urlParams.get('type')

    // Если параметр "type" существует, устанавливаем выбранную опцию фильтра
    if (typeParam) {
      setOption(
        (translations[lang].comparison as { [index: string]: string })[
          typeParam
        ]
      )
    }
  }, [lang, translations])

  // Возвращаем функции и значения для работы с фильтром категорий товаров
  return {
    handleSelectAllCategories,
    currentOptions,
    option,
    setOption,
    catalogCategoryOptions,
    allCategoriesTitle,
  }
}
