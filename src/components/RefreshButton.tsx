'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

declare global {
  interface Window {
    refreshArticles: () => Promise<void>
  }
}

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await window.refreshArticles?.()
    setTimeout(() => setIsRefreshing(false), 750)
  }

  if (!mounted) {
    return (
      <Button 
        variant="default"
        size="default"
        className="gap-2 opacity-0"
      >
        <RefreshCw className="h-4 w-4" />
        New Articles
      </Button>
    )
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