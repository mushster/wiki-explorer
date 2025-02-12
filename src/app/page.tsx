// app/page.tsx
import Article from '@/components/Article';
import RefreshButton from '@/components/RefreshButton';
import { Suspense } from 'react';

export default async function Home() {
  try {
    const response = await fetch('http://localhost:3000/api/wiki', {
      cache: 'no-store' // Disable caching to get fresh articles each time
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const articles = await response.json();

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Interesting Wikipedia Articles</h1>
          <RefreshButton />
        </div>
        
        <Suspense fallback={<div>Loading articles...</div>}>
          <div className="space-y-6">
            {articles.map((article: any) => (
              <Article key={article.pageid} article={article} />
            ))}
          </div>
        </Suspense>
      </main>
    );
  } catch (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600">Error loading articles</h1>
        <p className="mt-4">Please try again later</p>
      </main>
    );
  }
}