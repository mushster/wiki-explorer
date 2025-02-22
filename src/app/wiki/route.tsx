// import { NextResponse } from 'next/server';
// import { InterestingWikiBrowser } from '@/lib/wiki-browser';

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const title = searchParams.get('title');
    
//     const browser = new InterestingWikiBrowser();
    
//     try {
//         if (title) {
//             // Fetch specific article
//             const articles = browser.get_articles_from_category(title);
//             if (articles.length > 0) {
//                 const details = browser.get_article_details(articles[0].pageid);
//                 return NextResponse.json(details);
//             }
//             return NextResponse.json({ error: 'Article not found' }, { status: 404 });
//         } else {
//             // Get random interesting articles
//             const articles = browser.get_interesting_articles(5, true, '/wiki');
//             return NextResponse.json(articles);
//         }
//     } catch (error) {
//         console.error('Error fetching articles:', error);
//         return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
//     }
// }