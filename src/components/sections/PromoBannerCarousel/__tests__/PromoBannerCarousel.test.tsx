import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import { PromoBannerCarousel } from '../PromoBannerCarousel'

const mockAnnounce = vi.fn()
let mockPrefersReducedMotion = false

vi.mock('../../../../hooks/useAccessibility', () => ({
  useAccessibilityPreferences: vi.fn(() => ({
    prefersReducedMotion: mockPrefersReducedMotion,
  })),
  useScreenReaderAnnouncement: vi.fn(() => ({
    announce: mockAnnounce,
  })),
  useUniqueId: vi.fn((prefix: string) => `${prefix}-test-id`),
}))

vi.mock('../../../../hooks/useBannerPauseState', () => ({
  useBannerPauseState: vi.fn(
    (prefersReducedMotion: boolean, announce: () => void) => {
      const isPaused = prefersReducedMotion
      return {
        isPaused,
        handleTogglePause: () => {
          announce()
        },
        handleMouseEnter: vi.fn(),
        handleMouseLeave: vi.fn(),
      }
    }
  ),
}))

describe('PromoBannerCarousel', () => {
  beforeEach(() => {
    mockAnnounce.mockClear()
    mockPrefersReducedMotion = false
  })

  describe('Rendering', () => {
    it('should render section with correct semantic structure', () => {
      render(<PromoBannerCarousel />)

      const section = screen.getByRole('region', {
        name: 'Banner promocional da EMR Internacional',
      })
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'promo-banner-test-id')
    })

    it('should render with default text', () => {
      render(<PromoBannerCarousel />)

      expect(
        screen.getByText('Promoção atual: INSCRIÇÕES ABERTAS')
      ).toBeInTheDocument()
    })

    it('should render with custom text', () => {
      render(<PromoBannerCarousel text='DESCONTO ESPECIAL' />)

      expect(
        screen.getByText('Promoção atual: DESCONTO ESPECIAL')
      ).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<PromoBannerCarousel className='custom-class' />)

      const section = screen.getByRole('region', {
        name: 'Banner promocional da EMR Internacional',
      })
      expect(section).toHaveClass('custom-class')
    })
  })

  describe('CarouselContent', () => {
    it('should render multiple carousel items', () => {
      render(<PromoBannerCarousel text='TESTE' />)

      const items = screen.getAllByText('TESTE')
      expect(items.length).toBeGreaterThan(1)
    })

    it('should render carousel content with aria-hidden', () => {
      render(<PromoBannerCarousel />)

      const carouselContent = document.querySelector('[aria-hidden="true"]')
      expect(carouselContent).toBeInTheDocument()
    })
  })

  describe('FadeOverlay', () => {
    it('should render left and right fade overlays', () => {
      render(<PromoBannerCarousel />)

      const section = screen.getByRole('region', {
        name: 'Banner promocional da EMR Internacional',
      })
      const leftOverlay = section.querySelector('.left-0')
      const rightOverlay = section.querySelector('.right-0')

      expect(leftOverlay).toBeInTheDocument()
      expect(rightOverlay).toBeInTheDocument()
    })

    it('should have overlays with aria-hidden', () => {
      render(<PromoBannerCarousel />)

      const section = screen.getByRole('region', {
        name: 'Banner promocional da EMR Internacional',
      })
      const overlays = section.querySelectorAll(
        '.pointer-events-none[aria-hidden="true"]'
      )
      expect(overlays.length).toBe(2)
    })
  })

  describe('BannerControls', () => {
    it('should render pause button when not paused', () => {
      render(<PromoBannerCarousel />)

      const pauseButton = screen.getByRole('button', {
        name: 'Pausar animação do banner',
      })
      expect(pauseButton).toBeInTheDocument()
    })

    it('should call announce when toggle button is clicked', async () => {
      const user = userEvent.setup()
      render(<PromoBannerCarousel />)

      const pauseButton = screen.getByRole('button', {
        name: 'Pausar animação do banner',
      })
      await user.click(pauseButton)

      expect(mockAnnounce).toHaveBeenCalled()
    })

    it('should have aria-describedby referencing status', () => {
      render(<PromoBannerCarousel />)

      const pauseButton = screen.getByRole('button', {
        name: 'Pausar animação do banner',
      })
      expect(pauseButton).toHaveAttribute(
        'aria-describedby',
        'promo-banner-test-id-status'
      )
    })
  })

  describe('Accessibility', () => {
    it('should render screen reader only status', () => {
      render(<PromoBannerCarousel />)

      const status = document.getElementById('promo-banner-test-id-status')
      expect(status).toBeInTheDocument()
      expect(status).toHaveAttribute('aria-live', 'polite')
    })

    it('should render screen reader only promotional text', () => {
      render(<PromoBannerCarousel text='PROMOÇÃO' />)

      expect(screen.getByText('Promoção atual: PROMOÇÃO')).toBeInTheDocument()
    })

    it('should show status as "Banner em movimento" when not paused', () => {
      render(<PromoBannerCarousel />)

      const status = document.getElementById('promo-banner-test-id-status')
      expect(status).toHaveTextContent('Banner em movimento')
    })
  })

  describe('Reduced Motion', () => {
    beforeEach(() => {
      mockPrefersReducedMotion = true
    })

    it('should not render controls when prefers reduced motion', () => {
      render(<PromoBannerCarousel />)

      const pauseButton = screen.queryByRole('button', {
        name: /pausar|retomar/i,
      })
      expect(pauseButton).not.toBeInTheDocument()
    })

    it('should show status as "Banner pausado" when paused', () => {
      render(<PromoBannerCarousel />)

      const status = document.getElementById('promo-banner-test-id-status')
      expect(status).toHaveTextContent('Banner pausado')
    })
  })

  describe('Animation Styles', () => {
    it('should apply animation duration based on speed prop', () => {
      render(<PromoBannerCarousel speed={20} />)

      const animatedContent = document.querySelector('.animate-scroll')
      expect(animatedContent).toHaveStyle({ animationDuration: '20s' })
    })

    it('should apply default animation duration of 15s', () => {
      render(<PromoBannerCarousel />)

      const animatedContent = document.querySelector('.animate-scroll')
      expect(animatedContent).toHaveStyle({ animationDuration: '15s' })
    })
  })

  describe('CarouselItem', () => {
    it('should render text with uppercase styling', () => {
      render(<PromoBannerCarousel text='test text' />)

      const items = screen.getAllByText('test text')
      items.forEach(item => {
        expect(item).toHaveClass('uppercase')
      })
    })

    it('should render separator bullets', () => {
      render(<PromoBannerCarousel />)

      const bullets = screen.getAllByText('•')
      expect(bullets.length).toBeGreaterThan(0)
      bullets.forEach(bullet => {
        expect(bullet).toHaveAttribute('role', 'presentation')
      })
    })
  })

  describe('Mouse Interaction', () => {
    it('should have mouse event handlers on section', () => {
      render(<PromoBannerCarousel />)

      const section = screen.getByRole('region', {
        name: 'Banner promocional da EMR Internacional',
      })
      expect(section).toBeInTheDocument()
    })
  })
})
