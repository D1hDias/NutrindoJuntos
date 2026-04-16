'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'

const benefits = [
  {
    id: 1,
    icon: '/images/icons/why-choose-one-icon-1.webp',
    title: 'Aprenda no seu ritmo',
    description: 'Acesse aulas e materiais quando e onde quiser, respeitando sua rotina e seu tempo de aprendizado.'
  },
  {
    id: 2,
    icon: '/images/icons/why-choose-one-icon-3.webp',
    title: 'Apoio quando você precisa',
    description: 'Nossa equipe está disponível para orientar, tirar dúvidas e acompanhar sua evolução ao longo da jornada.'
  },
  {
    id: 3,
    icon: '/images/icons/why-choose-one-icon-2.webp',
    title: 'Ciência aplicada à prática',
    description: 'Conteúdos baseados em evidências, experiência clínica e aplicação real — sem achismo e sem romantização.'
  },
  {
    id: 4,
    icon: '/images/icons/why-choose-one-icon-4.webp',
    title: 'Formação que agrega valor',
    description: 'Certificados que fortalecem seu currículo e refletem aprendizado consistente e aplicável.'
  }
]

const instructorImages = [
  '/images/team/instructor-1.webp',
  '/images/team/instructor-2.webp',
  '/images/team/instructor-3.webp'
]

export function WhyChooseUsSection() {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          // Animar contador de 0 a 100
          let current = 0
          const target = 100
          const increment = target / 50
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 30)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="relative block overflow-visible bg-white pt-16 pb-[120px]" style={{ zIndex: 1 }}>
      {/* Shapes decorativos laterais */}
      <div className="absolute left-0 top-[117px] z-30 animate-float-bob-x">
        <Image
          src="/images/shapes/why-choose-one-shape-6.webp"
          alt=""
          width={150}
          height={150}
          className="w-auto opacity-40"
        />
      </div>
      <div className="absolute right-0 top-[215px] z-30 animate-float-bob-y">
        <Image
          src="/images/shapes/why-choose-one-shape-7.webp"
          alt=""
          width={150}
          height={150}
          className="w-auto opacity-40"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna Esquerda - Imagens */}
          <div className="relative mt-8 lg:mr-[272px]">
            <div className="relative">
              {/* Imagem Principal */}
              <div className="relative overflow-hidden rounded-[40px] group">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/about/why-choose-main.png"
                    alt="Por que escolher a Nutrindo Juntos"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>

              {/* Imagem Secundária - Circular */}
              <div className="absolute -bottom-[177px] -right-[145px] z-10 hidden lg:block">
                <div className="overflow-hidden rounded-full border-4 border-white">
                  <div className="relative h-[300px] w-[300px]">
                    <Image
                      src="/images/about/why-choose-circle.png"
                      alt="Nutrindo Juntos"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>

              {/* Shapes Decorativos */}
              <div className="absolute -right-[113px] top-[37px] animate-float-bob-y">
                <Image
                  src="/images/shapes/why-choose-one-shape-1.webp"
                  alt=""
                  width={80}
                  height={80}
                  className="w-auto"
                />
              </div>
              <div className="absolute left-[50px] top-[100px] animate-float-bob-x">
                <Image
                  src="/images/shapes/why-choose-one-shape-2.webp"
                  alt=""
                  width={60}
                  height={60}
                  className="w-auto"
                />
              </div>
              <div className="absolute bottom-[50px] left-[20px] animate-float-bob-y">
                <Image
                  src="/images/shapes/why-choose-one-shape-3.webp"
                  alt=""
                  width={70}
                  height={70}
                  className="w-auto"
                />
              </div>
              <div className="absolute -bottom-[20px] right-[30px]">
                <Image
                  src="/images/shapes/why-choose-one-shape-4.webp"
                  alt=""
                  width={90}
                  height={90}
                  className="w-auto"
                />
              </div>
              <div className="absolute -top-[20px] left-[40px] animate-bounce-slow">
                <Image
                  src="/images/shapes/why-choose-one-shape-5.webp"
                  alt=""
                  width={100}
                  height={100}
                  className="w-auto"
                />
              </div>
            </div>
          </div>

          {/* Coluna Direita - Conteúdo */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary-500" />
              <span className="font-serif text-lg font-semibold text-primary-500">
                Por Que Nos Escolher
              </span>
            </div>

            {/* Título */}
            <div className="relative">
              <h2 className="font-display text-4xl font-bold leading-tight text-graphite lg:text-5xl">
              Confiança construída com método, clareza e {' '}
                <span className="relative inline-block">
                resultado
                  {/* Linha decorativa */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 10"
                    fill="none"
                  >
                    <path
                      d="M0 5 L200 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      opacity="0.3"
                      className="text-primary-500"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Texto Descritivo */}
            <p className="text-lg leading-relaxed text-neutral-600">
            Tudo foi pensado e estruturado para quem busca mais do que cursos soltos. Aqui, cada formação faz parte 
            de uma jornada estruturada, compilada dos melhores conteúdos, que respeita o momento profissional do 
            nutricionista e oferece direção clara para evoluir com segurança.
            </p>

            {/* Lista de Benefícios - Grid 2 colunas */}
            <div className="grid gap-6 pt-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start gap-4 group">
                  {/* Ícone Hexagonal */}
                  <div className="flex-shrink-0">
                    <div
                      className="relative flex h-[58px] w-[52px] items-center justify-center"
                      style={{
                        clipPath: 'polygon(51% 0, 51% 0, 100% 24%, 100% 76%, 51% 100%, 51% 100%, 0 76%, 0 24%)'
                      }}
                    >
                      {/* Borda hexagonal externa */}
                      <div className="absolute inset-0 bg-neutral-200" />

                      {/* Hexágono interno branco */}
                      <div
                        className="relative flex h-[56px] w-[50px] items-center justify-center bg-white"
                        style={{
                          clipPath: 'polygon(51% 0, 51% 0, 100% 24%, 100% 76%, 51% 100%, 51% 100%, 0 76%, 0 24%)'
                        }}
                      >
                        <Image
                          src={benefit.icon}
                          alt=""
                          width={30}
                          height={30}
                          className="transition-transform duration-300 group-hover:scale-90"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <h3 className="mb-1 font-display text-lg font-semibold text-graphite">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão e Contador de Instrutores */}
            <div className="flex flex-col items-start gap-6 pt-6 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 font-semibold"
                asChild
              >
                <Link href="/metodologia">
                  <span className="mr-2">→</span>
                  Conhecer nossa metodologia
                </Link>
              </Button>

              {/* Contador com Imagens de Instrutores */}
              <div
                className="flex items-center gap-4 rounded-lg px-6 py-3"
                style={{
                  background: 'linear-gradient(90deg, rgba(104, 126, 255, 0) 0%, rgba(104, 126, 255, 0.91) 41.4%)'
                }}
              >
                {/* Imagens Circulares Sobrepostas */}
                <div className="flex -space-x-4">
                  {instructorImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-10 w-10 overflow-hidden rounded-full border border-white bg-neutral-200"
                    >
                      <p className="flex h-full items-center justify-center text-xs font-bold text-neutral-400">
                        {index + 1}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Contador */}
                <div className="text-white">
                  <div className="flex items-baseline gap-1 font-serif italic">
                    <span className="text-2xl font-bold">{count}</span>
                    <span className="text-xl font-bold">%</span>
                  </div>
                  <p className="text-xs font-medium">Feito por Nutricionistas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
