import { Metadata } from 'next'

const siteConfig = {
  name: 'NUTRINDO JUNTOS',
  description:
    'Plataforma educacional de nutrição focada em estudantes e nutricionistas em início de carreira. Cursos, mentorias e conteúdo de qualidade.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  twitterCreator: '@nutrindojuntos',
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  noIndex?: boolean
}

/**
 * Generate SEO-optimized metadata for pages
 */
export function generateSEO({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: tags,
    authors: authors ? authors.map((name) => ({ name })) : [{ name: siteConfig.name }],
    openGraph: {
      type,
      locale: 'pt_BR',
      url: pageUrl,
      siteName: siteConfig.name,
      title: title || siteConfig.name,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterCreator,
    },
  }

  // Add article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: authors,
      tags,
    }
  }

  // Handle noIndex
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  // Remove trailing slash and query params
  const cleanPath = path.split('?')[0].replace(/\/$/, '')
  return `${siteConfig.url}${cleanPath}`
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

/**
 * Generate Article JSON-LD for blog posts
 */
export function generateArticleSchema({
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  authorName = 'NUTRINDO JUNTOS',
  url,
}: {
  title: string
  description: string
  image: string
  publishedTime: string
  modifiedTime?: string
  authorName?: string
  url: string
}) {
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`
  const articleUrl = `${siteConfig.url}${url}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }
}

/**
 * Generate Course JSON-LD
 */
export function generateCourseSchema({
  name,
  description,
  provider = 'NUTRINDO JUNTOS',
  url,
  image,
  price,
  priceCurrency = 'BRL',
}: {
  name: string
  description: string
  provider?: string
  url: string
  image?: string
  price?: number
  priceCurrency?: string
}) {
  const courseUrl = `${siteConfig.url}${url}`
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}/og-image.jpg`

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: siteConfig.url,
    },
    url: courseUrl,
    image: imageUrl,
  }

  // Add price if provided
  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
    }
  }

  return schema
}

/**
 * Truncate text for meta descriptions (max 160 chars)
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

/**
 * Generate keywords from text
 */
export function extractKeywords(text: string, baseKeywords: string[] = []): string[] {
  // Simple keyword extraction - in production, use a proper library
  const words = text.toLowerCase().match(/\b\w{4,}\b/g) || []
  const uniqueWords = [...new Set(words)]
  return [...baseKeywords, ...uniqueWords.slice(0, 10)]
}

export { siteConfig }
