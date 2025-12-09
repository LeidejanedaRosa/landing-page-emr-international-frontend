import React from 'react'

import { AccessibleLink } from '../../ui/Accessibility'

interface MobileMenuProps {
  onLinkClick: () => void
  currentSection?: string
}

const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ onLinkClick, currentSection }) => (
    <div id='mobile-menu' className='md:hidden'>
      <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/20'>
        <AccessibleLink
          href='#sobre'
          className='block px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'sobre' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Sobre
        </AccessibleLink>
        <AccessibleLink
          href='#certificacoes'
          className='block px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'certificacoes' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Certificações
        </AccessibleLink>
        <AccessibleLink
          href='#courses'
          className='block px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'courses' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Cursos
        </AccessibleLink>
        <AccessibleLink
          href='#contato'
          className='block px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'contato' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Contato
        </AccessibleLink>
      </div>
    </div>
  )
)

MobileMenu.displayName = 'MobileMenu'

export default MobileMenu
