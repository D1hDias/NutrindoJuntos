import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/api/posts'
import { getCategorias } from '@/lib/api/categorias'
import { getCursos } from '@/lib/api/cursos'
import type { Post, Curso, Categoria } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mentoria`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  try {
    // Dynamic blog posts
    const postsResponse = await getPosts(100, 1)
    const posts: MetadataRoute.Sitemap = postsResponse.docs.map((post: Post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    // Dynamic blog categories
    const categoriasResponse = await getCategorias()
    const categorias: MetadataRoute.Sitemap = categoriasResponse.docs.map((categoria: Categoria) => ({
      url: `${baseUrl}/blog/categoria/${categoria.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    // Dynamic courses
    const cursosResponse = await getCursos()
    const cursos: MetadataRoute.Sitemap = cursosResponse.docs.map((curso: Curso) => ({
      url: `${baseUrl}/cursos/${curso.slug}`,
      lastModified: curso.createdAt ? new Date(curso.createdAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

    return [...staticPages, ...posts, ...categorias, ...cursos]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least static pages if dynamic content fails
    return staticPages
  }
}
