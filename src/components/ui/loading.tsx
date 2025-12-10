'use client'
import { useEffect, useState } from 'react'

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Adjust delay as needed
  }, [])

  if (!isLoading) return null // Hide when loading is done

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-6 h-6 border-4 border-gray-200 border-t-[#6ccae7] rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading
