/** @type {import('next').NextConfig} */
const productionConfig = {
  // Production optimizations
  output: 'standalone', // Production build with standalone server
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    // Production image optimization
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    // Allow SVG for placeholder images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Compress responses
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,

  // Generate ETags
  generateEtags: true,

  // Webpack config
  webpack: (config, { dev, isServer }) => {
    // Resolve canvas for server-side rendering
    config.resolve.alias.canvas = false
    
    // Ensure server-side compatibility
    if (isServer) {
      config.resolve.alias.canvas = false
      
      // Inject polyfills at the beginning of every server bundle
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        
        // Inject polyfills into all server entries
        Object.keys(entries).forEach(entryName => {
          if (Array.isArray(entries[entryName])) {
            entries[entryName].unshift('./polyfills.js')
          }
        })
        
        return entries
      }
    }
    
    // WSL2: habilitar polling para detectar mudanças em /mnt/
    if (dev) {
      config.watchOptions = {
        poll: 3000,
        aggregateTimeout: 1500,
        ignored: ['**/node_modules/**', '**/.next/**', '**/.git/**', '**/public/**'],
      }
    }

    // Production optimizations
    if (!dev) {
      // Temporarily disable code splitting to avoid "self is not defined" in vendors.js
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      }
    }

    return config
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nutrindojuntos.com.br',
  },

  // Production experimental features
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
    ],
    // Server actions in production
    serverActions: {
      enabled: true,
    },
  },

  // TypeScript and ESLint configuration for production
  typescript: {
    // Type checking during build
    ignoreBuildErrors: false, // Re-enabled after fixing issues
  },
  eslint: {
    // Lint during builds  
    ignoreDuringBuilds: false, // Re-enabled after fixing issues
  },
}

export default productionConfig