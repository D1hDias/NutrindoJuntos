import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a missão, visão e equipe do NUTRINDO JUNTOS.',
}

export default function SobrePage() {
  return (
    <main className="container mx-auto px-4 py-16">
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

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Equipe</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Team members will be loaded here from CMS */}
            <div className="rounded-lg border p-6">
              <p className="text-muted-foreground">
                🚧 Em breve: Membros da equipe serão carregados do CMS
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
