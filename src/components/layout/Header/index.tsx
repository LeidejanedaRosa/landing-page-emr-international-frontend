import React from 'react'

import CompanyLogo from '../../../assets/logo_emr_internacional.svg'
import DesktopMenu from './DesktopMenu'
import { useMobileMenu } from './hooks/useMobileMenu'
import MobileMenu from './MobileMenu'
import MobileMenuButton from './MobileMenuButton'

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

const Header: React.FC<HeaderProps> = ({ className = '', currentSection }) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu()

  return (
    <header className={`p-4 ${className}`}>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <img
              src={CompanyLogo}
              alt='EMR Internacional Logo'
              className='absolute h-32 drop-shadow-lg filter brightness-110'
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
