import { fetchFromPayload } from '../payload'
import type { Categoria } from '@/types/payload'
import { MOCK_CATEGORIAS, shouldUseMockData } from '../mock-data'

export interface CategoriasResponse {
  docs: Categoria[]
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
 * Get all categories
 */
export async function getCategorias(): Promise<CategoriasResponse> {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    return {
      docs: MOCK_CATEGORIAS,
      totalDocs: MOCK_CATEGORIAS.length,
      limit: 100,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  }

  try {
    const response = await fetchFromPayload<Categoria>(
      '/categorias?limit=100&sort=name'
    )

    // Fallback to mock data if no categories found
    if (response.docs.length === 0) {
      return getCategorias() // This will use mock data
    }

    return response
  } catch (error) {
    console.error('Error fetching categorias:', error)
    // Fallback to mock data on error
    return {
      docs: MOCK_CATEGORIAS,
      totalDocs: MOCK_CATEGORIAS.length,
      limit: 100,
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

/**
 * Get posts by category
 */
export async function getPostsByCategoria(
  categoriaSlug: string,
  limit: number = 10,
  page: number = 1
) {
  try {
    const response = await fetchFromPayload(
      `/posts?where[categoria.slug][equals]=${categoriaSlug}&where[status][equals]=published&limit=${limit}&page=${page}&sort=-publishedAt`
    )
    return response
  } catch (error) {
    console.error('Error fetching posts by categoria:', error)
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  }
}
