import React from 'react'

import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { AccessibleLink } from '../../ui/Accessibility'
import type { NavigationLink } from './types'

interface QuickLinksProps {
  navigationLinks: ReadonlyArray<NavigationLink>
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ navigationLinks }) => {
  const { announce } = useScreenReaderAnnouncement()
  const quickLinksId = useUniqueId('quick-links')

  const handleLinkClick = (label: string) => {
    announce(`Navegando para ${label}`, 'polite')
  }

  return (
    <nav
      aria-labelledby={`${quickLinksId}-heading`}
      className='text-left lg:ml-20 lg:mb-8'
    >
      <h2
        id={`${quickLinksId}-heading`}
        className='text-lg font-semibold mb-4 text-white'
      >
        Links Rápidos
      </h2>
      <ul className='space-y-3'>
        {navigationLinks.map(link => (
          <li key={link.id}>
            {link.disabled ? (
              <span
                className='text-gray-500 cursor-not-allowed'
                aria-disabled='true'
              >
                {link.label}
              </span>
            ) : (
              <AccessibleLink
                href={link.href}
                variant='ghost'
                className='text-gray-300 hover:text-cta-400 transition-colors duration-200'
                aria-label={link.ariaLabel}
                onClick={() => handleLinkClick(link.label)}
              >
                {link.label}
              </AccessibleLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
