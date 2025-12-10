import type { SiteSetting } from '@/payload-types'
import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { SiteSettingsProvider } from './SiteSettings'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
  initialSiteSettings?: SiteSetting | null
}> = ({ children, initialSiteSettings }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <SiteSettingsProvider initialSettings={initialSiteSettings || undefined}>
          {children}
        </SiteSettingsProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
