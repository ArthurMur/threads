'use client'
import {
  $showQuickViewModal,
  $showSizeTable,
  closeQuickViewModal,
} from '@/context/modals'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import {
  closeSizeTableByCheck,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)

  // Обработчик закрытия модалки быстрого просмотра
  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }
  // Обработчик закрытия модалки размеров
  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  return (
    <html lang='ru'>
      <body>
        <Layout>{children}</Layout>
        <div
          className={`quick-view-modal-overlay ${
            showQuickViewModal ? 'overlay-active' : ''
          }`}
          onClick={handleCloseQuickViewModal}
        />
        <div
          className={`size-table-overlay ${
            showSizeTable ? 'overlay-active' : ''
          }`}
          onClick={handleCloseSizeTable}
        />
      </body>
    </html>
  )
}

export default PagesLayout
