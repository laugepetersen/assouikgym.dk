'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import type { TextAndMedia as TextAndMediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import ReactPlayer from 'react-player'

type Props = TextAndMediaType & {
  className?: string
}

export const TextAndMedia2: React.FC<Props> = ({
  heading,
  description,
  mediaGallery,
  anchor,
  spacing,
  visibility,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!visibility) return null

  const spacingClasses = {
    none: 'py-0',
    small: 'py-6 md:py-8 lg:py-10',
    default: 'py-10 sm:py-12 md:py-16 lg:py-20',
  }[spacing ?? 'default']

  // const isDesktop = useMediaQuery('(min-width: 768px)')
  // const [showMobileMedia, setShowMobileMedia] = React.useState(!isDesktop)

  // React.useEffect(() => {
  //   setShowMobileMedia(!isDesktop)
  // }, [isDesktop])

  // Function to check if media is MediaType and return it, otherwise null
  // const getMedia = (media: MediaType | number | undefined): MediaType | undefined => {
  //   if (typeof media === 'object' && media !== null) {
  //     return media
  //   }
  //   return undefined
  // }

  // Always prioritize YouTube URL if available, regardless of screen size
  const hasYoutubeUrl = Boolean(mediaGallery?.youtubeUrl)

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  return (
    <section id={anchor || undefined} className={cn(`w-full ${spacingClasses}`, className)}>
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Centered heading for both mobile and desktop */}
        <div className="text-center mb-6">
          {heading && (
            <RichText
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight"
              data={heading}
            />
          )}
        </div>

        {/* Centered subheading/description */}
        {description && (
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-center">
            {description}
          </p>
        )}

        {/* Media section - handles both video and image using VideoBackground */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-300">
            {hasYoutubeUrl ? (
              isPlaying ? (
                <ReactPlayer
                  url={mediaGallery?.youtubeUrl || ''}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  config={{ youtube: { playerVars: { modestbranding: 1 } } }}
                  playing={true}
                />
              ) : (
                <>
                  {mediaGallery?.mobileMedia && typeof mediaGallery.mobileMedia === 'object' ? (
                    <Image
                      src={mediaGallery.mobileMedia.url!}
                      alt={mediaGallery.mobileMedia.alt || ''} // Access alt from mobileMedia
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                    />
                  ) : null}
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <div className="rounded-full flex items-center justify-center">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                        <svg
                          className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TextAndMedia2
