import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { NutrindoMentesContent } from '@/components/eventos/NutrindoMentesContent'
import { NutrindoMentesSidebar } from '@/components/eventos/NutrindoMentesSidebar'

export const metadata: Metadata = {
  title: 'Nutrindo Mentes | Comunidade de Atualização em Nutrição | Nutrindo Juntos',
  description:
    'Comunidade de atualização profissional acessível, contínua e com propósito. Aulas ao vivo semanais, discussão de artigos e diretrizes, certificados e impacto social. A partir de R$9,90 no primeiro mês.',
  openGraph: {
    title: 'Nutrindo Mentes',
    description:
      'Atualização profissional acessível, contínua e com propósito. Conhecimento que alimenta carreiras. Solidariedade que alimenta famílias.',
  },
}

const breadcrumbItems = [
  { label: 'Início', href: '/' },
  { label: 'Nutrindo Mentes' },
]

export default function NutrindoMentesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <Badge className="bg-primary-500 text-white">Comunidade Online</Badge>
                <Badge variant="outline" className="border-amber-300 text-amber-700">
                  Educação Continuada
                </Badge>
              </div>

              <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
                Nutrindo Mentes
              </h1>

              <h2 className="mb-6 text-2xl font-medium italic text-primary-600">
                Atualização profissional acessível, contínua e com propósito.
              </h2>
            </header>

            {/* Corpo */}
            <NutrindoMentesContent />
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <NutrindoMentesSidebar />
        </aside>
      </div>

      {/* Botão Voltar */}
      <div className="mt-12">
        <Button variant="outline" asChild>
          <Link href="/">← Voltar ao Início</Link>
        </Button>
      </div>
    </main>
  )
}
