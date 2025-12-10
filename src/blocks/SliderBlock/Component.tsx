'use client'
import type React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import type { SliderBlock as SliderBlockType, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = SliderBlockType & {
  className?: string
  anchor?: string
  spacing?: 'none' | 'small' | 'default'
  visibility?: boolean
}

export const SliderBlock: React.FC<Props> = ({
  slides,
  className,
  anchor,
  spacing,
  visibility,
}) => {
  const options: EmblaOptionsType = {
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 1 },
      '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 1 },
      '(max-width: 767px)': { align: 'center', slidesToScroll: 1 },
    },
  }

  const [emblaRef] = useEmblaCarousel(options)

  const spacingClasses = {
    none: 'py-0',
    small: 'py-6 md:py-8 lg:py-10',
    default: 'py-10 sm:py-12 md:py-16 lg:py-20',
  }[spacing ?? 'default']

  if (!visibility || !slides || slides.length === 0) return null

  return (
    <section
      id={anchor || undefined}
      className={cn('relative bg-beige container', spacingClasses, className)}
    >
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex px-4 lg:px-2">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_23.9%] mx-[2%] md:mx-[1%] lg:mx-[0.5%] relative aspect-[2/3] flex items-end"
            >
              {slide.backgroundImage && typeof slide.backgroundImage !== 'number' && (
                <Image
                  src={(slide.backgroundImage as Media).url || ''}
                  alt={slide.title || 'Slide Background'}
                  fill
                  className="rounded-xl object-cover"
                  priority
                />
              )}
              <div className="flex h-48 bg-gradient-to-b from-transparent via-neutral-800 to-neutral-900 w-full absolute z-15 rounded-xl"></div>
              <div className="flex flex-col p-4 z-10">
                {slide.title && (
                  <div className="text-white font-medium text-2xl leading-none tracking-[0.02em] mb-2">
                    {slide.title}
                  </div>
                )}
                {slide.description && (
                  <div className="font-normal text-base leading-[140%] tracking-[0.02em] text-white">
                    {slide.description}
                  </div>
                )}
                {slide.link && slide.link.label && (
                  <CMSLink
                    {...slide.link}
                    className="flex items-end justify-start p-0 h-10 font-medium text-base leading-none tracking-[0.02em]"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SliderBlock
