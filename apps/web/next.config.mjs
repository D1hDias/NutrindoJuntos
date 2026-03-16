import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Compilador otimizado
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Configuração de headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // HSTS (HTTP Strict Transport Security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent Clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // XSS Protection (legacy, but still useful for older browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy (Feature Policy)
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',
              'payment=()',
              'usb=()',
              'magnetometer=()',
              'gyroscope=()',
              'accelerometer=()',
            ].join(', '),
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              // Default: only same origin
              "default-src 'self'",
              // Scripts: self + inline scripts (Next.js requires) + Google Analytics
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              // Styles: self + inline styles (Tailwind/MUI requires)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: self + data URIs + external sources
              "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://placehold.co https://www.google-analytics.com",
              // Fonts: self + Google Fonts
              "font-src 'self' data: https://fonts.gstatic.com",
              // Connect (AJAX/fetch): self + API + analytics + Sentry
              "connect-src 'self' https://*.nutrindojuntos.com.br https://www.google-analytics.com https://analytics.google.com https://*.ingest.sentry.io",
              // Media: self
              "media-src 'self'",
              // Objects: none (Flash, Java, etc.)
              "object-src 'none'",
              // Base URI: self only
              "base-uri 'self'",
              // Form actions: self only
              "form-action 'self'",
              // Frame ancestors: same origin only (clickjacking protection)
              "frame-ancestors 'self'",
              // Upgrade insecure requests (HTTP -> HTTPS)
              'upgrade-insecure-requests',
              // Block mixed content
              'block-all-mixed-content',
            ]
              .join('; ')
              .replace(/\s+/g, ' '),
          },
        ],
      },
    ]
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // External packages (moved from experimental)
  serverExternalPackages: ['@payloadcms/db-postgres'],

  // Output file tracing root (silenciar warning do workspace)
  outputFileTracingRoot: '/mnt/e/Nutrindo Juntos',

  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: process.env.NEXT_PUBLIC_PAYLOAD_API_URL?.replace('/api', '/admin') || 'http://localhost:3001/admin',
        permanent: false,
      },
    ]
  },

  // Webpack configuration
  webpack: (config, { dev }) => {
    config.resolve.alias.canvas = false

    if (dev) {
      // Otimizações simples para desenvolvimento
      config.watchOptions = {
        ignored: /node_modules/,
        poll: false,
        aggregateTimeout: 300,
      }
    }

    return config
  },
}

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Para ocultar source maps do público
  hideSourceMaps: true,

  // Desabilitar autoInstrumentation para evitar overhead
  autoInstrumentServerFunctions: false,
  autoInstrumentMiddleware: true,

  // Upload de source maps apenas em produção
  silent: process.env.NODE_ENV !== 'production',
  dryRun: process.env.NODE_ENV !== 'production',

  // Outras opções
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}

// Wrap config com Sentry
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)
