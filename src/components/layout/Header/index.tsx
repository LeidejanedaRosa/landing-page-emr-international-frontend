import React, { useEffect } from 'react'

import {
  useFocusTrap,
  useScreenReaderAnnouncement,
  useSkipLinks,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { useCurrentSection } from '../../../hooks/useCurrentSection'
import { SkipLink } from '../../ui/Accessibility'
import CompanyLogo from './CompanyLogo'
import { SECTION_IDS } from './config/navigationConfig'
import DesktopMenu from './DesktopMenu'
import { useMobileMenu } from './hooks/useMobileMenu'
import MobileMenu from './MobileMenu'
import MobileMenuButton from './MobileMenuButton'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = () => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu()
  const { announce } = useScreenReaderAnnouncement()
  const { skipToContent, skipToNavigation } = useSkipLinks()
  const currentSection = useCurrentSection(SECTION_IDS)
  const headerId = useUniqueId('main-header')
  const logoId = useUniqueId('company-logo')
  const navId = useUniqueId('main-navigation')

  const { containerRef } = useFocusTrap(isMobileMenuOpen)

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
          aria-label='Navegação principal'
        >
          <div className='flex justify-between items-center'>
            <CompanyLogo logoId={logoId} />

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
