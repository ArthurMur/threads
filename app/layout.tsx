import type { Metadata } from 'next'
import PagesLayout from './components/layouts/PagesLayout'
import './globalStyles/normalize.css'
import './globalStyles/globals.scss'
import './globalStyles/header.scss'
import './globalStyles/menu.scss'
import './globalStyles/mobile-navbar.scss'
import './globalStyles/catalog-menu.scss'
import './globalStyles/search-modal.scss'
import './globalStyles/cart-popup.scss'
import './globalStyles/footer.scss'
import './globalStyles/slick-theme.scss'
import './globalStyles/slick.scss'

export const metadata: Metadata = {
  title: 'thread',
  description: 'Оnline clothing store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PagesLayout>{children}</PagesLayout>
}
