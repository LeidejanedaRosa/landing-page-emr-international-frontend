import React from 'react'

import { AccessibleLink } from '../../ui/Accessibility'
import { NAVIGATION_ITEMS } from './config/navigationConfig'

interface MobileMenuProps {
  onLinkClick: () => void
  currentSection?: string
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  onLinkClick,
  currentSection,
}) => (
  <div id='mobile-menu' className='md:hidden flex justify-center'>
    <div className='flex justify-center items-center flex-wrap gap-2 w-[90vw] px-2 pt-2 pb-3 sm:px-3 bg-white/20'>
      {NAVIGATION_ITEMS.map(item => (
        <AccessibleLink
          key={item.id}
          href={item.href}
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === item.id ? 'page' : undefined}
          onClick={onLinkClick}
        >
          {item.label}
        </AccessibleLink>
      ))}
    </div>
  </div>
)

MobileMenu.displayName = 'MobileMenu'

export default MobileMenu
