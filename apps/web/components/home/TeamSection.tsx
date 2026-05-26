'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Instagram, Plus, X } from 'lucide-react'
import { teamMembers } from '@/lib/data/team'

const AUTOPLAY_INTERVAL = 5000 // 5 segundos

export function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [showSocial, setShowSocial] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalPages = 2

  // Página 1: membros 0-2, Página 2: membros 3-5
  const getPageMembers = (page: number) => {
    const start = page * 3
    return teamMembers.slice(start, start + 3)
  }

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Auto-play: avança de página a cada 5s
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [isPaused])

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
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {/* Page 1 */}
            <div className="flex w-full flex-shrink-0 justify-center gap-6 px-4">
              {getPageMembers(0).map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  hoveredMember={hoveredMember}
                  showSocial={showSocial}
                  setHoveredMember={setHoveredMember}
                  setShowSocial={setShowSocial}
                />
              ))}
            </div>

            {/* Page 2 */}
            <div className="flex w-full flex-shrink-0 justify-center gap-6 px-4">
              {getPageMembers(1).map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  hoveredMember={hoveredMember}
                  showSocial={showSocial}
                  setHoveredMember={setHoveredMember}
                  setShowSocial={setShowSocial}
                />
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="mt-8 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? 'scale-110 bg-primary-500'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                onClick={() => goToPage(index)}
                aria-label={`Ir para grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente de card individual
function TeamCard({
  member,
  hoveredMember,
  showSocial,
  setHoveredMember,
  setShowSocial
}: {
  member: typeof teamMembers[number]
  hoveredMember: number | null
  showSocial: number | null
  setHoveredMember: (id: number | null) => void
  setShowSocial: (id: number | null) => void
}) {
  return (
    <div
      className="relative w-full max-w-[300px] flex-1"
      onMouseEnter={() => setHoveredMember(member.id)}
      onMouseLeave={() => {
        setHoveredMember(null)
        setShowSocial(null)
      }}
    >
      <div className="relative overflow-hidden rounded-[10px] border border-neutral-200 transition-all duration-500">
        {/* Member Image */}
        <div className="relative h-[450px] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-1000 ease-in-out"
            style={{
              transform: hoveredMember === member.id ? 'scale(1.05)' : 'scale(1)'
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Dark Overlay on Hover */}
          <div
            className="absolute inset-0 z-10 bg-graphite transition-all duration-500"
            style={{
              opacity: hoveredMember === member.id ? 0.5 : 0
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

          {/* Instagram Button */}
          <div className="relative mx-auto mb-[2px] w-fit">
            {/* Instagram Icon - Appears on hover */}
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
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-white hover:text-primary-500"
              >
                <Instagram className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Plus/X Button */}
            <button
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-graphite bg-primary-500 text-white transition-transform duration-300"
              onClick={() => setShowSocial(showSocial === member.id ? null : member.id)}
              onMouseEnter={() => setShowSocial(member.id)}
              aria-label="Ver Instagram"
            >
              {showSocial === member.id ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Name */}
          <h3 className="mt-[2px] font-display text-xl font-semibold leading-[30px] text-graphite">
            {member.name}
          </h3>

          {/* Role */}
          <p className="font-serif text-base leading-[18px] text-neutral-600">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  )
}
