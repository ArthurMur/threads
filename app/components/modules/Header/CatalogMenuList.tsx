import { motion } from 'framer-motion'
import Link from 'next/link'

const CatalogMenuList = ({ items }: { items: string[] }) => (
  <motion.ul // Элемент списка с анимацией
    initial={{ opacity: 0 }} // Начальное состояние анимации
    animate={{ opacity: 1 }} // Анимированное состояние
    exit={{ opacity: 0 }} // Состояние при исчезновении
    className='list-reset nav-menu__accordion'
  >
    {items.map((title, i) => (
      <li
        key={i}
        className='nav-menu__accordion__item__list__item catalog__accordion__item__list__item'
        style={{ position: 'relative' }}
      >
        <Link // Компонент для создания ссылок
          href='/catalog'
          className='nav-menu__accordion__item__list__item__link'
        >
          {title}
        </Link>
      </li>
    ))}
  </motion.ul>
)

export default CatalogMenuList
