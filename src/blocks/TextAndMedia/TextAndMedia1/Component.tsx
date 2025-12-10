/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { TextAndMedia as TextAndMediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import useMediaQuery from '@/hooks/useMediaQuery'

type Props = TextAndMediaType & {
  className?: string
}

export const TextAndMedia1: React.FC<Props> = ({
  heading,
  description,
  items,
  mediaGallery,
  links,
  anchor,
  spacing,
  visibility,
  className,
  direction = 'right', // Default to right if not specified
}) => {
  if (!visibility) return null

  const spacingClasses = {
    none: 'py-0',
    small: 'py-6 md:py-8 lg:py-10',
    default: 'py-10 sm:py-12 md:py-16 lg:py-20',
  }[spacing ?? 'default']

  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <section
      id={anchor || undefined}
      className={cn(`w-full ${spacingClasses} bg-beige`, className)}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div
          className={`flex flex-col md:flex-row md:gap-8 lg:gap-16 xl:gap-24 ${direction === 'left' ? 'md:flex-row-reverse' : ''}`}
        >
          {/* Left Column (for desktop) or Mobile Column */}
          <div className="md:w-1/2 flex flex-col justify-center py-8 md:py-10 lg:py-12">
            {isDesktop ? (
              <>
                {heading && (
                  <div className="mb-3 sm:mb-4 text-[#1F1F1F]">
                    <RichText data={heading} />
                  </div>
                )}

                {description && (
                  <div className="font-normal text-[16px] leading-[160%] tracking-[0.02em] mb-5 max-w-xl text-[#1F1F1F]/80">
                    {description}
                  </div>
                )}

                {items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 sm:gap-5 mb-4">
                    {item.icon && typeof item.icon === 'object' && (
                      <div className="w-[60px] h-[60px] flex-shrink-0 bg-[#1F1F1F14] rounded-xl p-2 sm:p-3 flex items-center justify-center">
                        <Image
                          src={item.icon.url!}
                          alt={item.icon.alt || ''}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-gray-900">{item.title}</h3>
                      {item.description && (
                        <div className="font-normal text-[16px] leading-[100%] tracking-[0.02em] text-[#1F1F1F]/80 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {links && links.length > 0 && (
                  <div className="mt-2">
                    {links.map(({ link }, i) => (
                      <div key={i} className="mb-3 sm:mb-4">
                        <CMSLink {...link} size={'default'} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Mobile View Order */
              <div className="flex flex-col items-center text-center">
                {mediaGallery?.mobileMedia && typeof mediaGallery.mobileMedia === 'object' && (
                  <div className="relative rounded-xl overflow-hidden mb-6 mx-auto w-full max-w-[320px] sm:max-w-[450px] aspect-[9/11]">
                    <Image
                      src={mediaGallery.mobileMedia.url!}
                      alt={mediaGallery.mobileMedia.alt || ''}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 320px, 450px"
                    />
                  </div>
                )}

                {heading && (
                  <div className="text-2xl sm:text-3xl leading-tight mb-3 sm:mb-4 text-center w-full">
                    <RichText data={heading} />
                  </div>
                )}

                {description && (
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl text-center mx-auto">
                    {description}
                  </p>
                )}

                {items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-2 sm:gap-3 mb-5 sm:mb-6 w-full"
                  >
                    {item.icon && typeof item.icon === 'object' && (
                      <div className="w-[60px] h-[60px] flex-shrink-0 bg-[#1F1F1F14] rounded-xl p-2 sm:p-3 flex items-center justify-center">
                        <Image
                          src={item.icon.url!}
                          alt={item.icon.alt || ''}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {links && links.length > 0 && (
                  <div className="mt-6 sm:mt-8 w-full flex flex-col items-center">
                    {links.map(({ link }, i) => (
                      <div key={i} className="mb-3">
                        <CMSLink {...link} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Desktop Image */}
          {isDesktop && (
            <div className="md:w-1/2 relative flex justify-center items-center">
              {mediaGallery?.desktopMedia && typeof mediaGallery.desktopMedia === 'object' && (
                <div className="relative overflow-hidden w-full aspect-[9/11] rounded-xl">
                  <Image
                    src={mediaGallery.desktopMedia.url!}
                    alt={mediaGallery.desktopMedia.alt || ''}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TextAndMedia1
