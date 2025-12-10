import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'
import React from 'react'

import ScrollToTop from '@/components/ui/srcolltotop'
import { getStaticGlobal } from '@/data/staticData'
import type { SiteSetting } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Load site settings from static data
  const siteSettings = getStaticGlobal<SiteSetting>('site-settings')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers initialSiteSettings={siteSettings}>
          <Header />
          {children}
          <Footer />
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
