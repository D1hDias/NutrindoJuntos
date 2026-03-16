import { fetchFromPayload, fetchBySlug } from '../payload'
import type { Post } from '@/types/payload'
import { MOCK_POSTS, shouldUseMockData } from '../mock-data'

/**
 * Fetch all published posts
 */
export async function getPosts(
  limit: number = 10,
  page: number = 1,
  categorySlug?: string
) {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    let filteredPosts = [...MOCK_POSTS]

    // Filter by category if provided
    if (categorySlug) {
      filteredPosts = filteredPosts.filter(
        (post) => typeof post.categoria === 'object' && post.categoria.slug === categorySlug
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return {
      docs: paginatedPosts,
      totalDocs: filteredPosts.length,
      limit,
      totalPages: Math.ceil(filteredPosts.length / limit),
      page,
      pagingCounter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: endIndex < filteredPosts.length,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: endIndex < filteredPosts.length ? page + 1 : null,
    }
  }

  try {
    let url = `/posts?where[status][equals]=published&limit=${limit}&page=${page}&sort=-publishedAt`

    // Add category filter if provided
    if (categorySlug) {
      url += `&where[categoria.slug][equals]=${encodeURIComponent(categorySlug)}`
    }

    const response = await fetchFromPayload<Post>(url)

    // Fallback to mock data if no posts found
    if (response.docs.length === 0) {
      return getPosts(limit, page, categorySlug) // This will use mock data
    }

    return response
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Fallback to mock data on error
    if (shouldUseMockData()) {
      return getPosts(limit, page, categorySlug)
    }
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
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string) {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    const post = MOCK_POSTS.find((p) => p.slug === slug)
    return post || null
  }

  try {
    const post = await fetchBySlug<Post>('posts', slug)
    // Fallback to mock data if not found
    if (!post) {
      return MOCK_POSTS.find((p) => p.slug === slug) || null
    }
    return post
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    // Fallback to mock data on error
    return MOCK_POSTS.find((p) => p.slug === slug) || null
  }
}

/**
 * Fetch recent posts (for sidebar, footer, etc)
 */
export async function getRecentPosts(limit: number = 5) {
  const response = await getPosts(limit, 1)
  return response.docs
}

/**
 * Fetch posts by category
 */
export async function getPostsByCategory(categorySlug: string, limit: number = 10) {
  try {
    const response = await fetchFromPayload<Post>(
      `/posts?where[categoria.slug][equals]=${categorySlug}&where[status][equals]=published&limit=${limit}&sort=-publishedAt`
    )
    return response.docs
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

/**
 * Fetch related posts based on category (excluding current post)
 */
export async function getRelatedPosts(
  currentPostId: string,
  categorySlug: string | undefined,
  limit: number = 3
) {
  try {
    // If no category, just get recent posts
    if (!categorySlug) {
      const response = await getPosts(limit + 1, 1)
      return response.docs.filter((post) => post.id !== currentPostId).slice(0, limit)
    }

    // Get posts from the same category
    const response = await fetchFromPayload<Post>(
      `/posts?where[categoria.slug][equals]=${categorySlug}&where[status][equals]=published&limit=${limit + 1}&sort=-publishedAt`
    )

    // Exclude current post and return up to limit
    return response.docs.filter((post) => post.id !== currentPostId).slice(0, limit)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

/**
 * Search posts by title or excerpt
 */
export async function searchPosts(
  query: string,
  limit: number = 10,
  page: number = 1,
  categorySlug?: string
) {
  try {
    // Search in title or excerpt using Payload's 'or' operator
    let url = `/posts?where[or][0][title][contains]=${encodeURIComponent(query)}&where[or][1][excerpt][contains]=${encodeURIComponent(query)}&where[status][equals]=published&limit=${limit}&page=${page}&sort=-publishedAt`

    // Add category filter if provided
    if (categorySlug) {
      url += `&where[categoria.slug][equals]=${encodeURIComponent(categorySlug)}`
    }

    const response = await fetchFromPayload<Post>(url)
    return response
  } catch (error) {
    console.error('Error searching posts:', error)
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
