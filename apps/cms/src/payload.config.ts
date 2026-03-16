import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import seoPlugin from '@payloadcms/plugin-seo'
import path from 'path'

// Collections
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Categorias } from './collections/Categorias'
import { Tags } from './collections/Tags'
import { Cursos } from './collections/Cursos'
import { Equipe } from './collections/Equipe'
import { Media } from './collections/Media'
import { Orders } from './collections/Orders'
import { CourseKeys } from './collections/CourseKeys'
import { Metrics } from './collections/Metrics'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { SocialLinks } from './globals/SocialLinks'

// Components
import { Logo } from './components/Logo'
import { Icon } from './components/Icon'

// i18n
import { pt } from './i18n/pt'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- NUTRINDO JUNTOS CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    dateFormat: 'dd/MM/yyyy',
    css: path.resolve(__dirname, 'styles/admin.css'),
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },

  // i18n configuration
  i18n: {
    supportedLanguages: {
      pt,
    },
    fallbackLanguage: 'pt',
  },

  collections: [Users, Posts, Categorias, Tags, Cursos, Equipe, Media, Orders, CourseKeys, Metrics],

  globals: [SiteSettings, SocialLinks],

  editor: slateEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: process.env.NODE_ENV === 'development',
  }),

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },

  cors: [
    process.env.PAYLOAD_PUBLIC_CORS || 'http://localhost:3000',
  ].filter(Boolean),

  csrf: [
    process.env.PAYLOAD_PUBLIC_CORS || 'http://localhost:3000',
  ].filter(Boolean),

  plugins: [
    seoPlugin({
      collections: ['posts', 'cursos'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || ''} | NUTRINDO JUNTOS`,
      generateDescription: ({ doc }) => {
        const desc = doc?.excerpt || doc?.description || ''
        // Limit to 150 characters as recommended by SEO best practices
        return desc.length > 150 ? desc.substring(0, 147) + '...' : desc
      },
    }),
  ],

  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
})
