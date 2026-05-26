import type { Categoria } from '@/types'
import { getCategorias as getCategoriasFromMock, getPosts as getPostsFromMock } from '../mock-data'

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
  return getCategoriasFromMock()
}

/**
 * Get posts by category
 */
export async function getPostsByCategoria(
  categoriaSlug: string,
  limit: number = 10,
  page: number = 1
) {
  return getPostsFromMock({
    limit,
    page,
    status: 'published',
    category: categoriaSlug,
  })
}
