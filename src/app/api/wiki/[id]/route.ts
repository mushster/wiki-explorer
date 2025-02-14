import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
} 