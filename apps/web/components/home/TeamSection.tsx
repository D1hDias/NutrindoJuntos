'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Linkedin, Instagram, Facebook, Youtube, Plus, X } from 'lucide-react'

// Mock data - será substituído por dados reais do CMS
const teamMembers = [
  {
    id: 1,
    name: 'Dra. Ana Silva',
    role: 'Nutricionista Clínica',
    image: '/images/team/team-1.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 2,
    name: 'Dr. Carlos Santos',
    role: 'Nutrição Esportiva',
    image: '/images/team/team-2.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 3,
    name: 'Dra. Maria Oliveira',
    role: 'Nutrição Funcional',
    image: '/images/team/team-3.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 4,
    name: 'Dr. Pedro Costa',
    role: 'Gestão de Consultório',
    image: '/images/team/team-4.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 5,
    name: 'Dra. Beatriz Almeida',
    role: 'Nutrição Materno-Infantil',
    image: '/images/team/team-5.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 6,
    name: 'Dr. Rafael Mendes',
    role: 'Nutrição Oncológica',
    image: '/images/team/team-6.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 7,
    name: 'Dra. Juliana Rocha',
    role: 'Nutrição Comportamental',
    image: '/images/team/team-7.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  },
  {
    id: 8,
    name: 'Dr. Fernando Lima',
    role: 'Nutrição Vegana',
    image: '/images/team/team-8.webp',
    social: {
      linkedin: '#',
      instagram: '#',
      facebook: '#',
      youtube: '#'
    }
  }
]

export function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [showSocial, setShowSocial] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Configuração: 2 páginas com 4 itens cada
  const itemsPerPage = 4
  const totalPages = 2

  const scrollToPage = (pageIndex: number, smooth = true) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      // Scroll baseado em grupos de 4 cards (considerando duplicatas)
      const totalCards = teamMembers.length * 3 // Original + 2 cópias
      const cardWidth = container.scrollWidth / totalCards
      const scrollPosition = (teamMembers.length + pageIndex * itemsPerPage) * cardWidth
      container.scrollTo({
        left: scrollPosition,
        behavior: smooth ? 'smooth' : 'auto'
      })
      setCurrentPage(pageIndex)
    }
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Multiplicador para sensibilidade do drag
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab'
      }
    }
  }

  // Auto-scroll contínuo (efeito marquee)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationFrameId: number
    const scrollSpeed = 1 // Pixels por frame

    const autoScroll = () => {
      if (!isDragging && container) {
        container.scrollLeft += scrollSpeed
      }
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    animationFrameId = requestAnimationFrame(autoScroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isDragging])

  // Inicializar na posição do meio (para permitir scroll infinito)
  useEffect(() => {
    scrollToPage(0, false)
  }, [])

  // Detect current page on scroll e implementar loop infinito
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let rafId: number

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const totalCards = teamMembers.length * 3
        const cardWidth = container.scrollWidth / totalCards
        const scrollPosition = container.scrollLeft

        // Calcular página atual baseado na posição do scroll
        const absolutePosition = scrollPosition / cardWidth
        const relativePosition = absolutePosition - teamMembers.length
        const pagePosition = relativePosition / itemsPerPage

        // Loop infinito: reset quando chegar no final ou início (sem animação)
        if (absolutePosition >= teamMembers.length * 2 - 0.5) {
          // Chegou perto do final, volta para o meio instantaneamente
          const offset = scrollPosition - (teamMembers.length * 2 * cardWidth)
          container.scrollLeft = teamMembers.length * cardWidth + offset
        } else if (absolutePosition < teamMembers.length + 0.5) {
          // Chegou perto do início, avança para o meio instantaneamente
          const offset = scrollPosition - (teamMembers.length * cardWidth)
          container.scrollLeft = (teamMembers.length * 2 * cardWidth) + offset
        }

        // Atualizar página atual baseado na posição visível
        const newPage = Math.floor(pagePosition) % totalPages
        const normalizedPage = newPage < 0 ? totalPages + newPage : newPage
        if (normalizedPage !== currentPage && normalizedPage >= 0 && normalizedPage < totalPages) {
          setCurrentPage(normalizedPage)
        }
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [currentPage])

  return (
    <section className="relative block overflow-visible bg-white py-[120px]" style={{ zIndex: 1 }}>
      {/* Decorative Shapes */}
      <div className="absolute left-0 top-[265px] z-30 animate-float-bob-y">
        <Image
          src="/images/shapes/team-one-shape-2.webp"
          alt=""
          width={108}
          height={109}
          className="w-auto object-contain"
        />
      </div>
      <div className="absolute right-[120px] top-[180px] z-30 animate-[shapemover_10s_linear_infinite]">
        <Image
          src="/images/shapes/team-one-shape-1.webp"
          alt=""
          width={110}
          height={110}
          className="w-auto object-contain"
        />
      </div>
      <div className="absolute right-[70px] top-[315px] z-30 animate-float-bob-y">
        <Image
          src="/images/shapes/team-one-shape-3.webp"
          alt=""
          width={88}
          height={84}
          className="w-auto object-contain"
        />
      </div>
      <div className="absolute bottom-[100px] left-[80px] z-30 animate-float-bob-x">
        <Image
          src="/images/shapes/team-one-shape-4.webp"
          alt=""
          width={177}
          height={188}
          className="w-auto object-contain"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-12 text-left">
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-primary-500">
              Nossa Equipe
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight text-graphite lg:text-5xl">
          <span className="relative inline-block">
              Especialistas
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
            </span> que unem prática, ciência e ensino{' '}
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Nossa equipe é formada por nutricionistas e especialistas que atuam na prática clínica, 
            no ensino e na formação profissional — conectando teoria, aplicação e realidade de mercado.
          </p>
        </div>

        {/* Team Carousel */}
        <div className="relative">
          {/* Carousel Container with Scroll Snap */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              cursor: 'grab',
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Render cards 3 times for infinite loop: before + original + after */}
            {[...teamMembers, ...teamMembers, ...teamMembers].map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="relative min-w-[100%] flex-shrink-0 sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] xl:min-w-[calc(25%-18px)]"
                style={{ scrollSnapAlign: 'start' }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => {
                  setHoveredMember(null)
                  setShowSocial(null)
                }}
              >
                <div className="relative overflow-hidden rounded-[10px] border border-neutral-200 transition-all duration-500">
                  {/* Member Image */}
                  <div className="relative h-[450px] overflow-hidden">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                      <span className="text-8xl font-bold text-neutral-300">
                        {member.name.charAt(0)}
                      </span>
                    </div>

                    {/* Dark Overlay on Hover */}
                    <div
                      className="absolute inset-0 z-10 bg-graphite transition-all duration-500"
                      style={{
                        opacity: hoveredMember === member.id ? 0.5 : 0
                      }}
                    />

                    {/* Zoom Effect */}
                    <div
                      className="absolute inset-0 bg-neutral-200 transition-transform duration-1000 ease-in-out"
                      style={{
                        transform: hoveredMember === member.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  </div>

                  {/* Content Box */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 pb-[28px] pt-[3px] text-center">
                    {/* Background Shape */}
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url(/images/shapes/team-one-single-bg-shape.webp)'
                      }}
                    />

                    {/* Decorative Shapes */}
                    <div className="pointer-events-none absolute bottom-0 left-0">
                      <Image
                        src="/images/shapes/team-one-content-shape-1.webp"
                        alt=""
                        width={130}
                        height={65}
                        className="w-auto opacity-25"
                      />
                    </div>
                    <div className="pointer-events-none absolute bottom-0 right-0">
                      <Image
                        src="/images/shapes/team-one-content-shape-2.webp"
                        alt=""
                        width={130}
                        height={65}
                        className="w-auto"
                      />
                    </div>

                    {/* Plus Button and Social Icons */}
                    <div className="relative mx-auto mb-[2px] w-fit">
                      {/* Social Icons - Appear on hover */}
                      <div
                        className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col gap-2 transition-all duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-50%) scaleY(${showSocial === member.id ? 1 : 0})`,
                          transformOrigin: 'bottom',
                          opacity: showSocial === member.id ? 1 : 0,
                          transitionDelay: showSocial === member.id ? '0.1s' : '0s'
                        }}
                      >
                        <Link
                          href={member.social.linkedin}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-white hover:text-primary-500"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={member.social.instagram}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-white hover:text-primary-500"
                        >
                          <Instagram className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={member.social.facebook}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-white hover:text-primary-500"
                        >
                          <Facebook className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={member.social.youtube}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-white hover:text-primary-500"
                        >
                          <Youtube className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      {/* Plus/X Button */}
                      <button
                        className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-graphite bg-primary-500 text-white transition-transform duration-300"
                        onClick={() => setShowSocial(showSocial === member.id ? null : member.id)}
                        onMouseEnter={() => setShowSocial(member.id)}
                        aria-label="Mostrar redes sociais"
                      >
                        {showSocial === member.id ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Name */}
                    <h3 className="mt-[2px] font-display text-xl font-semibold capitalize leading-[30px] text-graphite">
                      <Link href={`/equipe/${member.id}`} className="transition-colors hover:text-primary-500">
                        {member.name}
                      </Link>
                    </h3>

                    {/* Role */}
                    <p className="font-serif text-base leading-[18px] text-neutral-600">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Dots - 2 páginas */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentPage === index ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
                onClick={() => scrollToPage(index)}
                aria-label={`Ir para grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbar and smooth carousel */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        @media (prefers-reduced-motion: no-preference) {
          .scroll-smooth {
            scroll-behavior: smooth;
            transition: scroll-left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
    </section>
  )
}
