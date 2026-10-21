/**
 * Parceiros exibidos na faixa rolante da home, logo abaixo da Equipe.
 *
 * Para ativar o clique de uma logo, preencha `site` com o endereço completo
 * (com https://). Enquanto `site` estiver vazio, a logo aparece sem link.
 *
 * Logo nova: trate o arquivo (fundo transparente, aparada, 160 px de altura, .webp),
 * coloque em `public/images/parceiros/` e informe largura e altura do arquivo.
 */
export type Parceiro = {
  nome: string
  site: string
  logo: string
  largura: number
  altura: number
  /** Ajuste fino do tamanho na faixa, se alguma logo parecer grande ou pequena demais (1 = padrão). */
  escala?: number
}

export const PARCEIROS: Parceiro[] = [
  {
    nome: 'Faculdade VP – Centro de Nutrição Funcional',
    site: 'https://faculdadevp.com.br',
    logo: '/images/parceiros/faculdade-vp.webp',
    largura: 288,
    altura: 160,
  },
  {
    nome: 'RH+ Experts',
    site: 'https://rhmaisexperts.com.br',
    logo: '/images/parceiros/rh-experts.webp',
    largura: 218,
    altura: 160,
  },
  {
    nome: 'WebDiet',
    site: 'https://webdiet.com.br/',
    logo: '/images/parceiros/webdiet.webp',
    largura: 716,
    altura: 160,
  },
  {
    nome: 'CESCORF – Equipamentos Antropométricos',
    site: 'https://lojacescorf.com.br',
    logo: '/images/parceiros/cescorf.webp',
    largura: 652,
    altura: 160,
  },
  {
    nome: 'Casas Pedro',
    site: 'https://www.casaspedro.com.br/',
    logo: '/images/parceiros/casas-pedro.webp',
    largura: 292,
    altura: 160,
  },
  {
    nome: 'Shaped',
    site: 'https://web.shaped.com.br/landing',
    logo: '/images/parceiros/shaped.webp',
    largura: 160,
    altura: 160,
  },
]
