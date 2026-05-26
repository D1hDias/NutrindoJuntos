'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

const counters = [
  {
    id: 1,
    value: 10,
    suffix: 'k',
    label: 'Alunos Capacitados',
    speed: 1500
  },
  {
    id: 2,
    value: 50,
    suffix: '+',
    label: 'Cursos Gravados',
    speed: 1500
  },
  {
    id: 3,
    value: 15,
    suffix: 'M',
    label: 'Taxa de Satisfação',
    speed: 1500
  }
]

export function CounterUpSection() {
  const [counts, setCounts] = useState<{ [key: number]: number }>({})
  const [hasAnimated, setHasAnimated] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          // Animar cada contador
          counters.forEach((counter) => {
            let current = 0
            const increment = counter.value / (counter.speed / 30)
            const timer = setInterval(() => {
              current += increment
              if (current >= counter.value) {
                setCounts((prev) => ({ ...prev, [counter.id]: counter.value }))
                clearInterval(timer)
              } else {
                setCounts((prev) => ({ ...prev, [counter.id]: Math.floor(current) }))
              }
            }, 30)
          })
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#6d4d88', // Roxo Lavanda do manual da marca
        zIndex: 1
      }}
    >
      {/* Background Image Area - Direita - Optimized with Next.js Image */}
      <div
        className="absolute bottom-0 right-0 top-0 hidden lg:block overflow-hidden"
        style={{
          width: 'calc((100% - 686px) / 2)',
          borderTopLeftRadius: '135px',
          borderBottomLeftRadius: '135px'
        }}
      >
        <Image
          src="/images/backgrounds/counter-one-bg.webp"
          alt=""
          fill
          quality={75}
          style={{
            objectFit: 'cover',
            objectPosition: 'right center',
          }}
        />
        {/* Border Decoration */}
        <div
          className="absolute inset-0"
          style={{
            border: '12px solid white',
            borderTopLeftRadius: '147px',
            borderBottomLeftRadius: '147px'
          }}
        />

        {/* Video Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Decorative Shape - Counter One Video Shape */}
            <div className="absolute -left-16 -top-16">
              <Image
                src="/images/shapes/counter-one-video-shape-1.webp"
                alt=""
                width={150}
                height={150}
                className="w-auto"
              />
            </div>

            {/* Video Play Button */}
            <button
              className="group relative flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
              aria-label="Reproduzir vídeo"
            >
              {/* Ripple Effect */}
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60 opacity-75" />

              {/* Play Icon */}
              <div className="relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white text-[#6d4d88] transition-all group-hover:bg-graphite group-hover:text-white">
                <Play className="h-5 w-5 fill-current" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Shape - Left Side - Optimized with Next.js Image */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-full -z-10">
        <Image
          src="/images/shapes/counter-one-shape-1.webp"
          alt=""
          fill
          quality={75}
          style={{
            objectFit: 'contain',
            objectPosition: 'left center',
            opacity: 0.05,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="lg:w-2/3">
          {/* Counters List */}
          <ul className="flex flex-wrap items-center">
            {counters.map((counter, index) => (
              <li
                key={counter.id}
                className="relative flex w-full flex-col items-center justify-center py-[73px] text-center transition-all duration-700 sm:w-1/2 lg:w-1/3"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover Background Image - Optimized with Next.js Image */}
                <div
                  className="absolute inset-0 opacity-0 transition-all duration-700 overflow-hidden"
                  style={{
                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(50px)',
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                >
                  <Image
                    src="/images/backgrounds/counter-hover-bg.webp"
                    alt=""
                    fill
                    quality={75}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  {/* White Overlay */}
                  <div className="absolute inset-0 -z-10 bg-white opacity-83" />
                </div>

                {/* Counter Content */}
                <div className="relative z-10">
                  {/* Number */}
                  <div className="flex items-baseline justify-center">
                    <h3
                      className="font-display text-[80px] font-semibold leading-[80px] transition-all duration-500"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: hoveredIndex === index ? '1px #262626' : '1px #ffffff'
                      }}
                    >
                      {counts[counter.id] || 0}
                    </h3>
                    <span
                      className="ml-1 font-display text-[80px] font-semibold leading-[80px] transition-all duration-500"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: hoveredIndex === index ? '1px #262626' : '1px #ffffff'
                      }}
                    >
                      {counter.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <p
                    className="mt-2 text-xl font-medium leading-[30px] transition-all duration-500"
                    style={{
                      color: hoveredIndex === index ? '#262626' : '#ffffff'
                    }}
                  >
                    {counter.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
