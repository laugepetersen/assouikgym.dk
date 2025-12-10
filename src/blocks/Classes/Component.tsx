/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import type React from 'react'
import Image from 'next/image'
import type { ClassesBlock as ClassesBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

// Define a type for populated and unpopulated class data
type ClassWithPopulatedValues = {
  id: string | number
  title?: string
  image?:
    | {
        url: string
        alt?: string
      }
    | string
  ageRequirement?: string
  price?: string
  description?: string
  links?: Array<{
    link?: {
      text?: string
      url?: string
      style?: string
      [key: string]: any
    }
  }>
}

type Props = Omit<ClassesBlockType, 'classes'> & {
  className?: string
  classes?: Array<ClassWithPopulatedValues | string | number>
}

export const ClassesBlock: React.FC<Props> = ({
  classes = [],
  anchor,
  spacing,
  visibility,
  className,
  showButton = false,
  link,
  heading,
}) => {
  if (!visibility) return null

  const spacingClasses = {
    none: 'py-0',
    small: 'py-6 md:py-8 lg:py-10',
    default: 'py-10 sm:py-12 md:py-16 lg:py-20',
  }[spacing ?? 'default']

  // Check if classes is populated and has items
  if (!classes || !Array.isArray(classes) || classes.length === 0) return null

  return (
    <section
      id={anchor || undefined}
      className={cn(`w-full ${spacingClasses} bg-beige`, className)}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-full">
          {heading && (
            <h2 className="max-w-[540px] text-[36px] font-semibold leading-[120%] tracking-[2%] mb-6 text-left font-[Clash Grotesk] text-[#1F1F1F]">
              {heading}
            </h2>
          )}
          <hr className="border-gray-200 my-8" />

          {/* Wrap the classes list in a relative container for button positioning */}
          <div className="relative">
            <div className="grid grid-cols-1">
              {classes.map((classItem, index) => {
                // Handle both populated and unpopulated relationship data
                const item: ClassWithPopulatedValues =
                  typeof classItem === 'object' ? classItem : { id: classItem }

                // Extract image URL
                const imageUrl = item.image
                  ? typeof item.image === 'object'
                    ? item.image.url
                    : ''
                  : ''

                // Extract image alt text
                const imageAlt =
                  item.image && typeof item.image === 'object' && item.image.alt
                    ? item.image.alt
                    : item.title || ''

                return (
                  <div key={item.id} className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {item.image && (
                        <div className="overflow-hidden rounded-xl sm:col-span-1">
                          <Image
                            src={imageUrl}
                            alt={imageAlt}
                            width={386}
                            height={217}
                            className="w-full h-56 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 386px"
                          />
                        </div>
                      )}

                      <div className="space-y-3 flex flex-col items-start justify-center sm:col-span-1">
                        <h4 className="text-[#1F1F1F]">{item.title || ''}</h4>
                        <div className="flex flex-row gap-2">
                          {item.ageRequirement && (
                            <span className="text-sm px-2 h-5 rounded-[8px] font-medium border border-gray-600 flex items-center">
                              {item.ageRequirement}
                            </span>
                          )}
                          {item.price && (
                            <span className="text-sm px-2 h-5 rounded-[8px] font-medium border border-gray-600 flex items-center">
                              {item.price}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-5 sm:col-span-2 md:col-span-2 lg:col-span-1">
                        {item.description && (
                          <p className="text-gray-700 leading-relaxed">{item.description}</p>
                        )}

                        <div className="flex flex-wrap gap-3">
                          {item.links &&
                            Array.isArray(item.links) &&
                            item.links.map((linkItem: { link?: any }, i: number) =>
                              linkItem.link ? (
                                <CMSLink key={i} {...linkItem.link} size={'sm'} />
                              ) : null,
                            )}
                        </div>
                      </div>
                    </div>
                    {index < classes.length - 1 && <hr className="border-gray-200 my-8" />}
                  </div>
                )
              })}
            </div>

            {/* Show CTA button if enabled, with the specified position and gradient */}
            {showButton && link && classes.length >= 1 && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-b from-transparent via-gray/90 to-beige pt-32 pb-8 sm:pt-40 md:pt-48">
                <CMSLink {...link} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClassesBlock
