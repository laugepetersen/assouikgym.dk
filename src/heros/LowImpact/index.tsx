'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type LowImpactHeroType = Omit<
  Page['hero'],
  'features' | 'backgroundLayers' | 'ownerName' | 'ownerTitle' | 'brandLogo'
>

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ title, description, links }) => {
  return (
    <div className="w-full bg-beige flex flex-col items-center justify-center text-center pt-20 z-50">
      <div className="container max-w-3xl mt-20">
        {title && <h2 className="text-[#1F1F1F]">{title}</h2>}
        {description && <p className="mt-2 text-[#1F1F1F]/80">{description}</p>}

        {/* CTA buttons */}
        {Array.isArray(links) && links.length > 0 && (
          <div className="mt-6 flex justify-center gap-4">
            {links.map(({ link }, index) => (
              <CMSLink key={index} {...link} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
