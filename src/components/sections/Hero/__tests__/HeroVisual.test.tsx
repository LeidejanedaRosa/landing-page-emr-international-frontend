import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { HeroVisual } from '../components/HeroVisual'
import { HERO_CONTENT } from '../constants'

const mockImages = {
  avif: 'test-image.avif',
  webp: 'test-image.webp',
  jpg: 'test-image.jpg',
}

describe('HeroVisual', () => {
  describe('Rendering', () => {
    it('should render image with default alt text', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByAltText(HERO_CONTENT.visual.alt)
      expect(image).toBeInTheDocument()
    })

    it('should render image with custom alt text', () => {
      render(<HeroVisual images={mockImages} alt='Custom alt text' />)

      const image = screen.getByAltText('Custom alt text')
      expect(image).toBeInTheDocument()
    })

    it('should render training badge', () => {
      render(<HeroVisual images={mockImages} />)

      expect(
        screen.getByText(HERO_CONTENT.visual.badge.label)
      ).toBeInTheDocument()
    })

    it('should render pulsing indicator dot', () => {
      render(<HeroVisual images={mockImages} />)

      const container = document.querySelector('.animate-pulse')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Image Formats', () => {
    it('should render picture element', () => {
      render(<HeroVisual images={mockImages} />)

      const picture = document.querySelector('picture')
      expect(picture).toBeInTheDocument()
    })

    it('should render AVIF source when provided', () => {
      render(<HeroVisual images={mockImages} />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).toBeInTheDocument()
      expect(avifSource).toHaveAttribute('srcSet', mockImages.avif)
    })

    it('should render WebP source when provided', () => {
      render(<HeroVisual images={mockImages} />)

      const webpSource = document.querySelector('source[type="image/webp"]')
      expect(webpSource).toBeInTheDocument()
      expect(webpSource).toHaveAttribute('srcSet', mockImages.webp)
    })

    it('should render JPG fallback in img element', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', mockImages.jpg)
    })

    it('should not render AVIF source when not provided', () => {
      render(<HeroVisual images={{ jpg: 'test.jpg' }} />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).not.toBeInTheDocument()
    })

    it('should not render WebP source when not provided', () => {
      render(<HeroVisual images={{ jpg: 'test.jpg' }} />)

      const webpSource = document.querySelector('source[type="image/webp"]')
      expect(webpSource).not.toBeInTheDocument()
    })

    it('should have responsive sizes attribute on sources', () => {
      render(<HeroVisual images={mockImages} />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).toHaveAttribute(
        'sizes',
        '(max-width: 768px) 100vw, 50vw'
      )
    })
  })

  describe('Image Performance', () => {
    it('should have eager loading for LCP optimization', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('loading', 'eager')
    })

    it('should have high fetch priority', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('fetchPriority', 'high')
    })

    it('should have async decoding', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('decoding', 'async')
    })

    it('should have explicit width and height for CLS prevention', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '1600')
      expect(image).toHaveAttribute('height', '1067')
    })
  })

  describe('Accessibility', () => {
    it('should have badge with status role', () => {
      render(<HeroVisual images={mockImages} />)

      const badge = screen.getByRole('status', {
        name: HERO_CONTENT.visual.badge.ariaLabel,
      })
      expect(badge).toBeInTheDocument()
    })

    it('should have gradient overlay hidden from assistive technology', () => {
      render(<HeroVisual images={mockImages} />)

      const overlays = document.querySelectorAll('[aria-hidden="true"]')
      expect(overlays.length).toBeGreaterThan(0)
    })

    it('should have pulsing dot hidden from assistive technology', () => {
      render(<HeroVisual images={mockImages} />)

      const pulsingDot = document.querySelector('.animate-pulse')
      expect(pulsingDot).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Styling', () => {
    it('should apply custom className when provided', () => {
      render(<HeroVisual images={mockImages} className='custom-class' />)

      const container = document.querySelector('.custom-class')
      expect(container).toBeInTheDocument()
    })

    it('should have hover scale transition on image', () => {
      render(<HeroVisual images={mockImages} />)

      const image = screen.getByRole('img')
      expect(image).toHaveClass('transition-transform', 'duration-700')
    })

    it('should have overflow hidden on container', () => {
      render(<HeroVisual images={mockImages} />)

      const container = document.querySelector('.overflow-hidden')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Memoization', () => {
    it('should have displayName set', () => {
      expect(HeroVisual.displayName).toBe('HeroVisual')
    })
  })
})
