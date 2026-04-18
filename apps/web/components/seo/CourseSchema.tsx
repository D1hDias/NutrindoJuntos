interface CourseSchemaProps {
  name: string
  description: string
  provider?: string
  url: string
  imageUrl?: string
  price?: number
  priceCurrency?: string
}

export function CourseSchema({
  name,
  description,
  provider = 'NUTRINDO JUNTOS',
  url,
  imageUrl,
  price,
  priceCurrency = 'BRL',
}: CourseSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: process.env.NEXT_PUBLIC_SITE_URL,
    },
    url,
    image: imageUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
