import { getPosts as getPostsFromMock, getPostBySlug as getPostBySlugFromMock } from '../mock-data'

/**
 * Fetch all published posts
 */
export async function getPosts(
  limit: number = 10,
  page: number = 1,
  categorySlug?: string
) {
  return getPostsFromMock({
    limit,
    page,
    status: 'published',
    category: categorySlug,
  })
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string) {
  return getPostBySlugFromMock(slug)
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
  const response = await getPosts(limit, 1, categorySlug)
  return response.docs
}

/**
 * Fetch related posts based on category (excluding current post)
 */
export async function getRelatedPosts(
  currentPostId: string,
  categorySlug: string | undefined,
  limit: number = 3
) {
  if (!categorySlug) {
    const response = await getPosts(limit + 1, 1)
    return response.docs.filter((post: any) => post.id !== currentPostId).slice(0, limit)
  }

  const response = await getPosts(limit + 1, 1, categorySlug)
  return response.docs.filter((post: any) => post.id !== currentPostId).slice(0, limit)
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
  const response = await getPosts(100, 1, categorySlug)
  const q = query.toLowerCase()

  const filtered = response.docs.filter((post: any) =>
    post.title.toLowerCase().includes(q) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(q))
  )

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginated = filtered.slice(startIndex, endIndex)

  return {
    docs: paginated,
    totalDocs: filtered.length,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: endIndex < filtered.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: endIndex < filtered.length ? page + 1 : null,
  }
}
