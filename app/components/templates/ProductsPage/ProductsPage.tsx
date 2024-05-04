/* eslint-disable indent */
'use client'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import AOS from 'aos'
import { motion } from 'framer-motion'
import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/../types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import styles from '@/../styles/catalog/index.module.scss'
import skeletonStyles from '@/../styles/skeleton/index.module.scss'
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import 'aos/dist/aos.css'
import { useLang } from '@/hooks/useLang'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { setCatalogCategoryOptions } from '@/context/catalog'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters'

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const { lang, translations } = useLang()
  const {
    products,
    productsSpinner,
    paginationProps,
    handlePageChange,
    handleApplyFiltersWithCategory,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          catalogCategoryOptions: [
            {
              id: 2,
              title: translations[lang].main_menu.cloth,
              href: '/catalog/cloth',
            },
            {
              id: 3,
              title: translations[lang].main_menu.accessories,
              href: '/catalog/accessories',
            },
          ],
        })
        break
      case 'accessories':
        setCatalogCategoryOptions({
          accessoryCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.bags,
              filterHandler: () => handleApplyFiltersWithCategory('bags'),
            },
            {
              id: 2,
              title: translations[lang].comparison.caps,
              filterHandler: () => handleApplyFiltersWithCategory('caps'),
            },
            {
              id: 3,
              title: translations[lang].comparison.scarfs,
              filterHandler: () => handleApplyFiltersWithCategory('scarfs'),
            },
          ],
        })
        break
      case 'cloth':
        setCatalogCategoryOptions({
          clothCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison['t-shirts'],
              filterHandler: () => handleApplyFiltersWithCategory('t-shirts'),
            },
            {
              id: 2,
              title: translations[lang].comparison['long-sleeves'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('long-sleeves'),
            },
            {
              id: 3,
              title: translations[lang].comparison.hoodie,
              filterHandler: () => handleApplyFiltersWithCategory('hoodie'),
            },
          ],
        })
        break
      default:
        break
    }
    AOS.init()
  }, [lang])

  return (
    <>
      <HeadingWithCount
        count={products.count}
        title={
          (translations[lang].breadcrumbs as { [index: string]: string })[
            pageName
          ]
        }
        spinner={productsSpinner}
      />
      <CatalogFilters />
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
      {!productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__list}`}
        >
          {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}
      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>
          {translations[lang].common.nothing_is_found}
        </div>
      )}
      <div
        className={styles.catalog__bottom}
        data-aos='zoom-in'
        data-aos-duration='1000'
      >
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>{translations[lang].catalog.next_page}</span>}
          previousLabel={
            <span>{translations[lang].catalog.previous_page}</span>
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ProductsPage
