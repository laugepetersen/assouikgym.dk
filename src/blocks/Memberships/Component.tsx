'use client'

import type React from 'react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { Check, ChevronRight } from 'lucide-react'
import type { MembershipsBlock as MembershipsBlockType } from '@/payload-types'
import TextHighlight from '@/components/ui/texthighlightbold'
import type { Membership } from '@/payload-types' // Make sure to import Membership type

type Props = MembershipsBlockType & {
  className?: string
}

export const MembershipsBlock: React.FC<Props> = ({
  // title,
  // description,
  memberships,
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberships?.map((membership, index) => {
              // Ensure membership is treated as a Membership type object
              const membershipData = membership as Membership

              return (
                <div
                  key={index}
                  className={cn(
                    'bg-white rounded-2xl flex flex-col justify-between relative overflow-hidden text-center',
                  )}
                >
                  {membershipData.popular && membershipData.badgeText && (
                    <div
                      className="absolute top-0 right-0 brand-gradient-bg text-black px-4 py-2 text-sm font-medium"
                      style={{
                        width: '197.3px',
                        height: '36px',
                        transform: 'rotate(30deg) translate(25%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                      }}
                    >
                      {membershipData.badgeText}
                    </div>
                  )}
                  <div className="pt-8">
                    <h3 className="text-2xl font-semibold mb-2">{membershipData.title}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-xl font-medium text-black">{membershipData.price}</span>
                    </div>
                    <hr className="border-b-foreground border-gray-100 my-4 w-full" />
                  </div>

                  {/* Position ageGroup at the top of this div */}
                  <div className="flex flex-col">
                    {membershipData.ageGroup && (
                      <div className="mb-4">
                        <span className="w-[39px] h-[17px] px-[6px] rounded-[8px] text-sm font-medium leading-[120%] tracking-[2%] align-bottom text-[#1F1F1F] border">
                          {membershipData.ageGroup}
                        </span>
                      </div>
                    )}

                    {membershipData.features && membershipData.features.length > 0 && (
                      <ul className="space-y-1 mb-8">
                        {membershipData.features.map(
                          (feature: { description: string }, featIndex: number) => (
                            <li key={featIndex} className="flex items-center justify-center">
                              <Check className="h-5 w-5 flex-shrink-0" />
                              <span className="ml-2 font-normal text-[18px] leading-[160%] tracking-[2%] text-[#1F1F1F]">
                                {feature.description}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col items-center pb-8 mt-auto">
                    <hr className="border-b-foreground border-gray-200 mb-4 w-full" />
                    {membershipData.link && (
                      <div className="w-[80%]">
                        <CMSLink
                          {...membershipData.link}
                          className={cn(
                            'flex items-center justify-between px-4 py-6 rounded-[8px] text-center font-medium transition-all w-full',
                          )}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </CMSLink>
                      </div>
                    )}

                    {membershipData.savingsText && (
                      <div className="text-center text-base mt-4">
                        <TextHighlight text={membershipData.savingsText} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipsBlock
