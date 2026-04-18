import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/api/posts'
import { logApiError } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '9')
    const page = parseInt(searchParams.get('page') || '1')
    const category = searchParams.get('category') || undefined

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const response = await searchPosts(query, limit, page, category)

    return NextResponse.json(response)
  } catch (error) {
    logApiError('/api/posts/search', error as Error)
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}
