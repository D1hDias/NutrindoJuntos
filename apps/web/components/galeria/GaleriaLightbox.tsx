'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GaleriaItem } from '@/lib/galeria'

interface GaleriaLightboxProps {
  items: GaleriaItem[]
  /** Índice aberto; `null` fecha o lightbox. */
  index: number | null
  onIndexChange: (index: number | null) => void
}

const DISTANCIA_SWIPE = 50

export function GaleriaLightbox({ items, index, onIndexChange }: GaleriaLightboxProps) {
  const toqueInicio = useRef<number | null>(null)
  // Como o lightbox abre por estado (sem DialogTrigger), devolvemos o foco à mão.
  const quemAbriu = useRef<HTMLElement | null>(null)
  const aberto = index !== null && items.length > 0
  const item = aberto ? items[index] : null
  const total = items.length

  const irPara = useCallback(
    (passo: number) => {
      if (index === null || total === 0) return
      onIndexChange((index + passo + total) % total)
    },
    [index, total, onIndexChange]
  )

  // Pré-carrega a vizinha seguinte para a navegação não piscar.
  useEffect(() => {
    if (index === null || total < 2) return
    const proxima = items[(index + 1) % total]
    if (proxima.kind === 'photo') {
      const img = new window.Image()
      img.src = proxima.src
    }
  }, [index, items, total])

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(-1) }
  }

  const aoSoltarToque = (e: React.TouchEvent) => {
    if (toqueInicio.current === null) return
    const delta = e.changedTouches[0].clientX - toqueInicio.current
    if (Math.abs(delta) > DISTANCIA_SWIPE) irPara(delta < 0 ? 1 : -1)
    toqueInicio.current = null
  }

  return (
    <DialogPrimitive.Root open={aberto} onOpenChange={(open) => !open && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-[#150e1b]/95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" />
        <DialogPrimitive.Content
          onOpenAutoFocus={() => { quemAbriu.current = document.activeElement as HTMLElement | null }}
          onCloseAutoFocus={(e) => { e.preventDefault(); quemAbriu.current?.focus() }}
          onKeyDown={aoTeclar}
          onTouchStart={(e) => { toqueInicio.current = e.touches[0].clientX }}
          onTouchEnd={aoSoltarToque}
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center px-4 py-16 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98] motion-reduce:animate-none"
        >
          <DialogPrimitive.Title className="sr-only">Galeria de fotos da Nutrindo Juntos</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Use as setas do teclado para navegar e Esc para fechar.
          </DialogPrimitive.Description>

          {item?.kind === 'photo' && (
            <Image
              key={item.id}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              priority
              className="max-h-full w-auto max-w-full rounded-lg object-contain"
            />
          )}

          {item?.kind === 'video' && (
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-lg bg-black">
              <iframe
                key={item.id}
                src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                title={item.alt}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => irPara(-1)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => irPara(1)}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tabular-nums text-white/70" aria-live="polite">
                {(index ?? 0) + 1} de {total}
              </p>
            </>
          )}

          <DialogPrimitive.Close
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
