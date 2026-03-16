import type { GlobalConfig } from 'payload/types'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do Site',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'NUTRINDO JUNTOS',
      label: 'Nome do Site',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
      label: 'Descrição do Site',
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'E-mail de Contato',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Telefone de Contato',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem Open Graph',
      admin: {
        description: 'Imagem padrão para compartilhamento em redes sociais (1200x630px)',
      },
    },
    {
      type: 'group',
      name: 'footer',
      label: 'Rodapé',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Texto de Copyright',
          defaultValue: '© 2025 NUTRINDO JUNTOS. Todos os direitos reservados.',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição do Rodapé',
        },
      ],
    },
    {
      type: 'group',
      name: 'newsletter',
      label: 'Newsletter',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'Receba conteúdo exclusivo',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
          defaultValue: 'Cadastre-se em nossa newsletter e receba dicas, artigos e novidades sobre nutrição diretamente no seu e-mail.',
        },
      ],
    },
  ],
}
