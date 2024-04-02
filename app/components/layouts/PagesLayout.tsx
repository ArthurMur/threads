'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Next13ProgressBar } from 'next13-progressbar'
import { EarthoOneProvider } from '@eartho/one-client-react'
import {
  $showQuickViewModal,
  $showSizeTable,
  closeQuickViewModal,
} from '@/context/modals'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import {
  closeSizeTableByCheck,
  handleCloseAuthPopup,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import { $openAuthPopup } from '@/context/auth'
import CookieAlert from '../modules/CookieAlert/CookieAlert'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)
  const openAuthPopup = useUnit($openAuthPopup)

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=Thread')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])

  useEffect(() => setIsClient(true), [])

  // Обработчик закрытия модалки быстрого просмотра
  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }
  // Обработчик закрытия модалки размеров
  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  return (
    <>
      {isClient ? (
        <EarthoOneProvider
          clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
        >
          <html lang='ru'>
            <body>
              <Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
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
              <div
                className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''}`}
                onClick={handleCloseAuthPopup}
              />
              {cookieAlertOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='cookie-popup'
                >
                  <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
                </motion.div>
              )}
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      ) : (
        <html lang='en'>
          <body>
            <></>
          </body>
        </html>
      )}
    </>
  )
}

export default PagesLayout
