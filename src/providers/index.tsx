import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SiteSettingsProvider } from './SiteSettings'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <SiteSettingsProvider>{children}</SiteSettingsProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
