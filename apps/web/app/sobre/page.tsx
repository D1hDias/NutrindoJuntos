import type { Metadata } from 'next'
import { TeamGrid } from '@/components/sobre/TeamGrid'

export const metadata: Metadata = {
  title: 'Sobre | Nutrindo Juntos',
  description: 'Conheça a missão, visão e a equipe de especialistas do NUTRINDO JUNTOS.',
}

export default function SobrePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-600 md:text-5xl">
          Sobre Nós
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Nossa missão é democratizar a educação em nutrição
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Nossa Missão</h2>
          <p className="text-muted-foreground">
            Fornecer educação em nutrição de qualidade, acessível e prática para estudantes
            e profissionais em início de carreira, promovendo o desenvolvimento profissional
            e a transformação de vidas através da nutrição.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Nossa Visão</h2>
          <p className="text-muted-foreground">
            Ser referência em educação nutricional online, conectando conhecimento científico
            à prática profissional de forma humanizada e acessível.
          </p>
        </section>
      </div>

      {/* Equipe */}
      <section className="mt-16" id="equipe">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-primary-500">Nossa Equipe</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-graphite md:text-4xl">
            Especialistas que unem{' '}
            <span className="text-primary-600">prática, ciência e ensino</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500">
            Nutricionistas e especialistas que atuam na clínica, no ensino e na formação
            profissional — conectando teoria, aplicação e realidade de mercado.
          </p>
        </div>

        <TeamGrid />
      </section>
    </main>
  )
}
