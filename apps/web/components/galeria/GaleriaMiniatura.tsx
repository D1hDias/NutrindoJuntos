import Image from 'next/image'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GaleriaItem } from '@/lib/galeria'

interface GaleriaMiniaturaProps {
  item: GaleriaItem
  onClick: () => void
  /** Classes da imagem: largura fluida no mural, altura fixa no carrossel. */
  imageClassName?: string
  className?: string
}

export function GaleriaMiniatura({ item, onClick, imageClassName, className }: GaleriaMiniaturaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.kind === 'video' ? `Assistir: ${item.alt}` : `Ampliar foto: ${item.alt}`}
      className={cn(
        'group relative block cursor-zoom-in overflow-hidden rounded-xl bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {item.kind === 'photo' ? (
        <Image
          src={item.thumb}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          className={cn(
            'transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]',
            imageClassName
          )}
        />
      ) : (
        <>
          {/* Capa servida pelo YouTube; o player só carrega ao clicar. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
            alt={item.alt}
            loading="lazy"
            className={cn('aspect-[3/4] object-cover', imageClassName)}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/15">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#6d4d88] shadow-lg">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </span>
        </>
      )}
    </button>
  )
}
