import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NUTRINDO JUNTOS - Educação em Nutrição',
    short_name: 'NUTRINDO JUNTOS',
    description:
      'Plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#22c55e',
    icons: [
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}
