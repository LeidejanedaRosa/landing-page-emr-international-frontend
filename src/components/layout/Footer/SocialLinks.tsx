import React from 'react'

import { useScreenReaderAnnouncement } from '../../../hooks/useAccessibility'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './icons'
import type { SocialLink } from './types'

const ICON_MAP = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
} as const

interface SocialLinkButtonProps {
  social: SocialLink
  onNavigate: (socialName: string) => void
}

export const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({
  social,
  onNavigate,
}) => {
  const IconComponent = ICON_MAP[social.iconName]

  if (!IconComponent) {
    return null
  }

  return (
    <a
      href={social.href}
      target='_blank'
      rel='noopener noreferrer'
      className={`flex items-center justify-center w-11 h-11 rounded-lg text-white ${social.bgColor} ${social.hoverBgColor} transition-all duration-200 hover:opacity-90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black`}
      aria-label={`${social.ariaLabel} (abre em nova janela)`}
      onClick={() => onNavigate(social.name)}
    >
      <IconComponent />
    </a>
  )
}

interface SocialLinksProps {
  socialLinks: ReadonlyArray<SocialLink>
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  const { announce } = useScreenReaderAnnouncement()

  const handleSocialClick = (socialName: string) => {
    announce(`Abrindo ${socialName} da EMR International`, 'polite')
  }

  return (
    <ul
      className='flex gap-1 sm:gap-4'
      aria-label='Redes sociais da EMR International'
    >
      {socialLinks.map(social => (
        <li key={social.id}>
          <SocialLinkButton social={social} onNavigate={handleSocialClick} />
        </li>
      ))}
    </ul>
  )
}
