import { ArticleViewer } from '@/components/ArticleViewer'

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <ArticleViewer pageid={parseInt(params.id)} />
      </div>
    </main>
  )
}