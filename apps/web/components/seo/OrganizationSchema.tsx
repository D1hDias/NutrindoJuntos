export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NUTRINDO JUNTOS',
    description: 'Plataforma educacional de nutrição para estudantes e nutricionistas em início de carreira',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    sameAs: [
      'https://facebook.com/nutrindojuntos',
      'https://instagram.com/nutrindojuntos',
      'https://linkedin.com/company/nutrindojuntos',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'atendimento@nutrindojuntos.com.br',
      contactType: 'Customer Service',
      availableLanguage: 'Portuguese',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
