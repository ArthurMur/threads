'use client'
import { useUnit } from 'effector-react'
import { showSizeTable, $showQuickViewModal } from '@/context/modals'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { ISelectedSizes } from '@/../types/common'
import { setSizeTableSizes } from '@/context/sizeTable'
import { useLang } from '@/hooks/useLang'

const ProductSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
  // Получаем текущий язык и переводы из хука useLang()
  const { lang, translations } = useLang()

  // Получаем состояние showQuickViewModal из хука useUnit()
  const showQuickViewModal = useUnit($showQuickViewModal)

  // Обработчик клика на кнопку, который добавляет overflow-hidden к body,
  // и устанавливает размеры для таблицы размеров
  const handleShowSizeTable = () => {
    if (!showQuickViewModal) {
      addOverflowHiddenToBody()
    }

    setSizeTableSizes({ sizes, type })
    showSizeTable()
  }

  // Возвращаем кнопку с обработчиком onClick
  return (
    <button
      className={`btn-reset ${className}`}
      onClick={handleShowSizeTable}
      aria-label='Size table'
    >
      {translations[lang].product.size_table}
    </button>
  )
}

export default ProductSizeTableBtn
