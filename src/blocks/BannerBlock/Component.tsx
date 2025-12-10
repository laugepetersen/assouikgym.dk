'use client'

import type React from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { Banner as BannerType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = BannerType & {
  className?: string
}

export const Banner: React.FC<Props> = ({
  backgroundImage,
  kicker,
  title,
  content,
  links,
  showMedia,
  media,
  anchor,
  visibility,
  className,
}) => {
  if (!visibility) return null

  return (
    <section id={anchor || undefined} className={cn('w-full relative', className)}>
      {/* Top Triangle */}
      <div className="w-full flex flex-row md:justify-end justify-start bg-beige">
        <div
          className="flex w-full md:w-1/2 bg-gradient-to-r from-[#2f2f2f] to-[#000000] opacity-50 md:h-10 h-8 -mb-[0.2px]"
          style={{
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
          }}
        ></div>
      </div>

      {/* Content Area */}
      <div
        className="w-full relative bg-black"
        style={{
          backgroundImage:
            typeof backgroundImage === 'object' && backgroundImage?.url
              ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.8)), url(${backgroundImage.url})`
              : 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.8))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container flex flex-col md:flex-row items-center">
          {/* Left Column - Full width on mobile */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 mt-8 md:mt-0">
            <h4 className="text-white mb-3 md:text-left text-center">{kicker}</h4>
            <div className="w-full h-[76px] text-[32px] md:w-[620px] md:h-[43px] md:text-[36px] font-semibold leading-[120%] tracking-[0.02em] text-center md:text-left text-white">
              {title}
            </div>

            {content && (
              <div className="space-y-4 mb-8">
                {content.map((item, index) => (
                  <p key={index} className="text-white opacity-80  md:text-left text-center">
                    {item.text}
                  </p>
                ))}
              </div>
            )}

            {links && links.length > 0 && (
              <div className="flex flex-row gap-4 items-center justify-center md:justify-start">
                {links.map(({ link }, i) => (
                  <div key={i} className="w-auto">
                    <CMSLink {...link} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Media) - Full width on mobile */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            {showMedia && media && typeof media === 'object' && (
              <Image
                src={media.url! || '/placeholder.svg'}
                alt={media.alt || ''}
                width={320}
                height={350}
                className="md:-mt-24"
                priority
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Triangle */}
      <div className="w-full flex justify-start bg-beige">
        <div
          className="flex w-full md:w-1/2 bg-gradient-to-r from-[#000000] to-[#2f2f2f] opacity-50 md:h-10 h-8  -mt-[0.2px]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        ></div>
      </div>
    </section>
  )
}

export default Banner
