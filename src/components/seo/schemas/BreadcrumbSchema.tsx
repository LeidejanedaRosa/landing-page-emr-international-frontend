import { JsonLdScript } from '../JsonLdScript'

const COMPANY_URL = 'https://www.emrinternacional.com'

interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item:
        item.url ||
        `${COMPANY_URL}/#${item.name.toLowerCase().replace(/\s+/g, '-')}`,
    })),
  }

  return <JsonLdScript data={breadcrumbSchema} />
}

export const DEFAULT_BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', url: COMPANY_URL },
  { name: 'Sobre', url: `${COMPANY_URL}/#sobre` },
  { name: 'Certificações', url: `${COMPANY_URL}/#certificacoes` },
  { name: 'Cursos', url: `${COMPANY_URL}/#cursos` },
  { name: 'Depoimentos', url: `${COMPANY_URL}/#depoimentos` },
  { name: 'Contato', url: `${COMPANY_URL}/#contato` },
]
