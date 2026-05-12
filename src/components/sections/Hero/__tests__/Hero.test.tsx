import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import Hero from '../index'

const mockScrollTo = vi.fn()

vi.mock('../../../../hooks/useScrollTo', () => ({
  useScrollTo: vi.fn(() => ({
    scrollTo: mockScrollTo,
  })),
}))

vi.mock('../../../../assets/hero/bg_hero_section.avif', () => ({
  default: 'mocked-hero.avif',
}))

vi.mock('../../../../assets/hero/bg_hero_section.webp', () => ({
  default: 'mocked-hero.webp',
}))

vi.mock('../../../../assets/hero/bg_hero_section.jpg', () => ({
  default: 'mocked-hero.jpg',
}))

describe('Hero', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
  })

  describe('Rendering', () => {
    it('should render section with correct semantic structure', () => {
      render(<Hero />)

      const section = screen.getByRole('region', { name: /o imprevisível/i })
      expect(section).toBeInTheDocument()
    })

    it('should have correct aria-labelledby linking to heading', () => {
      render(<Hero />)

      const section = screen.getByRole('region', { name: /o imprevisível/i })
      expect(section).toHaveAttribute('aria-labelledby', 'hero-main-title')

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', 'hero-main-title')
    })

    it('should render main heading with headline content', () => {
      render(<Hero />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(/o imprevisível/i)
      expect(heading).toHaveTextContent(/acontece/i)
    })
  })

  describe('TrustBadge', () => {
    it('should render trust badge with certification label', () => {
      render(<Hero />)

      expect(screen.getByText('Certificação Internacional')).toBeInTheDocument()
    })

    it('should have correct accessibility attributes', () => {
      render(<Hero />)

      const badge = screen.getByRole('status', {
        name: /selo de certificação internacional/i,
      })
      expect(badge).toBeInTheDocument()
    })
  })

  describe('HeroHeadline', () => {
    it('should render all headline lines', () => {
      render(<Hero />)

      expect(screen.getByText('O Imprevisível')).toBeInTheDocument()
      expect(screen.getByText(/acontece/i)).toBeInTheDocument()
      expect(screen.getByText(/você está/i)).toBeInTheDocument()
      expect(screen.getByText(/realmente preparado/i)).toBeInTheDocument()
    })

    it('should have highlighted text with gradient styling', () => {
      render(<Hero />)

      const highlightedText = screen.getByText(/acontece/i)
      expect(highlightedText).toHaveClass('text-transparent', 'bg-clip-text')
    })
  })

  describe('HeroCTA', () => {
    it('should render CTA button with correct text', () => {
      render(<Hero />)

      const button = screen.getByRole('button', {
        name: /conheça nossos treinamentos/i,
      })
      expect(button).toBeInTheDocument()
      expect(
        screen.getByText('CONHEÇA NOSSOS TREINAMENTOS')
      ).toBeInTheDocument()
    })

    it('should scroll to courses section when CTA is clicked', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const button = screen.getByRole('button', {
        name: /conheça nossos treinamentos/i,
      })
      await user.click(button)

      expect(mockScrollTo).toHaveBeenCalledWith('treinamentos')
    })

    it('should render arrow icon hidden from assistive technology', () => {
      render(<Hero />)

      const button = screen.getByRole('button', {
        name: /conheça nossos treinamentos/i,
      })
      const svg = button.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('HeroVisual', () => {
    it('should render hero image with proper alt text', () => {
      render(<Hero />)

      const image = screen.getByAltText(
        'Operadores táticos em treinamento real de atendimento pré-hospitalar'
      )
      expect(image).toBeInTheDocument()
    })

    it('should render image with correct performance attributes', () => {
      render(<Hero />)

      const image = screen.getByAltText(/operadores táticos/i)
      expect(image).toHaveAttribute('loading', 'eager')
      expect(image).toHaveAttribute('fetchPriority', 'high')
      expect(image).toHaveAttribute('decoding', 'async')
    })

    it('should render training badge', () => {
      render(<Hero />)

      expect(screen.getByText('Simulação realística')).toBeInTheDocument()
    })

    it('should have training badge with accessible status role', () => {
      render(<Hero />)

      const badge = screen.getByRole('status', {
        name: /indicador de treinamento em ambiente real/i,
      })
      expect(badge).toBeInTheDocument()
    })

    it('should render visual aside with correct aria-label', () => {
      render(<Hero />)

      const aside = screen.getByRole('complementary', {
        name: /imagem ilustrativa de treinamento tático/i,
      })
      expect(aside).toBeInTheDocument()
    })
  })

  describe('SocialProof', () => {
    it('should render students count', () => {
      render(<Hero />)

      expect(
        screen.getByText('+ 6.000 Operadores formados')
      ).toBeInTheDocument()
    })

    it('should render methodology indicator', () => {
      render(<Hero />)

      expect(screen.getByText('Metodologia Internacional')).toBeInTheDocument()
    })

    it('should have accessible group role', () => {
      render(<Hero />)

      const group = screen.getByRole('group', {
        name: /indicadores de confiança/i,
      })
      expect(group).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy with h1', () => {
      render(<Hero />)

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
    })

    it('should have all decorative elements hidden from assistive technology', () => {
      render(<Hero />)

      const section = screen.getByRole('region', { name: /o imprevisível/i })
      const decorativeElements = section.querySelectorAll(
        '[aria-hidden="true"]'
      )
      expect(decorativeElements.length).toBeGreaterThan(0)
    })

    it('should have SVG icons hidden from assistive technology', () => {
      render(<Hero />)

      const section = screen.getByRole('region', { name: /o imprevisível/i })
      const svgs = section.querySelectorAll('svg')
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Image Formats', () => {
    it('should render picture element with multiple source formats', () => {
      render(<Hero />)

      const picture = document.querySelector('picture')
      expect(picture).toBeInTheDocument()

      const sources = picture?.querySelectorAll('source')
      expect(sources?.length).toBeGreaterThanOrEqual(2)
    })

    it('should have AVIF source with correct type', () => {
      render(<Hero />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).toBeInTheDocument()
    })

    it('should have WebP source with correct type', () => {
      render(<Hero />)

      const webpSource = document.querySelector('source[type="image/webp"]')
      expect(webpSource).toBeInTheDocument()
    })

    it('should have JPG fallback in img element', () => {
      render(<Hero />)

      const image = screen.getByAltText(/operadores táticos/i)
      expect(image.tagName).toBe('IMG')
      expect(image).toHaveAttribute('src', 'mocked-hero.jpg')
    })
  })

  describe('Layout', () => {
    it('should have responsive grid classes', () => {
      render(<Hero />)

      const section = screen.getByRole('region', { name: /o imprevisível/i })
      const gridContainer = section.querySelector('.md\\:grid')
      expect(gridContainer).toBeInTheDocument()
    })

    it('should have landscape mobile classes for visual', () => {
      render(<Hero />)

      const aside = screen.getByRole('complementary', {
        name: /imagem ilustrativa/i,
      })
      expect(aside).toHaveClass('landscape-mobile:w-1/2')
    })
  })
})
