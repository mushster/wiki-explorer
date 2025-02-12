import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch 5 random Wikipedia articles
    const response = await fetch(
      'https://en.wikipedia.org/w/api.php?' + 
      new URLSearchParams({
        action: 'query',
        format: 'json',
        generator: 'random',
        grnnamespace: '0',
        grnlimit: '5',
        prop: 'extracts|categories',
        exintro: '1',
        explaintext: '0',
        exsectionformat: 'wiki',
        origin: '*'
      })
    );

    const data = await response.json();
    
    // Transform the data into the format we need
    const articles = Object.values(data.query.pages).map((page: any) => ({
      pageid: page.pageid,
      title: page.title,
      html: page.extract,
      category: page.categories?.[0]?.title.replace('Category:', '') || 'Uncategorized',
      length: page.extract?.length || 0
    }));

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching Wikipedia articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
} 