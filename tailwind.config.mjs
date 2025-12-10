import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      screens: {
        tablet: '640px',
        'tablet-landscape': {
          raw: '(min-width: 768px) and (max-width: 1023px) and (orientation: landscape)',
        },
        'tablet-portrait': {
          raw: '(min-width: 640px) and (max-width: 767px), (min-width: 768px) and (max-width: 1023px) and (orientation: portrait)',
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Updated color palette based on new SiteSettings
        brand: {
          DEFAULT: 'var(--brand-color)',
          gradient: 'var(--brand-gradient)',
        },
        black: {
          DEFAULT: 'var(--black)',
          gradient: 'var(--black-gradient)',
        },
        white: {
          DEFAULT: 'var(--white)',
        },
        beige: {
          DEFAULT: 'var(--beige)',
        },
        text: {
          DEFAULT: 'var(--black)',
          secondary: 'var(--text-secondary)',
          inversed: 'var(--white)',
          secondaryInversed: 'var(--text-secondary-inversed)',
        },
        background: 'var(--background-color)',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'var(--text-color)',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'var(--black)',
          foreground: 'var(--white)',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'var(--beige)',
          foreground: 'var(--black)',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-family)'],
        heading: ['var(--font-family)'],
        paragraph: ['var(--font-family)'],
        button: ['var(--font-family)'],
      },
      fontSize: {
        // Custom font sizes to match our typography settings
        'heading-1': 'var(--heading1-size)',
        'heading-2': 'var(--heading2-size)',
        'heading-3': 'var(--heading3-size)',
        'heading-4': 'var(--heading4-size)',
        paragraph: 'var(--paragraph-size)',
        small: 'var(--small-size)',
        button: 'var(--button-text-size)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({}) => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--black)',
              '--tw-prose-headings': 'var(--black)',
              fontFamily: 'var(--font-family)',
              h1: {
                fontWeight: 'var(--font-weight)',
                marginBottom: '0.25em',
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--heading1-size)',
              },
              h2: {
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--heading2-size)',
                fontWeight: 'var(--font-weight)',
              },
              h3: {
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--heading3-size)',
                fontWeight: 'var(--font-weight)',
              },
              h4: {
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--heading4-size)',
                fontWeight: 'var(--font-weight)',
              },
              p: {
                fontSize: 'var(--paragraph-size)',
                lineHeight: 'var(--line-height)',
              },
              small: {
                fontSize: 'var(--small-size)',
              },
              '.button-text': {
                fontSize: 'var(--button-text-size)',
                fontWeight: 'var(--font-weight)',
              },
            },
          ],
        },
        // Simplified typography variants
        base: {
          css: [
            {
              h1: {
                fontSize: 'var(--heading1-size)',
              },
              h2: {
                fontSize: 'var(--heading2-size)',
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: 'var(--heading1-size)',
              },
              h2: {
                fontSize: 'var(--heading2-size)',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
