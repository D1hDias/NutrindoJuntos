/**
 * Google Business Profile API - Reviews Integration
 *
 * Busca avaliações do Google Meu Negócio e converte para o formato
 * usado na seção de depoimentos do site.
 *
 * SETUP necessário:
 * 1. Criar projeto no Google Cloud Console
 * 2. Ativar "Google Business Profile API" (My Business Account Management API)
 * 3. Criar credenciais OAuth 2.0
 * 4. Obter accountId e locationId
 * 5. Configurar variáveis de ambiente (ver abaixo)
 */

export interface GoogleReview {
  id: number
  name: string
  role: string
  text: string
  image: string
  rating: number
  googleReviewId?: string
  createTime?: string
}

interface GoogleReviewResponse {
  reviews: Array<{
    name: string
    reviewId: string
    reviewer: {
      displayName: string
      profilePhotoUrl: string
    }
    starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
    comment: string
    createTime: string
    updateTime: string
  }>
  averageRating: number
  totalReviewCount: number
  nextPageToken?: string
}

const STAR_RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
}

// Cache em memória para evitar chamadas excessivas à API
let cachedReviews: GoogleReview[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION_MS = 1000 * 60 * 60 // 1 hora

/**
 * Verifica se a integração com Google está configurada
 */
export function isGoogleReviewsConfigured(): boolean {
  return !!(
    process.env.GOOGLE_BUSINESS_ACCESS_TOKEN &&
    process.env.GOOGLE_BUSINESS_ACCOUNT_ID &&
    process.env.GOOGLE_BUSINESS_LOCATION_ID
  )
}

/**
 * Busca reviews da API do Google Business Profile
 */
async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const accessToken = process.env.GOOGLE_BUSINESS_ACCESS_TOKEN
  const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID
  const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID

  if (!accessToken || !accountId || !locationId) {
    console.warn('[Google Reviews] Variáveis de ambiente não configuradas. Usando dados mock.')
    return []
  }

  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageSize=50`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // ISR: revalidar a cada 1 hora
    })

    if (!response.ok) {
      console.error(`[Google Reviews] API error: ${response.status} ${response.statusText}`)
      return []
    }

    const data: GoogleReviewResponse = await response.json()

    if (!data.reviews || data.reviews.length === 0) {
      return []
    }

    // Converter para formato interno, filtrando apenas reviews com comentário
    return data.reviews
      .filter((review) => review.comment && review.comment.trim().length > 0)
      .map((review, index) => ({
        id: index + 1,
        name: review.reviewer.displayName || 'Usuário Google',
        role: 'Avaliação Google',
        text: review.comment,
        image: review.reviewer.profilePhotoUrl || '/images/testimonial/default-avatar.webp',
        rating: STAR_RATING_MAP[review.starRating] || 5,
        googleReviewId: review.reviewId,
        createTime: review.createTime,
      }))
  } catch (error) {
    console.error('[Google Reviews] Erro ao buscar reviews:', error)
    return []
  }
}

/**
 * Retorna reviews do Google com cache em memória
 * Fallback para dados mock quando API não está configurada
 */
export async function getGoogleReviews(): Promise<GoogleReview[]> {
  // Verificar cache
  const now = Date.now()
  if (cachedReviews && now - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedReviews
  }

  // Tentar buscar da API
  if (isGoogleReviewsConfigured()) {
    const reviews = await fetchGoogleReviews()
    if (reviews.length > 0) {
      cachedReviews = reviews
      cacheTimestamp = now
      return reviews
    }
  }

  // Fallback: dados mock
  return getMockReviews()
}

/**
 * Reviews mock para quando a API não está configurada
 */
function getMockReviews(): GoogleReview[] {
  return [
    {
      id: 1,
      name: 'Ana Paula Silva',
      role: 'Avaliação Google',
      text: 'Os cursos da Nutrindo Juntos transformaram minha prática clínica. O conteúdo é atual, baseado em evidências e com aplicação prática imediata. Recomendo para todos os nutricionistas que querem se destacar no mercado.',
      image: '/images/testimonial/testimonial-1-1.webp',
      rating: 5,
    },
    {
      id: 2,
      name: 'Mariana Costa',
      role: 'Avaliação Google',
      text: 'Como estudante, os cursos me deram uma visão muito além da graduação. A didática é excelente e o suporte da equipe é incrível. Sinto que estou muito mais preparada para o mercado de trabalho.',
      image: '/images/testimonial/testimonial-1-2.webp',
      rating: 5,
    },
    {
      id: 3,
      name: 'Carlos Eduardo Santos',
      role: 'Avaliação Google',
      text: 'A plataforma oferece conteúdo de altíssima qualidade com professores referência no mercado. As aulas são objetivas e o material de apoio é completo. Melhor investimento que fiz na minha carreira.',
      image: '/images/testimonial/testimonial-1-3.webp',
      rating: 5,
    },
  ]
}
