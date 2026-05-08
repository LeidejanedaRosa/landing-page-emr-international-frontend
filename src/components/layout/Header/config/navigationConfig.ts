export interface NavigationItem {
  id: string
  href: string
  label: string
  ariaLabel: string
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: 'sobre',
    href: '#sobre',
    label: 'Sobre',
    ariaLabel:
      'Navegar para seção Sobre - Informações sobre a EMR Internacional',
  },
  {
    id: 'certificacoes',
    href: '#certificacoes',
    label: 'Certificações',
    ariaLabel:
      'Navegar para seção Certificações - Certificações internacionais',
  },
  {
    id: 'treinamentos',
    href: '#treinamentos',
    label: 'Treinamentos',
    ariaLabel: 'Navegar para seção Treinamentos - Nossos cursos especializados',
  },
  {
    id: 'depoimentos',
    href: '#depoimentos',
    label: 'Depoimentos',
    ariaLabel: 'Navegar para seção Depoimentos - O que dizem nossos alunos',
  },
  {
    id: 'contato',
    href: '#contato',
    label: 'Contato',
    ariaLabel: 'Navegar para seção Contato - Fale conosco',
  },
] as const

export const SECTION_IDS = NAVIGATION_ITEMS.map(item => item.id)
