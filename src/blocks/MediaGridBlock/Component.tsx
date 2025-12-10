import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import type { MediaGridBlock as MediaGridBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { CMSLink } from '@/components/Link'

type Props = MediaGridBlockProps & {
  className?: string
}

export const MediaGridBlock: React.FC<Props> = (props) => {
  const { className, items, anchor, spacing, visibility } = props

  // Return null if visibility is false
  if (!visibility) return null

  // Return null if no items
  if (!items || items.length === 0) {
    return null
  }

  const spacingClasses = {
    none: 'py-0',
    small: 'py-6 md:py-8 lg:py-10',
    default: 'py-10 sm:py-12 md:py-16 lg:py-20',
  }[spacing ?? 'default']

  return (
    <section
      id={anchor || undefined}
      className={cn(`w-full ${spacingClasses} bg-beige`, className)}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            if (!item) return null

            const { image, heading, description, link } = item

            return (
              <div
                key={index}
                className="group bg-white p-4 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  {image && typeof image === 'object' && (
                    <div className="mb-4 overflow-hidden rounded-xl aspect-square relative">
                      <Image
                        src={image.url!}
                        alt={image.alt || ''}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* <Media
                        imgClassName="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                        resource={image}
                      /> */}
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Heading */}
                    {heading && <h3 className="text-xl font-semibold text-gray-900 ">{heading}</h3>}

                    {/* Description */}
                    {description && <RichText data={description} enableGutter={false} />}
                  </div>
                </div>

                {/* Link */}
                {link && (
                  <CMSLink {...link} className="w-full flex items-center justify-between mt-3">
                    {link.label || 'Learn More'}
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </CMSLink>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
