'use client'

import { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { PostCard } from '@/components/cards/PostCard'
import { CallToAction } from '@/components/sections/CallToAction'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'
import type { Post, Media, Categoria } from '@/types/payload'

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  const POSTS_PER_PAGE = 9

  useEffect(() => {
    fetchCategorias()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [currentPage, searchQuery, selectedCategory])

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/api/categorias')
      const data = await response.json()
      setCategorias(data.docs || [])
    } catch (error) {
      console.error('Error fetching categorias:', error)
    }
  }

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      let endpoint = ''

      if (searchQuery) {
        endpoint = `/api/posts/search?q=${encodeURIComponent(searchQuery)}&limit=${POSTS_PER_PAGE}&page=${currentPage}`
        if (selectedCategory) {
          endpoint += `&category=${encodeURIComponent(selectedCategory)}`
        }
      } else if (selectedCategory) {
        endpoint = `/api/posts?category=${encodeURIComponent(selectedCategory)}&limit=${POSTS_PER_PAGE}&page=${currentPage}`
      } else {
        endpoint = `/api/posts?limit=${POSTS_PER_PAGE}&page=${currentPage}`
      }

      const response = await fetch(endpoint)
      const data = await response.json()

      setPosts(data.docs || [])
      setTotalPages(data.totalPages || 0)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
      setTotalPages(0)
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    setIsSearching(true)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
    setIsSearching(true)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-600 md:text-5xl">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Artigos, dicas e novidades sobre nutrição, saúde e bem-estar
        </p>
      </div>

      {/* Category Filters */}
      {categorias.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtrar por categoria:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!selectedCategory ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                setSelectedCategory('')
                setCurrentPage(1)
              }}
            >
              Todas
            </Badge>
            {categorias.map((categoria) => (
              <Badge
                key={categoria.id}
                variant={selectedCategory === categoria.slug ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedCategory(categoria.slug)
                  setCurrentPage(1)
                }}
              >
                {categoria.name}
                {selectedCategory === categoria.slug && (
                  <X className="ml-1 h-3 w-3" onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCategory('')
                    setCurrentPage(1)
                  }} />
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8 mx-auto max-w-2xl">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artigos..."
            className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" disabled={isSearching || isLoading}>
            {isSearching ? 'Buscando...' : 'Buscar'}
          </Button>
          {searchQuery && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClearSearch}
              disabled={isLoading}
            >
              Limpar
            </Button>
          )}
        </form>
        {searchQuery && !isLoading && (
          <p className="mt-2 text-sm text-muted-foreground">
            {posts.length > 0
              ? `Encontrados ${posts.length} resultado(s) para "${searchQuery}"`
              : `Nenhum resultado para "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(POSTS_PER_PAGE)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border bg-card p-6">
              <div className="mb-4 h-48 rounded bg-muted"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post: Post) => {
                const featuredImage = typeof post.featuredImage === 'object'
                  ? (post.featuredImage as Media)?.url
                  : undefined
                const category = typeof post.categoria === 'object'
                  ? (post.categoria as Categoria)?.name
                  : undefined

                return (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    publishedAt={post.publishedAt}
                    featuredImage={featuredImage}
                    category={category}
                  />
                )
              })
            ) : (
              <div className="col-span-full rounded-lg border p-12 text-center">
                <p className="text-lg text-muted-foreground">
                  {searchQuery
                    ? 'Nenhum post encontrado. Tente outra busca.'
                    : 'Nenhum post publicado ainda. Crie seu primeiro post no CMS!'}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              >
                ← Anterior
              </Button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1

                  if (!showPage) {
                    // Show ellipsis
                    if (page === 2 && currentPage > 3) {
                      return (
                        <span key={page} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      )
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 2) {
                      return (
                        <span key={page} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      )
                    }
                    return null
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      onClick={() => handlePageChange(page)}
                      disabled={isLoading}
                      size="sm"
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
              >
                Próxima →
              </Button>
            </div>
          )}
        </>
      )}

      <div className="mt-16">
        <CallToAction
          title="Quer aprender mais sobre nutrição?"
          description="Confira nossos cursos práticos e aprofunde seus conhecimentos"
          primaryCta={{
            text: 'Ver Cursos',
            href: '/cursos',
          }}
          secondaryCta={{
            text: 'Falar com a gente',
            href: '/contato',
          }}
          variant="gradient"
        />
      </div>
    </main>
  )
}
