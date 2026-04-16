import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '@/lib/api/posts'
import { logApiError } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '9')
    const page = parseInt(searchParams.get('page') || '1')
    const category = searchParams.get('category') || undefined

    const response = await getPosts(limit, page, category)

    return NextResponse.json(response)
  } catch (error) {
    logApiError('/api/posts', error as Error)
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}
