import type { Metadata } from 'next'
import { LeadForm } from '@/components/forms/LeadForm'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

export const metadata: Metadata = {
  title: 'Mentoria Personalizada',
  description: 'Mentoria individualizada para nutricionistas que querem acelerar sua carreira profissional.',
}

export default function MentoriaPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Mentoria' },
        ]}
      />

      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-600 md:text-5xl">
          Mentoria Personalizada
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Acelere sua carreira com acompanhamento individualizado de profissionais experientes
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Plano Personalizado</h3>
          <p className="text-sm text-muted-foreground">
            Estratégias específicas para seus objetivos e momento de carreira
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Sessões Individuais</h3>
          <p className="text-sm text-muted-foreground">
            Encontros personalizados com mentor experiente na sua área de interesse
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Resultados Rápidos</h3>
          <p className="text-sm text-muted-foreground">
            Metodologia comprovada para acelerar seu crescimento profissional
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Materiais Exclusivos</h3>
          <p className="text-sm text-muted-foreground">
            Acesso a recursos, templates e ferramentas utilizados por profissionais de sucesso
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Acompanhamento Contínuo</h3>
          <p className="text-sm text-muted-foreground">
            Suporte entre as sessões e ajustes constantes no plano de desenvolvimento
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold">Network Qualificado</h3>
          <p className="text-sm text-muted-foreground">
            Conexão com outros profissionais e oportunidades no mercado
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-16 rounded-2xl bg-muted/50 p-8 md:p-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Como Funciona</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                1
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Avaliação Inicial</h3>
            <p className="text-sm text-muted-foreground">
              Análise do seu perfil, experiência e objetivos profissionais
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                2
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Plano Personalizado</h3>
            <p className="text-sm text-muted-foreground">
              Criação de estratégia específica para alcançar suas metas
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                3
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Sessões Regulares</h3>
            <p className="text-sm text-muted-foreground">
              Encontros periódicos para acompanhamento e ajustes
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-2xl font-bold text-white">
                4
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Evolução Contínua</h3>
            <p className="text-sm text-muted-foreground">
              Monitoramento de resultados e crescimento profissional
            </p>
          </div>
        </div>
      </div>

      {/* Interest Form */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white md:p-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Solicite sua Mentoria Personalizada
            </h2>
            <p className="text-lg text-white/90">
              Preencha o formulário abaixo e entraremos em contato para agendar uma conversa inicial sem compromisso.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 md:p-8">
            <LeadForm type="mentoria" />
          </div>
        </div>
      </div>
    </main>
  )
}
