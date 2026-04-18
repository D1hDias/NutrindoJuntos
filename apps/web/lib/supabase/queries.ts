/**
 * SUPABASE QUERIES
 * Funções para buscar dados do Supabase
 */

import { supabase } from './client'
import type { Database } from './types'

type Curso = Database['public']['Tables']['cursos']['Row']
type Post = Database['public']['Tables']['posts']['Row']
type Categoria = Database['public']['Tables']['categorias']['Row']
type Equipe = Database['public']['Tables']['equipe']['Row']

/**
 * Interface de resposta paginada (compatível com mock data)
 */
export interface PaginatedResponse<T> {
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
 * Parâmetros de paginação
 */
interface PaginationParams {
  page?: number
  limit?: number
}

/**
 * Criar resposta paginada
 */
function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit)

  return {
    docs: data,
    totalDocs: total,
    limit,
    totalPages,
    page,
    pagingCounter: (page - 1) * limit + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  }
}

// ============================================
// CURSOS
// ============================================

export async function getCursos(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<PaginatedResponse<Curso>> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const page = params?.page || 1
  const limit = params?.limit || 10
  const offset = (page - 1) * limit

  let query = supabase
    .from('cursos')
    .select('*', { count: 'exact' })

  // Filtros
  if (params?.status) {
    query = query.eq('status', params.status)
  } else {
    query = query.eq('status', 'published')
  }

  if (params?.category) {
    // Buscar ID da categoria pelo slug
    const { data: categoria } = await supabase
      .from('categorias')
      .select('id')
      .eq('slug', params.category)
      .single()

    if (categoria) {
      query = query.eq('categoria_id', (categoria as { id: string }).id)
    }
  }

  // Paginação
  query = query
    .range(offset, offset + limit - 1)
    .order('published_at', { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error('Erro ao buscar cursos:', error)
    throw error
  }

  return createPaginatedResponse(data || [], count || 0, page, limit)
}

export async function getCursoBySlug(slug: string): Promise<Curso | null> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error } = await supabase
    .from('cursos')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Erro ao buscar curso:', error)
    return null
  }

  return data
}

export async function getFeaturedCursos(
  limit: number = 3
): Promise<PaginatedResponse<Curso>> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error, count } = await supabase
    .from('cursos')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('sales_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Erro ao buscar cursos em destaque:', error)
    throw error
  }

  return createPaginatedResponse(data || [], count || 0, 1, limit)
}

// ============================================
// POSTS (BLOG)
// ============================================

export async function getPosts(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<PaginatedResponse<Post>> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const page = params?.page || 1
  const limit = params?.limit || 10
  const offset = (page - 1) * limit

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })

  // Filtros
  if (params?.status) {
    query = query.eq('status', params.status)
  } else {
    query = query.eq('status', 'published')
  }

  if (params?.category) {
    // Buscar ID da categoria pelo slug
    const { data: categoria } = await supabase
      .from('categorias')
      .select('id')
      .eq('slug', params.category)
      .single()

    if (categoria) {
      query = query.eq('categoria_id', (categoria as { id: string }).id)
    }
  }

  // Paginação
  query = query
    .range(offset, offset + limit - 1)
    .order('published_at', { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }

  return createPaginatedResponse(data || [], count || 0, page, limit)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Erro ao buscar post:', error)
    return null
  }

  // Incrementar views
  if (data) {
    await supabase.rpc('increment_post_views', { post_id: (data as any).id } as any)
  }

  return data
}

export async function getFeaturedPosts(
  limit: number = 3
): Promise<PaginatedResponse<Post>> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Erro ao buscar posts em destaque:', error)
    throw error
  }

  return createPaginatedResponse(data || [], count || 0, 1, limit)
}

// ============================================
// CATEGORIAS
// ============================================

export async function getCategorias(): Promise<PaginatedResponse<Categoria>> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error, count } = await supabase
    .from('categorias')
    .select('*', { count: 'exact' })
    .order('ordem', { ascending: true })

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    throw error
  }

  return createPaginatedResponse(
    data || [],
    count || 0,
    1,
    data?.length || 0
  )
}

export async function getCategoriaBySlug(
  slug: string
): Promise<Categoria | null> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Erro ao buscar categoria:', error)
    return null
  }

  return data
}

// ============================================
// EQUIPE
// ============================================

export async function getEquipe(): Promise<PaginatedResponse<Equipe>> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { data, error, count } = await supabase
    .from('equipe')
    .select('*', { count: 'exact' })
    .eq('ativo', true)
    .order('ordem', { ascending: true })

  if (error) {
    console.error('Erro ao buscar equipe:', error)
    throw error
  }

  return createPaginatedResponse(
    data || [],
    count || 0,
    1,
    data?.length || 0
  )
}
