import React from 'react'

import { AccessibleLink } from '../../ui/Accessibility'

interface MobileMenuProps {
  onLinkClick: () => void
  currentSection?: string
}

const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ onLinkClick, currentSection }) => (
    <div id='mobile-menu' className='md:hidden mx-auto'>
      <div className='flex justify-center items-center flex-wrap gap-2 w-[90vw] px-2 pt-2 pb-3 sm:px-3 bg-white/20'>
        <AccessibleLink
          href='#about'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'about' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Sobre
        </AccessibleLink>
        <AccessibleLink
          href='#certifications'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'certifications' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Certificações
        </AccessibleLink>
        <AccessibleLink
          href='#courses'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'courses' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Cursos
        </AccessibleLink>
        <AccessibleLink
          href='#testimonials'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'testimonials' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Depoimentos
        </AccessibleLink>
        <AccessibleLink
          href='#contact'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'contact' ? 'page' : undefined}
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
