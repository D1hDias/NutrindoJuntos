'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Clock,
  Star,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  TrendingUp,
} from 'lucide-react'
import type { Curso, Media } from '@/types'

interface CourseCatalogProps {
  courses: Curso[]
}

type SortOption = 'best-sellers' | 'price-asc' | 'price-desc' | 'newest' | 'rating'
type LevelFilter = 'all' | 'iniciante' | 'intermediario' | 'avancado'
type CategoryFilter = string

const CATEGORY_LABELS: Record<string, string> = {
  clinica: 'Nutrição Clínica',
  esportiva: 'Nutrição Esportiva',
  funcional: 'Nutrição Funcional',
  gestao: 'Gestão & Empreendedorismo',
  marketing: 'Marketing',
  mentoria: 'Mentoria',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

const SORT_LABELS: Record<SortOption, string> = {
  'best-sellers': 'Mais Vendidos',
  'price-asc': 'Menor Preço',
  'price-desc': 'Maior Preço',
  newest: 'Mais Recentes',
  rating: 'Melhor Avaliados',
}

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('best-sellers')
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')

  // Extract unique categories from courses
  const categories = useMemo(() => {
    const cats = new Set(
      courses
        .map((c) => c.category?.slug)
        .filter((slug): slug is string => Boolean(slug))
    )
    return Array.from(cats)
  }, [courses])

  // Filter and sort
  const filteredCourses = useMemo(() => {
    let result = [...courses]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.headline?.toLowerCase().includes(q)
      )
    }

    // Level filter
    if (levelFilter !== 'all') {
      result = result.filter((c) => c.level === levelFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((c) => c.category?.slug === categoryFilter)
    }

    // Sort
    switch (sort) {
      case 'best-sellers':
        result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => {
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          return dateB - dateA
        })
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
    }

    return result
  }, [courses, search, sort, levelFilter, categoryFilter])

  const activeFiltersCount =
    (levelFilter !== 'all' ? 1 : 0) +
    (categoryFilter !== 'all' ? 1 : 0) +
    (search.trim() ? 1 : 0)

  const clearFilters = () => {
    setSearch('')
    setLevelFilter('all')
    setCategoryFilter('all')
    setSort('best-sellers')
  }

  return (
    <div>
      {/* Filters Bar */}
      <div className="mb-8 space-y-4">
        {/* Search + Sort Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-neutral-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Chips Row */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-neutral-500" />

          {/* Level Filter */}
          <button
            onClick={() => setLevelFilter('all')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              levelFilter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Todos os Níveis
          </button>
          {Object.entries(LEVEL_LABELS).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setLevelFilter(value as LevelFilter)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                levelFilter === value
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {label}
            </button>
          ))}

          {/* Divider */}
          <div className="mx-1 h-6 w-px bg-neutral-200" />

          {/* Category Filter */}
          <button
            onClick={() => setCategoryFilter('all')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              categoryFilter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Todas as Categorias
          </button>
          {categories.map((cat) => cat && (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as string)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <>
              <div className="mx-1 h-6 w-px bg-neutral-200" />
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="h-3 w-3" />
                Limpar filtros
              </button>
            </>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {filteredCourses.length === courses.length
            ? `${courses.length} cursos disponíveis`
            : `${filteredCourses.length} de ${courses.length} cursos`}
        </p>
        {sort === 'best-sellers' && (
          <div className="flex items-center gap-1 text-sm text-amber-600">
            <TrendingUp className="h-4 w-4" />
            <span>Ordenado por vendas</span>
          </div>
        )}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => {
            const featuredImage =
              typeof course.featuredImage === 'object'
                ? (course.featuredImage as Media)
                : undefined

            return (
              <Link
                key={course.id}
                href={`/cursos/${course.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:shadow-lg hover:border-primary-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  {featuredImage?.url ? (
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.alt || course.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                      <BookOpen className="h-12 w-12 text-primary-400" />
                    </div>
                  )}

                  {/* Best seller badge */}
                  {sort === 'best-sellers' && index < 3 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-amber-500 text-white shadow-md">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Top {index + 1}
                      </Badge>
                    </div>
                  )}

                  {/* Price */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/95 text-primary-700 font-bold shadow-md">
                      {course.price === 0
                        ? 'Gratuito'
                        : course.price < 100
                          ? `R$ ${course.price.toFixed(2).replace('.', ',')}/mês`
                          : `R$ ${course.price.toFixed(0)}`}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Meta */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-primary-50 text-primary-600">
                      {LEVEL_LABELS[course.level || ''] || course.level}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.category?.slug ? (CATEGORY_LABELS[course.category.slug] || course.category.name) : ''}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 text-lg font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Headline */}
                  {course.headline && (
                    <p className="mb-2 text-sm italic text-primary-600">
                      &ldquo;{course.headline}&rdquo;
                    </p>
                  )}

                  {/* Description */}
                  <p className="mb-4 flex-1 text-sm text-neutral-500 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      {course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {course.duration}
                        </span>
                      )}
                      {course.modules ? (
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {course.modules} módulos
                        </span>
                      ) : null}
                    </div>

                    {course.rating && (
                      <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-neutral-200 p-12 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
          <h3 className="mb-2 text-lg font-semibold text-neutral-700">
            Nenhum curso encontrado
          </h3>
          <p className="mb-4 text-sm text-neutral-500">
            Tente ajustar os filtros ou termos de busca
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
