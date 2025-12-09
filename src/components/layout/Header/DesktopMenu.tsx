import React, { memo } from 'react'

import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { AccessibleLink } from '../../ui/Accessibility'

interface DesktopMenuProps {
  currentSection?: string
}

interface NavigationItem {
  id: string
  href: string
  label: string
  ariaLabel: string
}

const DesktopMenu: React.FC<DesktopMenuProps> = memo(({ currentSection }) => {
  const { announce } = useScreenReaderAnnouncement()
  const menuId = useUniqueId('desktop-menu')

  const navigationItems: NavigationItem[] = [
    {
      id: 'about',
      href: '#about',
      label: 'Sobre',
      ariaLabel:
        'Navegar para seção Sobre - Informações sobre a EMR Internacional',
    },
    {
      id: 'certifications',
      href: '#certifications',
      label: 'Certificações',
      ariaLabel:
        'Navegar para seção Certificações - Certificações internacionais',
    },
    {
      id: 'courses',
      href: '#courses',
      label: 'Cursos',
      ariaLabel: 'Navegar para seção Cursos - Nossos cursos especializados',
    },
    {
      id: 'contact',
      href: '#contact',
      label: 'Contato',
      ariaLabel: 'Navegar para seção Contato - Fale conosco',
    },
  ]

  const handleNavigation = (item: NavigationItem) => {
    announce(`Navegando para ${item.label}`, 'polite')
  }

  return (
    <nav className='hidden md:flex' aria-labelledby={`${menuId}-label`}>
      <span id={`${menuId}-label`} className='sr-only'>
        Menu principal de navegação
      </span>
      <ul className='flex space-x-8'>
        {navigationItems.map(item => {
          const isCurrent = currentSection === item.id
          return (
            <li key={item.id}>
              <AccessibleLink
                href={item.href}
                className={`text-white transition-colors duration-200 px-3 py-2 rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                  isCurrent
                    ? 'bg-white bg-opacity-20'
                    : 'hover:bg-white hover:bg-opacity-30'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={item.ariaLabel}
                onClick={() => handleNavigation(item)}
              >
                {item.label}
                {isCurrent && <span className='sr-only'> (página atual)</span>}
              </AccessibleLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
})
DesktopMenu.displayName = 'DesktopMenu'
export default DesktopMenu
