import type { Post, Categoria, Curso, Author } from '@/types/payload'

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
    description: 'Conteúdos sobre nutrição clínica e atendimento de pacientes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Nutrição Esportiva',
    slug: 'nutricao-esportiva',
    description: 'Tudo sobre nutrição para atletas e praticantes de atividade física',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-3',
    name: 'Nutrição Funcional',
    slug: 'nutricao-funcional',
    description: 'Abordagem funcional e integrativa da nutrição',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-4',
    name: 'Gestão de Consultório',
    slug: 'gestao-consultorio',
    description: 'Dicas para gerenciar seu consultório de nutrição',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-1',
      url: 'https://placehold.co/800x600/22c55e/ffffff?text=Nutricao+Clinica',
      alt: 'Nutricionista atendendo paciente',
      filename: 'nutricionist-patient.jpg',
      mimeType: 'image/jpeg',
      filesize: 150000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[3], // Gestão de Consultório
    author: {
      name: 'Ana Paula Silva',
      role: 'Nutricionista Esportiva',
      avatar: '/images/blog/authors/author-1.webp'
    },
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-2',
      url: 'https://placehold.co/800x600/f59e0b/ffffff?text=Nutricao+Esportiva',
      alt: 'Atleta se exercitando',
      filename: 'athlete-training.jpg',
      mimeType: 'image/jpeg',
      filesize: 180000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[1], // Nutrição Esportiva
    author: {
      name: 'Mariana Costa',
      role: 'Nutricionista Clínica',
      avatar: '/images/blog/authors/author-2.webp'
    },
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-3',
      url: 'https://placehold.co/800x600/16a34a/ffffff?text=Anamnese+Nutricional',
      alt: 'Nutricionista fazendo anotações',
      filename: 'nutritionist-notes.jpg',
      mimeType: 'image/jpeg',
      filesize: 160000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[0], // Nutrição Clínica
    author: {
      name: 'Carlos Eduardo Santos',
      role: 'Nutricionista Funcional',
      avatar: '/images/blog/authors/author-3.webp'
    },
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-4',
      url: 'https://placehold.co/800x600/15803d/ffffff?text=Nutricao+Funcional',
      alt: 'Alimentos funcionais',
      filename: 'functional-foods.jpg',
      mimeType: 'image/jpeg',
      filesize: 170000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[2], // Nutrição Funcional
    author: {
      name: 'Carlos Eduardo Santos',
      role: 'Nutricionista Funcional',
      avatar: '/images/blog/authors/author-3.webp'
    },
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-5',
      url: 'https://placehold.co/800x600/d97706/ffffff?text=Marketing+Digital',
      alt: 'Marketing digital',
      filename: 'digital-marketing.jpg',
      mimeType: 'image/jpeg',
      filesize: 155000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[3], // Gestão de Consultório
    author: {
      name: 'Ana Paula Silva',
      role: 'Nutricionista Esportiva',
      avatar: '/images/blog/authors/author-1.webp'
    },
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-6',
      url: 'https://placehold.co/800x600/f59e0b/ffffff?text=Suplementacao',
      alt: 'Suplementos esportivos',
      filename: 'supplements.jpg',
      mimeType: 'image/jpeg',
      filesize: 165000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[1], // Nutrição Esportiva
    author: {
      name: 'Mariana Costa',
      role: 'Nutricionista Clínica',
      avatar: '/images/blog/authors/author-2.webp'
    },
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-7',
      url: 'https://placehold.co/800x600/16a34a/ffffff?text=Diabetes',
      alt: 'Medição de glicose',
      filename: 'diabetes-care.jpg',
      mimeType: 'image/jpeg',
      filesize: 140000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[0], // Nutrição Clínica
    author: {
      name: 'Carlos Eduardo Santos',
      role: 'Nutricionista Funcional',
      avatar: '/images/blog/authors/author-3.webp'
    },
    publishedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-8',
      url: 'https://placehold.co/800x600/15803d/ffffff?text=Microbiota',
      alt: 'Saúde intestinal',
      filename: 'gut-health.jpg',
      mimeType: 'image/jpeg',
      filesize: 175000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[2], // Nutrição Funcional
    author: {
      name: 'Ana Paula Silva',
      role: 'Nutricionista Esportiva',
      avatar: '/images/blog/authors/author-1.webp'
    },
    publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    featuredImage: {
      id: 'img-9',
      url: 'https://placehold.co/800x600/d97706/ffffff?text=Precificacao',
      alt: 'Planejamento financeiro',
      filename: 'pricing.jpg',
      mimeType: 'image/jpeg',
      filesize: 145000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    categoria: MOCK_CATEGORIAS[3], // Gestão de Consultório
    author: {
      name: 'Mariana Costa',
      role: 'Nutricionista Clínica',
      avatar: '/images/blog/authors/author-2.webp'
    },
    publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 dias atrás
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const MOCK_CURSOS: Curso[] = [
  {
    id: 'nca-1',
    title: 'NCA - Nutrição Clínica Aplicada',
    slug: 'nca-nutricao-clinica-aplicada',
    description: 'Curso intensivo e 100% prático de Nutrição Clínica para quem quer dominar o básico muito bem feito, com fundamentos sólidos e aplicáveis no dia a dia da clínica.',
    headline: 'A prática que transforma. A clínica que dá resultado.',
    featuredImage: {
      id: 'nca-img',
      url: '/images/cursos/IMG_8181.webp',
      alt: 'NCA - Nutrição Clínica Aplicada',
      filename: 'IMG_8181.webp',
      mimeType: 'image/webp',
      filesize: 200000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
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
      role: 'Nutricionista Clínica Especialista',
      bio: 'Nutricionista com mais de 10 anos de experiência em atendimento clínico.',
      order: 1,
      photo: {
        id: 'instructor-photo-1',
        url: 'https://placehold.co/150x150/22c55e/ffffff?text=APS',
        alt: 'Dra. Ana Paula Silva',
        filename: 'ana-paula.jpg',
        mimeType: 'image/jpeg',
        filesize: 50000,
        width: 150,
        height: 150,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    category: 'clinica',
    level: 'intermediate',
    duration: '20 horas',
    modules: 7,
    rating: 0,
    reviews: 0,
    price: 1263.36,
    installments: {
      count: 12,
      value: 105.28
    },
    salesCount: 0,
    practicalFocus: true,
    targetAudience: 'Graduandos, recém-formados e profissionais que desejam transicionar de carreira e ter segurança no atendimento clínico',
    paymentLink: 'https://pay.hotmart.com/exemplo-nca-curso',
    isLive: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'nce-1',
    title: 'NCE - Nutrição Clínica Estratégica',
    slug: 'nce-nutricao-clinica-estrategica',
    description: 'Para quem já domina a base clínica e quer ir além: aprofundamento em protocolos avançados, gestão de carreira e protagonismo profissional.',
    headline: 'A jornada que te coloca como protagonista da própria carreira.',
    featuredImage: {
      id: 'nce-img',
      url: '/images/cursos/IMG_8183.webp',
      alt: 'NCE - Nutrição Clínica Estratégica',
      filename: 'IMG_8183.webp',
      mimeType: 'image/webp',
      filesize: 200000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
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
      role: 'Nutricionista Especialista em Clínica Avançada',
      bio: 'Nutricionista com especialização em gestão e empreendedorismo.',
      order: 2,
      photo: {
        id: 'instructor-photo-2',
        url: 'https://placehold.co/150x150/16a34a/ffffff?text=MC',
        alt: 'Dra. Mariana Costa',
        filename: 'mariana-costa.jpg',
        mimeType: 'image/jpeg',
        filesize: 50000,
        width: 150,
        height: 150,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    category: 'clinica',
    level: 'advanced',
    duration: '40 horas',
    modules: 12,
    rating: 0,
    reviews: 0,
    price: 2304.84,
    installments: {
      count: 12,
      value: 192.07
    },
    salesCount: 0,
    practicalFocus: true,
    targetAudience: 'Profissionais que já possuem base clínica e desejam aprofundar em protocolos avançados e gestão estratégica',
    paymentLink: 'https://pay.hotmart.com/exemplo-nce-curso',
    isLive: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

/**
 * Check if we should use mock data
 * Set NEXT_PUBLIC_USE_MOCK_DATA=true in .env.local to enable
 */
export const shouldUseMockData = () => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
}
