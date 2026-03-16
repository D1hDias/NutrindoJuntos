import type { CollectionConfig } from 'payload/types'

export const Equipe: CollectionConfig = {
  slug: 'equipe',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'email'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Completo',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Cargo/Função',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto',
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Biografia',
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mail',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram Handle',
      admin: {
        description: 'Apenas o @usuario, sem https://',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem de Exibição',
      admin: {
        description: 'Menor número aparece primeiro',
      },
    },
  ],
}
