const COMPANY_URL = 'https://www.emrinternacional.com'

export interface BreadcrumbItem {
  name: string
  url?: string
}

export const HOMEPAGE_BREADCRUMB: BreadcrumbItem[] = [
  { name: 'Home', url: COMPANY_URL },
]

export const SITE_NAVIGATION_ITEMS: BreadcrumbItem[] = [
  { name: 'Home', url: COMPANY_URL },
  { name: 'Sobre', url: `${COMPANY_URL}/#sobre` },
  { name: 'Certificações', url: `${COMPANY_URL}/#certificacoes` },
  { name: 'Cursos', url: `${COMPANY_URL}/#cursos` },
  { name: 'Depoimentos', url: `${COMPANY_URL}/#depoimentos` },
  { name: 'Contato', url: `${COMPANY_URL}/#contato` },
]
