import type { Post, Categoria, Curso, Author, Membro, TeamMember } from '@/types'

/**
 * Mock data for testing purposes
 * This data will be used as fallback when CMS has no content
 * DELETE THIS FILE when ready for production
 */

export const MOCK_CATEGORIAS: Categoria[] = [
  {
    id: 'cat-1',
    name: 'Nutrição Clínica',
    slug: 'nutricao-clinica',
    description: 'Conteúdos sobre nutrição clínica e atendimento de pacientes'
  },
  {
    id: 'cat-2',
    name: 'Nutrição Esportiva',
    slug: 'nutricao-esportiva',
    description: 'Tudo sobre nutrição para atletas e praticantes de atividade física'
  },
  {
    id: 'cat-3',
    name: 'Nutrição Funcional',
    slug: 'nutricao-funcional',
    description: 'Abordagem funcional e integrativa da nutrição'
  },
  {
    id: 'cat-4',
    name: 'Gestão de Consultório',
    slug: 'gestao-consultorio',
    description: 'Dicas para gerenciar seu consultório de nutrição'
  },
]

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    title: '10 Dicas Essenciais para Iniciar sua Carreira como Nutricionista',
    slug: 'dicas-iniciar-carreira-nutricionista',
    excerpt: 'Descubra as estratégias fundamentais para construir uma carreira sólida na nutrição, desde o primeiro atendimento até a gestão do seu consultório.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/22c55e/ffffff?text=Nutricao+Clinica',
    categoria: MOCK_CATEGORIAS[3], // Gestão de Consultório
    author: {
      id: 'author-1',
      name: 'Ana Paula Silva',
      avatar: '/images/blog/authors/author-1.webp'
    },
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    status: 'published'
  },
  {
    id: 'post-2',
    title: 'Nutrição Esportiva: Guia Completo para Iniciantes',
    slug: 'nutricao-esportiva-guia-iniciantes',
    excerpt: 'Aprenda os fundamentos da nutrição esportiva e como aplicar esse conhecimento no atendimento de atletas amadores e profissionais.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/f59e0b/ffffff?text=Nutricao+Esportiva',
    categoria: MOCK_CATEGORIAS[1], // Nutrição Esportiva
    author: {
      id: 'author-2',
      name: 'Mariana Costa',
      avatar: '/images/blog/authors/author-2.webp'
    },
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dias atrás
    status: 'published'
  },
  {
    id: 'post-3',
    title: 'Como Fazer uma Anamnese Nutricional Completa e Eficiente',
    slug: 'anamnese-nutricional-completa',
    excerpt: 'Passo a passo detalhado para realizar uma anamnese nutricional que vai além do básico, coletando informações valiosas para um atendimento personalizado.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/16a34a/ffffff?text=Anamnese+Nutricional',
    categoria: MOCK_CATEGORIAS[0], // Nutrição Clínica
    author: {
      id: 'author-3',
      name: 'Carlos Eduardo Santos',
      avatar: '/images/blog/authors/author-3.webp'
    },
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias atrás
    status: 'published'
  },
  {
    id: 'post-4',
    title: 'Nutrição Funcional: Integrando Ciência e Prática Clínica',
    slug: 'nutricao-funcional-ciencia-pratica',
    excerpt: 'Entenda os princípios da nutrição funcional e como aplicá-los de forma baseada em evidências no seu dia a dia profissional.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/15803d/ffffff?text=Nutricao+Funcional',
    categoria: MOCK_CATEGORIAS[2], // Nutrição Funcional
    author: {
      id: 'author-4',
      name: 'Carlos Eduardo Santos',
      avatar: '/images/blog/authors/author-3.webp'
    },
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 dias atrás
    status: 'published'
  },
  {
    id: 'post-5',
    title: 'Estratégias de Marketing Digital para Nutricionistas',
    slug: 'marketing-digital-nutricionistas',
    excerpt: 'Descubra como usar o marketing digital de forma ética e eficiente para atrair mais pacientes e construir sua marca pessoal.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/d97706/ffffff?text=Marketing+Digital',
    categoria: MOCK_CATEGORIAS[3], // Gestão de Consultório
    author: {
      id: 'author-5',
      name: 'Ana Paula Silva',
      avatar: '/images/blog/authors/author-1.webp'
    },
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 dias atrás
    status: 'published'
  },
  {
    id: 'post-6',
    title: 'Suplementação Esportiva: O Que Todo Nutricionista Precisa Saber',
    slug: 'suplementacao-esportiva-guia',
    excerpt: 'Guia completo sobre os principais suplementos utilizados por atletas, com base em evidências científicas e indicações práticas.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/f59e0b/ffffff?text=Suplementacao',
    categoria: MOCK_CATEGORIAS[1], // Nutrição Esportiva
    author: {
      id: 'author-6',
      name: 'Mariana Costa',
      avatar: '/images/blog/authors/author-2.webp'
    },
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 dias atrás
    status: 'published'
  },
  {
    id: 'post-7',
    title: 'Atendimento Nutricional em Diabetes: Guia Prático',
    slug: 'atendimento-nutricional-diabetes',
    excerpt: 'Aprenda as melhores práticas para atender pacientes com diabetes, desde a educação alimentar até o planejamento de cardápios personalizados.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/16a34a/ffffff?text=Diabetes',
    categoria: MOCK_CATEGORIAS[0], // Nutrição Clínica
    author: {
      id: 'author-7',
      name: 'Carlos Eduardo Santos',
      avatar: '/images/blog/authors/author-3.webp'
    },
    publishedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 dias atrás
    status: 'published'
  },
  {
    id: 'post-8',
    title: 'Microbiota Intestinal e Saúde: Aplicações Práticas na Nutrição',
    slug: 'microbiota-intestinal-nutricao',
    excerpt: 'Descubra como a ciência da microbiota intestinal pode transformar sua prática clínica e melhorar os resultados dos seus pacientes.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/15803d/ffffff?text=Microbiota',
    categoria: MOCK_CATEGORIAS[2], // Nutrição Funcional
    author: {
      id: 'author-8',
      name: 'Ana Paula Silva',
      avatar: '/images/blog/authors/author-1.webp'
    },
    publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 dias atrás
    status: 'published'
  },
  {
    id: 'post-9',
    title: 'Precificação de Consultas: Como Cobrar Seu Valor Real',
    slug: 'precificacao-consultas-nutricionista',
    excerpt: 'Aprenda a precificar suas consultas de forma justa, considerando seu conhecimento, experiência e o valor que entrega aos pacientes.',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Este é um post de exemplo para testes. Conteúdo completo será adicionado no CMS.' }]
          }
        ]
      }
    },
    featuredImage: 'https://placehold.co/800x600/d97706/ffffff?text=Precificacao',
    categoria: MOCK_CATEGORIAS[3], // Gestão de Consultório
    author: {
      id: 'author-9',
      name: 'Mariana Costa',
      avatar: '/images/blog/authors/author-2.webp'
    },
    publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 dias atrás
    status: 'published'
  },
]

export const MOCK_CURSOS: Curso[] = [
  {
    id: 'nca-1',
    title: 'NCA - Nutrição Clínica Aplicada',
    slug: 'nca-nutricao-clinica-aplicada',
    description: 'Curso intensivo e 100% prático de Nutrição Clínica para quem quer dominar o básico muito bem feito, com fundamentos sólidos e aplicáveis no dia a dia da clínica.',
    headline: 'A prática que transforma. A clínica que dá resultado.',
    featuredImage: '/images/cursos/IMG_8181.webp',
    content: [
      {
        children: [
          {
            text: 'O curso NCA - Nutrição Clínica Aplicada é um programa 100% prático desenvolvido especialmente para estudantes de nutrição, recém-formados e profissionais que desejam fazer a transição para a prática clínica com confiança e segurança.'
          }
        ]
      },
      {
        children: [
          {
            text: '💡 O que você vai aprender:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Metodologia completa de consulta nutricional'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Protocolos de avaliação nutricional validados'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Estratégias de prescrição personalizada'
          }
        ]
      }
    ],
    instructor: {
      id: 'instructor-1',
      name: 'Dra. Ana Paula Silva',
      bio: 'Nutricionista com mais de 10 anos de experiência em atendimento clínico.',
      avatar: 'https://placehold.co/150x150/22c55e/ffffff?text=APS',
    },
    category: { id: 'cat-clinica', name: 'Nutrição Clínica', slug: 'clinica' },
    level: 'intermediario',
    duration: '20 horas',
    modules: [],
    rating: 0,
    price: 1263.36,
    installments: 12,
    salesCount: 0,
    practicalFocus: 'Abordagem prática com foco em aplicação clínica real',
    targetAudience: ['Graduandos ', 'Recém-formados ', 'Profissionais em transição de carreira'],
    whatYouWillLearn: ['Fundamentos da nutrição clínica', 'Estratégias de prescrição personalizada', 'Gestão de consultório'],
    requirements: ['Graduação em Nutrição (em curso ou concluída)', 'Interesse em atendimento clínico'],
    paymentLink: 'https://pay.hotmart.com/exemplo-nca-curso',
    isLive: true,
    status: 'published',
  },
  {
    id: 'nce-1',
    title: 'NCE - Nutrição Clínica Estratégica',
    slug: 'nce-nutricao-clinica-estrategica',
    description: 'Para quem já domina a base clínica e quer ir além: aprofundamento em protocolos avançados, gestão de carreira e protagonismo profissional.',
    headline: 'A jornada que te coloca como protagonista da própria carreira.',
    featuredImage: '/images/cursos/IMG_8183.webp',
    content: [
      {
        children: [
          {
            text: 'O NCE - Nutrição Clínica Estratégica é um programa avançado para nutricionistas que já possuem base clínica sólida e desejam aprofundar conhecimentos em protocolos complexos, gestão estratégica de carreira e protagonismo profissional.'
          }
        ]
      },
      {
        children: [
          {
            text: '🎯 O que você vai desenvolver:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Protocolos avançados em nutrição clínica'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Gestão estratégica de consultório e carreira'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Mentalidade empreendedora e posicionamento profissional'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Atendimento integrado e protocolos avançados'
          }
        ]
      }
    ],
    instructor: {
      id: 'instructor-2',
      name: 'Dra. Mariana Costa',
      bio: 'Nutricionista com especialização em gestão e empreendedorismo.',
      avatar: 'https://placehold.co/150x150/16a34a/ffffff?text=MC',
    },
    category: {
      id: 'cat-clinica',
      name: 'Nutrição Clínica',
      slug: 'clinica'
    },
    level: 'avancado',
    duration: '40 horas',
    modules: [],
    rating: 0,
    price: 2304.84,
    installments: 12,
    salesCount: 0,
    practicalFocus: 'Abordagem prática com foco em aplicação clínica avançada',
    targetAudience: ['Profissionais que já possuem base clínica', 'Nutricionistas que desejam aprofundar em protocolos avançados', 'Profissionais interessados em gestão estratégica'],
    whatYouWillLearn: ['Protocolos avançados em nutrição clínica', 'Gestão estratégica de consultório', 'Protagonismo profissional'],
    requirements: ['Base clínica sólida', 'Experiência prévia em atendimento'],
    paymentLink: 'https://pay.hotmart.com/exemplo-nce-curso',
    isLive: true,
    status: 'published',
  },
]

export const MOCK_EQUIPE: Membro[] = [
  {
    id: '1',
    name: 'Ana Paula Silva',
    role: 'Nutricionista Clínica',
    bio: 'Especialista em nutrição clínica com mais de 10 anos de experiência. Apaixonada por ensinar e compartilhar conhecimento.'
  },
  {
    id: '2',
    name: 'Carlos Eduardo Santos',
    role: 'Nutricionista Esportiva',
    bio: 'Especialista em nutrição esportiva, atende atletas de alto rendimento e amadores que buscam melhor performance.'
  },
  {
    id: '3',
    name: 'Mariana Oliveira',
    role: 'Nutricionista Materno-Infantil',
    bio: 'Dedicada à nutrição materno-infantil, ajudando mães e crianças a desenvolverem hábitos alimentares saudáveis.'
  },
  {
    id: '4',
    name: 'Rafael Costa',
    role: 'Nutricionista Funcional',
    bio: 'Especialista em nutrição funcional e medicina integrativa, focado em tratamentos personalizados e preventivos.'
  },
  {
    id: '5',
    name: 'Juliana Mendes',
    role: 'Nutricionista Comportamental',
    bio: 'Trabalha com a relação emocional com a comida, ajudando pessoas a desenvolverem uma alimentação consciente.'
  },
  {
    id: '6',
    name: 'Pedro Henrique Lima',
    role: 'Nutricionista Plant-Based',
    bio: 'Especialista em nutrição plant-based, auxilia na transição para uma alimentação vegana equilibrada e saudável.'
  },
  {
    id: '7',
    name: 'Beatriz Almeida',
    role: 'Nutricionista Estética',
    bio: 'Focada em nutrição estética e longevidade, promove saúde e beleza de dentro para fora.'
  },
  {
    id: '8',
    name: 'Lucas Ferreira',
    role: 'Nutricionista Oncológico',
    bio: 'Especializado em nutrição oncológica, auxilia pacientes em tratamento do câncer com abordagem humanizada.'
  },
]

/**
 * Check if we should use mock data
 * Set NEXT_PUBLIC_USE_MOCK_DATA=true in .env.local to enable
 */
export const shouldUseMockData = () => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
}

// ============================================
// QUERY FUNCTIONS
// ============================================

export async function getPosts(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<{ docs: Post[]; totalDocs: number; limit: number; totalPages: number; page: number; pagingCounter: number; hasPrevPage: boolean; hasNextPage: boolean; prevPage: number | null; nextPage: number | null }> {
  const limit = params?.limit || 10
  const page = params?.page || 1
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  let filtered = MOCK_POSTS.filter(p => p.status === 'published')

  if (params?.category) {
    filtered = filtered.filter(p => p.categoria?.slug === params.category)
  }

  const paginated = filtered.slice(startIndex, endIndex)

  return {
    docs: paginated,
    totalDocs: filtered.length,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: endIndex < filtered.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: endIndex < filtered.length ? page + 1 : null,
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return MOCK_POSTS.find(p => p.slug === slug && p.status === 'published') || null
}

export async function getFeaturedPosts(limit: number = 3) {
  const featured = MOCK_POSTS.filter(p => p.status === 'published').slice(0, limit)
  return {
    docs: featured,
    totalDocs: featured.length,
    limit,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

export async function getCursos(params?: {
  limit?: number
  page?: number
  status?: string
  category?: string
}): Promise<{ docs: Curso[]; totalDocs: number; limit: number; totalPages: number; page: number; pagingCounter: number; hasPrevPage: boolean; hasNextPage: boolean; prevPage: number | null; nextPage: number | null }> {
  const limit = params?.limit || 10
  const page = params?.page || 1
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const filtered = MOCK_CURSOS.filter(c => c.status === 'published')

  const paginated = filtered.slice(startIndex, endIndex)

  return {
    docs: paginated,
    totalDocs: filtered.length,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: endIndex < filtered.length,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: endIndex < filtered.length ? page + 1 : null,
  }
}

export async function getCursoBySlug(slug: string): Promise<Curso | null> {
  return MOCK_CURSOS.find(c => c.slug === slug && c.status === 'published') || null
}

export async function getFeaturedCursos(limit: number = 3) {
  const featured = MOCK_CURSOS.filter(c => c.status === 'published').slice(0, limit)
  return {
    docs: featured,
    totalDocs: featured.length,
    limit,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

export async function getCategorias() {
  return {
    docs: MOCK_CATEGORIAS,
    totalDocs: MOCK_CATEGORIAS.length,
    limit: MOCK_CATEGORIAS.length,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  return MOCK_CATEGORIAS.find(c => c.slug === slug) || null
}

export async function getEquipe() {
  return {
    docs: MOCK_EQUIPE,
    totalDocs: MOCK_EQUIPE.length,
    limit: MOCK_EQUIPE.length,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}
