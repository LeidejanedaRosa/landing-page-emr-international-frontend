export interface SocialLink {
  id: string
  name: string
  href: string
  ariaLabel: string
  bgColor: string
  hoverBgColor: string
  iconName: 'instagram' | 'linkedin' | 'whatsapp'
}

export interface NavigationLink {
  id: string
  href: string
  label: string
  ariaLabel: string
  disabled?: boolean
}

export interface BusinessHours {
  days: string
  hours: string
}
