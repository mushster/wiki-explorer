'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { useTheme } from 'next-themes'

declare global {
  interface Window {
    refreshArticles: () => Promise<void>
  }
}

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [setTheme])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await window.refreshArticles?.()
    setTimeout(() => setIsRefreshing(false), 750)
  }

  return (
    <Button 
      variant="default"
      size="default"
      onClick={handleRefresh}
      className="gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      New Articles
    </Button>
  )
} 