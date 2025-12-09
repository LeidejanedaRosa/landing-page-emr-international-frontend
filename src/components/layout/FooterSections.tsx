import React, { memo } from 'react'

import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../hooks/useAccessibility'
import { AccessibleLink } from '../ui/Accessibility'

interface SocialLink {
  name: string
  href: string
  ariaLabel: string
  icon: React.ReactNode
}

export const SocialLinks: React.FC = memo(() => {
  const { announce } = useScreenReaderAnnouncement()

  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/emrinternacional',
      ariaLabel: 'Seguir EMR Internacional no Instagram - Abre em nova aba',
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 24 24'
          role='presentation'
        >
          <path d='M12.017 0C8.396 0 7.929.013 7.794.048 5.48.156 3.85.468 2.474 1.890 1.033 3.324.687 5.094.687 12.017s.346 8.693 1.787 10.127c1.376 1.422 3.006 1.734 5.32 1.842.135.035.602.048 4.223.048s4.088-.013 4.223-.048c2.314-.108 3.944-.42 5.32-1.842 1.441-1.434 1.787-3.204 1.787-10.127s-.346-8.693-1.787-10.127C18.438.468 16.808.156 14.494.048 14.359.013 13.892 0 12.017 0zm0 2.17c3.691 0 4.128.013 5.590.072 1.921.086 2.963.402 3.661.666a6.11 6.11 0 0 1 2.235 1.449 6.11 6.11 0 0 1 1.449 2.235c.264.698.58 1.74.666 3.661.059 1.462.072 1.899.072 5.590s-.013 4.128-.072 5.590c-.086 1.921-.402 2.963-.666 3.661a6.11 6.11 0 0 1-1.449 2.235 6.11 6.11 0 0 1-2.235 1.449c-.698.264-1.74.58-3.661.666-1.462.059-1.899.072-5.590.072s-4.128-.013-5.590-.072c-1.921-.086-2.963-.402-3.661-.666a6.11 6.11 0 0 1-2.235-1.449 6.11 6.11 0 0 1-1.449-2.235c-.264-.698-.58-1.74-.666-3.661C2.183 16.145 2.17 15.708 2.17 12.017s.013-4.128.072-5.590c.086-1.921.402-2.963.666-3.661A6.11 6.11 0 0 1 4.357 1.331 6.11 6.11 0 0 1 6.592.882c.698-.264 1.74-.58 3.661-.666C11.715 2.183 12.152 2.17 12.017 2.17zm0 3.405a6.442 6.442 0 1 0 0 12.885 6.442 6.442 0 0 0 0-12.885zm0 10.615a4.173 4.173 0 1 1 0-8.346 4.173 4.173 0 0 1 0 8.346zM19.846 4.59a1.515 1.515 0 1 1-3.03 0 1.515 1.515 0 0 1 3.03 0z' />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/emrinternacional',
      ariaLabel:
        'Conectar com EMR Internacional no LinkedIn - Abre em nova aba',
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 24 24'
          role='presentation'
        >
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/5511123456789',
      ariaLabel: 'Entrar em contato via WhatsApp - Abre em nova aba',
      icon: (
        <svg
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 24 24'
          role='presentation'
        >
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.434 3.488' />
        </svg>
      ),
    },
  ]

  const handleSocialClick = (socialName: string) => {
    announce(`Abrindo ${socialName} da EMR Internacional`, 'polite')
  }

  return (
    <div
      className='flex space-x-4'
      role='list'
      aria-label='Redes sociais da EMR Internacional'
    >
      {socialLinks.map(social => (
        <div key={social.name} role='listitem'>
          <a
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-cta-400 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta-400 focus:ring-opacity-50'
            aria-label={social.ariaLabel}
            onClick={() => handleSocialClick(social.name)}
          >
            {social.icon}
          </a>
        </div>
      ))}
    </div>
  )
})

export const QuickLinks: React.FC = memo(() => {
  const { announce } = useScreenReaderAnnouncement()
  const quickLinksId = useUniqueId('quick-links')

  const links = [
    {
      href: '#about',
      label: 'Sobre Nós',
      ariaLabel: 'Navegar para seção sobre a empresa',
    },
    {
      href: '#courses',
      label: 'Cursos',
      ariaLabel: 'Navegar para seção de cursos',
    },
    {
      href: '#contact',
      label: 'Contato',
      ariaLabel: 'Navegar para seção de contato',
    },
  ]

  const handleLinkClick = (label: string) => {
    announce(`Navegando para ${label}`, 'polite')
  }

  return (
    <nav aria-labelledby={`${quickLinksId}-heading`}>
      <h3
        id={`${quickLinksId}-heading`}
        className='text-lg font-semibold mb-4 text-white'
      >
        Links Rápidos
      </h3>
      <ul className='space-y-2' role='list'>
        {links.map(link => (
          <li key={link.href} role='listitem'>
            <AccessibleLink
              href={link.href}
              className='text-gray-300 hover:text-cta-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cta-400 focus:ring-opacity-50 rounded px-2 py-1 -mx-2'
              aria-label={link.ariaLabel}
              onClick={() => handleLinkClick(link.label)}
            >
              {link.label}
            </AccessibleLink>
          </li>
        ))}
      </ul>
    </nav>
  )
})

export const ServicesLinks: React.FC = memo(() => {
  const { announce } = useScreenReaderAnnouncement()
  const servicesLinksId = useUniqueId('services-links')

  const services = [
    {
      href: '#courses',
      label: 'Resgate Tático',
      ariaLabel: 'Saiba mais sobre nossos cursos de resgate tático',
    },
    {
      href: '#courses',
      label: 'Emergências Médicas',
      ariaLabel: 'Conheça nossos cursos de emergências médicas',
    },
    {
      href: '#certifications',
      label: 'Certificações HSI',
      ariaLabel: 'Informações sobre certificações HSI',
    },
    {
      href: '#contact',
      label: 'Suporte Técnico',
      ariaLabel: 'Entre em contato para suporte técnico',
    },
  ]

  const handleServiceClick = (label: string) => {
    announce(`Navegando para ${label}`, 'polite')
  }

  return (
    <nav aria-labelledby={`${servicesLinksId}-heading`}>
      <h3
        id={`${servicesLinksId}-heading`}
        className='text-lg font-semibold mb-4 text-white'
      >
        Nossos Serviços
      </h3>
      <ul className='space-y-2' role='list'>
        {services.map(service => (
          <li key={service.label} role='listitem'>
            <AccessibleLink
              href={service.href}
              className='text-gray-300 hover:text-cta-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cta-400 focus:ring-opacity-50 rounded px-2 py-1 -mx-2'
              aria-label={service.ariaLabel}
              onClick={() => handleServiceClick(service.label)}
            >
              {service.label}
            </AccessibleLink>
          </li>
        ))}
      </ul>
    </nav>
  )
})
