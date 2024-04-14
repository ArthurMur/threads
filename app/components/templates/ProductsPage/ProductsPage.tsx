/* eslint-disable indent */
'use client'
import ReactPaginate from 'react-paginate'
import { motion } from 'framer-motion'
import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/../types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import styles from '@/../styles/catalog/index.module.scss'
import skeletonStyles from '@/../styles/skeleton/index.module.scss'

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const { products, productsSpinner, paginationProps } = useProductFilters(
    searchParams,
    pageName,
    pageName === 'catalog'
  )

  console.log(products)

  return (
    <>
      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate {...paginationProps} />
      </div>
    </>
  )
}

export default ProductsPage
