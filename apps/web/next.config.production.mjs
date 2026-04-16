/** @type {import('next').NextConfig} */
const productionConfig = {
  // Production optimizations
  output: 'standalone',
  
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
        hostname: 'cms.nutrindojuntos.com.br',
        pathname: '/**',
      },
    ],
    // Production image optimization
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
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

  // Production webpack config
  webpack: (config, { dev, isServer }) => {
    // Resolve canvas for server-side rendering
    config.resolve.alias.canvas = false
    
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }
    
    return config
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrindojuntos.com.br',
    NEXT_PUBLIC_PAYLOAD_API_URL: process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'https://cms.nutrindojuntos.com.br/api',
  },

  // Production experimental features
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
    ],
    // Server actions in production
    serverActions: true,
  },

  // TypeScript and ESLint configuration for production
  typescript: {
    // Type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint during builds
    ignoreDuringBuilds: false,
  },
}

export default productionConfig