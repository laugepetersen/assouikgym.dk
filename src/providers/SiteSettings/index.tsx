// providers/SiteSettings/index.tsx
'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface SiteSettings {
  typography?: {
    heading1?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
    heading2?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
    heading3?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
    heading4?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
    paragraph?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
    small?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
    buttonText?: {
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
      lineHeight?: string
      letterSpacing?: string
    }
  }
  colors?: {
    brandGradient?: { start?: string; end?: string }
    blackGradient?: { start?: string; end?: string }
    black?: string
    textSecondary?: string
    white?: string
    textSecondaryInversed?: string
    beige?: string
  }
}

// Define default settings here
export const defaultSiteSettings: SiteSettings = {
  typography: {
    heading1: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '3rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    heading2: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '2.5rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
    },
    heading3: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.3',
      letterSpacing: '0',
    },
    heading4: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '1.5rem',
      fontWeight: '500',
      lineHeight: '1.35',
      letterSpacing: '0.01em',
    },
    paragraph: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    small: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.6',
      letterSpacing: '0.01em',
    },
    buttonText: {
      fontFamily: 'Clash Grotesk, sans-serif',
      fontSize: '1rem',
      fontWeight: '600',
      lineHeight: '1.5',
      letterSpacing: '0.025em',
    },
  },
  colors: {
    brandGradient: { start: '#FFEE03', end: '#FFBF01' },
    blackGradient: { start: '#2F2F2F', end: '#000000' },
    black: '#1F1F1F',
    textSecondary: 'rgba(31, 31, 31, 0.8)',
    white: '#FFFFFF',
    textSecondaryInversed: 'rgba(255, 255, 255, 0.8)',
    beige: '#F5F1EE',
  },
}

const SiteSettingsContext = createContext<SiteSettings>(defaultSiteSettings)

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/globals/site-settings')
        if (!response.ok) throw new Error('Failed to fetch settings')

        const data = await response.json()
        if (data) {
          setSettings(data)
        }
      } catch (error) {
        console.error('Error fetching site settings:', error)
      }
    }

    fetchSettings()
  }, [])

  const rootStyle = {
    // Font Family (shared across all typography)
    '--font-family': settings?.typography?.heading1?.fontFamily || 'Clash Grotesk, sans-serif',

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
    '--heading4-line-height': settings?.typography?.heading4?.lineHeight || '1.35',
    '--heading4-letter-spacing': settings?.typography?.heading4?.letterSpacing || '0.01em',

    // Paragraph
    '--paragraph-size': settings?.typography?.paragraph?.fontSize || '1rem',
    '--paragraph-weight': settings?.typography?.paragraph?.fontWeight || '400',
    '--paragraph-line-height': settings?.typography?.paragraph?.lineHeight || '1.5',
    '--paragraph-letter-spacing': settings?.typography?.paragraph?.letterSpacing || '0',

    // Small Text
    '--small-size': settings?.typography?.small?.fontSize || '0.875rem',
    '--small-weight': settings?.typography?.small?.fontWeight || '400',
    '--small-line-height': settings?.typography?.small?.lineHeight || '1.6',
    '--small-letter-spacing': settings?.typography?.small?.letterSpacing || '0.01em',

    // Button Text
    '--button-text-size': settings?.typography?.buttonText?.fontSize || '1rem',
    '--button-text-weight': settings?.typography?.buttonText?.fontWeight || '600',
    '--button-text-line-height': settings?.typography?.buttonText?.lineHeight || '1.5',
    '--button-text-letter-spacing': settings?.typography?.buttonText?.letterSpacing || '0.025em',

    // Colors (unchanged)
    '--brand-start': settings?.colors?.brandGradient?.start || '#FFEE03',
    '--brand-end': settings?.colors?.brandGradient?.end || '#FFBF01',
    '--black-start': settings?.colors?.blackGradient?.start || '#2F2F2F',
    '--black-end': settings?.colors?.blackGradient?.end || '#000000',
    '--black': settings?.colors?.black || '#1F1F1F',
    '--text-secondary': settings?.colors?.textSecondary || 'rgba(31, 31, 31, 0.8)',
    '--white': settings?.colors?.white || '#FFFFFF',
    '--text-secondary-inversed':
      settings?.colors?.textSecondaryInversed || 'rgba(255, 255, 255, 0.8)',
    '--beige': settings?.colors?.beige || '#F5F1EE',

    // Derived values
    '--brand-gradient': `linear-gradient(45deg, var(--brand-start), var(--brand-end))`,
    '--black-gradient': `linear-gradient(45deg, var(--black-start), var(--black-end))`,
    '--background-color': settings?.colors?.white || '#FFFFFF',
    '--text-color': settings?.colors?.black || '#1F1F1F',
  } as React.CSSProperties

  return (
    <SiteSettingsContext.Provider value={settings}>
      <div style={rootStyle}>{children}</div>
    </SiteSettingsContext.Provider>
  )
}
