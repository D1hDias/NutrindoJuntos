'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, Apple, Palette, TrendingUp, FileText, ChevronRight, RotateCcw, BookOpen, Calendar, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CategoryItem =
  | { id: string; title: string; courseCount: number; icon: React.ElementType; href: string; children?: never }
  | { id: string; title: string; courseCount: number; icon: React.ElementType; href?: never; children: { label: string; href: string }[] }

const categories: CategoryItem[] = [
  {
    id: '01',
    title: 'Cursos',
    courseCount: 2,
    icon: BookOpen,
    children: [
      { label: 'Curso NCA – Nutrição Clínica Aplicada', href: '/cursos/nca-nutricao-clinica-aplicada' },
      { label: 'Curso NCE – Nutrição Clínica Estratégica', href: '/cursos/nce-nutricao-clinica-estrategica' },
    ],
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
    title: 'Assinatura',
    courseCount: 1,
    icon: Apple,
    href: '/cursos',
  },
  {
    id: '05',
    title: 'Eventos / Imersões',
    courseCount: 1,
    icon: Calendar,
    children: [
      { label: 'WEBDIET – Do Software ao Atendimento', href: '/eventos/webdiet-do-software-ao-atendimento' },
    ],
  },
]

export function CategorySection() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  return (
    <section className="relative block bg-[#6d4d88] pb-0 pt-0" style={{ counterReset: 'count', zIndex: 1 }}>
      {/* Marquee Top - Faixa Rolante - COLADO NO TOPO */}
      <div className="relative overflow-hidden border-b border-white/20 bg-[#6d4d88] py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Primeiro conjunto */}
          <div className="flex items-center gap-8 px-8">
            <span className="text-lg font-semibold text-white">✦ Suporte Full</span>
            <span className="text-lg font-semibold text-white">Certificação do MEC</span>
            <span className="text-lg font-semibold text-white">✦ Aulas ao Vivo</span>
            <span className="text-lg font-semibold text-white">Mentorias em Grupo</span>
            <span className="text-lg font-semibold text-white">✦ Suporte Full</span>
            <span className="text-lg font-semibold text-white">Certificação do MEC</span>
            <span className="text-lg font-semibold text-white">✦ Aulas ao Vivo</span>
            <span className="text-lg font-semibold text-white">Mentorias em Grupo</span>
          </div>
          {/* Segundo conjunto (duplicado para loop infinito) */}
          <div className="flex items-center gap-8 px-8">
            <span className="text-lg font-semibold text-white">✦ Suporte Full</span>
            <span className="text-lg font-semibold text-white">Certificação do MEC</span>
            <span className="text-lg font-semibold text-white">✦ Aulas ao Vivo</span>
            <span className="text-lg font-semibold text-white">Mentorias em Grupo</span>
            <span className="text-lg font-semibold text-white">✦ Suporte Full</span>
            <span className="text-lg font-semibold text-white">Certificação do MEC</span>
            <span className="text-lg font-semibold text-white">✦ Aulas ao Vivo</span>
            <span className="text-lg font-semibold text-white">Mentorias em Grupo</span>
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
                const isAccordion = !!category.children
                const isOpen = openAccordion === category.id

                const rowContent = (
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xl font-bold text-white/50 transition-colors group-hover:text-primary-500 lg:text-2xl">
                      {category.id}
                    </span>
                    <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-primary-500 opacity-0 transition-all duration-300 group-hover:flex group-hover:opacity-100 lg:flex">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-white transition-colors group-hover:text-graphite lg:text-2xl">
                        {category.title}
                      </h3>
                      <p className="font-serif text-sm text-white/70 transition-colors group-hover:text-neutral-600 lg:text-base">
                        {category.courseCount} Curso{category.courseCount > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/50 transition-all duration-300 group-hover:border-primary-500 group-hover:bg-primary-500">
                      {isAccordion
                        ? <ChevronDown className={`h-4 w-4 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        : <ArrowUpRight className="h-4 w-4 text-white transition-transform group-hover:rotate-45" />
                      }
                    </div>
                  </div>
                )

                if (isAccordion) {
                  return (
                    <div key={category.id} className="border-b border-dashed border-white/30 last:border-b-0">
                      <button
                        onClick={() => setOpenAccordion(isOpen ? null : category.id)}
                        className="group relative w-full px-4 py-4 text-left transition-all duration-300 hover:bg-white"
                      >
                        {rowContent}
                      </button>
                      {isOpen && (
                        <div className="bg-white/10 px-4 pb-3">
                          {category.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              <ChevronRight className="h-4 w-4 shrink-0 text-primary-400" />
                              <span className="font-serif text-sm font-medium">{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="group relative block border-b border-dashed border-white/30 py-4 px-4 transition-all duration-300 last:border-b-0 hover:bg-white"
                  >
                    {rowContent}
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

            <GPSQuiz />
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Quiz GPS de Carreira ---

const quizQuestions = [
  {
    question: 'Hoje, em relação à prática clínica, você sente que:',
    a: 'Ainda preciso ganhar segurança nos fundamentos',
    b: 'Já domino os fundamentos e quero avançar',
  },
  {
    question: 'Quando o assunto é bioquímica, exames e fisiopatologias, você:',
    a: 'Ainda tenho dúvidas e preciso entender melhor',
    b: 'Já tenho boa base e consigo acompanhar bem',
  },
  {
    question: 'Na hora de montar uma conduta nutricional, você:',
    a: 'Fico inseguro(a) e tenho dificuldade de organizar o raciocínio',
    b: 'Consigo montar, mas quero melhorar e aprofundar minhas estratégias',
  },
  {
    question: 'Qual dessas frases mais combina com você hoje?',
    a: 'Eu ainda preciso organizar melhor meu raciocínio clínico',
    b: 'Eu quero ir além da base e ampliar minha atuação',
  },
  {
    question: 'Ao entrar em um curso agora, seu objetivo principal é:',
    a: 'Construir uma base sólida na prática clínica',
    b: 'Me aprofundar em áreas e estratégias mais avançadas',
  },
]

const quizResults = {
  nca: {
    title: 'NCA – Nutrição Clínica Aplicada',
    description:
      'Indicado para quem precisa fortalecer a base clínica e ganhar segurança na prática. Foco em bioquímica, exames, fisiopatologias, avaliação nutricional e construção de condutas.',
    href: '/cursos/nca-nutricao-clinica-aplicada',
  },
  nce: {
    title: 'NCE – Nutrição Clínica Estratégica',
    description:
      'Indicado para quem já domina a base e quer avançar para uma atuação mais estratégica. Foco em aprofundamento clínico, diferentes áreas da nutrição, protocolos e evolução profissional.',
    href: '/cursos/nce-nutricao-clinica-estrategica',
  },
}

function GPSQuiz() {
  const [step, setStep] = useState<'intro' | number | 'result'>('intro')
  const [answers, setAnswers] = useState<('a' | 'b')[]>([])

  const handleAnswer = (answer: 'a' | 'b') => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (newAnswers.length === quizQuestions.length) {
      setStep('result')
    } else {
      setStep(newAnswers.length)
    }
  }

  const restart = () => {
    setStep('intro')
    setAnswers([])
  }

  const getResult = () => {
    const countA = answers.filter((a) => a === 'a').length
    return countA >= 3 ? quizResults.nca : quizResults.nce
  }

  const currentQuestion = typeof step === 'number' ? step : 0
  const progress = typeof step === 'number' ? ((step + 1) / quizQuestions.length) * 100 : step === 'result' ? 100 : 0

  return (
    <div className="relative z-10 overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 to-white/90 p-8 backdrop-blur-sm" style={{ minHeight: '420px', width: '533px' }}>
      <div className="flex h-full min-h-[356px] flex-col justify-between">

        {/* Tela Inicial */}
        {step === 'intro' && (
          <>
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-bold text-graphite">
                GPS de Carreira
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                Está em dúvida por onde começar? Nosso GPS te ajuda a identificar o caminho
                mais coerente com o seu momento profissional — com orientação clara e sem achismo.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                    <span className="text-sm font-bold text-primary-600">5</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    Apenas 5 perguntas rápidas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100">
                    <span className="text-sm font-bold text-secondary-600">✦</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    Resultado personalizado na hora
                  </span>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-primary-500 text-base font-semibold hover:bg-primary-600"
              onClick={() => setStep(0)}
            >
              Começar o Quiz
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </>
        )}

        {/* Perguntas */}
        {typeof step === 'number' && (
          <>
            <div className="space-y-5">
              {/* Barra de progresso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
                  <span>Pergunta {step + 1} de {quizQuestions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full rounded-full bg-primary-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Pergunta */}
              <h3 className="font-display text-lg font-bold leading-snug text-graphite">
                {quizQuestions[currentQuestion].question}
              </h3>

              {/* Opções */}
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer('a')}
                  className="flex w-full items-start gap-3 rounded-xl border-2 border-neutral-200 p-4 text-left transition-all duration-200 hover:border-primary-500 hover:bg-primary-50"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
                    A
                  </span>
                  <span className="text-sm leading-relaxed text-neutral-700">
                    {quizQuestions[currentQuestion].a}
                  </span>
                </button>

                <button
                  onClick={() => handleAnswer('b')}
                  className="flex w-full items-start gap-3 rounded-xl border-2 border-neutral-200 p-4 text-left transition-all duration-200 hover:border-[#6d4d88] hover:bg-purple-50"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-[#6d4d88]">
                    B
                  </span>
                  <span className="text-sm leading-relaxed text-neutral-700">
                    {quizQuestions[currentQuestion].b}
                  </span>
                </button>
              </div>
            </div>

            {/* Voltar */}
            {step > 0 && (
              <button
                onClick={() => {
                  setAnswers(answers.slice(0, -1))
                  setStep(step - 1)
                }}
                className="mt-4 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-600"
              >
                ← Voltar
              </button>
            )}
          </>
        )}

        {/* Resultado */}
        {step === 'result' && (
          <>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
                  Seu resultado
                </p>
                <h3 className="font-display text-2xl font-bold text-graphite">
                  {getResult().title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-neutral-600">
                {getResult().description}
              </p>

              {/* Barra de progresso completa */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full w-full rounded-full bg-primary-500" />
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-primary-500 text-base font-semibold hover:bg-primary-600"
                asChild
              >
                <Link href={getResult().href}>
                  Conhecer o curso
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <button
                onClick={restart}
                className="flex w-full items-center justify-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-600"
              >
                <RotateCcw className="h-4 w-4" />
                Refazer o quiz
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
