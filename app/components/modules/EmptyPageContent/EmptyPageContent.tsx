import { IEmptyPageContentProps } from '@/../types/modules'
import ContentLinks from './ContentLinks'
import ContentTitle from './ContentTitle'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/../styles/empty-content/index.module.scss'

const EmptyPageContent = ({
  subtitle,
  description,
  bgClassName,
}: IEmptyPageContentProps) => {
  const { lang, translations } = useLang()
  const isMedia950 = useMediaQuery(950)
  const isMedia500 = useMediaQuery(500)

  return (
    <div className={styles.empty_content}>
      {isMedia950 && <ContentTitle />}
      <div className={`${styles.empty_content__bg} ${bgClassName}`} />
      <div className={styles.empty_content__inner}>
        <span className={styles.empty_content__word}>
          {translations[lang].common.empty}
        </span>
        {!isMedia950 && <ContentTitle />}
        <div className={styles.empty_content__subtitle}>{subtitle}</div>
        <div className={styles.empty_content__description}>{description}</div>
        {!isMedia500 && <ContentLinks />}
      </div>
      {isMedia500 && <ContentLinks />}
    </div>
  )
}

export default EmptyPageContent
