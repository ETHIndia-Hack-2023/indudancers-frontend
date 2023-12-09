import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/structure/navbar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dance Heroes',
  description: 'Build your dancing team on the blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://pixijs.download/release/pixi.js"></script>
      </head>
      <body className={inter.className}>
        <div className="pr-[10%] pl-[10%]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
