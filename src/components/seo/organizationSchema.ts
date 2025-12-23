const COMPANY_NAME = 'EMR Internacional'
const COMPANY_URL = 'https://www.emrinternacional.com'
const COMPANY_DESCRIPTION =
  'EMR Internacional oferece cursos de Atendimento Pré-Hospitalar Tático (APH Tático) e Emergência em Áreas Remotas. Treinamentos onde o convencional não alcança.'

const organizationSchema = {
  '@type': 'Organization' as const,
  name: COMPANY_NAME,
  url: COMPANY_URL,
  logo: `${COMPANY_URL}/logo.png`,
  description: COMPANY_DESCRIPTION,
  address: {
    '@type': 'PostalAddress' as const,
    addressCountry: 'BR',
    addressRegion: 'SP',
    addressLocality: 'São Paulo',
  },
  contactPoint: {
    '@type': 'ContactPoint' as const,
    telephone: '+55-11-1234-5678',
    email: 'contato@emrinternacional.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.facebook.com/emrinternacional',
    'https://www.instagram.com/emrinternacional',
    'https://www.linkedin.com/company/emrinternacional',
  ],
}

const servicesSchema = [
  {
    '@type': 'Service' as const,
    name: 'APH Tático',
    description:
      'Atendimento Pré-Hospitalar Tático especializado para situações de emergência em ambientes hostis.',
    provider: {
      '@type': 'Organization' as const,
      name: COMPANY_NAME,
    },
    areaServed: 'Brasil',
    serviceType: 'Emergency Medical Training',
  },
  {
    '@type': 'Service' as const,
    name: 'Emergência em Áreas Remotas',
    description:
      'Treinamento especializado para atendimento médico em locais de difícil acesso.',
    provider: {
      '@type': 'Organization' as const,
      name: COMPANY_NAME,
    },
    areaServed: 'Brasil',
    serviceType: 'Remote Emergency Training',
  },
]

const webSiteSchema = {
  '@type': 'WebSite' as const,
  name: COMPANY_NAME,
  url: COMPANY_URL,
  description:
    'A EMR Internacional oferece cursos de elite em Atendimento Pré-Hospitalar Tático e Emergência em Áreas Remotas.',
  publisher: {
    '@type': 'Organization' as const,
    name: COMPANY_NAME,
  },
  potentialAction: {
    '@type': 'SearchAction' as const,
    target: 'https://www.emrinternacional.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export const ORGANIZATION_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [webSiteSchema, organizationSchema, ...servicesSchema],
}
