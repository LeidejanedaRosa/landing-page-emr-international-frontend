import React from 'react'

import { AccessibleLink } from '../../ui/Accessibility'

interface MobileMenuProps {
  onLinkClick: () => void
  currentSection?: string
}

const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ onLinkClick, currentSection }) => (
    <div id='mobile-menu' className='md:hidden flex justify-center'>
      <div className='flex justify-center items-center flex-wrap gap-2 w-[90vw] px-2 pt-2 pb-3 sm:px-3 bg-white/20'>
        <AccessibleLink
          href='#sobre'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'about' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Sobre
        </AccessibleLink>
        <AccessibleLink
          href='#certificacoes'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'certifications' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Certificações
        </AccessibleLink>
        <AccessibleLink
          href='#cursos'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'courses' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Cursos
        </AccessibleLink>
        <AccessibleLink
          href='#depoimentos'
          className='px-3 py-2 rounded-md transition-colors duration-200 focus:bg-white/30 active:bg-white/40'
          variant='ghost'
          ariaCurrent={currentSection === 'testimonials' ? 'page' : undefined}
          onClick={onLinkClick}
        >
          Depoimentos
        </AccessibleLink>
        <AccessibleLink
          href='#contato'
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
