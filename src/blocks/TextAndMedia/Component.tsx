'use client'

import React from 'react'

import type { TextAndMedia as TextAndMediaType } from '@/payload-types'
import TextAndMedia1 from './TextAndMedia1/Component'
import TextAndMedia2 from './TextAndMedia2/Component'

type Props = TextAndMediaType & {
  className?: string
}

export const TextAndMedia: React.FC<Props> = (props) => {
  const { type } = props

  // Route to the appropriate component based on the type
  switch (type) {
    case 'textAndMedia1':
      return <TextAndMedia1 {...props} />
    case 'textAndMedia2':
      return <TextAndMedia2 {...props} />
    default:
      return null
  }
}

export default TextAndMedia
