'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Lightbulb, Clock, Linkedin, ThumbsUp, Star, Users } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative block overflow-hidden bg-[#f2f2ff] pb-0 pt-16 lg:pt-24" style={{ zIndex: 5 }}>
      {/* Background Shape Pattern from Template - Optimized with Next.js Image */}
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <Image
          src="/images/shapes/banner-one-bg-shape-1.webp"
          alt=""
          fill
          priority
          quality={75}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Floating Icons - Decorative (mesma ordem do template) */}
      <div className="absolute left-[10%] top-[15%] animate-bounce-slow opacity-20 lg:opacity-40">
        <Lightbulb className="h-12 w-12 text-accent-500 lg:h-16 lg:w-16" />
      </div>
      <div className="absolute right-[15%] top-[25%] animate-float-bob-x opacity-20 lg:opacity-40">
        <Clock className="h-10 w-10 text-primary-500 lg:h-14 lg:w-14" />
      </div>
      <div className="absolute left-[20%] bottom-[30%] animate-float-bob-y opacity-20 lg:opacity-40">
        <Linkedin className="h-10 w-10 text-secondary-500 lg:h-14 lg:w-14" />
      </div>

      {/* Decorative Shape 4 - float-bob-x (do template) */}
      <div className="absolute right-[8%] top-[35%] w-24 animate-float-bob-x opacity-40 lg:w-32">
        <Image
          src="/images/shapes/banner-one-shape-4.webp"
          alt=""
          width={128}
          height={128}
          className="h-auto w-full"
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Title Box with Decorative Shape */}
            <div className="relative">
              {/* Decorative shape behind title - do template */}
              <div className="absolute -left-4 -top-4 -z-10 w-20 opacity-60 lg:w-24">
                <Image
                  src="/images/shapes/banner-one-title-box-shape-1.webp"
                  alt=""
                  width={96}
                  height={96}
                  className="h-auto w-full"
                />
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight text-graphite md:text-5xl lg:text-6xl xl:text-7xl">
              Da <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent">graduação</span> à{' '}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                prática clínica
                </span>{' '}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent">
                segurança
                </span>
                <span className="font-display text-4xl font-bold leading-tight text-graphite md:text-5xl lg:text-6xl xl:text-7xl"> que você precisa.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-neutral-600 lg:text-xl">
            Aprenda no seu ritmo, com aulas objetivas, aplicáveis e pensadas para quem está começando — sem enrolação e sem romantizar a prática clínica.
              <br className="hidden lg:block" />
              sem enrolação e sem romantizar a prática clínica.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Primary Button */}
              <Button
                size="lg"
                className="group bg-primary-500 text-base font-semibold hover:bg-primary-600"
                asChild
              >
                <Link href="/cursos">
                  <span className="mr-2">→</span>
                  Saiba mais
                </Link>
              </Button>

              {/* Secondary Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="#"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-graphite transition-colors hover:text-primary-600"
                >
                  <ThumbsUp className="h-4 w-4 text-primary-500" />
                  <span>Conteúdo de Qualidade</span>
                </Link>
                <Link
                  href="/cursos"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-graphite transition-colors hover:text-secondary-600"
                >
                  <ThumbsUp className="h-4 w-4 text-secondary-500" />
                  <span>Preço Acessível</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Image with Decorations */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Main Image Container */}
            <div className="relative z-10">
              {/* Rotating Shape Box - do template */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-rotate-slow lg:h-[500px] lg:w-[500px]">
                {/* Inner rotating circles */}
                <div className="h-full w-full rounded-full border-4 border-dashed border-primary-200 opacity-30">
                  <div className="h-full w-full rounded-full border-2 border-dotted border-secondary-200 opacity-50" />
                </div>

                {/* Shape 1 - do template */}
                <div className="absolute left-[10%] top-[20%] w-12 lg:w-16">
                  <Image
                    src="/images/shapes/banner-one-shape-1.webp"
                    alt=""
                    width={64}
                    height={64}
                    className="h-auto w-full"
                  />
                </div>

                {/* Shape 2 - do template (rotate-me reverso) */}
                <div className="absolute right-[15%] top-[30%] w-12 animate-rotate-slow lg:w-16" style={{ animationDirection: 'reverse' }}>
                  <Image
                    src="/images/shapes/banner-one-shape-2.webp"
                    alt=""
                    width={64}
                    height={64}
                    className="h-auto w-full"
                  />
                </div>

                {/* Shape 3 - do template */}
                <div className="absolute bottom-[25%] left-[15%] w-12 lg:w-16">
                  <Image
                    src="/images/shapes/banner-one-shape-3.webp"
                    alt=""
                    width={64}
                    height={64}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              {/* Main Hero Image */}
              <div className="relative">
                <Image
                  src="/images/hero/hero-main.webp"
                  alt="Nutricionista profissional - Nutrindo Juntos"
                  width={1499}
                  height={1536}
                  className="relative z-10 h-auto w-full object-contain drop-shadow-2xl"
                  priority
                />

                {/* Decorative gradient circles around image */}
                <div className="absolute -right-8 top-20 -z-10 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-primary-400 to-primary-300 opacity-20 blur-xl" />
                <div className="absolute -left-8 bottom-20 -z-10 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-secondary-400 to-secondary-300 opacity-20 blur-xl"
                     style={{ animationDelay: '1s' }} />
              </div>

              {/* Review Card - Top Right */}
              {/* COMMENTED OUT: Widget de depoimento removido
              <div className="absolute right-0 top-8 z-20 animate-float rounded-2xl bg-white p-3 shadow-lg lg:right-4 lg:top-12 lg:p-4">
                <div className="flex items-start gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-primary-200 to-primary-100 lg:h-12 lg:w-12">
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary-600 lg:text-base">
                      AO
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <div className="rounded bg-primary-50 px-2 py-0.5">
                        <span className="text-xs font-bold text-primary-600">NUTRINDO</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-graphite lg:text-sm">
                        Ana Oliveira
                      </p>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
                        <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
                        <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
                        <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
                        <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              */}

              {/* Students Trained Card - Bottom Left */}
              <div className="absolute -left-4 bottom-8 z-20 animate-float-delayed rounded-2xl bg-white p-3 shadow-lg lg:bottom-12 lg:p-4">
                {/* Rotating decorative shape - do template */}
                <div className="absolute -right-2 -top-2 -z-10 w-12 animate-rotate-slow">
                  <Image
                    src="/images/shapes/banner-one-student-trained-shape-1.webp"
                    alt=""
                    width={48}
                    height={48}
                    className="h-auto w-full"
                  />
                </div>

                {/* Avatars Stack */}
                <div className="mb-2 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-primary-300 to-secondary-300 lg:h-10 lg:w-10"
                      >
                        <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                          {i}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-0.5">
                  <p className="text-xl font-bold text-graphite lg:text-2xl">2000+</p>
                  <p className="text-xs font-medium text-neutral-600 lg:text-sm">
                    Alunos Capacitados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
