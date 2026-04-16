'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Star, Heart, Zap } from 'lucide-react'
import { useState } from 'react'
import { Curso, Media } from '@/types/payload'
import { PaymentButton } from '@/components/courses/PaymentButton'

interface PopularCoursesSectionProps {
  courses: Curso[]
}

// Função para mapear categorias para labels em português
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    clinica: 'Nutrição Clínica',
    esportiva: 'Nutrição Esportiva',
    funcional: 'Nutrição Funcional',
    gestao: 'Gestão de Consultório',
    marketing: 'Marketing para Nutricionistas',
    mentoria: 'Mentoria'
  }
  return labels[category] || category
}

// Função para mapear níveis para labels em português
const getLevelLabel = (level: string) => {
  const labels: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado'
  }
  return labels[level] || level
}

export function PopularCoursesSection({ courses }: PopularCoursesSectionProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(courseId)) {
        newFavorites.delete(courseId)
      } else {
        newFavorites.add(courseId)
      }
      return newFavorites
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
        }`}
      />
    ))
  }

  return (
    <section
      className="relative block pt-16 pb-16"
      style={{
        background: 'linear-gradient(256.49deg, #FFFBF5 0%, #FAEDFF 100%)',
        zIndex: 1
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-primary-500">
              Nossos Cursos
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight text-graphite lg:text-5xl">
            Mais do que Educação: Uma Jornada de{' '}
            <span className="relative inline-block">
              Excelência
              {/* Linha decorativa sob "Excelência" */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                fill="none"
              >
                <path
                  d="M0 5 L200 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.3"
                  className="text-primary-500"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const featuredImage = course.featuredImage as Media
            return (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary-300"
            >
              {/* Course Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                {featuredImage?.url ? (
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.alt || course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <p className="text-6xl font-bold text-primary-400">
                      {getCategoryLabel(course.category).charAt(0)}
                    </p>
                  </div>
                )}

                {/* Practical Focus Badge */}
                {course.practicalFocus && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-500 text-white font-medium shadow-lg hover:bg-amber-600">
                      <Zap className="w-3 h-3 mr-1" />
                      100% Prático
                    </Badge>
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-primary-600 font-bold shadow-lg">
                    {course.price === 0 ? 'Gratuito' : `R$ ${course.price.toFixed(0)}`}
                  </Badge>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-graphite/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Course Content */}
              <div className="p-5">
                {/* Category Tag and Meta Info */}
                <div className="mb-3 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="font-serif italic text-primary-500 bg-primary-50 border-primary-200"
                  >
                    {getCategoryLabel(course.category)}
                  </Badge>

                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    {course.modules && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.modules} Módulos</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="mb-2 line-clamp-2 font-display text-xl font-semibold text-graphite transition-colors group-hover:text-primary-500">
                  <Link href={`/cursos/${course.slug}`}>
                    {course.title}
                  </Link>
                </h3>

                {/* Headline */}
                {course.headline && (
                  <p className="mb-3 text-sm font-medium text-primary-600 italic">
                    "{course.headline}"
                  </p>
                )}

                {/* Description */}
                <p className="mb-4 text-sm text-neutral-600 line-clamp-2">
                  {course.description}
                </p>

                {/* Rating and Favorite */}
                <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div className="flex items-center gap-2">
                    {course.rating && (
                      <>
                        <div className="flex items-center gap-1">
                          {renderStars(course.rating)}
                        </div>
                        <span className="text-sm text-neutral-600">
                          {course.reviews || 0} Avaliações
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite(course.id)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      favorites.has(course.id)
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-neutral-300 text-neutral-400 hover:border-primary-500 hover:bg-primary-500 hover:text-white'
                    }`}
                    aria-label="Adicionar aos favoritos"
                  >
                    <Heart className={`h-5 w-5 ${favorites.has(course.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Main CTA */}
                  {course.isLive && course.paymentLink ? (
                    <PaymentButton
                      paymentLink={course.paymentLink}
                      courseSlug={course.slug}
                      courseTitle={course.title}
                      price={course.price}
                      isLive={course.isLive}
                      size="default"
                      className="w-full font-semibold"
                    />
                  ) : (
                    <Button
                      asChild
                      variant={course.isLive ? "default" : "outline"}
                      className="w-full font-semibold"
                    >
                      <Link href={`/cursos/${course.slug}`}>
                        {course.status === 'coming_soon' ? 'Em Breve' : 'Saiba Mais'}
                      </Link>
                    </Button>
                  )}

                  {/* Secondary CTA */}
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full text-primary-600 hover:text-primary-700"
                  >
                    <Link href={`/cursos/${course.slug}`}>
                      Ver Detalhes do Curso
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* View All Courses Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary-500 text-primary-500 hover:bg-primary-50"
          >
            <Link href="/cursos">
              Ver Todos os Cursos
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
