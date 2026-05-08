import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent, waitFor } from '../../../../test/test-utils'
import { NAVIGATION_ITEMS } from '../config/navigationConfig'
import Header from '../index'

const mockAnnounce = vi.fn()

vi.mock('../../../../hooks/useAccessibility', () => ({
  useFocusTrap: vi.fn(() => ({ containerRef: { current: null } })),
  useScreenReaderAnnouncement: vi.fn(() => ({
    announce: mockAnnounce,
  })),
  useSkipLinks: vi.fn(() => ({
    skipToContent: vi.fn(),
    skipToNavigation: vi.fn(),
  })),
  useUniqueId: vi.fn((prefix: string) => `${prefix}-test-id`),
}))

vi.mock('../../../../hooks/useCurrentSection', () => ({
  useCurrentSection: vi.fn(() => 'sobre'),
}))

vi.mock('../../../../assets/logo_emr_internacional.svg', () => ({
  default: 'mocked-logo.svg',
}))

describe('Header', () => {
  beforeEach(() => {
    mockAnnounce.mockClear()
  })

  describe('Rendering', () => {
    it('should render header with correct role and structure', () => {
      render(<Header />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveAttribute('data-testid', 'header')
    })

    it('should have proper navigation structure', () => {
      render(<Header />)

      const nav = screen.getByRole('navigation', {
        name: /navegação principal/i,
      })
      expect(nav).toBeInTheDocument()
    })

    it('should have unique ids for header and navigation', () => {
      render(<Header />)

      const header = screen.getByTestId('header')
      expect(header).toHaveAttribute('id', 'main-header-test-id')

      const nav = screen.getByRole('navigation', {
        name: /navegação principal/i,
      })
      expect(nav).toHaveAttribute('id', 'main-navigation-test-id')
    })
  })

  describe('SkipLinks', () => {
    it('should render skip to content link', () => {
      render(<Header />)

      const skipToContent = screen.getByText('Pular para conteúdo principal')
      expect(skipToContent).toBeInTheDocument()
      expect(skipToContent).toHaveAttribute('href', '#main-content')
    })

    it('should render skip to navigation link', () => {
      render(<Header />)

      const skipToNavigation = screen.getByText('Pular para navegação')
      expect(skipToNavigation).toBeInTheDocument()
      expect(skipToNavigation).toHaveAttribute(
        'href',
        '#main-navigation-test-id'
      )
    })

    it('should have sr-only class for skip links by default', () => {
      render(<Header />)

      const skipToContent = screen.getByText('Pular para conteúdo principal')
      expect(skipToContent).toHaveClass('sr-only')
    })
  })

  describe('CompanyLogo', () => {
    it('should render company logo link', () => {
      render(<Header />)

      const logoLink = screen.getByTestId('company-logo-link')
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '#inicio')
    })

    it('should render logo with accessible aria-label', () => {
      render(<Header />)

      const logoLink = screen.getByTestId('company-logo-link')
      expect(logoLink).toHaveAttribute(
        'aria-label',
        'EMR Internacional - Voltar ao início'
      )
    })

    it('should render logo image with alt text', () => {
      render(<Header />)

      const logoImage = screen.getByAltText(
        'EMR Internacional - Especialistas em Emergências Médicas e Resgate Tático'
      )
      expect(logoImage).toBeInTheDocument()
    })

    it('should have unique logo id', () => {
      render(<Header />)

      const logoImage = screen.getByRole('img', { name: /emr internacional/i })
      expect(logoImage).toHaveAttribute('id', 'company-logo-test-id')
    })

    it('should have correct image dimensions', () => {
      render(<Header />)

      const logoImage = screen.getByRole('img', { name: /emr internacional/i })
      expect(logoImage).toHaveAttribute('width', '120')
      expect(logoImage).toHaveAttribute('height', '128')
    })
  })

  describe('DesktopMenu', () => {
    it('should render desktop menu navigation', () => {
      render(<Header />)

      const desktopMenu = screen.getByTestId('desktop-menu')
      expect(desktopMenu).toBeInTheDocument()
    })

    it('should render all navigation items in desktop menu', () => {
      render(<Header />)

      NAVIGATION_ITEMS.forEach(item => {
        const links = screen.getAllByRole('link', {
          name: new RegExp(item.label),
        })
        expect(links.length).toBeGreaterThanOrEqual(1)
      })
    })

    it('should have aria-current on current section link', () => {
      render(<Header />)

      const sobreLinks = screen.getAllByRole('link', { name: /sobre/i })
      const desktopSobreLink = sobreLinks.find(link =>
        link.closest('[data-testid="desktop-menu"]')
      )
      expect(desktopSobreLink).toHaveAttribute('aria-current', 'page')
    })

    it('should have screen reader text for current page', () => {
      render(<Header />)

      expect(screen.getByText('(página atual)')).toBeInTheDocument()
    })

    it('should announce navigation when clicking a link', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const treinamentosLinks = screen.getAllByRole('link', {
        name: /treinamentos/i,
      })
      const desktopTreinamentosLink = treinamentosLinks.find(link =>
        link.closest('[data-testid="desktop-menu"]')
      )

      expect(desktopTreinamentosLink).toBeDefined()
      await user.click(desktopTreinamentosLink!)
      expect(mockAnnounce).toHaveBeenCalledWith(
        'Navegando para Treinamentos',
        'polite'
      )
    })

    it('should be hidden on mobile (md:hidden)', () => {
      render(<Header />)

      const desktopMenu = screen.getByTestId('desktop-menu')
      expect(desktopMenu).toHaveClass('hidden', 'md:flex')
    })
  })

  describe('MobileMenuButton', () => {
    it('should render mobile menu button', () => {
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      expect(mobileButton).toBeInTheDocument()
    })

    it('should have aria-expanded false initially', () => {
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should have aria-controls pointing to mobile-menu', () => {
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      expect(mobileButton).toHaveAttribute('aria-controls', 'mobile-menu')
    })

    it('should have accessible aria-label when closed', () => {
      render(<Header />)

      const mobileButton = screen.getByRole('button', {
        name: 'Abrir menu de navegação',
      })
      expect(mobileButton).toBeInTheDocument()
    })

    it('should have accessible aria-label when opened', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      await user.click(mobileButton)

      expect(mobileButton).toHaveAttribute(
        'aria-label',
        'Fechar menu de navegação'
      )
    })

    it('should render hamburger icon when menu is closed', () => {
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      const svg = mobileButton.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('should change icon when menu is opened', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')

      // Get initial path
      const initialPath = mobileButton.querySelector('path')?.getAttribute('d')

      await user.click(mobileButton)

      // Path should change to X icon
      const newPath = mobileButton.querySelector('path')?.getAttribute('d')
      expect(newPath).not.toBe(initialPath)
      expect(newPath).toContain('M6 18L18 6')
    })

    it('should be visible only on mobile (md:hidden wrapper)', () => {
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      const wrapper = mobileButton.parentElement
      expect(wrapper).toHaveClass('md:hidden')
    })
  })

  describe('MobileMenu', () => {
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

    it('should render all navigation items in mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      await user.click(mobileButton)

      const mobileMenu = screen.getByTestId('mobile-menu')

      NAVIGATION_ITEMS.forEach(item => {
        const link = mobileMenu.querySelector(`a[href="${item.href}"]`)
        expect(link).toBeInTheDocument()
        expect(link).toHaveTextContent(item.label)
      })
    })

    it('should close mobile menu when a link is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      await user.click(mobileButton)

      const mobileMenu = screen.getByTestId('mobile-menu')
      const treinamentosLink = mobileMenu.querySelector(
        'a[href="#treinamentos"]'
      )

      expect(treinamentosLink).toBeDefined()
      await user.click(treinamentosLink!)
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    })

    it('should have aria-current on current section in mobile menu', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      await user.click(mobileButton)

      const mobileMenu = screen.getByTestId('mobile-menu')
      const sobreLink = mobileMenu.querySelector('a[href="#sobre"]')
      expect(sobreLink).toHaveAttribute('aria-current', 'page')
    })

    it('should be hidden on desktop (md:hidden)', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      await user.click(mobileButton)

      const mobileMenu = screen.getByTestId('mobile-menu')
      expect(mobileMenu).toHaveClass('md:hidden')
    })
  })

  describe('Keyboard Navigation', () => {
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

    it('should update aria-expanded when menu state changes', async () => {
      const user = userEvent.setup()
      render(<Header />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(mobileButton)
      expect(mobileButton).toHaveAttribute('aria-expanded', 'true')

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
      })
    })
  })

  describe('Cleanup', () => {
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
  })

  describe('Styling', () => {
    it('should have padding', () => {
      render(<Header />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('p-4')
    })

    it('should have black background', () => {
      render(<Header />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-black')
    })

    it('should have max-width container in nav', () => {
      render(<Header />)

      const nav = screen.getByRole('navigation', {
        name: /navegação principal/i,
      })
      expect(nav).toHaveClass('max-w-screen-2xl', 'mx-auto')
    })
  })
})
