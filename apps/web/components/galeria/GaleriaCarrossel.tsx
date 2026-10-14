'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GaleriaItem } from '@/lib/galeria'
import { GaleriaMiniatura } from './GaleriaMiniatura'
import { GaleriaLightbox } from './GaleriaLightbox'

interface GaleriaCarrosselProps {
  items: GaleriaItem[]
  titulo: string
}

export function GaleriaCarrossel({ items, titulo }: GaleriaCarrosselProps) {
  const trilho = useRef<HTMLDivElement>(null)
  const [aberto, setAberto] = useState<number | null>(null)
  const [noInicio, setNoInicio] = useState(true)
  const [noFim, setNoFim] = useState(false)

  const atualizarLimites = useCallback(() => {
    const el = trilho.current
    if (!el) return
    setNoInicio(el.scrollLeft <= 4)
    setNoFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    atualizarLimites()
    window.addEventListener('resize', atualizarLimites)
    return () => window.removeEventListener('resize', atualizarLimites)
  }, [atualizarLimites])

  const rolar = (direcao: 1 | -1) => {
    const el = trilho.current
    if (el) el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (items.length === 0) return null

  const seta =
    'flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

  return (
    <section aria-label={titulo}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-bold text-graphite">{titulo}</h2>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => rolar(-1)} disabled={noInicio} aria-label="Fotos anteriores" className={seta}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => rolar(1)} disabled={noFim} aria-label="Mais fotos" className={seta}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trilho}
        onScroll={atualizarLimites}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <GaleriaMiniatura
            key={item.id}
            item={item}
            onClick={() => setAberto(i)}
            className="shrink-0 snap-start"
            imageClassName="h-56 w-auto sm:h-72"
          />
        ))}
      </div>

      <GaleriaLightbox items={items} index={aberto} onIndexChange={setAberto} />
    </section>
  )
}
