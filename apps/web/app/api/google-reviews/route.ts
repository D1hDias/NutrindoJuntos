import { NextResponse } from 'next/server'
import { getGoogleReviews, isGoogleReviewsConfigured } from '@/lib/google-reviews'

export async function GET() {
  try {
    const reviews = await getGoogleReviews()

    return NextResponse.json({
      reviews,
      source: isGoogleReviewsConfigured() ? 'google' : 'mock',
      count: reviews.length,
    })
  } catch (error) {
    console.error('[API] Erro ao buscar Google Reviews:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar avaliações', reviews: [] },
      { status: 500 }
    )
  }
}
