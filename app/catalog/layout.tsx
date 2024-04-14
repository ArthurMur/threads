import styles from '@/../styles/catalog/index.module.scss'

export const metadata = {
  title: 'thread | Каталог',
}

const CatalogLayout = ({ children }: { children: React.ReactNode }) => (
  <main>
    <section className={styles.catalog}>
      <div className='container'>{children}</div>
    </section>
  </main>
)

export default CatalogLayout
