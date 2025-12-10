'use client'

import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderNav } from './Nav'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className="black-gradient-bg text-white rounded-xl fixed inset-x-0 top-0 z-[1000] px-4 py-2 mx-4 mt-4 h-[64px]">
        <div className="flex items-center justify-between h-full">
          {/* Left side: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logo priority />
            </Link>
            <div className="hidden lg:block">
              <HeaderNav data={data} />
            </div>
          </div>

          {/* Right side: Buttons (desktop) / Menu toggle (mobile) */}
          <div className="flex items-center gap-4">
            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {data.buttons?.links &&
                data.buttons.links.map(({ link }, idx) => (
                  <CMSLink key={idx} {...link} size={'sm'} />
                ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 w-full max-w-xs black-gradient-bg text-white shadow-2xl flex flex-col z-[1100] transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <button
          className="absolute top-4 right-4 p-2 text-white hover:text-brand focus:outline-none"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="pt-16 flex flex-col h-full px-6">
          <div className="flex-grow overflow-y-auto">
            <HeaderNav data={data} />
            {data.buttons?.links && data.buttons.links.length > 0 && (
              <div className="w-full flex flex-col items-center gap-4 pt-6">
                {data.buttons?.links?.map(({ link }, idx) => (
                  <div key={idx} className="w-full h-[48px]">
                    <CMSLink
                      {...link}
                      className="w-full h-full px-6 py-3 flex items-center justify-center text-[16px] tracking-[0.02em] rounded-[10px] transition-all"
                      size={'sm'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[900] lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
