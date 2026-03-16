import { fetchFromPayload, fetchBySlug } from '../payload'
import type { Curso } from '@/types/payload'

/**
 * Fetch all published courses
 */
export async function getCursos(limit: number = 10, page: number = 1) {
  try {
    const response = await fetchFromPayload<Curso>(
      `/cursos?where[status][equals]=published&limit=${limit}&page=${page}&sort=-createdAt`
    )
    return response
  } catch (error) {
    console.error('Error fetching cursos:', error)
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    }
  }
}

/**
 * Fetch a single course by slug
 */
export async function getCursoBySlug(slug: string) {
  try {
    return await fetchBySlug<Curso>('cursos', slug)
  } catch (error) {
    console.error('Error fetching curso by slug:', error)
    return null
  }
}

/**
 * Fetch featured courses
 */
export async function getFeaturedCursos(limit: number = 3) {
  try {
    const response = await fetchFromPayload<Curso>(
      `/cursos?where[status][equals]=published&where[isPremium][equals]=true&limit=${limit}&sort=-createdAt`
    )
    return response.docs
  } catch (error) {
    console.error('Error fetching featured cursos:', error)
    return []
  }
}

/**
 * Fetch courses by level
 */
export async function getCursosByLevel(level: string, limit: number = 10) {
  try {
    const response = await fetchFromPayload<Curso>(
      `/cursos?where[level][equals]=${level}&where[status][equals]=published&limit=${limit}&sort=-createdAt`
    )
    return response.docs
  } catch (error) {
    console.error('Error fetching cursos by level:', error)
    return []
  }
}
