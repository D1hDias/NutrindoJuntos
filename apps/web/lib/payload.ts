const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001/api'

interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/**
 * Generic fetch function for Payload CMS API
 */
async function fetchFromPayload<T>(
  endpoint: string,
  options?: RequestInit
): Promise<PayloadResponse<T>> {
  const url = `${PAYLOAD_API_URL}${endpoint}`

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      // Revalidate every 60 seconds
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error) {
    console.error(`Error fetching from Payload: ${endpoint}`, error)
    throw error
  }
}

/**
 * Fetch a single document by slug
 */
async function fetchBySlug<T>(
  collection: string,
  slug: string
): Promise<T | null> {
  try {
    const response = await fetchFromPayload<T>(
      `/${collection}?where[slug][equals]=${slug}&limit=1`
    )
    return response.docs[0] || null
  } catch (error) {
    console.error(`Error fetching ${collection} by slug:`, error)
    return null
  }
}

// Course-specific API functions
export async function getCursos(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<PayloadResponse<any>> {
  try {
    const searchParams = new URLSearchParams()
    
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.status) searchParams.append('where[status][equals]', params.status)
    if (params?.category) searchParams.append('where[category][equals]', params.category)
    
    const query = searchParams.toString()
    const result = await fetchFromPayload(`/cursos${query ? `?${query}` : ''}`)
    
    // Se não há cursos, use mock data temporariamente
    if (result.totalDocs === 0) {
      const { MOCK_CURSOS } = await import('./mock-data')
      const filteredCursos = MOCK_CURSOS.filter(curso => {
        if (params?.status && curso.status !== params.status) return false
        if (params?.category && curso.category !== params.category) return false
        return true
      })
      
      const limit = params?.limit || 10
      const page = params?.page || 1
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      
      return {
        docs: filteredCursos.slice(startIndex, endIndex),
        totalDocs: filteredCursos.length,
        limit,
        totalPages: Math.ceil(filteredCursos.length / limit),
        page,
        pagingCounter: startIndex + 1,
        hasPrevPage: page > 1,
        hasNextPage: endIndex < filteredCursos.length,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: endIndex < filteredCursos.length ? page + 1 : null,
      }
    }
    
    return result
  } catch (error) {
    // Em caso de erro, use mock data
    console.warn('Erro ao buscar cursos do CMS, usando dados mock:', error)
    const { MOCK_CURSOS } = await import('./mock-data')
    
    return {
      docs: MOCK_CURSOS,
      totalDocs: MOCK_CURSOS.length,
      limit: params?.limit || 10,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  }
}

export async function getCursoBySlug(slug: string): Promise<any | null> {
  try {
    const result = await fetchBySlug('cursos', slug)
    
    // Se não encontrar no CMS, procure nos dados mock
    if (!result) {
      const { MOCK_CURSOS } = await import('./mock-data')
      const curso = MOCK_CURSOS.find(c => c.slug === slug)
      return curso || null
    }
    
    return result
  } catch (error) {
    console.warn('Erro ao buscar curso por slug do CMS, usando dados mock:', error)
    const { MOCK_CURSOS } = await import('./mock-data')
    const curso = MOCK_CURSOS.find(c => c.slug === slug)
    return curso || null
  }
}

export async function getFeaturedCursos(limit: number = 3): Promise<PayloadResponse<any>> {
  try {
    const result = await fetchFromPayload(`/cursos?where[status][equals]=published&limit=${limit}&sort=-createdAt`)
    
    // Se não há cursos, use mock data
    if (result.totalDocs === 0) {
      const { MOCK_CURSOS } = await import('./mock-data')
      const publishedCursos = MOCK_CURSOS.filter(curso => curso.status === 'published')
      
      return {
        docs: publishedCursos.slice(0, limit),
        totalDocs: publishedCursos.length,
        limit,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      }
    }
    
    return result
  } catch (error) {
    console.warn('Erro ao buscar cursos featured do CMS, usando dados mock:', error)
    const { MOCK_CURSOS } = await import('./mock-data')
    
    return {
      docs: MOCK_CURSOS.slice(0, limit),
      totalDocs: MOCK_CURSOS.length,
      limit,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  }
}

export { fetchFromPayload, fetchBySlug }
export type { PayloadResponse }
