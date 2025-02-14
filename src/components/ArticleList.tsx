'use client'

import { useEffect, useState } from 'react'
import Article from './Article'

interface ArticleData {
  pageid: number
  title: string
  html: string
  category: string
  length: number
}

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/wiki', {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setError('Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
    // Assign the refresh function to window only on the client side
    if (typeof window !== 'undefined') {
      window.refreshArticles = fetchArticles
    }
  }, [])

  if (error) {
    return (
      <div className="text-red-600">
        <h2 className="text-2xl font-bold">Error loading articles</h2>
        <p className="mt-2">{error}</p>
      </div>
    )
  }

  if (loading) {
    return <div>Loading articles...</div>
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <Article key={article.pageid} article={article} />
      ))}
    </div>
  )
} 