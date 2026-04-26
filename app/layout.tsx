import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Constructor de Menú | Crepes & Waffles',
  description: 'Frontend editable para crear menús digitales con productos, precios, imágenes y diseño personalizable.',
  generator: 'Codex',
  icons: {
    icon: [
      {
        url: '/logo.webp',
        type: 'image/webp'
      }
    ],
    shortcut: '/logo.webp',
    apple: '/logo.webp'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
