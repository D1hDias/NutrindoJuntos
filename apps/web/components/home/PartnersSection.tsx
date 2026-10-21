import Image from 'next/image'
import { PARCEIROS, type Parceiro } from '@/lib/parceiros'

// Logos de proporções diferentes parecem do mesmo tamanho quando ocupam a mesma área:
// as largas ficam mais baixas, as compactas mais altas.
const AREA_LOGO = 3800 // px² na tela
const ALTURA_MIN = 28
const ALTURA_MAX = 52
const ESPACO_ENTRE = 64 // px à direita de cada logo (padding, não gap, para a volta fechar sem pulo)
const VELOCIDADE = 40 // px por segundo, constante qualquer que seja o número de parceiros
const LARGURA_MINIMA_DA_VOLTA = 2600 // cobre telas largas sem buraco no fim da volta

function tamanho(p: Parceiro) {
  const aspecto = p.largura / p.altura
  const ideal = Math.sqrt(AREA_LOGO / aspecto)
  const altura = Math.round(Math.min(ALTURA_MAX, Math.max(ALTURA_MIN, ideal)) * (p.escala ?? 1))
  return { altura, largura: Math.round(altura * aspecto) }
}

function Logo({ parceiro, focavel }: { parceiro: Parceiro; focavel: boolean }) {
  const { altura, largura } = tamanho(parceiro)
  const imagem = (
    <Image
      src={parceiro.logo}
      alt={parceiro.nome}
      width={largura}
      height={altura}
      loading="lazy"
      className="parceiros-logo"
      style={{ height: altura, width: largura }}
    />
  )

  if (!parceiro.site) return <span className="parceiros-item block">{imagem}</span>

  return (
    <a
      href={parceiro.site}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={focavel ? undefined : -1}
      aria-label={`${parceiro.nome} (abre o site em nova aba)`}
      className="parceiros-item block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
    >
      {imagem}
    </a>
  )
}

export function PartnersSection() {
  if (PARCEIROS.length === 0) return null

  // A animação desloca o trilho em -50%: ele precisa de duas metades idênticas,
  // e cada metade precisa ser mais larga que a tela para não sobrar vão.
  const larguraDeUmaVolta = PARCEIROS.reduce((soma, p) => soma + tamanho(p).largura + ESPACO_ENTRE, 0)
  const repeticoes = Math.max(1, Math.ceil(LARGURA_MINIMA_DA_VOLTA / larguraDeUmaVolta))
  const metade = Array.from({ length: repeticoes }, () => PARCEIROS).flat()
  const trilho = [...metade, ...metade]
  const duracao = Math.round((larguraDeUmaVolta * repeticoes) / VELOCIDADE)

  return (
    <section id="parceiros" aria-labelledby="parceiros-titulo" className="scroll-mt-24 bg-white pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-center gap-2 border-t border-neutral-100 pt-12">
          <span className="h-3 w-3 rounded-full bg-primary-500" aria-hidden="true" />
          <h2 id="parceiros-titulo" className="font-serif text-lg font-semibold text-primary-500">
            Nossos parceiros
          </h2>
        </div>
      </div>

      <div className="parceiros-faixa">
        <ul
          className="parceiros-trilho"
          style={{ '--parceiros-duracao': `${duracao}s` } as React.CSSProperties}
        >
          {trilho.map((parceiro, i) => {
            // Só a primeira volta é lida pelo leitor de tela e alcançada pelo Tab;
            // as cópias existem apenas para o loop visual.
            const original = i < PARCEIROS.length
            return (
              <li key={i} aria-hidden={original ? undefined : true} style={{ paddingRight: ESPACO_ENTRE }}>
                <Logo parceiro={parceiro} focavel={original} />
              </li>
            )
          })}
        </ul>
      </div>

      {/* Mostrada no lugar da faixa quando o sistema pede menos movimento. */}
      <ul
        className="parceiros-estatico container mx-auto flex-wrap items-center justify-center gap-x-12 gap-y-8 px-4"
        aria-label="Nossos parceiros"
      >
        {PARCEIROS.map((parceiro) => (
          <li key={parceiro.nome}>
            <Logo parceiro={parceiro} focavel />
          </li>
        ))}
      </ul>
    </section>
  )
}
