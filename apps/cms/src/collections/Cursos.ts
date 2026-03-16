import type { CollectionConfig } from 'payload/types'

export const Cursos: CollectionConfig = {
  slug: 'cursos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'price', 'startDate'],
    preview: (doc) => {
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        return `${process.env.NEXT_PUBLIC_SITE_URL}/cursos/${doc.slug}`
      }
      return null
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título do Curso',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: 'Descrição Curta',
    },
    {
      name: 'headline',
      type: 'text',
      required: false,
      label: 'Headline/Subtitle',
      admin: {
        description: 'Frase de impacto para o curso (ex: "Transforme teoria em prática com confiança")',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false, // Temporariamente opcional para permitir criação via script
      label: 'Imagem Destaque',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo Completo',
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'equipe',
      required: false, // Temporariamente opcional para permitir criação via script
      label: 'Instrutor',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Nutrição Clínica', value: 'clinica' },
        { label: 'Nutrição Esportiva', value: 'esportiva' },
        { label: 'Nutrição Funcional', value: 'funcional' },
        { label: 'Gestão de Consultório', value: 'gestao' },
        { label: 'Marketing para Nutricionistas', value: 'marketing' },
      ],
      label: 'Categoria',
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Iniciante', value: 'beginner' },
        { label: 'Intermediário', value: 'intermediate' },
        { label: 'Avançado', value: 'advanced' },
      ],
      label: 'Nível',
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      label: 'Duração',
      admin: {
        description: 'Ex: 8 semanas, 40 horas',
      },
    },
    {
      name: 'modules',
      type: 'number',
      required: true,
      label: 'Número de Módulos',
      admin: {
        description: 'Quantidade total de módulos do curso',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: false,
      label: 'Avaliação (1-5)',
      min: 1,
      max: 5,
      admin: {
        description: 'Avaliação média do curso (1 a 5 estrelas)',
      },
    },
    {
      name: 'reviews',
      type: 'number',
      required: false,
      label: 'Número de Avaliações',
      admin: {
        description: 'Total de avaliações recebidas',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Preço (R$)',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Data de Início',
    },
    {
      name: 'practicalFocus',
      type: 'checkbox',
      label: 'Curso 100% Prático',
      admin: {
        description: 'Marque se o curso tem foco prático/aplicado',
      },
    },
    {
      name: 'targetAudience',
      type: 'textarea',
      label: 'Público-alvo',
      admin: {
        description: 'Descreva para quem o curso é ideal',
      },
    },
    {
      name: 'paymentLink',
      type: 'text',
      label: 'Link de Pagamento',
      admin: {
        description: 'URL para compra do curso (Hotmart, Kiwify, Asaas, etc.)',
      },
    },
    {
      name: 'isLive',
      type: 'checkbox',
      label: 'Disponível para Compra',
      admin: {
        description: 'Marque se o curso está disponível para venda',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Em Breve', value: 'coming_soon' },
        { label: 'Inscrições Abertas', value: 'published' },
        { label: 'Esgotado', value: 'sold_out' },
      ],
      label: 'Status',
    },
  ],
}
