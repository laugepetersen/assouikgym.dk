'use client'

import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

interface RowData {
  heading?: string
  [key: string]: unknown
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<RowData>()

  const customLabel = data.heading || `Item ${String(rowNumber).padStart(2, '0')}`

  return <>{customLabel}</>
}

export default RowLabel
