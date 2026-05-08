import { JsonLdScript } from '../JsonLdScript'
import type { BreadcrumbItem } from './breadcrumbConstants'

const COMPANY_URL = 'https://www.emrinternational.com'

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList' as const,
    itemListElement: items.map((item, index) => {
      const isLastItem = index === items.length - 1
      const listItem: Record<string, unknown> = {
        '@type': 'ListItem' as const,
        position: index + 1,
        name: item.name,
      }
      if (!isLastItem) {
        listItem.item =
          item.url ||
          `${COMPANY_URL}/#${item.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')}`
      }
      return listItem
    }),
  }

  return <JsonLdScript data={breadcrumbSchema} />
}
