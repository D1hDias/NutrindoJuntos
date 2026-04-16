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
    rating: 4.8,
    reviews: 142,
    price: 497,
    salesCount: 312,
    practicalFocus: true,
    targetAudience: 'Graduandos, recém-formados e profissionais que desejam transicionar de carreira e ter segurança no atendimento clínico',
    paymentLink: 'https://pay.hotmart.com/exemplo-nca-curso',
    isLive: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mentoria-nj',
    title: 'Mentoria Nutrindo Juntos (NJ)',
    slug: 'mentoria-nutrindo-juntos',
    description: 'Acompanhamento estratégico transformador para nutricionistas que querem assumir controle, clareza e impacto real na própria carreira. Vá além da técnica e torne-se protagonista da sua trajetória.',
    headline: 'Protagonismo na sua carreira de nutricionista',
    featuredImage: {
      id: 'mentoria-nj-img',
      url: 'https://placehold.co/800x600/16a34a/ffffff?text=Mentoria+NJ',
      alt: 'Mentoria Nutrindo Juntos - Protagonismo na carreira',
      filename: 'mentoria-nj.jpg',
      mimeType: 'image/jpeg',
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
            text: 'A Mentoria NJ é uma jornada completa que vai além da técnica: é um acompanhamento estratégico transformador para nutricionistas que querem assumir controle, clareza e impacto real na própria carreira.'
          }
        ]
      },
      {
        children: [
          {
            text: '🎯 O que a Mentoria NJ entrega:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Segurança e confiança clínica, para você atender com autonomia e rigor'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Ferramentas práticas de gestão de carreira e finanças, para tornar seu consultório sustentável'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Estratégias de captação e fidelização de pacientes, com mentalidade empreendedora'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Aprofundamento em protocolos avançados e abordagem integrativa, incluindo nutrição comportamental e materno-infantil'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Comunidade de profissionais, apoio mútuo e construção colaborativa de caminhos de sucesso'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '👩‍⚕️ Para quem é:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Profissionais que já têm base clínica, mas querem ir além'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quem busca crescimento real em atendimentos e resultado financeiro'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Nutricionistas que querem gerenciar sua carreira com estratégia'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quem quer se aprofundar em protocolos avançados e humanizados'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '💥 O resultado:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: 'Uma carreira mais autônoma, estratégica e lucrativa, com presença forte no consultório e capacidade de impactar vidas com segurança e propósito.'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: 'Aqui você vira protagonista da sua trajetória, com suporte prático e aplicável, sem promessas vazias — apenas entrega real e ferramenta que funciona.',
            bold: true
          }
        ]
      }
    ],
    instructor: {
      id: 'instructor-nj',
      name: 'Equipe NUTRINDO JUNTOS',
      role: 'Mentores Especializados',
      bio: 'Equipe multidisciplinar de nutricionistas com experiência em clínica, gestão e empreendedorismo.',
      order: 1,
      photo: {
        id: 'instructor-photo-nj',
        url: 'https://placehold.co/150x150/16a34a/ffffff?text=NJ',
        alt: 'Equipe NUTRINDO JUNTOS',
        filename: 'equipe-nj.jpg',
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
    category: 'mentoria',
    level: 'advanced',
    duration: '6 meses',
    modules: 12,
    rating: 4.9,
    reviews: 87,
    price: 1497,
    salesCount: 187,
    practicalFocus: true,
    targetAudience: 'Profissionais que já têm base clínica mas querem ir além, quem busca crescimento real em atendimentos e resultado financeiro, nutricionistas que querem gerenciar sua carreira com estratégia',
    paymentLink: 'https://pay.hotmart.com/mentoria-nutrindo-juntos',
    isLive: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'nutri-executivo',
    title: 'Nutri Executivo — Empreendedorismo em Nutrição',
    slug: 'nutri-executivo',
    description: 'Programa estratégico de empreendedorismo para nutricionistas que querem sair do improviso e construir uma carreira sólida, lucrativa e sustentável, com visão de negócio, posicionamento forte e mentalidade de dono.',
    headline: 'Trate a Nutrição como carreira e empresa',
    featuredImage: {
      id: 'nutri-exec-img',
      url: 'https://placehold.co/800x600/d97706/ffffff?text=Nutri+Executivo',
      alt: 'Nutri Executivo - Empreendedorismo em Nutrição',
      filename: 'nutri-executivo.jpg',
      mimeType: 'image/jpeg',
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
            text: 'O Nutri Executivo é um programa estratégico de empreendedorismo para nutricionistas que querem sair do improviso e construir uma carreira sólida, lucrativa e sustentável, com visão de negócio, posicionamento forte e mentalidade de dono.'
          }
        ]
      },
      {
        children: [
          {
            text: 'Aqui, você aprende a empreender com método, unindo clínica, marketing, vendas, gestão financeira, ética, tecnologia e inteligência emocional — tudo aplicado à realidade do nutricionista.'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '🎯 O que você desenvolve:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Mentalidade empreendedora e protagonismo profissional'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Posicionamento, branding e autoridade no mercado'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Marketing simples, ético e que gera pacientes'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Vendas humanizadas e ofertas bem estruturadas'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Gestão de consultório, finanças e organização jurídica'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Uso estratégico de IA e ferramentas digitais'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '🚀 O diferencial:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: 'Ao final do curso, o aluno constrói um Plano de Negócio Nutri, com estratégia real de atuação, projeção financeira e estrutura pronta para crescer — não é teoria, é execução com direção.'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: 'O Nutri Executivo é para quem decidiu tratar a Nutrição como carreira e empresa, com clareza, segurança e visão de longo prazo.',
            bold: true
          }
        ]
      }
    ],
    instructor: {
      id: 'instructor-exec',
      name: 'Nathállia Jordão',
      role: 'Nutrição materna e infantil',
      bio: 'Nutricionista com visão empreendedora, especialista em gestão de carreira e negócios na nutrição.',
      order: 1,
      photo: {
        id: 'instructor-photo-exec',
        url: 'https://placehold.co/150x150/d97706/ffffff?text=NJ',
        alt: 'Nathállia Jordão',
        filename: 'nathallia-jordao.jpg',
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
    category: 'gestao',
    level: 'intermediate',
    duration: '10 semanas',
    modules: 10,
    rating: 4.9,
    reviews: 63,
    price: 697,
    salesCount: 145,
    practicalFocus: true,
    targetAudience: 'Nutricionistas que querem sair do improviso e construir uma carreira sólida com visão de negócio, posicionamento forte e mentalidade de dono',
    paymentLink: 'https://pay.hotmart.com/nutri-executivo',
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
            text: 'O Monte Sua Trilha é um programa de direcionamento estratégico para estudantes e nutricionistas que estão perdidos sobre qual caminho seguir, o que estudar, como se posicionar e qual próximo passo faz sentido na carreira.'
          }
        ]
      },
      {
        children: [
          {
            text: 'Aqui, você não recebe uma fórmula pronta. Você constrói, com orientação, uma trilha personalizada de desenvolvimento profissional, alinhando perfil, momento de carreira, objetivos financeiros e área de atuação.'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '🎯 O que o Monte Sua Trilha entrega:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Clareza sobre onde você está e onde pode chegar'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Identificação do seu perfil profissional e áreas com mais afinidade'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Organização de estudos, cursos e prioridades (sem desperdício de tempo e dinheiro)'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Direcionamento estratégico para os próximos passos da carreira'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Base sólida para evoluir com segurança para a Nutrição Clínica e o Empreendedorismo'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '💡 Ideal para quem:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Está na graduação ou recém-formado'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Sente que "tem muitas opções, mas pouca clareza"'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quer crescer com estratégia, não no improviso'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Busca segurança antes de investir em cursos maiores'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: 'O Monte Sua Trilha é o ponto de partida para uma carreira consciente, estratégica e alinhada com quem você é — o primeiro passo antes de acelerar.',
            bold: true
          }
        ]
      }
    ],
    instructor: {
      id: 'instructor-trilha',
      name: 'Nathállia Jordão',
      role: 'Nutrição materna e infantil',
      bio: 'Nutricionista especialista em direcionamento de carreira e desenvolvimento profissional na nutrição.',
      order: 1,
      photo: {
        id: 'instructor-photo-trilha',
        url: 'https://placehold.co/150x150/22c55e/ffffff?text=NJ',
        alt: 'Nathállia Jordão',
        filename: 'nathallia-jordao-trilha.jpg',
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
    duration: '20 horas',
    modules: 5,
    rating: 4.9,
    reviews: 178,
    price: 2304.84,
    salesCount: 280,
    practicalFocus: true,
    targetAudience: 'Nutricionistas que já dominam a base clínica e querem avançar em protocolos, gestão de carreira e protagonismo profissional',
    paymentLink: '#',
    isLive: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'clube-nj',
    title: 'Assinatura Clube Nutrindo Juntos',
    slug: 'clube-nutrindo-juntos',
    description: 'Espaço de suporte e comunidade para estudantes e nutricionistas que querem se manter atualizados, seguros e em constante evolução, sem precisar investir em grandes cursos o tempo todo.',
    headline: 'Evolução contínua na Nutrição',
    featuredImage: {
      id: 'clube-nj-img',
      url: 'https://placehold.co/800x600/15803d/ffffff?text=Clube+NJ',
      alt: 'Assinatura Clube Nutrindo Juntos - Evolução contínua',
      filename: 'clube-nj.jpg',
      mimeType: 'image/jpeg',
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
            text: 'O Clube NJ é um espaço de suporte e comunidade, para estudantes e nutricionistas que querem se manter atualizados, seguros e em constante evolução, sem precisar investir em grandes cursos o tempo todo.'
          }
        ]
      },
      {
        children: [
          {
            text: 'Ela oferece conteúdos práticos, materiais aplicáveis e suporte profissional, pensados para acompanhar o dia a dia da Nutrição Clínica e do mercado, com acesso simples, acessível e estratégico.'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '🎯 O que está incluso:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Aulas bônus sobre temas atuais da Nutrição'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Casos clínicos comentados para treino de raciocínio'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Materiais práticos em PDF para uso em atendimentos'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Scripts básicos de venda e comunicação com pacientes'
          }
        ]
      },
      {
        children: [
          {
            text: '✓ Acesso à comunidade NJ e atualizações do mercado'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: '💡 Para quem é:',
            bold: true
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quem quer aprender continuamente, sem sobrecarga'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quem busca segurança prática no dia a dia clínico'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quem quer fazer parte do ecossistema Nutrindo Juntos'
          }
        ]
      },
      {
        children: [
          {
            text: '✔ Quem deseja evoluir com custo acessível e constância'
          }
        ]
      },
      {
        children: [
          {
            text: ''
          }
        ]
      },
      {
        children: [
          {
            text: 'A Assinatura NJ não substitui cursos ou mentorias — ela sustenta o crescimento, mantém você em movimento e preparada para o próximo nível.',
            bold: true
          }
        ]
      }
    ],
    instructor: {
      id: 'instructor-clube',
      name: 'Equipe NUTRINDO JUNTOS',
      role: 'Curadoria de Conteúdo',
      bio: 'Equipe dedicada à curadoria de conteúdos práticos e atualizados para a comunidade de nutricionistas.',
      order: 1,
      photo: {
        id: 'instructor-photo-clube',
        url: 'https://placehold.co/150x150/15803d/ffffff?text=NJ',
        alt: 'Equipe NUTRINDO JUNTOS',
        filename: 'equipe-nj-clube.jpg',
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
    level: 'beginner',
    duration: 'Acesso mensal',
    modules: 0,
    rating: 4.9,
    reviews: 210,
    price: 49.90,
    salesCount: 520,
    practicalFocus: true,
    targetAudience: 'Estudantes e nutricionistas que querem aprender continuamente com custo acessível, manter segurança prática no dia a dia clínico e fazer parte do ecossistema Nutrindo Juntos',
    paymentLink: 'https://pay.hotmart.com/clube-nutrindo-juntos',
    isLive: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'curso-1',
    title: 'Nutrição Clínica na Prática',
    slug: 'nutricao-clinica-pratica',
    description: 'Curso completo sobre atendimento nutricional clínico, da anamnese ao acompanhamento de resultados.',
    content: [],
    category: 'clinica',
    price: 497,
    salesCount: 78,
    duration: '40 horas',
    level: 'intermediate',
    featuredImage: {
      id: 'curso-img-1',
      url: 'https://placehold.co/800x600/22c55e/ffffff?text=Curso+Nutricao+Clinica',
      alt: 'Curso de Nutrição Clínica',
      filename: 'curso-nutricao-clinica.jpg',
      mimeType: 'image/jpeg',
      filesize: 200000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'curso-2',
    title: 'Nutrição Esportiva: Da Teoria à Prática',
    slug: 'nutricao-esportiva-teoria-pratica',
    description: 'Aprenda a atender atletas e praticantes de atividade física com protocolos baseados em evidências científicas.',
    content: [],
    category: 'esportiva',
    price: 597,
    salesCount: 54,
    duration: '50 horas',
    level: 'advanced',
    featuredImage: {
      id: 'curso-img-2',
      url: 'https://placehold.co/800x600/f59e0b/ffffff?text=Curso+Nutricao+Esportiva',
      alt: 'Curso de Nutrição Esportiva',
      filename: 'curso-nutricao-esportiva.jpg',
      mimeType: 'image/jpeg',
      filesize: 210000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'curso-3',
    title: 'Gestão de Consultório de Nutrição',
    slug: 'gestao-consultorio-nutricao',
    description: 'Tudo que você precisa saber para gerenciar seu consultório com eficiência, atrair pacientes e crescer profissionalmente.',
    content: [],
    category: 'gestao',
    price: 397,
    salesCount: 42,
    duration: '30 horas',
    level: 'beginner',
    featuredImage: {
      id: 'curso-img-3',
      url: 'https://placehold.co/800x600/d97706/ffffff?text=Curso+Gestao',
      alt: 'Curso de Gestão de Consultório',
      filename: 'curso-gestao.jpg',
      mimeType: 'image/jpeg',
      filesize: 190000,
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
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
