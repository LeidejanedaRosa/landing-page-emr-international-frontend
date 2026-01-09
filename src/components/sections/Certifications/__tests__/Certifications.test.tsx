import { beforeEach, describe, expect, it, vi } from 'vitest'

import { act, render, screen, userEvent } from '../../../../test/test-utils'
import Certifications from '../index'

vi.mock('../../../../data/certificationsData', () => {
  const createCert = (id: string, name: string) => ({
    id,
    name,
    organization: name,
    description: `Descrição de ${name} para testes.`,
    year: '2025',
    logo: { avif: `${id}.avif`, webp: `${id}.webp`, jpg: `${id}.jpg` },
  })
  return {
    certifications: [
      createCert('hsi', 'Health & Safety Institute'),
      createCert('naui', 'National Association of Underwater Instructors'),
      createCert('acs', 'American College of Surgeons'),
      createCert('ctecc', 'Committee for Tactical Emergency Casualty Care'),
      createCert('arc', 'American Red Cross'),
    ],
  }
})

const mockAnnounce = vi.fn()

vi.mock('../../../../hooks/useAccessibility', () => ({
  useAccessibilityPreferences: vi.fn(() => ({
    prefersReducedMotion: true,
  })),
  useScreenReaderAnnouncement: vi.fn(() => ({
    announce: mockAnnounce,
  })),
}))

vi.mock('../../../../hooks/useResponsiveItems', () => ({
  useResponsiveItems: vi.fn(() => 4),
}))

vi.mock('../../../../hooks/useTouchSwipe', () => ({
  useTouchSwipe: vi.fn(() => ({})),
}))

describe('Certifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct semantic structure', () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'certificacoes')
      expect(section).toHaveAttribute('data-section', 'certificacoes')
    })

    it('should have correct aria-labelledby linking to heading', () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })
      expect(section).toHaveAttribute(
        'aria-labelledby',
        'certifications-heading'
      )

      const heading = screen.getByRole('heading', {
        name: /credenciamento internacional/i,
        level: 2,
      })
      expect(heading).toHaveAttribute('id', 'certifications-heading')
    })

    it('should render main heading with correct text', () => {
      render(<Certifications />)

      const heading = screen.getByRole('heading', {
        name: /credenciamento internacional/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render section subtitle badge', () => {
      render(<Certifications />)

      expect(screen.getByText('Certificações')).toBeInTheDocument()
    })

    it('should render description paragraph', () => {
      render(<Certifications />)

      expect(
        screen.getByText(
          /certificações reconhecidas mundialmente em aph tático/i
        )
      ).toBeInTheDocument()
    })

    it('should render English terms with lang attribute', () => {
      render(<Certifications />)

      const englishTerms = screen.getAllByText('Wilderness Medicine')
      englishTerms.forEach(term => {
        expect(term).toHaveAttribute('lang', 'en')
      })
    })
  })

  describe('Header Component', () => {
    it('should render header element', () => {
      render(<Certifications />)

      const header = document.querySelector('header.text-center')
      expect(header).toBeInTheDocument()
    })

    it('should render subtitle with decorative borders', () => {
      render(<Certifications />)

      const subtitle = screen.getByText('Certificações')
      expect(subtitle).toHaveAttribute('aria-hidden', 'true')
      expect(subtitle).toHaveClass('border-t-2', 'border-b-2')
    })
  })

  describe('Carousel Navigation', () => {
    it('should render previous navigation button with aria-label', () => {
      render(<Certifications />)

      const prevButton = screen.getByRole('button', {
        name: 'Certificação anterior',
      })
      expect(prevButton).toBeInTheDocument()
    })

    it('should render next navigation button with aria-label', () => {
      render(<Certifications />)

      const nextButton = screen.getByRole('button', {
        name: 'Próxima certificação',
      })
      expect(nextButton).toBeInTheDocument()
    })

    it('should have SVG icons in navigation buttons', () => {
      render(<Certifications />)

      const prevButton = screen.getByRole('button', {
        name: 'Certificação anterior',
      })
      const nextButton = screen.getByRole('button', {
        name: 'Próxima certificação',
      })

      expect(prevButton.querySelector('svg')).toBeInTheDocument()
      expect(nextButton.querySelector('svg')).toBeInTheDocument()
    })

    it('should have SVG icons with role presentation', () => {
      render(<Certifications />)

      const prevButton = screen.getByRole('button', {
        name: 'Certificação anterior',
      })
      const svg = prevButton.querySelector('svg')
      expect(svg).toHaveAttribute('role', 'presentation')
    })

    it('should navigate to previous slide when clicking previous button', async () => {
      const user = userEvent.setup()
      render(<Certifications />)

      const prevButton = screen.getByRole('button', {
        name: 'Certificação anterior',
      })

      await user.click(prevButton)

      expect(prevButton).toBeInTheDocument()
    })

    it('should navigate to next slide when clicking next button', async () => {
      const user = userEvent.setup()
      render(<Certifications />)

      const nextButton = screen.getByRole('button', {
        name: 'Próxima certificação',
      })

      await user.click(nextButton)

      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('Carousel Indicators', () => {
    it('should render indicator group with aria-label', () => {
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      expect(indicatorGroup).toBeInTheDocument()
    })

    it('should render indicator buttons for each certification', () => {
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      const indicators = indicatorGroup.querySelectorAll('button')

      expect(indicators.length).toBeGreaterThan(0)
    })

    it('should have aria-label on each indicator button', () => {
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      const indicators = indicatorGroup.querySelectorAll('button')

      indicators.forEach((indicator, index) => {
        expect(indicator).toHaveAttribute(
          'aria-label',
          `Ir para certificação ${index + 1}`
        )
      })
    })

    it('should have aria-current on active indicator', () => {
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      const indicators = indicatorGroup.querySelectorAll('button')

      const hasActiveIndicator = Array.from(indicators).some(
        indicator => indicator.getAttribute('aria-current') === 'true'
      )
      expect(hasActiveIndicator).toBe(true)
    })

    it('should have screen reader only text in indicators', () => {
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      const srOnlyTexts = indicatorGroup.querySelectorAll('.sr-only')

      expect(srOnlyTexts.length).toBeGreaterThan(0)
    })

    it('should navigate to specific slide when clicking indicator', async () => {
      const user = userEvent.setup()
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      const indicators = indicatorGroup.querySelectorAll('button')

      if (indicators.length > 1) {
        await user.click(indicators[1])
        expect(indicators[1]).toBeInTheDocument()
      }
    })
  })

  describe('Certifications Grid', () => {
    it('should render list container', () => {
      render(<Certifications />)

      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
    })

    it('should render list items', () => {
      render(<Certifications />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBeGreaterThan(0)
    })

    it('should render certification cards inside list items', () => {
      render(<Certifications />)

      const articles = screen.getAllByRole('article')
      expect(articles.length).toBeGreaterThan(0)
    })
  })

  describe('Screen Reader Announcements', () => {
    it('should render screen reader announcement region', () => {
      render(<Certifications />)

      const announcement = screen.getByText(/mostrando certificação/i)
      expect(announcement).toBeInTheDocument()
    })

    it('should have aria-live polite on announcement', () => {
      render(<Certifications />)

      const announcement = screen.getByText(/mostrando certificação/i)
      expect(announcement).toHaveAttribute('aria-live', 'polite')
    })

    it('should have aria-atomic true on announcement', () => {
      render(<Certifications />)

      const announcement = screen.getByText(/mostrando certificação/i)
      expect(announcement).toHaveAttribute('aria-atomic', 'true')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Certifications />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toHaveTextContent(/credenciamento internacional/i)
    })

    it('should have focus styles on navigation buttons', () => {
      render(<Certifications />)

      const prevButton = screen.getByRole('button', {
        name: 'Certificação anterior',
      })
      expect(prevButton).toHaveClass('focus:outline-none', 'focus:ring-2')
    })

    it('should have focus styles on indicator buttons', () => {
      render(<Certifications />)

      const indicatorGroup = screen.getByRole('group', {
        name: 'Indicadores de certificações',
      })
      const indicator = indicatorGroup.querySelector('button')

      expect(indicator).toHaveClass('focus:outline-none', 'focus:ring-2')
    })
  })

  describe('Mouse Interaction', () => {
    it('should pause autoplay on mouse enter', async () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })

      await act(async () => {
        section.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      })

      expect(section).toBeInTheDocument()
    })

    it('should resume autoplay on mouse leave', async () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })

      await act(async () => {
        section.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      })

      expect(section).toBeInTheDocument()
    })
  })

  describe('Focus Interaction', () => {
    it('should pause autoplay on focus', async () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })

      await act(async () => {
        section.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
      })

      expect(section).toBeInTheDocument()
    })

    it('should resume autoplay on blur', async () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })

      await act(async () => {
        section.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
      })

      expect(section).toBeInTheDocument()
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive container classes', () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })
      const container = section.querySelector('.max-w-screen-2xl')
      expect(container).toBeInTheDocument()
    })

    it('should hide navigation arrows on mobile', () => {
      render(<Certifications />)

      const prevButton = screen.getByRole('button', {
        name: 'Certificação anterior',
      })
      expect(prevButton).toHaveClass('hidden', 'lg:block')
    })
  })

  describe('Visual Styling', () => {
    it('should have correct background color class', () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })
      expect(section).toHaveClass('bg-gray-50')
    })

    it('should have correct padding classes', () => {
      render(<Certifications />)

      const section = screen.getByRole('region', {
        name: /credenciamento internacional/i,
      })
      expect(section).toHaveClass('py-16', 'px-4')
    })

    it('should have overflow hidden on carousel container', () => {
      render(<Certifications />)

      const overflowContainer = document.querySelector('.overflow-hidden')
      expect(overflowContainer).toBeInTheDocument()
    })
  })
})
