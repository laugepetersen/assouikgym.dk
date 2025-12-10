'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { RichTextBlock as RichTextBlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = RichTextBlockType & {
  className?: string
}

export const RichTextBlock: React.FC<Props> = ({
  title,
  titleDesc,
  media,
  description,
  links,
  anchor,
  spacing,
  visibility,
  className,
}) => {
  if (!visibility) return null

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
        <div className="flex flex-col items-start max-w-4xl mx-auto">
          {title && (
            <div className="text-3xl md:text-4xl font-medium leading-snug mb-2 w-full text-left">
              {title}
            </div>
          )}

          {titleDesc && Array.isArray(titleDesc) && (
            <div className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed w-full text-left">
              {titleDesc.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.text}
                </div>
              ))}
            </div>
          )}

          {media && typeof media === 'object' && (
            <div className="relative rounded-2xl overflow-hidden mb-6 w-full aspect-[16/9]">
              <Image
                src={media.url!}
                alt={media.alt || ''}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          )}

          {description && Array.isArray(description) && (
            <div className="w-full text-left">
              {description.map((item, index) => (
                <div
                  key={index}
                  className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed"
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}

          {links && links.length > 0 && (
            <div className="w-full text-left">
              {links.map(({ link }, i) => (
                <div key={i} className="mb-3">
                  <CMSLink {...link} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RichTextBlock
