import manifesto from './galeria-manifest.json'

/**
 * Galeria institucional: fotos de eventos, aulas e bastidores.
 *
 * As fotos vem de `galeria-manifest.json`, gerado por `scripts/galeria-processar.sh`
 * a partir de `_fotos-entrada/`. Para adicionar fotos, coloque-as na pasta do grupo
 * e rode o script — nada aqui precisa mudar.
 */

/**
 * Só para visualizar o layout com poucas fotos: repete as existentes até encher o
 * mural. DESLIGUE (false) antes de publicar — em produção, foto repetida aparece.
 */
const MODO_DEMONSTRACAO = false

/** Curso sem pasta própria mostra fotos gerais de aulas e eventos (decisão do Diego). */
const CURSO_SEM_FOTO_USA_GERAIS = true
const MINIMO_DEMONSTRACAO = 30
const MINIMO_CARROSSEL_DEMONSTRACAO = 8

/** Vídeos do YouTube (não listados). Cole o ID — o trecho depois de "v=" no link. */
const VIDEOS: { youtubeId: string; group: string; title: string }[] = []

export const GRUPOS_INSTITUCIONAIS = ['eventos', 'aulas', 'bastidores'] as const
export type GrupoInstitucional = (typeof GRUPOS_INSTITUCIONAIS)[number]

export const ROTULOS_GRUPO: Record<GrupoInstitucional, string> = {
  eventos: 'Eventos',
  aulas: 'Aulas',
  bastidores: 'Bastidores',
}

const ALT_GRUPO: Record<string, string> = {
  eventos: 'Evento da Nutrindo Juntos',
  aulas: 'Aula da Nutrindo Juntos',
  bastidores: 'Bastidores da Nutrindo Juntos',
}

export type GaleriaItem =
  | {
      id: string
      kind: 'photo'
      src: string
      thumb: string
      group: string
      width: number
      height: number
      alt: string
    }
  | {
      id: string
      kind: 'video'
      youtubeId: string
      group: string
      alt: string
    }

type EntradaManifesto = { src: string; thumb: string; group: string; width: number; height: number }

function altDe(group: string) {
  return ALT_GRUPO[group] ?? 'Turma da Nutrindo Juntos'
}

function fotosDoGrupo(group: string): GaleriaItem[] {
  return (manifesto as EntradaManifesto[])
    .filter((e) => e.group === group)
    .map((e) => ({ id: e.src, kind: 'photo' as const, alt: altDe(e.group), ...e }))
}

function videosDoGrupo(group: string): GaleriaItem[] {
  return VIDEOS.filter((v) => v.group === group).map((v) => ({
    id: `yt:${v.youtubeId}`,
    kind: 'video' as const,
    youtubeId: v.youtubeId,
    group: v.group,
    alt: v.title,
  }))
}

/** Alterna os grupos (evento, aula, evento, aula...) para o mural não ficar em blocos. */
function intercalar(listas: GaleriaItem[][]): GaleriaItem[] {
  const resultado: GaleriaItem[] = []
  const maior = Math.max(0, ...listas.map((l) => l.length))
  for (let i = 0; i < maior; i++) {
    for (const lista of listas) if (lista[i]) resultado.push(lista[i])
  }
  return resultado
}

/** Repete os itens em ciclo até atingir o mínimo, com ids únicos para cada cópia. */
function repetirAte(itens: GaleriaItem[], minimo: number): GaleriaItem[] {
  if (itens.length === 0 || itens.length >= minimo) return itens
  return Array.from({ length: minimo }, (_, i) => {
    const original = itens[i % itens.length]
    const copia = Math.floor(i / itens.length)
    return copia === 0 ? original : { ...original, id: `${original.id}#${copia}` }
  })
}

/** Fotos e vídeos institucionais (eventos, aulas, bastidores), já intercalados. */
export function getGaleria(): GaleriaItem[] {
  const itens = intercalar(
    GRUPOS_INSTITUCIONAIS.map((g) => [...videosDoGrupo(g), ...fotosDoGrupo(g)])
  )
  return MODO_DEMONSTRACAO ? repetirAte(itens, MINIMO_DEMONSTRACAO) : itens
}

/** Nome curto da pasta em `_fotos-entrada/cursos/` para cada curso; os demais usam o próprio slug. */
const PASTA_DO_CURSO: Record<string, string> = {
  'nca-nutricao-clinica-aplicada': 'nca',
  'nce-nutricao-clinica-estrategica': 'nce',
}

/** Fotos de um curso específico, da pasta `cursos/<pasta do curso>`. */
export function getGaleriaDoCurso(slug: string): GaleriaItem[] {
  const grupo = `cursos/${PASTA_DO_CURSO[slug] ?? slug}`
  const proprias = [...videosDoGrupo(grupo), ...fotosDoGrupo(grupo)]
  const base =
    proprias.length === 0 && CURSO_SEM_FOTO_USA_GERAIS
      ? intercalar([fotosDoGrupo('aulas'), fotosDoGrupo('eventos')])
      : proprias
  return MODO_DEMONSTRACAO ? repetirAte(base, MINIMO_CARROSSEL_DEMONSTRACAO) : base
}
