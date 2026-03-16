/** @type {import('next').NextConfig} */
const staticConfig = {
  // Configuração para build estático
  output: 'export',
  
  // Desabilitar otimização de imagens para export estático
  images: {
    unoptimized: true,
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
  },

  // Trailing slash para compatibilidade com hosting estático
  trailingSlash: true,
  
  // Configuração de paths
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://nutrindojuntos.com.br',
    NEXT_PUBLIC_PAYLOAD_API_URL: process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'https://cms.nutrindojuntos.com.br/api',
  },

  // Experimental features mínimas para export
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Webpack config simplificado para export
  webpack: (config, { dev }) => {
    config.resolve.alias.canvas = false
    
    // Configuração para build estático
    if (!dev) {
      config.optimization.minimize = true
    }
    
    return config
  },

  // Compressão e otimização
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Headers para arquivos estáticos (aplicados via .htaccess)
  async headers() {
    return []
  },
}

export default staticConfig