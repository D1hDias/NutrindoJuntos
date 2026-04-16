interface ArticleSchemaProps {
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  authorName: string
  imageUrl?: string
  category?: string
  url: string
}

export function ArticleSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  authorName,
  imageUrl,
  category,
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NUTRINDO JUNTOS',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(category && {
      articleSection: category,
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
