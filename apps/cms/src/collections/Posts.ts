import type { CollectionConfig } from 'payload/types'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author'],
    preview: (doc) => {
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        return `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${doc.slug}`
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
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'URL amigável (ex: nutricao-esportiva-guia-completo)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      label: 'Resumo',
      admin: {
        description: 'Breve descrição do post (máx. 200 caracteres)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem Destaque',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'equipe',
      required: true,
      label: 'Autor',
    },
    {
      name: 'categorias',
      type: 'relationship',
      relationTo: 'categorias',
      hasMany: true,
      required: true,
      label: 'Categorias',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Tags',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Rascunho',
          value: 'draft',
        },
        {
          label: 'Publicado',
          value: 'published',
        },
      ],
      label: 'Status',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data de Publicação',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Tempo de Leitura (minutos)',
      admin: {
        description: 'Calculado automaticamente ou definido manualmente',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt when publishing
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
