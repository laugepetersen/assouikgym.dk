'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { usePathname } from 'next/navigation'

// Helper function to get URL from link object

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openSubMenu, setOpenSubMenu] = React.useState<number | null>(null)
  const pathname = usePathname()

  const toggleSubMenu = (index: number, e: React.MouseEvent) => {
    // Prevent the click from navigating when toggling the submenu
    e.stopPropagation()
    setOpenSubMenu(openSubMenu === index ? null : index)
  }

  // Improved function to check if a link is active
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLinkActive = (link: any) => {
    if (!link) return false

    // Get the actual URL from the link object based on its type
    let href = ''
    if (link.type === 'custom' && link.url) {
      href = link.url
    } else if (link.type === 'reference' && link.reference) {
      // For reference links, we need to use the slug
      // This assumes pages and posts have slugs
      if (link.reference.value && typeof link.reference.value !== 'number') {
        href = `/${link.reference.value.slug || ''}`
      }
    }

    if (!href) return false

    // Clean up URLs for comparison
    const currentPath = pathname.replace(/\/$/, '')
    const linkPath = href.replace(/^https?:\/\/[^\/]+/, '').replace(/\/$/, '')

    // Check for exact match or if the current path starts with the link path
    return currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))
  }

  return (
    <nav className="flex flex-col w-full lg:flex-row lg:items-center lg:justify-center lg:gap-5 xl:gap-6">
      {navItems.map((item, i) => {
        const hasSubMenu = item.subMenu && item.subMenu.length > 0
        const isSubMenuOpen = openSubMenu === i
        const isActive = isLinkActive(item.link)

        return (
          <div key={i} className="relative w-full lg:w-auto group">
            {/* Main navigation item */}
            <div className="flex items-center justify-between py-2 lg:py-0 cursor-pointer">
              {/* Always render the CMSLink for both items with and without submenus */}
              <div className="flex-grow lg:flex-grow-0">
                <CMSLink
                  {...item.link}
                  className={cn(
                    'relative inline-block z-[60] transition-colors text-left lg:text-center',
                    isActive
                      ? 'text-brand'
                      : 'text-white/80 hover:text-white hover:after:w-full after:content-[""] after:block after:w-0 after:h-px after:bg-white after:transition-all after:duration-300',
                  )}
                />
              </div>

              {/* Dropdown arrow - only show for items with submenus */}
              {hasSubMenu && (
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200 ml-2',
                    isActive ? 'text-brand' : 'text-white text-opacity-80',
                    isSubMenuOpen && 'rotate-180',
                  )}
                  onClick={(e) => toggleSubMenu(i, e)}
                />
              )}
            </div>

            {/* Desktop submenu - only visible on lg screens and above */}
            {hasSubMenu && (
              <div
                className={cn(
                  'hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-4 min-w-[220px] opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-[60]',
                )}
              >
                <div className="bg-black border border-gray-800 shadow-xl rounded-md overflow-hidden">
                  {item.subMenu?.map((subItem, j) => {
                    const isSubItemActive = isLinkActive(subItem.link)

                    return (
                      <div key={j} className="hover:bg-neutral-800 transition-colors text-center">
                        <div className="px-4 py-3">
                          <CMSLink
                            {...subItem.link}
                            className={cn(
                              'inline-block transition-colors relative',
                              isSubItemActive
                                ? 'text-brand'
                                : 'text-white/80 hover:text-white hover:after:w-full after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300',
                            )}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Mobile/Tablet submenu - visible on smaller screens including iPad */}
            {hasSubMenu && isSubMenuOpen && (
              <div className="block lg:hidden bg-neutral-900 w-full z-[60] relative mb-2">
                {item.subMenu?.map((subItem, j) => {
                  const isSubItemActive = isLinkActive(subItem.link)

                  return (
                    <div key={j} className="hover:bg-neutral-800 transition-colors">
                      <div className="px-4 py-2">
                        <CMSLink
                          {...subItem.link}
                          className={cn(
                            'inline-block transition-colors relative',
                            isSubItemActive
                              ? 'text-brand'
                              : 'text-white/80 hover:text-white hover:after:w-full after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300',
                          )}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
