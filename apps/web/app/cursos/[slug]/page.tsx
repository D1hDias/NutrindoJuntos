import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCursoBySlug, getCursos } from '@/lib/database'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LeadForm } from '@/components/forms/LeadForm'
import { PaymentOptions } from '@/components/courses/PaymentButton'
import { CourseSchema } from '@/components/seo/CourseSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { RichTextRenderer } from '@/components/blog/RichTextRenderer'
import { NCAContent } from '@/components/courses/NCAContent'
import { NCEContent } from '@/components/courses/NCEContent'
import type { Curso, Media } from '@/types/payload'

// Função para mapear níveis para labels em português
const getLevelLabel = (level: string) => {
  const labels: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado'
  }
  return labels[level] || level
}

interface CursoPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CursoPageProps): Promise<Metadata> {
  const { slug } = await params
  const rawCurso = await getCursoBySlug(slug)

  if (!rawCurso) {
    return {
      title: 'Curso não encontrado',
    }
  }

  const curso = rawCurso as Curso

  const featuredImage = typeof curso.featuredImage === 'object'
    ? (curso.featuredImage as Media)
    : undefined

  const cursoUrl = `/cursos/${curso.slug}`
  const imageUrl = featuredImage?.url || '/og-image.jpg'

  return {
    title: curso.title,
    description: curso.description,
    keywords: ['curso de nutrição', curso.level, 'educação nutricional', 'NUTRINDO JUNTOS'],
    openGraph: {
      type: 'website',
      url: cursoUrl,
      title: curso.title,
      description: curso.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: curso.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: curso.title,
      description: curso.description,
      images: [imageUrl],
    },
  }
}

export default async function CursoPage({ params }: CursoPageProps) {
  const { slug } = await params
  const rawCurso = await getCursoBySlug(slug)

  if (!rawCurso) {
    notFound()
  }

  const curso = rawCurso as Curso

  const featuredImage = typeof curso.featuredImage === 'object'
    ? (curso.featuredImage as Media)
    : undefined

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Cursos', href: '/cursos' },
    { label: curso.title },
  ]

  const cursoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/cursos/${curso.slug}`

  return (
    <>
      {/* SEO Schema.org markup */}
      <CourseSchema
        name={curso.title}
        description={curso.description}
        provider="NUTRINDO JUNTOS"
        url={cursoUrl}
        imageUrl={featuredImage?.url}
        price={curso.price}
        priceCurrency="BRL"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbItems} />

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="outline" className="text-primary-700 border-primary-200">
                  {getLevelLabel(curso.level)}
                </Badge>
                {curso.practicalFocus && (
                  <Badge className="bg-amber-500 text-white">
                    100% Prático
                  </Badge>
                )}
                {curso.duration && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{curso.duration}</span>
                  </>
                )}
                {curso.status === 'coming_soon' && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      Em breve
                    </Badge>
                  </>
                )}
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                {curso.title}
              </h1>

              {curso.headline && (
                <h2 className="mb-6 text-2xl font-medium text-primary-600 italic">
                  "{curso.headline}"
                </h2>
              )}

              <p className="text-xl text-muted-foreground">
                {curso.description}
              </p>

              {/* Target Audience */}
              {curso.targetAudience && (
                <div className="mt-6 rounded-lg bg-primary-50 p-4 border-l-4 border-primary-500">
                  <h3 className="font-semibold text-primary-900 mb-2">Ideal para:</h3>
                  <p className="text-primary-800">{curso.targetAudience}</p>
                </div>
              )}
            </header>

            {/* Featured Image */}
            {featuredImage && (
              <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={featuredImage.url}
                  alt={featuredImage.alt || curso.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                />
              </div>
            )}

            {/* Content */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-graphite">Sobre o Curso</h2>
              {curso.slug === 'nca-nutricao-clinica-aplicada' ? (
                <NCAContent />
              ) : curso.slug === 'nce-nutricao-clinica-estrategica' ? (
                <NCEContent />
              ) : (
                <RichTextRenderer
                  content={curso.content}
                  className="mb-8"
                />
              )}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Payment Card */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <PaymentOptions course={{
                slug: curso.slug,
                title: curso.title,
                price: curso.price,
                paymentLink: curso.paymentLink,
                isLive: curso.isLive
              }} />

              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={`https://wa.me/5521980082458?text=${encodeURIComponent(`Olá! Estou interessado em saber mais sobre o curso ${curso.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar com a Equipe
                  </a>
                </Button>
              </div>
            </div>

            {/* Course Features */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold mb-4">O que está incluso:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Acesso vitalício</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Certificado de conclusão</span>
                </div>
                {curso.practicalFocus && (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Casos práticos reais</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Suporte da equipe</span>
                </div>
                {curso.modules && (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{curso.modules} módulos completos</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Interest Form */}
      <div className="mt-16">
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-8 md:p-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-primary-900">
                Tenho Interesse Neste Curso
              </h2>
              <p className="text-lg text-primary-700">
                Preencha o formulário abaixo e entraremos em contato com mais informações sobre o curso, datas disponíveis e valores.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md md:p-8">
              <LeadForm type="cursos" cursoSlug={curso.slug} cursoTitle={curso.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-12">
        <Button variant="outline" asChild>
          <Link href="/cursos">← Voltar para Cursos</Link>
        </Button>
      </div>
    </main>
    </>
  )
}

// Generate static params for all courses
export async function generateStaticParams() {
  try {
    const { docs: cursos } = await getCursos({ status: 'published' })
    const typedCursos = (cursos || []) as Curso[]

    return typedCursos.map((curso: Curso) => ({
      slug: curso.slug,
    }))
  } catch (error) {
    console.warn('Error generating static params for courses:', error)
    return []
  }
}
