import React, { memo } from 'react'

import { COMPANY_LEGAL_INFO } from '../../../data/companyInfo'
import { SOCIAL_LINKS } from './constants'

interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  legalName: string
  url: string
  logo: string
  contactPoint: {
    '@type': string
    contactType: string
    availableLanguage: string
  }
  sameAs: string[]
  address?: {
    '@type': string
    addressCountry: string
  }
}

export const FooterStructuredData: React.FC = memo(() => {
  const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EMR Internacional',
    legalName: COMPANY_LEGAL_INFO.legalName,
    url: 'https://emrinternacional.com',
    logo: 'https://emrinternacional.com/logo_emr_internacional.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'pt-BR',
    },
    sameAs: SOCIAL_LINKS.map(link => link.href),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  )
})

FooterStructuredData.displayName = 'FooterStructuredData'
