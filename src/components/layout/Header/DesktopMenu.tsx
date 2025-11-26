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
      id: 'sobre',
      href: '#sobre',
      label: 'Sobre',
      ariaLabel:
        'Navegar para seção Sobre - Informações sobre a EMR Internacional',
    },
    {
      id: 'servicos',
      href: '#servicos',
      label: 'Serviços',
      ariaLabel: 'Navegar para seção Serviços - Nossos cursos especializados',
    },
    {
      id: 'contato',
      href: '#contato',
      label: 'Contato',
      ariaLabel: 'Navegar para seção Contato - Entre em contato conosco',
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
                className={`text-white hover:text-primary-200 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                  isCurrent ? 'bg-white bg-opacity-20 text-white' : ''
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
