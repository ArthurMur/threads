import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useUnit } from 'effector-react'
import { loadProductsByFilterFx } from '@/context/goods'
import { ISelectItemProps } from '@/../types/catalog'
import styles from '@/../styles/catalog/index.module.scss'

const SelectItem = ({
  isActive,
  mobileClassName,
  item,
  setOption,
}: ISelectItemProps) => {
  const spinner = useUnit(loadProductsByFilterFx.pending)

  // Обработчик выбора опции фильтра
  const handleSelectOption = () => {
    // Если фильтр уже активен, прекращаем выполнение функции
    if (isActive) {
      return
    }

    // Установка выбранной опции фильтра
    setOption(item.title)
    // Вызов функции-обработчика фильтра
    item.filterHandler()
  }

  return (
    <li
      className={`${styles.catalog__filters__list__item} ${
        spinner ? '' : isActive ? styles.option_active : ''
      } ${mobileClassName || ''}`}
    >
      {spinner && isActive && (
        <span
          className={`${styles.catalog__filters__list__item__spinner} ${mobileClassName}`}
        >
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        </span>
      )}
      <button
        onClick={handleSelectOption}
        className={`btn-reset ${styles.catalog__filters__list__item__btn}`}
      >
        {item.title}
      </button>
    </li>
  )
}

export default SelectItem
