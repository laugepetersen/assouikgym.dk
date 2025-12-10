import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'
import React from 'react'

import ScrollToTop from '@/components/ui/srcolltotop'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}

const getMetadataBase = (): URL => {
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return new URL(process.env.NEXT_PUBLIC_SERVER_URL)
  }
  return new URL('http://localhost:3000')
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
