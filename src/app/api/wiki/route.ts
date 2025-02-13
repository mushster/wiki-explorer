import { NextResponse } from 'next/server';
import { scoreArticle } from '@/lib/article-scorer';

export async function GET() {
  try {
    // Fetch more articles than needed to allow for filtering
    const response = await fetch(
      'https://en.wikipedia.org/w/api.php?' + 
      new URLSearchParams({
        action: 'query',
        format: 'json',
        generator: 'random',
        grnnamespace: '0',
        grnlimit: '15', // Fetch more to filter
        prop: 'extracts|categories',
        exintro: '1',
        explaintext: '0',
        exsectionformat: 'wiki',
        origin: '*'
      })
    );

    const data = await response.json();
    
    // Score and sort articles
    const scoredArticles = Object.values(data.query.pages)
      .map((page: any) => ({
        page,
        score: scoreArticle(page)
      }))
      .sort((a, b) => b.score - a.score);

    // Take top 5 articles
    const topArticles = scoredArticles
      .slice(0, 5)
      .map(({ page }) => ({
        pageid: page.pageid,
        title: page.title,
        html: page.extract,
        category: page.categories?.[0]?.title.replace('Category:', '') || 'Uncategorized',
        length: page.extract?.length || 0,
      }));

    return NextResponse.json(topArticles);
  } catch (error) {
    console.error('Error fetching Wikipedia articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
} 