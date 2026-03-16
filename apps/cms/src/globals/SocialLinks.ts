import type { GlobalConfig } from 'payload/types'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Redes Sociais',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram URL',
      admin: {
        placeholder: 'https://instagram.com/nutrindojuntos',
      },
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook URL',
      admin: {
        placeholder: 'https://facebook.com/nutrindojuntos',
      },
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn URL',
      admin: {
        placeholder: 'https://linkedin.com/company/nutrindojuntos',
      },
    },
    {
      name: 'youtube',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        placeholder: 'https://youtube.com/@nutrindojuntos',
      },
    },
    {
      name: 'tiktok',
      type: 'text',
      label: 'TikTok URL',
      admin: {
        placeholder: 'https://tiktok.com/@nutrindojuntos',
      },
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'WhatsApp',
      admin: {
        description: 'Número com código do país (ex: 5511999999999)',
        placeholder: '5511999999999',
      },
    },
  ],
}
