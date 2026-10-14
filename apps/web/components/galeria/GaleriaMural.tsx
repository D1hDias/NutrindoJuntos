'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { GRUPOS_INSTITUCIONAIS, ROTULOS_GRUPO, type GaleriaItem } from '@/lib/galeria'
import { GaleriaMiniatura } from './GaleriaMiniatura'
import { GaleriaLightbox } from './GaleriaLightbox'

interface GaleriaMuralProps {
  items: GaleriaItem[]
  /** Mostra os filtros por grupo (só aparecem se houver mais de um grupo com fotos). */
  filtros?: boolean
  /** Quantas fotos aparecem por vez; o botão "Ver mais fotos" revela o próximo lote. */
  porPagina?: number
  /** Teto fixo, sem "Ver mais" — para vitrines como a da home. */
  limite?: number
  /** Teto menor no celular, onde duas colunas crescem muito na vertical. */
  limiteCelular?: number
  /** Link de saída abaixo do mural (ex.: para a galeria completa). */
  cta?: { href: string; label: string }
}

/** Altura relativa à largura: as colunas têm a mesma largura, então isso compara alturas. */
function proporcao(item: GaleriaItem) {
  return item.kind === 'photo' ? item.height / item.width : 4 / 3
}

// Em unidades de largura de coluna: o recuo das colunas deslocadas e o espaço entre fotos.
const RECUO_INICIAL = 0.2
const ESPACO_ENTRE_FOTOS = 0.06

/**
 * Coloca cada foto na coluna mais curta até ali, para o pé do mural ficar alinhado
 * mesmo misturando retrato e paisagem. As colunas deslocadas já começam mais altas.
 */
function distribuir(itens: GaleriaItem[], colunas: number) {
  const resultado: GaleriaItem[][] = Array.from({ length: colunas }, () => [])
  const alturas: number[] = Array.from({ length: colunas }, (_, i) => (i % 2 === 1 ? RECUO_INICIAL : 0))
  for (const item of itens) {
    const menor = alturas.indexOf(Math.min(...alturas))
    resultado[menor].push(item)
    alturas[menor] += proporcao(item) + ESPACO_ENTRE_FOTOS
  }
  return { colunas: resultado, desnivel: Math.max(...alturas) - Math.min(...alturas) }
}

/**
 * Numa vitrine de tamanho fixo, poucas fotos por coluna deixam o pé torto. Testa
 * totais próximos do alvo e fica com o que alinha melhor — sem cortar nem esconder foto.
 */
function totalEquilibrado(itens: GaleriaItem[], colunas: number, alvo: number) {
  let melhor = Math.min(alvo, itens.length)
  let menorDesnivel = Infinity
  for (let n = Math.max(colunas, alvo - 2); n <= Math.min(itens.length, alvo + 2); n++) {
    const { desnivel } = distribuir(itens.slice(0, n), colunas)
    if (desnivel < menorDesnivel - 0.01 || (Math.abs(desnivel - menorDesnivel) <= 0.01 && Math.abs(n - alvo) < Math.abs(melhor - alvo))) {
      menorDesnivel = desnivel
      melhor = n
    }
  }
  return melhor
}

export function GaleriaMural({
  items,
  filtros = false,
  porPagina = 12,
  limite,
  limiteCelular,
  cta,
}: GaleriaMuralProps) {
  const [grupo, setGrupo] = useState<string | null>(null)
  const [visiveis, setVisiveis] = useState(porPagina)
  const [aberto, setAberto] = useState<number | null>(null)

  const gruposPresentes = useMemo(
    () => GRUPOS_INSTITUCIONAIS.filter((g) => items.some((i) => i.group === g)),
    [items]
  )
  const filtrados = useMemo(
    () => (grupo ? items.filter((i) => i.group === grupo) : items),
    [items, grupo]
  )

  const teto = limite ?? visiveis
  const tetoCelular = Math.min(teto, limiteCelular ?? teto)
  // Vitrine fixa: ajusta o total para alinhar o pé. Com "Ver mais", respeita o lote.
  const exibidos = filtrados.slice(0, limite ? totalEquilibrado(filtrados, 4, teto) : teto)
  const exibidosCelular = filtrados.slice(0, limite ? totalEquilibrado(filtrados, 2, tetoCelular) : tetoCelular)
  const temMais = limite === undefined && filtrados.length > visiveis

  // A posição de cada item na lista filtrada é o índice usado pelo lightbox.
  const indiceDe = (item: GaleriaItem) => filtrados.indexOf(item)

  const escolherGrupo = (g: string | null) => {
    setGrupo(g)
    setVisiveis(porPagina)
  }

  const coluna = (itens: GaleriaItem[], deslocada: boolean, deslocamento: string) => (
    <div className={cn('flex flex-col gap-3 sm:gap-4 lg:gap-5', deslocada && deslocamento)}>
      {itens.map((item) => (
        <GaleriaMiniatura
          key={item.id}
          item={item}
          onClick={() => setAberto(indiceDe(item))}
          imageClassName="h-auto w-full"
        />
      ))}
    </div>
  )

  if (items.length === 0) return null

  return (
    <div>
      {filtros && gruposPresentes.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar fotos">
          {[null, ...gruposPresentes].map((g) => {
            const ativo = grupo === g
            return (
              <button
                key={g ?? 'todos'}
                type="button"
                aria-pressed={ativo}
                onClick={() => escolherGrupo(g)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  ativo
                    ? 'bg-primary-500 text-white'
                    : 'border border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:text-primary-600'
                )}
              >
                {g ? ROTULOS_GRUPO[g] : 'Todos'}
              </button>
            )
          })}
        </div>
      )}

      {/* Celular e tablet: duas colunas, a segunda começa mais abaixo. */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {distribuir(exibidosCelular, 2).colunas.map((col, i) => (
          <div key={i}>{coluna(col, i % 2 === 1, 'pt-10')}</div>
        ))}
      </div>

      {/* Desktop: quatro colunas em ritmo alternado, como fotos presas num painel. */}
      <div className="hidden grid-cols-4 gap-5 lg:grid">
        {distribuir(exibidos, 4).colunas.map((col, i) => (
          <div key={i}>{coluna(col, i % 2 === 1, 'pt-16')}</div>
        ))}
      </div>

      {(temMais || cta) && (
        <div className="mt-12 flex justify-center">
          {temMais ? (
            <button
              type="button"
              onClick={() => setVisiveis((v) => v + porPagina)}
              className="rounded-full border-2 border-primary-500 px-8 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Ver mais fotos
            </button>
          ) : (
            cta && (
              <Link
                href={cta.href}
                className="rounded-full border-2 border-primary-500 px-8 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {cta.label}
              </Link>
            )
          )}
        </div>
      )}

      <GaleriaLightbox items={filtrados} index={aberto} onIndexChange={setAberto} />
    </div>
  )
}
