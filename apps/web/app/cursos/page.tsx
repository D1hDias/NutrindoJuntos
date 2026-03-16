import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CourseCard } from '@/components/cards/CourseCard'
import { CallToAction } from '@/components/sections/CallToAction'
import { getCursos } from '@/lib/payload'
import type { Curso, Media } from '@/types/payload'

export const metadata: Metadata = {
  title: 'Cursos',
  description: 'Cursos de nutrição para estudantes e profissionais em início de carreira.',
}

export default async function CursosPage() {
  // Fetch real courses from CMS
  const { docs: cursos } = await getCursos({ status: 'published' })
  const typedCursos = (cursos || []) as Curso[]
  return (
    <main className="container mx-auto px-4 py-16">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Cursos' },
        ]}
      />

      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-600 md:text-5xl">
          Cursos
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Aprenda nutrição com especialistas de forma prática e acessível
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {typedCursos.length > 0 ? (
          typedCursos.map((curso: Curso) => {
            const featuredImage = typeof curso.featuredImage === 'object'
              ? (curso.featuredImage as Media)?.url
              : undefined

            return (
              <CourseCard
                key={curso.id}
                title={curso.title}
                description={curso.description}
                slug={curso.slug}
                thumbnail={featuredImage}
                level={curso.level}
                duration={curso.duration}
                price={curso.price}
                isComingSoon={curso.status === 'coming_soon'}
              />
            )
          })
        ) : (
          <div className="col-span-full rounded-lg border p-12 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum curso publicado ainda. Crie seu primeiro curso no CMS!
            </p>
          </div>
        )}
      </div>

      <div className="mt-16">
        <CallToAction
          title="Dúvidas sobre qual curso escolher?"
          description="Nossa equipe está pronta para te ajudar a escolher o melhor caminho"
          primaryCta={{
            text: 'Falar com Especialista',
            href: '/contato',
          }}
          secondaryCta={{
            text: 'Ver Blog',
            href: '/blog',
          }}
        />
      </div>
    </main>
  )
}
