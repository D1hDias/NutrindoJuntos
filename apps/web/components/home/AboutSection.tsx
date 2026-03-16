'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Target, Eye, Heart } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="relative block overflow-visible bg-white py-20 lg:py-[120px]" style={{ zIndex: 1 }}>
      {/* Shapes decorativos laterais */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
        <Image
          src="/images/shapes/about-one-shape-1.webp"
          alt=""
          width={100}
          height={400}
          className="w-auto animate-float-bob-y opacity-30"
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30">
        <Image
          src="/images/shapes/about-one-shape-2.webp"
          alt=""
          width={100}
          height={400}
          className="w-auto animate-float-bob-y opacity-30"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna Esquerda - Imagens */}
          <div className="relative mt-5">
            {/* Shape circular de fundo */}
            <div className="absolute left-11 top-7 h-[492px] w-[492px] rounded-full border border-primary-500 -z-10" />

            <div className="grid grid-cols-2 gap-6">
              {/* Primeira coluna */}
              <div className="space-y-6">
                {/* Imagem principal */}
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="aspect-[280/350] relative bg-neutral-200">
                    <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-neutral-400">
                      280x350
                    </p>
                  </div>
                </div>

                {/* Caixa de Awards */}
                <div className="relative bg-white rounded-xl p-5 shadow-lg border border-dashed border-neutral-200">
                  <div className="flex items-baseline gap-1">
                    <h3 className="font-display text-5xl font-bold italic text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                      45
                    </h3>
                    <span className="text-2xl font-bold text-graphite">+</span>
                  </div>
                  <p className="mt-1 font-serif text-sm font-medium italic text-neutral-600">
                    Prêmios Conquistados
                  </p>
                </div>
              </div>

              {/* Segunda coluna */}
              <div className="space-y-6">
                {/* Caixa de Experience */}
                <div className="relative -ml-10 mt-3 mb-5">
                  <div className="relative bg-white rounded-[45px] shadow-lg p-4 border-2 border-graphite">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                          <Target className="h-8 w-8 text-primary-500" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <h3 className="font-display text-2xl font-semibold text-graphite">
                            25
                          </h3>
                          <span className="text-lg font-semibold">+</span>
                          <p className="ml-1 font-serif text-base font-semibold capitalize">
                            Anos
                          </p>
                        </div>
                        <p className="font-serif text-sm font-semibold lowercase text-graphite">
                          de experiência
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda imagem */}
                <div className="relative -ml-12 mr-12">
                  <div className="relative overflow-hidden rounded-3xl">
                    <div className="aspect-[280/350] relative bg-neutral-200">
                      <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-neutral-400">
                        280x350
                      </p>
                    </div>
                  </div>
                  {/* Shape flutuante */}
                  <div className="absolute top-3 -left-12 animate-float-bob-y">
                    <Image
                      src="/images/shapes/about-one-img-shape-1.webp"
                      alt=""
                      width={80}
                      height={80}
                      className="w-auto opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Conteúdo */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary-500" />
              <span className="font-serif text-lg font-semibold text-primary-500">
                Sobre Nós
              </span>
            </div>

            {/* Título */}
            <div className="relative">
              <h2 className="font-display text-4xl font-bold leading-tight text-graphite lg:text-5xl">
              Nossa história: educação que
              <span className="relative inline-block">
                guia
                  {/* Linha decorativa sob "Inovação" */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 10"
                    fill="none"
                  >
                    <path
                      d="M0 5 L200 5"
                      stroke="currentColor"
                      strokeWidth="9"
                      opacity="0.3"
                      className="text-primary-500"
                    />
                  </svg>
                </span> não confunde{' '}
                
              </h2>
            </div>

            {/* Texto descritivo */}
            <p className="text-lg leading-relaxed text-neutral-600">
            A Nutrindo Juntos nasceu para resolver uma lacuna real da formação em Nutrição: 
            o excesso de teoria sem direção prática. Unimos ciência, prática clínica e visão de carreira 
            para guiar nutricionistas desde os primeiros passos até a consolidação profissional.
            </p>

            <p className="text-lg leading-relaxed text-neutral-600">
            Atuamos em parceria com instituições e projetos educacionais reconhecidos, como a 
            Faculdade VP, ampliando o impacto e a qualidade da formação oferecida aos nutricionistas.
            </p>

            {/* Missão e Visão */}
            <div className="flex flex-col gap-8 pt-4">
              {/* Nossa Missão */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary-500" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-semibold italic text-graphite">
                    Nossa Missão:
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-neutral-600 pl-15">
                  Fornecer soluções inovadoras de educação digital em nutrição que capacitem
                  estudantes e nutricionistas, promovendo uma cultura de aprendizado contínuo
                  e crescimento profissional.
                </p>
              </div>

              {/* Nossa Visão */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-secondary-500" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-semibold italic text-graphite">
                    Nossa Visão
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-neutral-600 pl-15">
                  Ser a plataforma de referência em educação nutricional no Brasil, reconhecida
                  pela excelência do conteúdo, pela inovação pedagógica e pelo impacto positivo
                  na formação de profissionais de nutrição.
                </p>
              </div>

              {/* Nossos Valores */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary-500" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-semibold italic text-graphite">
                    Nossos Valores
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-neutral-600 pl-15">
                  Educação personalizada e de qualidade / Ética, responsabilidade e compromisso / 
                  Protagonismo profissional / Prática com fundamento científico / Evolução contínua.
                </p>
              </div>
            </div>

            {/* Botão e Live Class */}
            <div className="flex items-center gap-6 pt-4">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 font-semibold"
                asChild
              >
                <Link href="/sobre">
                  <span className="mr-2">→</span>
                  Saiba Mais
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-graphite">
                  Aulas Ao Vivo
                </h3>
                <Image
                  src="/images/shapes/live-class-shape-1.webp"
                  alt=""
                  width={40}
                  height={20}
                  className="w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
