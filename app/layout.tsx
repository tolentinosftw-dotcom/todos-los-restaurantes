import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard de Menus Digitales',
  description: 'Plataforma editable para crear usuarios de restaurantes y administrar menus digitales bilingues.',
  generator: 'Codex',
  icons: {
    icon: [
      {
        url: '/placeholder-logo.png',
        type: 'image/png'
      }
    ],
    shortcut: '/placeholder-logo.png',
    apple: '/placeholder-logo.png'
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
