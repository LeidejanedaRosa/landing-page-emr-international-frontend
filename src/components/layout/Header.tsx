import React, { useState } from 'react'

import CompanyLogo from '../../assets/logo_emr_internacional-sem_bg.png'
import { AccessibleLink } from '../ui/Accessibility'

interface HeaderProps {
  className?: string
  currentSection?:
    | 'home'
    | 'sobre'
    | 'servicos'
    | 'contato'
    | 'cursos'
    | 'depoimentos'
    | 'resultados'
}

const MobileMenu: React.FC<{
  onLinkClick: () => void
  currentSection?: string
}> = ({ onLinkClick, currentSection }) => (
  <div id='mobile-menu' className='md:hidden'>
    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200'>
      <AccessibleLink
        href='#sobre'
        className='block px-3 py-2 rounded-md transition-colors duration-200'
        variant='ghost'
        ariaCurrent={currentSection === 'sobre' ? 'page' : undefined}
        onClick={onLinkClick}
      >
        Sobre
      </AccessibleLink>
      <AccessibleLink
        href='#servicos'
        className='block px-3 py-2 rounded-md transition-colors duration-200'
        variant='ghost'
        ariaCurrent={currentSection === 'servicos' ? 'page' : undefined}
        onClick={onLinkClick}
      >
        Serviços
      </AccessibleLink>
      <AccessibleLink
        href='#contato'
        className='block px-3 py-2 rounded-md transition-colors duration-200'
        variant='ghost'
        ariaCurrent={currentSection === 'contato' ? 'page' : undefined}
        onClick={onLinkClick}
      >
        Contato
      </AccessibleLink>
    </div>
  </div>
)

const DesktopMenu: React.FC<{
  currentSection?: string
}> = ({ currentSection }) => (
  <div className='hidden md:flex space-x-8'>
    <AccessibleLink
      href='#sobre'
      variant='ghost'
      ariaCurrent={currentSection === 'sobre' ? 'page' : undefined}
    >
      Sobre
    </AccessibleLink>
    <AccessibleLink
      href='#cursos'
      variant='ghost'
      ariaCurrent={currentSection === 'cursos' ? 'page' : undefined}
    >
      Cursos
    </AccessibleLink>
    <AccessibleLink
      href='#depoimentos'
      variant='ghost'
      ariaCurrent={currentSection === 'depoimentos' ? 'page' : undefined}
    >
      Depoimentos
    </AccessibleLink>
    <AccessibleLink
      href='#resultados'
      variant='ghost'
      ariaCurrent={currentSection === 'resultados' ? 'page' : undefined}
    >
      Resultados
    </AccessibleLink>
    <AccessibleLink
      href='#contato'
      variant='ghost'
      ariaCurrent={currentSection === 'contato' ? 'page' : undefined}
    >
      Contato
    </AccessibleLink>
  </div>
)

const MobileMenuButton: React.FC<{
  isMobileMenuOpen: boolean
  onClick: () => void
}> = ({ isMobileMenuOpen, onClick }) => (
  <div className='md:hidden'>
    <button
      className='text-primary-600 hover:text-primary'
      onClick={onClick}
      aria-expanded={isMobileMenuOpen}
      aria-controls='mobile-menu'
      aria-label='Toggle mobile menu'
    >
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 6h16M4 12h16M4 18h16'
        />
      </svg>
    </button>
  </div>
)

const Header: React.FC<HeaderProps> = ({ className = '', currentSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  return (
    <header className={`p-4 ${className}`}>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <img
              src={CompanyLogo}
              alt='EMR Internacional Logo'
              className='h-20 drop-shadow-lg filter brightness-110'
              style={{
                filter:
                  'drop-shadow(0 0 12px rgb(255 255 255 / 1)) drop-shadow(0 0 16px rgb(255 255 255 / 0.4))',
              }}
            />
          </div>
          <DesktopMenu currentSection={currentSection} />
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
        {isMobileMenuOpen && (
          <MobileMenu
            onLinkClick={toggleMobileMenu}
            currentSection={currentSection}
          />
        )}
      </nav>
    </header>
  )
}

export default Header
