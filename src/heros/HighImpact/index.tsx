'use client'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { CheckmarkIcon } from '@/components/ui/SVGIcons'
import BreakText from '@/components/ui/breakText'
import type { Media as MediaType, Page } from '@/payload-types'
import React, { useEffect, useState } from 'react'

type ExtendedHero = Omit<Page['hero'], 'media'> & {
  backgroundLayers?: {
    baseLayer?: {
      media?: MediaType | string
      youtubeUrl?: string
      fallbackImage?: MediaType | string
    }
    overlayColor?: string
    overlayOpacity?: number
  }
}

// Extract YouTube background to a separate component to use hooks properly
const YouTubeBackground = ({
  embedUrl,
  fallbackImage,
}: {
  embedUrl: string
  fallbackImage?: MediaType | string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Force the loading screen to disappear after a fixed timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000) // 2 seconds minimum display of fallback

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
      {/* Fallback image - always show immediately */}
      {fallbackImage && typeof fallbackImage === 'object' && (
        <div
          className={`absolute inset-0 z-50 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: `url(${fallbackImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <iframe
        className={`absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          aspectRatio: '16/9',
          zIndex: 40,
        }}
        src={embedUrl}
        title="YouTube video background"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export const HighImpactHero: React.FC<ExtendedHero> = ({
  title,
  links,
  backgroundLayers,
  features,
  ownerName,
  ownerTitle,
  brandLogo,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoAttempted, setVideoAttempted] = useState(false)
  const [fallbackLoaded, setFallbackLoaded] = useState(false)

  // Get fallback image for preloading meta tag
  const fallbackImageUrl =
    backgroundLayers?.baseLayer?.fallbackImage &&
    typeof backgroundLayers.baseLayer.fallbackImage === 'object'
      ? backgroundLayers.baseLayer.fallbackImage.url
      : null

  // Preload fallback image immediately on mount
  useEffect(() => {
    // Start with showing content if no fallback image
    if (!fallbackImageUrl) {
      setFallbackLoaded(true)
      return
    }

    // Create new image to preload
    const img = new window.Image()
    img.src = fallbackImageUrl

    // Use both onload and a timeout to ensure we proceed
    img.onload = () => setFallbackLoaded(true)

    // Fallback timeout in case onload doesn't fire
    const timer = setTimeout(() => setFallbackLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [fallbackImageUrl])

  // Force video display after a timeout as a fallback
  useEffect(() => {
    if (
      backgroundLayers?.baseLayer?.media &&
      typeof backgroundLayers.baseLayer.media === 'object' &&
      backgroundLayers.baseLayer.media.mimeType?.includes('video') &&
      !isVideoLoaded &&
      videoAttempted
    ) {
      const timer = setTimeout(() => {
        setIsVideoLoaded(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [backgroundLayers?.baseLayer?.media, isVideoLoaded, videoAttempted])

  // Utility function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return ''

    try {
      const urlObj = new URL(url)
      let videoId = ''

      // Handle watch URL
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.includes('/watch')) {
        videoId = urlObj.searchParams.get('v') || ''
      }
      // Handle short URL
      else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1)
      }
      // If it's already an embed URL
      else if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1] || ''
      }

      if (!videoId) {
        console.error('Invalid YouTube URL or missing video ID')
        return ''
      }

      // Most minimal params needed for background video
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`
    } catch (error) {
      console.error('Error parsing YouTube URL:', error)
      return ''
    }
  }

  const renderMediaLayer = (
    media: MediaType | string | undefined,
    youtubeUrl: string | undefined,
    fallbackImage: MediaType | string | undefined,
    className: string,
  ) => {
    // If we have a fallback image, render it immediately in the background
    const fallbackImageStyle =
      fallbackImage && typeof fallbackImage === 'object'
        ? {
            backgroundImage: `url(${fallbackImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {}

    // Handle YouTube URL
    if (youtubeUrl) {
      const embedUrl = getYouTubeEmbedUrl(youtubeUrl)
      if (!embedUrl) {
        return (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={fallbackImageStyle}
          >
            <p className="text-white text-lg">Invalid YouTube URL</p>
          </div>
        )
      }
      return <YouTubeBackground embedUrl={embedUrl} fallbackImage={fallbackImage} />
    }

    // Handle media
    if (!media || typeof media !== 'object') {
      // If no media but we have fallback, just show the fallback
      if (fallbackImage && typeof fallbackImage === 'object') {
        return <div className="absolute inset-0 z-20" style={fallbackImageStyle} />
      }
      return null
    }

    if (media.mimeType?.includes('video')) {
      // Mark that we've attempted to load a video
      if (!videoAttempted) {
        setVideoAttempted(true)
      }

      return (
        <div className="absolute inset-0" style={fallbackImageStyle}>
          {/* Always show fallback image first */}
          {fallbackImage && typeof fallbackImage === 'object' && (
            <div
              className={`absolute inset-0 z-20 transition-opacity duration-500 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
              style={fallbackImageStyle}
            />
          )}

          {/* Video element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`${className} z-10 transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadedData={() => {
              setIsVideoLoaded(true)
            }}
            onCanPlay={() => {
              // Delay showing video slightly to ensure smooth transition
              setTimeout(() => setIsVideoLoaded(true), 100)
            }}
            onError={(e) => {
              console.error('Video error:', e)
            }}
          >
            <source src={media.url || ''} type={media.mimeType} />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    return <Media fill imgClassName={className} priority={true} resource={media} />
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col text-white overflow-hidden relative bg-black"
      data-theme="light"
      style={
        fallbackImageUrl
          ? {
              backgroundImage: `url(${fallbackImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Preload fallback image - removed the "importance" attribute */}
      {fallbackImageUrl && <link rel="preload" as="image" href={fallbackImageUrl} />}

      {/* Hero content */}
      <div className="container z-[200] flex flex-col flex-grow justify-end items-center">
        <div className="flex flex-col items-center w-full max-w-[800px] lg:max-w-[1000px] mx-auto text-center px-4">
          {title && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-white mb-4 uppercase w-full mx-auto py-1">
              <BreakText text={title} />
            </h1>
          )}
          {/* Feature list with checkmarks */}
          <div className="flex flex-col items-center space-y-3 mb-8">
            {Array.isArray(features) &&
              features.length > 0 &&
              features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 mr-3 flex items-center justify-center lg:justify-center">
                    <CheckmarkIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white text-lg font-normal">{feature.feature}</span>
                </div>
              ))}
          </div>
          {/* CTA buttons */}
          <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12 lg:mb-8">
            {Array.isArray(links) &&
              links.length > 0 &&
              links.map(({ link }, i) => (
                <div key={i}>
                  <CMSLink
                    {...link}
                    className="text-sm sm:text-base md:text-lg whitespace-nowrap"
                  />
                </div>
              ))}
          </div>
          {/* Brand logo and owner info */}
          <div className="flex flex-row items-center justify-center space-x-3 sm:space-x-4 px-2 sm:px-4 pb-12">
            {brandLogo && typeof brandLogo === 'object' ? (
              <Media
                resource={brandLogo}
                alt="Brand Logo"
                className="h-6 sm:h-7 md:h-8 w-auto mb-2 md:mb-0 pb-8 sm:pb-9 md:pb-11"
              />
            ) : (
              <svg
                width="60"
                height="20"
                viewBox="0 0 60 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 sm:h-7 md:h-8 w-auto mb-2 md:mb-0"
              >
                <path d="M22.5 10L15 17.5L7.5 10L15 2.5L22.5 10Z" fill="white" />
                <path d="M37.5 10L30 17.5L22.5 10L30 2.5L37.5 10Z" fill="white" />
                <path d="M52.5 10L45 17.5L37.5 10L45 2.5L52.5 10Z" fill="white" />
              </svg>
            )}
            <div className="border-l border-white pl-2 sm:pl-3">
              <p className="text-white text-xs sm:text-sm md:text-base font-bold uppercase leading-tight">
                {ownerName}
              </p>
              <p className="text-white text-xs sm:text-sm font-light leading-tight pl-2 sm:pl-[10px]">
                {ownerTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Layers - Only render when fallback is loaded to prevent flash */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${fallbackLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Base Layer with potential YouTube */}
        {(backgroundLayers?.baseLayer?.media || backgroundLayers?.baseLayer?.youtubeUrl) && (
          <div className="absolute inset-0" style={{ zIndex: 50 }}>
            {renderMediaLayer(
              backgroundLayers.baseLayer.media,
              backgroundLayers.baseLayer.youtubeUrl,
              backgroundLayers.baseLayer.fallbackImage,
              'w-full h-full object-cover',
            )}
          </div>
        )}

        {/* Color Overlay - separate from the base layer */}
        {backgroundLayers?.overlayColor &&
          backgroundLayers?.overlayOpacity &&
          backgroundLayers?.overlayOpacity > 0 && (
            <div
              className="absolute inset-0"
              style={{
                zIndex: 55,
                backgroundColor: backgroundLayers.overlayColor || '#000000',
                opacity: (backgroundLayers.overlayOpacity || 0) / 100,
              }}
            ></div>
          )}

        {/* Texture overlay */}
        <div className="absolute inset-0 z-[60] opacity-15 bg-[url('/assets/images/crt.gif')] bg-repeat bg-[length:256px_256px]"></div>
      </div>
    </div>
  )
}
