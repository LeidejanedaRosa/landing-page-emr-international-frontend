const COMPANY_NAME = 'EMR International'
const COMPANY_URL = 'https://www.emrinternational.com'
const COMPANY_DESCRIPTION =
  'EMR International oferece cursos de Atendimento Pré-Hospitalar Tático (APH Tático) e Emergência em Áreas Remotas. Treinamentos onde o convencional não alcança.'

const organizationSchema = {
  '@type': 'Organization' as const,
  '@id': `${COMPANY_URL}/#organization`,
  name: COMPANY_NAME,
  legalName: 'EMR International',
  url: COMPANY_URL,
  logo: {
    '@type': 'ImageObject' as const,
    url: `${COMPANY_URL}/logo_emr_international.svg`,
    width: 200,
    height: 60,
  },
  image: `${COMPANY_URL}/logo_emr_international.svg`,
  description: COMPANY_DESCRIPTION,
  foundingDate: '2010',
  address: {
    '@type': 'PostalAddress' as const,
    addressCountry: 'BR',
    addressRegion: 'SP',
    addressLocality: 'Socorro',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint' as const,
      telephone: '+55-19-97157-5640',
      email: 'contato@emrinternational.com',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
    {
      '@type': 'ContactPoint' as const,
      telephone: '+55-19-97157-5640',
      contactType: 'sales',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/emr_international/',
    'https://www.linkedin.com/in/juan-regenerati/',
    'https://wa.me/5519971575640',
  ],
  knowsAbout: [
    'APH Tático',
    'TECC',
    'Wilderness Medicine',
    'Atendimento Pré-Hospitalar',
    'Emergência em Áreas Remotas',
    'Medicina Tática',
  ],
}

const servicesSchema = [
  {
    '@type': 'Service' as const,
    '@id': `${COMPANY_URL}/#service-tmr`,
    name: 'Tactical Medical Responder (TMR)',
    alternateName: 'APH Tático',
    description:
      'Atendimento Pré-Hospitalar Tático especializado para situações de emergência em ambientes hostis. Treinamento baseado em protocolos TECC.',
    provider: {
      '@id': `${COMPANY_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country' as const,
      name: 'Brasil',
    },
    serviceType: 'Emergency Medical Training',
    category: 'Treinamento Tático',
  },
  {
    '@type': 'Service' as const,
    '@id': `${COMPANY_URL}/#service-wmr`,
    name: 'Wilderness Medical Responder (WMR)',
    alternateName: 'Emergência em Áreas Remotas',
    description:
      'Treinamento especializado para atendimento médico em locais de difícil acesso e ambientes austeros.',
    provider: {
      '@id': `${COMPANY_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country' as const,
      name: 'Brasil',
    },
    serviceType: 'Wilderness Emergency Training',
    category: 'Treinamento em Áreas Remotas',
  },
]

const webSiteSchema = {
  '@type': 'WebSite' as const,
  '@id': `${COMPANY_URL}/#website`,
  name: COMPANY_NAME,
  url: COMPANY_URL,
  description:
    'A EMR International oferece cursos de elite em Atendimento Pré-Hospitalar Tático e Emergência em Áreas Remotas.',
  publisher: {
    '@id': `${COMPANY_URL}/#organization`,
  },
  inLanguage: 'pt-BR',
}

export const ORGANIZATION_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [webSiteSchema, organizationSchema, ...servicesSchema],
}
