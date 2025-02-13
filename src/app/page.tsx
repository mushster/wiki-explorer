// app/page.tsx
import { ThemeToggle } from '@/components/ThemeToggle';
import RefreshButton from '@/components/RefreshButton';
import ArticleList from '@/components/ArticleList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-medium tracking-tight">
            Interesting Wikipedia Articles
          </h1>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <RefreshButton />
          </div>
        </div>
        <ArticleList />
      </div>
    </main>
  );
}