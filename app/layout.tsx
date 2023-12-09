'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/structure/navbar'
import Providers from './providers'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Dance Heroes',
//   description: 'Build your dancing team on the blockchain',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://pixijs.download/release/pixi.js"></Script>
      </head>
      <body className={inter.className}>
        <div className="pr-[10%] pl-[10%]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
