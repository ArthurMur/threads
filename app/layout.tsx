import type { Metadata } from 'next'
import './globalStyles/normalize.css'
import './globalStyles/globals.scss'
import './globalStyles/header.scss'
import './globalStyles/menu.scss'
import './globalStyles/mobile-navbar.scss'
import './globalStyles/catalog-menu.scss'
import Layout from './components/layouts/Layout'

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Оnline clothing store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
