/**
 * DATABASE LAYER - Sistema Híbrido Mock/Supabase
 *
 * Decide automaticamente entre Mock Data (desenvolvimento) e Supabase (produção)
 * baseado na variável de ambiente NEXT_PUBLIC_USE_MOCK_DATA
 */

import { isSupabaseConfigured } from './supabase/client'
import type { PaginatedResponse } from './supabase/queries'

/**
 * Verifica se deve usar mock data
 */
function useMockData(): boolean {
  // Se variável explícita estiver definida, usar ela
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA !== undefined) {
    return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
  }

  // Se Supabase não configurado, forçar mock data
  if (!isSupabaseConfigured()) {
    console.warn('⚠️  Supabase não configurado. Usando mock data.')
    return true
  }

  // Padrão: produção usa Supabase, dev usa mock
  return process.env.NODE_ENV === 'development'
}

// ============================================
// CURSOS
// ============================================

export async function getCursos(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<PaginatedResponse<any>> {
  if (useMockData()) {
    const { getCursos: getMockCursos } = await import('./mock/queries')
    return getMockCursos(params)
  } else {
    const { getCursos: getSupabaseCursos } = await import('./supabase/queries')
    return getSupabaseCursos(params)
  }
}

export async function getCursoBySlug(slug: string): Promise<any | null> {
  if (useMockData()) {
    const { getCursoBySlug: getMockCurso } = await import('./mock/queries')
    return getMockCurso(slug)
  } else {
    const { getCursoBySlug: getSupabaseCurso } = await import('./supabase/queries')
    return getSupabaseCurso(slug)
  }
}

export async function getFeaturedCursos(
  limit: number = 3
): Promise<PaginatedResponse<any>> {
  if (useMockData()) {
    const { getFeaturedCursos: getMockFeatured } = await import('./mock/queries')
    return getMockFeatured(limit)
  } else {
    const { getFeaturedCursos: getSupabaseFeatured } = await import('./supabase/queries')
    return getSupabaseFeatured(limit)
  }
}

// ============================================
// POSTS
// ============================================

export async function getPosts(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<PaginatedResponse<any>> {
  if (useMockData()) {
    const { getPosts: getMockPosts } = await import('./mock/queries')
    return getMockPosts(params)
  } else {
    const { getPosts: getSupabasePosts } = await import('./supabase/queries')
    return getSupabasePosts(params)
  }
}

export async function getPostBySlug(slug: string): Promise<any | null> {
  if (useMockData()) {
    const { getPostBySlug: getMockPost } = await import('./mock/queries')
    return getMockPost(slug)
  } else {
    const { getPostBySlug: getSupabasePost } = await import('./supabase/queries')
    return getSupabasePost(slug)
  }
}

export async function getFeaturedPosts(
  limit: number = 3
): Promise<PaginatedResponse<any>> {
  if (useMockData()) {
    const { getFeaturedPosts: getMockFeatured } = await import('./mock/queries')
    return getMockFeatured(limit)
  } else {
    const { getFeaturedPosts: getSupabaseFeatured } = await import('./supabase/queries')
    return getSupabaseFeatured(limit)
  }
}

// ============================================
// CATEGORIAS
// ============================================

export async function getCategorias(): Promise<PaginatedResponse<any>> {
  if (useMockData()) {
    const { getCategorias: getMockCategorias } = await import('./mock/queries')
    return getMockCategorias()
  } else {
    const { getCategorias: getSupabaseCategorias } = await import('./supabase/queries')
    return getSupabaseCategorias()
  }
}

export async function getCategoriaBySlug(
  slug: string
): Promise<any | null> {
  if (useMockData()) {
    const { getCategoriaBySlug: getMockCategoria } = await import('./mock/queries')
    return getMockCategoria(slug)
  } else {
    const { getCategoriaBySlug: getSupabaseCategoria } = await import('./supabase/queries')
    return getSupabaseCategoria(slug)
  }
}

// ============================================
// EQUIPE
// ============================================

export async function getEquipe(): Promise<PaginatedResponse<any>> {
  if (useMockData()) {
    const { getEquipe: getMockEquipe } = await import('./mock/queries')
    return getMockEquipe()
  } else {
    const { getEquipe: getSupabaseEquipe } = await import('./supabase/queries')
    return getSupabaseEquipe()
  }
}

// ============================================
// EXPORTAR TIPOS
// ============================================

export type { PaginatedResponse }
export type DatabaseResponse<T> = PaginatedResponse<T>

/**
 * Log do modo de operação atual
 */
if (typeof window === 'undefined') {
  // Server-side log
  console.log(
    `📊 Database Mode: ${useMockData() ? 'MOCK DATA' : 'SUPABASE'}`
  )
}
