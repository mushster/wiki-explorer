import { NextRequest, NextResponse } from 'next/server'

type Props = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: Props
): Promise<NextResponse> {
  try {
    const response = await fetch(
      'https://en.wikipedia.org/w/api.php?' + 
      new URLSearchParams({
        action: 'query',
        format: 'json',
        pageids: params.id,
        prop: 'extracts|categories|links',
        exintro: '0',
        explaintext: '0',
        origin: '*'
      })
    )

    const data = await response.json()
    return NextResponse.json(data.query.pages[params.id])
  } catch (error) {
    console.error('Error fetching article details:', error);
    return NextResponse.json({ error: 'Failed to fetch article details' }, { status: 500 })
  }
} 