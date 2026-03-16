import type { CollectionConfig } from 'payload/types'

export const Categorias: CollectionConfig = {
  slug: 'categorias',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Nome',
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
      label: 'Descrição',
    },
    {
      name: 'color',
      type: 'text',
      label: 'Cor (hex)',
      admin: {
        description: 'Cor de destaque da categoria (ex: #22c55e)',
      },
    },
  ],
}
