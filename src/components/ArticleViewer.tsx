'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ArticleData {
  title: string
  html: string
  category: string
}

export function ArticleViewer({ pageid }: { pageid: number }) {
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/wiki/${pageid}`)
        if (!response.ok) {
          throw new Error('Failed to fetch article')
        }
        const data = await response.json()
        setArticle(data)
      } catch (err) {
        setError('Failed to load article')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [pageid])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!article) return <div>No article found</div>

  return (
    <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">{article.title}</CardTitle>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
            {article.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-medium prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: article.html }} 
        />
      </CardContent>
    </Card>
  )
} 