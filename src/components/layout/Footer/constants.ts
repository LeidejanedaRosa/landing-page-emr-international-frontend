import type { BusinessHours, NavigationLink, SocialLink } from './types'

export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/emr_international/',
    ariaLabel: 'Seguir EMR International no Instagram - Abre em nova aba',
    bgColor: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    hoverBgColor:
      'hover:from-purple-700 hover:via-pink-600 hover:to-orange-500',
    iconName: 'instagram',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: 'https://wa.me/5519971575640',
    ariaLabel: 'Entrar em contato via WhatsApp - Abre em nova aba',
    bgColor: 'bg-[#128C7E]',
    hoverBgColor: 'hover:bg-[#075E54]',
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
    id: 'treinamentos',
    href: '#treinamentos',
    label: 'Treinamentos',
    ariaLabel: 'Navegar para seção de treinamentos',
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
