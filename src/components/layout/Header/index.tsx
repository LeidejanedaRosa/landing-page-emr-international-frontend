import React, { useEffect } from 'react'

import CompanyLogo from '../../../assets/logo_emr_internacional.svg'
import {
  useFocusTrap,
  useScreenReaderAnnouncement,
  useSkipLinks,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { useCurrentSection } from '../../../hooks/useCurrentSection'
import { SkipLink } from '../../ui/Accessibility'
import DesktopMenu from './DesktopMenu'
import { useMobileMenu } from './hooks/useMobileMenu'
import MobileMenu from './MobileMenu'
import MobileMenuButton from './MobileMenuButton'

interface HeaderProps {
  className?: string
}

interface LogoProps {
  logoId: string
}

const CompanyLogoComponent: React.FC<LogoProps> = ({ logoId }) => {
  return (
    <a
      href='#inicio'
      className='flex items-center rounded-lg p-2 -m-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      aria-label='EMR Internacional - Voltar ao início'
    >
      <img
        id={logoId}
        src={CompanyLogo}
        alt='EMR Internacional - Especialistas em Emergências Médicas e Resgate Tático'
        style={{
          filter:
            'drop-shadow(0 0 12px rgb(255 255 255 / 1)) drop-shadow(0 0 16px rgb(255 255 255 / 0.4)) brightness(1.1)',
        }}
        width={120}
        height={128}
      />
    </a>
  )
}

CompanyLogoComponent.displayName = 'CompanyLogoComponent'

// eslint-disable-next-line max-lines-per-function
const Header: React.FC<HeaderProps> = () => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu()
  const { announce } = useScreenReaderAnnouncement()
  const { skipToContent, skipToNavigation } = useSkipLinks()
  const currentSection = useCurrentSection([
    'inicio',
    'sobre',
    'certificacoes',
    'cursos',
    'depoimentos',
    'contato',
  ])
  const headerId = useUniqueId('main-header')
  const logoId = useUniqueId('company-logo')
  const navId = useUniqueId('main-navigation')

  const { containerRef } = useFocusTrap(isMobileMenuOpen)

  useEffect(() => {
    if (currentSection && currentSection !== 'inicio') {
      const sectionNames = {
        about: 'Sobre',
        certifications: 'Certificações',
        courses: 'Cursos',
        testimonials: 'Depoimentos',
        contact: 'Contato',
      }
      const sectionName =
        sectionNames[currentSection as keyof typeof sectionNames]
      if (sectionName) {
        announce(`Navegou para seção: ${sectionName}`, 'polite')
      }
    }
  }, [currentSection, announce])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
        announce('Menu mobile fechado', 'polite')
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen, closeMobileMenu, announce])

  return (
    <>
      <SkipLink href='#main-content' onClick={skipToContent}>
        Pular para conteúdo principal
      </SkipLink>
      <SkipLink href={`#${navId}`} onClick={skipToNavigation}>
        Pular para navegação
      </SkipLink>

      <header id={headerId} className='p-4 bg-black' role='banner'>
        <nav
          id={navId}
          className='max-w-screen-2xl mx-auto'
          role='navigation'
          aria-label='Navegação principal'
        >
          <div className='flex justify-between items-center'>
            <CompanyLogoComponent logoId={logoId} />

            <DesktopMenu currentSection={currentSection} />

            <MobileMenuButton
              isMobileMenuOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>

          {isMobileMenuOpen && (
            <div ref={containerRef as React.RefObject<HTMLDivElement>}>
              <MobileMenu
                onLinkClick={closeMobileMenu}
                currentSection={currentSection}
              />
            </div>
          )}
        </nav>
      </header>
    </>
  )
}

export default Header
