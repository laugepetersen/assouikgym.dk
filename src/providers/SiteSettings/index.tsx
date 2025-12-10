'use client'

import type { SiteSetting } from '@/payload-types'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

// Import static data - this will be loaded at build time
// We'll create a public JSON file that can be fetched
export const defaultSiteSettings: SiteSetting = {
  id: 0,
  typography: {
    heading1: {
      fontSize: '3rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    heading2: {
      fontSize: '2.5rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
    },
    heading3: {
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    heading4: {
      fontSize: '1.5rem',
      fontWeight: '500',
      lineHeight: '1.35',
      letterSpacing: '0.01em',
    },
    paragraph: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
  },
}

const SiteSettingsContext = createContext<SiteSetting>(defaultSiteSettings)

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}

export function SiteSettingsProvider({
  children,
  initialSettings,
}: {
  children: ReactNode
  initialSettings?: SiteSetting
}) {
  const [settings, setSettings] = useState<SiteSetting>(initialSettings || defaultSiteSettings)

  useEffect(() => {
    // Try to load from static JSON file if not provided as prop
    if (!initialSettings) {
      const loadSettings = async () => {
        try {
          const response = await fetch('/data/globals/site-settings.json')
          if (response.ok) {
            const data = await response.json()
            if (data) {
              setSettings(data)
            }
          }
        } catch (error) {
          console.error('Error loading site settings:', error)
          // Use defaults if loading fails
        }
      }
      loadSettings()
    }
  }, [initialSettings])

  const rootStyle = {
    // Font Family (shared across all typography - not in payload type, so we set it as a constant)
    '--font-family': 'Clash Grotesk, sans-serif',

    // Heading 1
    '--heading1-size': settings?.typography?.heading1?.fontSize || '3rem',
    '--heading1-weight': settings?.typography?.heading1?.fontWeight || '700',
    '--heading1-line-height': settings?.typography?.heading1?.lineHeight || '1.2',
    '--heading1-letter-spacing': settings?.typography?.heading1?.letterSpacing || '-0.02em',

    // Heading 2
    '--heading2-size': settings?.typography?.heading2?.fontSize || '2.5rem',
    '--heading2-weight': settings?.typography?.heading2?.fontWeight || '600',
    '--heading2-line-height': settings?.typography?.heading2?.lineHeight || '1.25',
    '--heading2-letter-spacing': settings?.typography?.heading2?.letterSpacing || '-0.01em',

    // Heading 3
    '--heading3-size': settings?.typography?.heading3?.fontSize || '2rem',
    '--heading3-weight': settings?.typography?.heading3?.fontWeight || '600',
    '--heading3-line-height': settings?.typography?.heading3?.lineHeight || '1.3',
    '--heading3-letter-spacing': settings?.typography?.heading3?.letterSpacing || '0',

    // Heading 4
    '--heading4-size': settings?.typography?.heading4?.fontSize || '1.5rem',
    '--heading4-weight': settings?.typography?.heading4?.fontWeight || '500',
    '--heading4-line-height': settings?.typography?.heading4?.lineHeight || '1.4',
    '--heading4-letter-spacing': settings?.typography?.heading4?.letterSpacing || '0',

    // Paragraph (body text)
    '--body-size': settings?.typography?.paragraph?.fontSize || '1rem',
    '--body-weight': settings?.typography?.paragraph?.fontWeight || '400',
    '--body-line-height': settings?.typography?.paragraph?.lineHeight || '1.6',
    '--body-letter-spacing': settings?.typography?.paragraph?.letterSpacing || '0',

    // Brand colors (for button gradients)
    '--brand-start': settings?.colors?.brandGradient?.start || '#FFEE03',
    '--brand-end': settings?.colors?.brandGradient?.end || '#FFBF01',
    '--black-start': settings?.colors?.blackGradient?.start || '#2F2F2F',
    '--black-end': settings?.colors?.blackGradient?.end || '#000000',
  } as React.CSSProperties

  return (
    <SiteSettingsContext.Provider value={settings}>
      <div style={rootStyle}>{children}</div>
    </SiteSettingsContext.Provider>
  )
}
