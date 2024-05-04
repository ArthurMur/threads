import styles from '@/../styles/catalog/index.module.scss'
import CategorySelect from './CategorySelect'

export default function CatalogFilters() {
  return (
    <div className={styles.catalog__filters}>
      <div className={styles.catalog__filters__top}>
        <div className={styles.catalog__filters__top__left}>
          <CategorySelect />
        </div>
      </div>
    </div>
  )
}
