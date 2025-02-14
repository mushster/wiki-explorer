'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface ArticleProps {
  title: string
  html: string
  category: string
  length: number
  pageid: number
}

const Article = ({ article }: { article: ArticleProps }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className="animate-fadeIn cursor-pointer" onClick={() => setIsOpen(true)}>
        <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:bg-card/70">
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
              className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-medium prose-a:text-primary line-clamp-3"
              dangerouslySetInnerHTML={{ __html: article.html }} 
            />
          </CardContent>
          <div className="flex justify-end px-6 pb-4">
          <Link
                href={`/article/${article.pageid}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
                Read more →
            </Link>
          </div>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{article.title}</DialogTitle>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary w-fit">
              {article.category}
            </span>
          </DialogHeader>
          <div 
            className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-medium prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: article.html }} 
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Article 