import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { WebdietContent } from '@/components/eventos/WebdietContent'
import { MapPin, Clock, CreditCard, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'WEBDIET – Do Software ao Atendimento | Imersão Presencial | Nutrindo Juntos',
  description:
    'Imersão presencial com certificado em parceria com a Webdiet. Aprenda a dominar o software e aplicar o raciocínio clínico na prática em um único dia. Barra da Tijuca, RJ.',
  openGraph: {
    title: 'WEBDIET – Do Software ao Atendimento',
    description:
      'Imersão presencial com certificado em parceria com a Webdiet. Domine a ferramenta e pratique clínica no mesmo dia.',
    images: [{ url: '/images/eventos-imersao/webdiet.webp', width: 1677, height: 1118 }],
  },
}

const breadcrumbItems = [
  { label: 'Início', href: '/' },
  { label: 'Eventos / Imersões', href: '/eventos' },
  { label: 'WEBDIET – Do Software ao Atendimento' },
]

export default function WebdietPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          <article>
            {/* Imagem de Destaque */}
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="/images/eventos-imersao/webdiet.webp"
                alt="Imersão WEBDIET – Do Software ao Atendimento"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
              />
            </div>

            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <Badge className="bg-primary-500 text-white">Imersão Presencial</Badge>
                <Badge variant="outline" className="border-amber-300 text-amber-700">
                  Certificado Incluso
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  8h30 às 16h30
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Barra da Tijuca, RJ
                </span>
              </div>

              <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
                WEBDIET – Do Software ao Atendimento
              </h1>

              <h2 className="mb-6 text-2xl font-medium italic text-primary-600">
                "Do domínio da ferramenta à prática clínica — em um único dia."
              </h2>

              <p className="text-xl text-muted-foreground">
                Uma imersão presencial com certificado, desenvolvida em parceria com a Webdiet,
                para nutricionistas que querem atender com mais segurança e eficiência.
              </p>
            </header>

            {/* Corpo */}
            <WebdietContent />
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Card de Inscrição */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Lote 1 — Vagas Antecipadas
              </p>

              <div className="mb-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-primary-600">
                  5x R$ 24,96
                </span>
              </div>
              <p className="mb-4 text-sm text-neutral-500">sem juros no cartão</p>

              <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-sm font-medium text-primary-700">
                <Zap className="h-4 w-4" />
                Pix com desconto disponível
              </div>

              <Button size="lg" className="w-full font-semibold" asChild>
                <a
                  href="https://wa.me/5521980082458?text=Ol%C3%A1%21+Tenho+interesse+na+Imers%C3%A3o+WEBDIET+%E2%80%93+Do+Software+ao+Atendimento.+Poderia+me+enviar+mais+informa%C3%A7%C3%B5es%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Garantir Minha Vaga
                </a>
              </Button>

              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://wa.me/5521980082458?text=Ol%C3%A1%21+Tenho+d%C3%BAvidas+sobre+a+Imers%C3%A3o+WEBDIET."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar com a Equipe
                  </a>
                </Button>
              </div>
            </div>

            {/* Card de Detalhes */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">O que está incluso:</h3>
              <div className="space-y-3 text-sm">
                {[
                  'Imersão completa (8h de conteúdo)',
                  'Coffee break',
                  'Certificado de participação',
                  'Acesso ao material do dia',
                  'Suporte da equipe Nutrindo Juntos',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 shrink-0 text-primary-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
