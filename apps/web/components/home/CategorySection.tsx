'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Apple, Palette, TrendingUp, FileText, Clock, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: '01',
    title: 'Curso NCA',
    courseCount: 1,
    icon: Apple,
    href: '/cursos/nca',
  },
  {
    id: '02',
    title: 'Mentoria NJ',
    courseCount: 1,
    icon: TrendingUp,
    href: '/mentoria',
  },
  {
    id: '03',
    title: 'Nutri executivo',
    courseCount: 1,
    icon: Palette,
    href: '/cursos/nutri-executivo',
  },
  {
    id: '04',
    title: 'Monte sua trilha',
    courseCount: 1,
    icon: FileText,
    href: '/trilhas',
  },
  {
    id: '05',
    title: 'Assinatura',
    courseCount: 1,
    icon: Apple,
    href: '/assinatura',
  },
  {
    id: '06',
    title: 'Eventos',
    courseCount: 1,
    icon: TrendingUp,
    href: '/eventos',
  },
]

export function CategorySection() {
  return (
    <section className="relative block bg-[#6d4d88] pb-0 pt-0" style={{ counterReset: 'count', zIndex: 1 }}>
      {/* Marquee Top - Faixa Rolante - COLADO NO TOPO */}
      <div className="relative overflow-hidden border-b border-white/20 bg-[#6d4d88] py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Primeiro conjunto */}
          <div className="flex items-center gap-8 px-8">
            <span className="text-lg font-semibold text-white">✦ Certificação</span>
            <span className="text-lg font-semibold text-white">20+ Instrutores</span>
            <span className="text-lg font-semibold text-white">✦ 500+ Cursos Online</span>
            <span className="text-lg font-semibold text-white">24 Horas Suporte</span>
            <span className="text-lg font-semibold text-white">✦ Certificação</span>
            <span className="text-lg font-semibold text-white">20+ Instrutores</span>
            <span className="text-lg font-semibold text-white">✦ 500+ Cursos Online</span>
            <span className="text-lg font-semibold text-white">24 Horas Suporte</span>
          </div>
          {/* Segundo conjunto (duplicado para loop infinito) */}
          <div className="flex items-center gap-8 px-8">
            <span className="text-lg font-semibold text-white">✦ Certificação</span>
            <span className="text-lg font-semibold text-white">20+ Instrutores</span>
            <span className="text-lg font-semibold text-white">✦ 500+ Cursos Online</span>
            <span className="text-lg font-semibold text-white">24 Horas Suporte</span>
            <span className="text-lg font-semibold text-white">✦ Certificação</span>
            <span className="text-lg font-semibold text-white">20+ Instrutores</span>
            <span className="text-lg font-semibold text-white">✦ 500+ Cursos Online</span>
            <span className="text-lg font-semibold text-white">24 Horas Suporte</span>
          </div>
        </div>
      </div>

      {/* Background Shape - Optimized with Next.js Image */}
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <Image
          src="/images/shapes/category-one-bg-shape.webp"
          alt=""
          fill
          quality={75}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.16,
          }}
        />
      </div>

      {/* Shape 1 - animação topBottom */}
      <div className="absolute left-0 top-20 animate-float-bob-y" style={{ zIndex: -1 }}>
        <Image
          src="/images/shapes/category-one-shape-1.webp"
          alt=""
          width={200}
          height={200}
          className="w-auto opacity-10"
        />
      </div>

      {/* Shape 2 - animação leftRight */}
      <div className="absolute left-[530px] top-20 animate-float-bob-x" style={{ zIndex: -1 }}>
        <Image
          src="/images/shapes/category-one-shape-2.webp"
          alt=""
          width={200}
          height={200}
          className="w-auto opacity-10"
        />
      </div>

      {/* Shape 3 - animação rotate */}
      <div className="absolute -bottom-[135px] -left-40 animate-rotate-slow" style={{ zIndex: -1 }}>
        <Image
          src="/images/shapes/category-one-shape-3.webp"
          alt=""
          width={300}
          height={300}
          className="w-auto opacity-[0.08]"
        />
      </div>

      {/* Barras verticais decorativas - lateral direita */}
      <div className="absolute right-0 top-0 bottom-0 hidden xl:flex items-center gap-4 pr-8" style={{ zIndex: 0 }}>
        <div className="h-full w-[4px] bg-white/10 rounded-full"></div>
        <div className="h-full w-[4px] bg-white/10 rounded-full"></div>
        <div className="h-full w-[4px] bg-white/10 rounded-full"></div>
        <div className="h-full w-[4px] bg-white/10 rounded-full"></div>
      </div>

      {/* Container Principal */}
      <div className="container relative mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Coluna Esquerda - Conteúdo */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent-500" />
              <span className="font-serif text-lg font-semibold text-white">
                Categoria
              </span>
            </div>

            {/* Título */}
            <div className="relative">
              <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white lg:text-5xl">
              Escolha por onde começar sua jornada na{' '}
                <span className="relative inline-block">
                  Nutrição
                  {/* Linha decorativa sob "Cursos" */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 10"
                    fill="none"
                  >
                    <path
                      d="M0 5 L200 5"
                      stroke="white"
                      strokeWidth="3"
                      opacity="0.5"
                    />
                  </svg>
                </span>.
              </h2>
            </div>

            {/* Lista de Categorias com Hover */}
            <div className="space-y-0">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="group relative block border-b border-dashed border-white/30 py-4 px-4 transition-all duration-300 last:border-b-0 hover:bg-white"
                  >
                    {/* Conteúdo do Item */}
                    <div className="flex items-center gap-4">
                      {/* Número */}
                      <span className="font-display text-xl font-bold text-white/50 transition-colors group-hover:text-primary-500 lg:text-2xl">
                        {category.id}
                      </span>

                      {/* Ícone - Aparece no hover */}
                      <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-primary-500 opacity-0 transition-all duration-300 group-hover:flex group-hover:opacity-100 lg:flex">
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Texto */}
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-graphite lg:text-2xl">
                          {category.title}
                        </h3>
                        <p className="font-serif text-sm text-white/70 transition-colors group-hover:text-neutral-600 lg:text-base">
                          {category.courseCount} Curso{category.courseCount > 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* Seta - Aparece no hover */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/50 transition-all duration-300 group-hover:border-primary-500 group-hover:bg-primary-500">
                        <ArrowUpRight className="h-4 w-4 text-white transition-transform group-hover:rotate-45" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Coluna Direita - Quiz GPS de Carreira */}
          <div className="relative hidden lg:block">
            {/* Shapes decorativas de fundo */}
            <div className="absolute -right-8 top-8 h-72 w-72 rounded-[40px] bg-white/10 blur-3xl" />
            <div className="absolute -right-12 top-16 h-60 w-60 rounded-[40px] bg-white/5 blur-2xl" />

            {/* Quiz Container */}
            <div className="relative z-10 overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm p-8" style={{ height: '386px', width: '533px' }}>
              <div className="flex h-full flex-col justify-between">
                {/* Header do Quiz */}
                <div className="space-y-4">
                  {/* Título */}
                  <h3 className="font-display text-3xl font-bold text-graphite">
                    GPS de Carreira
                  </h3>
                  
                  {/* Subtítulo */}
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Está em dúvida por onde começar? Nosso GPS te ajuda a identificar o caminho mais coerente com o seu momento profissional — com orientação clara e sem achismo.
                  </p>
                  
                  {/* Features com ícones */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                        <Clock className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        Leva menos de 2 minutos
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100">
                        <Brain className="h-4 w-4 text-secondary-600" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">
                        Resultado personalizado
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão CTA */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="group bg-primary-500 text-base font-semibold hover:bg-primary-600 w-full"
                    asChild
                  >
                    <Link href="/quiz/gps-carreira">
                      <span className="mr-2">→</span>
                      Fazer o Quiz
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
