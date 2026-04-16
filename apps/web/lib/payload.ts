/**
 * Data API - Usando Mock Data (sem CMS)
 * 
 * Este arquivo substitui a integração com Payload CMS
 * por dados mock estáticos para simplificar a arquitetura
 */

/**
 * Interface de resposta unificada
 */
interface MockResponse<T> {
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
 * Função utilitária para criar resposta paginada
 */
function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): MockResponse<T> {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)

  return {
    docs: paginatedData,
    totalDocs: data.length,
    limit,
    totalPages: Math.ceil(data.length / limit),
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: endIndex < data.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: endIndex < data.length ? page + 1 : null,
  }
}

/**
 * Buscar cursos com filtros e paginação
 */
export async function getCursos(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<MockResponse<any>> {
  const { MOCK_CURSOS } = await import('./mock-data')
  
  // Aplicar filtros
  let filteredCursos = MOCK_CURSOS
  
  if (params?.status) {
    filteredCursos = filteredCursos.filter(curso => curso.status === params.status)
  }
  
  if (params?.category) {
    filteredCursos = filteredCursos.filter(curso => curso.category === params.category)
  }
  
  return createPaginatedResponse(
    filteredCursos,
    params?.page || 1,
    params?.limit || 10
  )
}

/**
 * Buscar curso por slug
 */
export async function getCursoBySlug(slug: string): Promise<any | null> {
  const { MOCK_CURSOS } = await import('./mock-data')
  const curso = MOCK_CURSOS.find(c => c.slug === slug)
  return curso || null
}

/**
 * Buscar cursos em destaque
 */
export async function getFeaturedCursos(limit: number = 3): Promise<MockResponse<any>> {
  const { MOCK_CURSOS } = await import('./mock-data')
  const publishedCursos = MOCK_CURSOS
    .filter(curso => curso.status === 'published')
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))

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

/**
 * Buscar posts com filtros e paginação
 */
export async function getPosts(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<MockResponse<any>> {
  const { MOCK_POSTS } = await import('./mock-data')
  
  // Aplicar filtros
  let filteredPosts = MOCK_POSTS
  
  if (params?.status) {
    filteredPosts = filteredPosts.filter(post => post.status === params.status)
  }
  
  if (params?.category) {
    filteredPosts = filteredPosts.filter(post => 
      post.categoria && post.categoria.slug === params.category
    )
  }
  
  return createPaginatedResponse(
    filteredPosts,
    params?.page || 1,
    params?.limit || 10
  )
}

/**
 * Buscar post por slug
 */
export async function getPostBySlug(slug: string): Promise<any | null> {
  const { MOCK_POSTS } = await import('./mock-data')
  const post = MOCK_POSTS.find(p => p.slug === slug)
  return post || null
}

/**
 * Buscar posts em destaque
 */
export async function getFeaturedPosts(limit: number = 3): Promise<MockResponse<any>> {
  const { MOCK_POSTS } = await import('./mock-data')
  const publishedPosts = MOCK_POSTS.filter(post => post.status === 'published')
  
  return {
    docs: publishedPosts.slice(0, limit),
    totalDocs: publishedPosts.length,
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

/**
 * Buscar categorias
 */
export async function getCategorias(): Promise<MockResponse<any>> {
  const { MOCK_CATEGORIAS } = await import('./mock-data')
  
  return {
    docs: MOCK_CATEGORIAS,
    totalDocs: MOCK_CATEGORIAS.length,
    limit: MOCK_CATEGORIAS.length,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

/**
 * Buscar categoria por slug
 */
export async function getCategoriaBySlug(slug: string): Promise<any | null> {
  const { MOCK_CATEGORIAS } = await import('./mock-data')
  const categoria = MOCK_CATEGORIAS.find(c => c.slug === slug)
  return categoria || null
}

// Exportar tipos para compatibilidade
export type { MockResponse }
export type PayloadResponse<T> = MockResponse<T>