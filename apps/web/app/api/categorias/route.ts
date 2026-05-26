import { NextRequest, NextResponse } from 'next/server'
import { getCategorias } from '@/lib/api/categorias'
import { logApiError } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const categorias = await getCategorias()

    return NextResponse.json(categorias, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    logApiError('/api/categorias', error as Error)
    return NextResponse.json(
      { error: 'Failed to fetch categorias' },
      { status: 500 }
    )
  }
}
