import type { Metadata } from 'next'
import { Playfair_Display, Poppins, Outfit } from 'next/font/google'
import './globals.css'
import './prose.css'
import { cn } from '@/lib/utils'
import { HeaderWithScroll } from '@/components/layout/HeaderWithScroll'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'

// NUTRINDO JUNTOS Brand Fonts (from Manual da Marca)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'NUTRINDO JUNTOS - Educação em Nutrição',
    template: '%s | NUTRINDO JUNTOS',
  },
  description:
    'Plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira. Cursos, mentorias e conteúdo de qualidade.',
  keywords: [
    'nutrição',
    'cursos de nutrição',
    'mentoria nutrição',
    'educação nutricional',
    'nutricionista',
    'estudante de nutrição',
  ],
  authors: [{ name: 'NUTRINDO JUNTOS' }],
  creator: 'NUTRINDO JUNTOS',
  publisher: 'NUTRINDO JUNTOS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'NUTRINDO JUNTOS',
    title: 'NUTRINDO JUNTOS - Educação em Nutrição',
    description:
      'Plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NUTRINDO JUNTOS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NUTRINDO JUNTOS - Educação em Nutrição',
    description:
      'Plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira.',
    images: ['/og-image.jpg'],
    creator: '@nutrindojuntos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* CRITICAL: Define 'self' before any webpack chunks load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof self === 'undefined') {
                self = window;
              }
              if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
                globalThis.self = globalThis;
              }
            `,
          }}
        />
        <OrganizationSchema />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          playfair.variable,
          poppins.variable,
          outfit.variable
        )}
      >
        <div className="flex min-h-screen flex-col">
          <HeaderWithScroll />
          <div className="flex-1">{children}</div>
          <footer id="contato">
            <Footer />
          </footer>
        </div>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  )
}
