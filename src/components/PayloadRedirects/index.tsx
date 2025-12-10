import { notFound } from 'next/navigation'
import type React from 'react'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* Simplified redirects component for static site
 * Redirects are handled via next.config.js redirects
 * This component just handles 404s
 */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  // For static sites, redirects are handled in next.config.js
  // This component just handles 404s when a page/post is not found

  if (disableNotFound) return null

  notFound()
}
