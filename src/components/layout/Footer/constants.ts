import type { BusinessHours, NavigationLink, SocialLink } from './types'

export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/emr_international/',
    ariaLabel: 'Seguir EMR Internacional no Instagram - Abre em nova aba',
    bgColor: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    hoverBgColor:
      'hover:from-purple-700 hover:via-pink-600 hover:to-orange-500',
    iconName: 'instagram',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/juan-regenerati/',
    ariaLabel: 'Conectar com EMR Internacional no LinkedIn - Abre em nova aba',
    bgColor: 'bg-[#0A66C2]',
    hoverBgColor: 'hover:bg-[#004182]',
    iconName: 'linkedin',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: 'https://wa.me/5519971575640',
    ariaLabel: 'Entrar em contato via WhatsApp - Abre em nova aba',
    bgColor: 'bg-[#25D366]',
    hoverBgColor: 'hover:bg-[#128C7E]',
    iconName: 'whatsapp',
  },
] as const

export const NAVIGATION_LINKS: ReadonlyArray<NavigationLink> = [
  {
    id: 'sobre',
    href: '#sobre',
    label: 'Sobre Nós',
    ariaLabel: 'Navegar para seção sobre a empresa',
  },
  {
    id: 'certificacoes',
    href: '#certificacoes',
    label: 'Certificações',
    ariaLabel: 'Navegar para seção de certificações',
  },
  {
    id: 'cursos',
    href: '#cursos',
    label: 'Cursos',
    ariaLabel: 'Navegar para seção de cursos',
  },
  {
    id: 'depoimentos',
    href: '#depoimentos',
    label: 'Depoimentos',
    ariaLabel: 'Navegar para seção de depoimentos',
  },
  {
    id: 'contato',
    href: '#contato',
    label: 'Contato',
    ariaLabel: 'Navegar para seção de contato',
    disabled: true,
  },
] as const

export const BUSINESS_HOURS: BusinessHours = {
  days: 'Segunda a Sexta',
  hours: '8h às 18h',
}

export const ICON_SIZE = {
  social: 'w-11 h-11',
  socialIcon: 'w-5 h-5',
} as const
