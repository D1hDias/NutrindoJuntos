import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CallToAction } from '@/components/sections/CallToAction'
import { CourseCatalog } from '@/components/courses/CourseCatalog'
import { getCursos } from '@/lib/database'
import type { Curso } from '@/types/payload'

export const metadata: Metadata = {
  title: 'Todos os Cursos',
  description:
    'Explore todos os cursos, mentorias e programas da NUTRINDO JUNTOS. Nutrição clínica, empreendedorismo, direcionamento de carreira e muito mais.',
}

export default async function CursosPage() {
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

      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Nossos Cursos e Programas
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-500">
          Do primeiro passo à excelência profissional — encontre o programa ideal para o seu
          momento de carreira
        </p>
      </div>

      <CourseCatalog courses={typedCursos} />

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
