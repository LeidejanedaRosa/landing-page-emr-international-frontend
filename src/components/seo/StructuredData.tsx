import React from 'react'

/**
 * ⚠️ CSP SECURITY NOTE:
 * This component uses dangerouslySetInnerHTML for JSON-LD structured data.
 * Since CSP script-src no longer allows 'unsafe-inline', this component renders
 * via React's virtual DOM and is covered by the bundled scripts from 'self'.
 *
 * The inline JSON-LD in index.html uses a SHA-256 hash in vite.config.ts CSP.
 * If you modify the index.html script, regenerate the hash:
 *
 *   cat index.html | grep -A 50 'application/ld+json' | \
 *   sed -n '/<script/,/<\/script>/p' | \
 *   openssl dgst -sha256 -binary | openssl base64
 *
 * Then update the hash in vite.config.ts CSP: script-src 'sha256-NEWHASH'
 *
 * @see https://content-security-policy.com/hash/
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 */

// Constantes para evitar duplicação
const COMPANY_NAME = 'EMR Internacional'
const COMPANY_URL = 'https://www.emrinternacional.com'
const COMPANY_DESCRIPTION =
  'EMR Internacional oferece cursos de Atendimento Pré-Hospitalar Tático (APH Tático) e Emergência em Áreas Remotas. Treinamentos onde o convencional não alcança.'

interface Organization {
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': 'PostalAddress'
    addressCountry: string
    addressRegion: string
    addressLocality: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    email: string
    contactType: string
  }
  sameAs: string[]
}

interface Service {
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
  }
  areaServed: string
  serviceType: string
}

interface WebSite {
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  publisher: {
    '@type': 'Organization'
    name: string
  }
  potentialAction: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

const createOrganizationSchema = (): Organization => ({
  '@type': 'Organization',
  name: COMPANY_NAME,
  url: COMPANY_URL,
  logo: `${COMPANY_URL}/logo.png`,
  description: COMPANY_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
    addressRegion: 'SP',
    addressLocality: 'São Paulo',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-11-1234-5678',
    email: 'contato@emrinternacional.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://www.facebook.com/emrinternacional',
    'https://www.instagram.com/emrinternacional',
    'https://www.linkedin.com/company/emrinternacional',
  ],
})

const createServicesSchema = (): Service[] => [
  {
    '@type': 'Service',
    name: 'APH Tático',
    description:
      'Atendimento Pré-Hospitalar Tático especializado para situações de emergência em ambientes hostis.',
    provider: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    areaServed: 'Brasil',
    serviceType: 'Emergency Medical Training',
  },
  {
    '@type': 'Service',
    name: 'Emergência em Áreas Remotas',
    description:
      'Treinamento especializado para atendimento médico em locais de difícil acesso.',
    provider: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    areaServed: 'Brasil',
    serviceType: 'Remote Emergency Training',
  },
]

const createWebSiteSchema = (): WebSite => ({
  '@type': 'WebSite',
  name: COMPANY_NAME,
  url: COMPANY_URL,
  description:
    'A EMR Internacional oferece cursos de elite em Atendimento Pré-Hospitalar Tático e Emergência em Áreas Remotas.',
  publisher: {
    '@type': 'Organization',
    name: COMPANY_NAME,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.emrinternacional.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
})

const StructuredData: React.FC = () => {
  const organizationSchema = createOrganizationSchema()
  const servicesSchema = createServicesSchema()
  const webSiteSchema = createWebSiteSchema()

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...webSiteSchema,
      },
      {
        ...organizationSchema,
      },
      ...servicesSchema,
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
}

export default StructuredData
