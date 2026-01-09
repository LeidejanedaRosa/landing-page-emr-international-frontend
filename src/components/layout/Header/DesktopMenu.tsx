import React from 'react'

import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { AccessibleLink } from '../../ui/Accessibility'
import { NAVIGATION_ITEMS, NavigationItem } from './config/navigationConfig'

interface DesktopMenuProps {
  currentSection?: string
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ currentSection }) => {
  const { announce } = useScreenReaderAnnouncement()
  const menuId = useUniqueId('desktop-menu')

  const handleNavigation = (item: NavigationItem) => {
    announce(`Navegando para ${item.label}`, 'polite')
  }

  return (
    <nav
      className='hidden md:flex'
      aria-labelledby={`${menuId}-label`}
      data-testid='desktop-menu'
    >
      <span id={`${menuId}-label`} className='sr-only'>
        Menu principal de navegação
      </span>
      <ul className='flex space-x-8'>
        {NAVIGATION_ITEMS.map(item => {
          const isCurrent = currentSection === item.id
          return (
            <li key={item.id}>
              <AccessibleLink
                href={item.href}
                className={`text-white transition-colors duration-200 px-3 py-2 rounded-md text-lg font-medium  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
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
}

DesktopMenu.displayName = 'DesktopMenu'

export default DesktopMenu
