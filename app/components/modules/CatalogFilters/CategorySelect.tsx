import { AnimatePresence } from 'framer-motion'
import { useCategoryFilter } from '@/hooks/useCategoryFilters'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import CategoryFilterList from './CategoryFilterList'
import styles from '@/../styles/catalog/index.module.scss'

const CategorySelect = () => {
  const { lang, translations } = useLang()
  const { open, ref, toggle } = useClickOutside()
  const {
    handleSelectAllCategories,
    currentOptions,
    option,
    setOption,
    allCategoriesTitle,
    catalogCategoryOptions,
  } = useCategoryFilter()

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <button
        className={`btn-reset ${styles.catalog__filters__btn} ${styles.bg_category} ${open ? styles.is_open : ''}`}
        onClick={toggle}
      >
        {option ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              {translations[lang].catalog.categories}
            </span>
            <span className={styles.catalog__filters__btn__info}>{option}</span>
          </span>
        ) : (
          translations[lang].catalog.categories
        )}
      </button>
      <AnimatePresence>
        {open && (
          <CategoryFilterList
            handleSelectAllCategories={handleSelectAllCategories}
            currentOptions={currentOptions}
            option={option}
            setOption={setOption}
            allCategoriesTitle={allCategoriesTitle}
            catalogCategoryOptions={catalogCategoryOptions}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default CategorySelect
