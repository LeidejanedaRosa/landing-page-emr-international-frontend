import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import { CourseCard } from '../components'
import { mockEmergencyCourse, mockWildernessCourse } from './fixtures'

vi.mock('../../../../hooks/useAccessibility', () => {
  let counter = 0
  return {
    useUniqueId: vi.fn((prefix: string) => `${prefix}-${++counter}`),
  }
})

vi.mock('../../../../data/coursesData', async importOriginal => {
  const actual =
    await importOriginal<typeof import('../../../../data/coursesData')>()
  return { ...actual }
})

vi.mock('../../../../utils/whatsapp', () => ({
  buildWhatsAppMessageUrl: vi.fn(
    (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`
  ),
}))

describe('CourseCard', () => {
  describe('Rendering', () => {
    it('should render article element with aria-labelledby', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const article = screen.getByRole('article')
      expect(article).toBeInTheDocument()
      expect(article).toHaveAttribute('aria-labelledby')
    })

    it('should render course abbreviation in header badge', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const tmrTexts = screen.getAllByText('TMR')
      expect(tmrTexts.length).toBeGreaterThanOrEqual(1)
    })

    it('should render course title in h3 heading', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('TMR')
      expect(heading).toHaveTextContent('Operador de Emergência Tática')
    })

    it('should render course image with alt text', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const image = screen.getByAltText('Imagem do curso TMR para testes')
      expect(image).toBeInTheDocument()
    })

    it('should render course location', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      expect(screen.getByText('In-Company ou Sede EMR')).toBeInTheDocument()
    })

    it('should render certification info', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      expect(
        screen.getByText('Certificação Internacional TMR')
      ).toBeInTheDocument()
    })
  })

  describe('CourseImage', () => {
    it('should render picture element with multiple sources', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const picture = document.querySelector('picture')
      expect(picture).toBeInTheDocument()
      const avifSource = picture?.querySelector('source[type="image/avif"]')
      const webpSource = picture?.querySelector('source[type="image/webp"]')
      expect(avifSource).toBeInTheDocument()
      expect(webpSource).toBeInTheDocument()
    })

    it('should have lazy loading on image', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const image = screen.getByAltText('Imagem do curso TMR para testes')
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('decoding', 'async')
    })

    it('should have width and height attributes for performance', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const image = screen.getByAltText('Imagem do curso TMR para testes')
      expect(image).toHaveAttribute('width', '800')
      expect(image).toHaveAttribute('height', '600')
    })
  })

  describe('CourseStatusBadge', () => {
    it('should render "Inscrições Abertas" badge when status is open', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('Inscrições Abertas')
    })

    it('should render "Avise-me" badge when status is interest', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
      await user.click(intermediateTab)
      const badge = screen.getByRole('status')
      expect(badge).toHaveTextContent('Avise-me')
    })

    it('should have aria-live polite on status badge', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('LevelIndicators', () => {
    it('should render immersivity meter', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const meter = screen.getByRole('meter', {
        name: /imersividade: 3 de 10/i,
      })
      expect(meter).toBeInTheDocument()
      expect(meter).toHaveAttribute('aria-valuenow', '3')
      expect(meter).toHaveAttribute('aria-valuemin', '0')
      expect(meter).toHaveAttribute('aria-valuemax', '10')
    })

    it('should render difficulty meter', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const meter = screen.getByRole('meter', {
        name: /dificuldade: 4 de 10/i,
      })
      expect(meter).toBeInTheDocument()
      expect(meter).toHaveAttribute('aria-valuenow', '4')
    })

    it('should render skill meter', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const meter = screen.getByRole('meter', { name: /habilidade: 5 de 10/i })
      expect(meter).toBeInTheDocument()
      expect(meter).toHaveAttribute('aria-valuenow', '5')
    })

    it('should update indicators when changing level', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const advancedTab = screen.getByRole('tab', { name: 'Avançado' })
      await user.click(advancedTab)
      const immersivityMeter = screen.getByRole('meter', {
        name: /imersividade: 9 de 10/i,
      })
      expect(immersivityMeter).toHaveAttribute('aria-valuenow', '9')
    })

    it('should display numeric values alongside meters', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      expect(screen.getByText('3/10')).toBeInTheDocument()
      expect(screen.getByText('4/10')).toBeInTheDocument()
      expect(screen.getByText('5/10')).toBeInTheDocument()
    })
  })

  describe('Variant Styling', () => {
    it('should apply emergency variant styles', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const article = screen.getByRole('article')
      expect(article).toHaveClass('hover:border-cta-500')
    })

    it('should apply wilderness variant styles', () => {
      render(<CourseCard course={mockWildernessCourse} />)
      const article = screen.getByRole('article')
      expect(article).toHaveClass('hover:border-warning-400')
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria linking between tabs and panels', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const basicTab = screen.getByRole('tab', { name: 'Básico' })
      const tabpanel = screen.getByRole('tabpanel')
      const tabControls = basicTab.getAttribute('aria-controls')
      const panelId = tabpanel.getAttribute('id')
      const tabId = basicTab.getAttribute('id')
      const panelLabelledBy = tabpanel.getAttribute('aria-labelledby')
      expect(tabControls).toBe(panelId)
      expect(panelLabelledBy).toBe(tabId)
    })

    it('should have all decorative icons with aria-hidden', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const article = screen.getByRole('article')
      const svgs = article.querySelectorAll('svg')
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should have focus styles on interactive elements', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab).toHaveClass('focus:outline-none', 'focus:ring-2')
      })
    })
  })
})
