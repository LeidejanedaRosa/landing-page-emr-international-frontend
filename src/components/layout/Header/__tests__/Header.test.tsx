import type React from 'react'

import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent, waitFor } from '../../../../test/test-utils'
import Header from '../index'

// Mock dos hooks de acessibilidade
vi.mock('../../../../hooks/useAccessibility', () => ({
  useFocusTrap: vi.fn(() => ({ containerRef: { current: null } })),
  useScreenReaderAnnouncement: vi.fn(() => ({
    announce: vi.fn(),
  })),
  useSkipLinks: vi.fn(() => ({
    skipToContent: vi.fn(),
    skipToNavigation: vi.fn(),
  })),
  useUniqueId: vi.fn((prefix: string) => `${prefix}-test-id`),
}))

// Mock do hook useCurrentSection
vi.mock('../../../../hooks/useCurrentSection', () => ({
  useCurrentSection: vi.fn(() => 'sobre'),
}))

// Mock dos subcomponentes
vi.mock('../CompanyLogo', () => ({
  default: ({ logoId }: { logoId: string }) => (
    <div data-testid='company-logo' data-logo-id={logoId}>
      Company Logo
    </div>
  ),
}))

vi.mock('../DesktopMenu', () => ({
  default: ({ currentSection }: { currentSection?: string }) => (
    <nav data-testid='desktop-menu' data-current-section={currentSection}>
      Desktop Menu
    </nav>
  ),
}))

vi.mock('../MobileMenu', () => ({
  default: ({
    onLinkClick,
    currentSection,
  }: {
    onLinkClick: () => void
    currentSection?: string
  }) => (
    <div
      data-testid='mobile-menu'
      data-current-section={currentSection}
      onClick={onLinkClick}
    >
      Mobile Menu
    </div>
  ),
}))

vi.mock('../MobileMenuButton', () => ({
  default: ({
    isMobileMenuOpen,
    onClick,
  }: {
    isMobileMenuOpen: boolean
    onClick: () => void
  }) => (
    <button
      data-testid='mobile-menu-button'
      onClick={onClick}
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? 'Close' : 'Open'}
    </button>
  ),
}))

vi.mock('../../../ui/Accessibility', () => ({
  SkipLink: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode
    href: string
    onClick: () => void
  }) => (
    <a href={href} onClick={onClick} data-testid={`skip-link-${href}`}>
      {children}
    </a>
  ),
}))

describe('Header', () => {
  it('should render header with correct role and structure', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveAttribute('data-testid', 'header')
  })

  it('should render skip links', () => {
    render(<Header />)

    const skipToContent = screen.getByTestId('skip-link-#main-content')
    const skipToNavigation = screen.getByTestId(
      'skip-link-#main-navigation-test-id'
    )

    expect(skipToContent).toBeInTheDocument()
    expect(skipToContent).toHaveTextContent('Pular para conteúdo principal')

    expect(skipToNavigation).toBeInTheDocument()
    expect(skipToNavigation).toHaveTextContent('Pular para navegação')
  })

  it('should render company logo with unique id', () => {
    render(<Header />)

    const logo = screen.getByTestId('company-logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('data-logo-id', 'company-logo-test-id')
  })

  it('should render desktop menu with current section', () => {
    render(<Header />)

    const desktopMenu = screen.getByTestId('desktop-menu')
    expect(desktopMenu).toBeInTheDocument()
    expect(desktopMenu).toHaveAttribute('data-current-section', 'sobre')
  })

  it('should render mobile menu button', () => {
    render(<Header />)

    const mobileButton = screen.getByTestId('mobile-menu-button')
    expect(mobileButton).toBeInTheDocument()
    expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('should not show mobile menu initially', () => {
    render(<Header />)

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('should open mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const mobileButton = screen.getByTestId('mobile-menu-button')
    await user.click(mobileButton)

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()
    expect(mobileButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('should close mobile menu when button is clicked again', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const mobileButton = screen.getByTestId('mobile-menu-button')

    await user.click(mobileButton)
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

    await user.click(mobileButton)
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('should close mobile menu when a link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const mobileButton = screen.getByTestId('mobile-menu-button')
    await user.click(mobileButton)

    const mobileMenu = screen.getByTestId('mobile-menu')
    expect(mobileMenu).toBeInTheDocument()

    await user.click(mobileMenu)
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('should close mobile menu when Escape key is pressed', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const mobileButton = screen.getByTestId('mobile-menu-button')
    await user.click(mobileButton)

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    })
  })

  it('should not close mobile menu when Escape is pressed if menu is closed', async () => {
    const user = userEvent.setup()
    render(<Header />)

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('should have proper navigation structure', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation', { name: /navegação principal/i })
    expect(nav).toBeInTheDocument()
  })

  it('should pass current section to mobile menu when opened', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const mobileButton = screen.getByTestId('mobile-menu-button')
    await user.click(mobileButton)

    const mobileMenu = screen.getByTestId('mobile-menu')
    expect(mobileMenu).toHaveAttribute('data-current-section', 'sobre')
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
    const { unmount } = render(<Header />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )

    removeEventListenerSpy.mockRestore()
  })

  it('should have unique ids for header, logo and navigation', () => {
    render(<Header />)

    const header = screen.getByTestId('header')
    expect(header).toHaveAttribute('id', 'main-header-test-id')

    const logo = screen.getByTestId('company-logo')
    expect(logo).toHaveAttribute('data-logo-id', 'company-logo-test-id')

    const nav = screen.getByRole('navigation', { name: /navegação principal/i })
    expect(nav).toHaveAttribute('id', 'main-navigation-test-id')
  })
})
