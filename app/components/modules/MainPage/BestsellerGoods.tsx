import { useUnit } from 'effector-react'
import { $bestsellerProducts } from '@/context/goods'
import { useLang } from '@/hooks/useLang'
import MainPageSection from './MainPageSection'
import { getBestsellerProductsFx } from '@/../api/main-page'

const BestsellerGoods = () => {
  const goods = useUnit($bestsellerProducts)
  const spinner = useUnit(getBestsellerProductsFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.bestsellers_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default BestsellerGoods
