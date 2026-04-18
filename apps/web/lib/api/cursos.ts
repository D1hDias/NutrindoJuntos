import type { Curso } from '@/types'
import { getCursos as getCursosFromMock, getCursoBySlug as getCursoBySlugFromMock, getFeaturedCursos as getFeaturedCursosFromMock } from '../mock-data'

/**
 * Fetch all published courses
 */
export async function getCursos(limit: number = 10, page: number = 1) {
  return getCursosFromMock({ limit, page, status: 'published' })
}

/**
 * Fetch a single course by slug
 */
export async function getCursoBySlug(slug: string) {
  return getCursoBySlugFromMock(slug)
}

/**
 * Fetch featured courses
 */
export async function getFeaturedCursos(limit: number = 3) {
  const response = await getFeaturedCursosFromMock(limit)
  return response.docs
}

/**
 * Fetch courses by level
 */
export async function getCursosByLevel(level: string, limit: number = 10) {
  const { MOCK_CURSOS } = await import('../mock-data')
  const filteredCursos = MOCK_CURSOS.filter(
    curso => curso.level === level && curso.status === 'published'
  )
  return filteredCursos.slice(0, limit)
}
