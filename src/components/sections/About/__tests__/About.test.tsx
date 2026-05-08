import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import About from '../index'

const mockScrollTo = vi.fn()

vi.mock('../../../../hooks/useScrollTo', () => ({
  useScrollTo: vi.fn(() => ({
    scrollTo: mockScrollTo,
  })),
}))

vi.mock('../../../../assets/about/bg_about.avif', () => ({
  default: 'mocked-bg-about.avif',
}))

vi.mock('../../../../assets/about/bg_about.webp', () => ({
  default: 'mocked-bg-about.webp',
}))

vi.mock('../../../../assets/about/bg_about.jpg', () => ({
  default: 'mocked-bg-about.jpg',
}))

describe('About', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
  })

  describe('Rendering', () => {
    it(
      'should render section with correct semantic structure',
      { timeout: 15000 },
      () => {
        render(<About />)

        const section = screen.getByRole('region', { name: /juan regenerati/i })
        expect(section).toBeInTheDocument()
        expect(section).toHaveAttribute('id', 'sobre')
        expect(section).toHaveAttribute('data-section', 'sobre')
      }
    )

    it('should have correct aria-labelledby linking to heading', () => {
      render(<About />)

      const section = screen.getByRole('region', { name: /juan regenerati/i })
      expect(section).toHaveAttribute('aria-labelledby', 'sobre-heading')

      const heading = screen.getByRole('heading', { name: 'Juan Regenerati' })
      expect(heading).toHaveAttribute('id', 'sobre-heading')
    })

    it('should render instructor name as main heading', () => {
      render(<About />)

      const heading = screen.getByRole('heading', {
        name: 'Juan Regenerati',
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render subtitle', () => {
      render(<About />)

      expect(screen.getByText(/EMR INTERNATIONAL/)).toBeInTheDocument()
    })

    it('should render instructor title', () => {
      render(<About />)

      expect(
        screen.getByText(
          'Instrutor e operador de emergências, certificado internacionalmente'
        )
      ).toBeInTheDocument()
    })

    it('should render instructor highlight and description', () => {
      render(<About />)

      expect(
        screen.getByText(
          /paramédico com extensão em resgate técnico e em áreas remotas/i
        )
      ).toBeInTheDocument()
    })
  })

  describe('InstructorMedia', () => {
    it('should render instructor image with proper alt text', () => {
      render(<About />)

      const image = screen.getByAltText(
        'Juan Regenerati, paramédico e instrutor tático, fardado com equipamento de segurança em ambiente operacional'
      )
      expect(image).toBeInTheDocument()
    })

    it('should render image inside figure element', () => {
      render(<About />)

      const figure = screen.getByRole('figure')
      expect(figure).toBeInTheDocument()
    })

    it('should have figcaption with screen reader only text', () => {
      render(<About />)

      expect(
        screen.getByText(
          /fotografia profissional de juan regenerati, instrutor principal da emr international/i
        )
      ).toBeInTheDocument()
    })

    it('should render image with correct attributes for performance', () => {
      render(<About />)

      const image = screen.getByAltText(
        /juan regenerati, paramédico e instrutor tático/i
      )
      expect(image).toHaveAttribute('loading', 'eager')
      expect(image).toHaveAttribute('fetchPriority', 'high')
      expect(image).toHaveAttribute('decoding', 'async')
      expect(image).toHaveAttribute('width', '1920')
      expect(image).toHaveAttribute('height', '1280')
    })
  })

  describe('CredentialsList - Operational Forces', () => {
    it('should render operational forces section with heading', () => {
      render(<About />)

      const heading = screen.getByRole('heading', {
        name: 'Capacitação para Forças de Referência',
        level: 3,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render all operational forces items', () => {
      render(<About />)

      expect(screen.getByText('Corpo de Bombeiros Militar')).toBeInTheDocument()
      expect(screen.getByText('Exército Brasileiro')).toBeInTheDocument()
      expect(
        screen.getByText('Força Nacional de Segurança Pública')
      ).toBeInTheDocument()
    })

    it('should have accessible list with aria-label', () => {
      render(<About />)

      const list = screen.getByRole('list', {
        name: 'Lista de forças operacionais treinadas',
      })
      expect(list).toBeInTheDocument()
    })
  })

  describe('CredentialsList - International Credentials', () => {
    it('should render credentials section with heading', () => {
      render(<About />)

      const heading = screen.getByRole('heading', {
        name: 'Credenciais Internacionais',
        level: 3,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render credentials description', () => {
      render(<About />)

      expect(
        screen.getByText(
          /instrutor credenciado por instituições de referência mundial/i
        )
      ).toBeInTheDocument()
    })

    it('should render all international credentials items', () => {
      render(<About />)

      expect(
        screen.getByText('Health & Safety Institute (HSI)')
      ).toBeInTheDocument()
      expect(
        screen.getByText('American College of Surgeons')
      ).toBeInTheDocument()
      expect(screen.getByText('American Red Cross')).toBeInTheDocument()
    })

    it('should have accessible list with aria-label', () => {
      render(<About />)

      const list = screen.getByRole('list', {
        name: 'Lista de credenciais internacionais',
      })
      expect(list).toBeInTheDocument()
    })
  })

  describe('AboutMetrics', () => {
    it('should render metrics section with screen reader heading', () => {
      render(<About />)

      const headings = screen.getAllByText(
        'Estatísticas de experiência profissional'
      )
      expect(headings.length).toBe(2)
      headings.forEach(heading => {
        expect(heading).toHaveClass('sr-only')
      })
    })

    it('should render experience metric', () => {
      render(<About />)

      expect(screen.getAllByText('15+').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Anos de Experiência').length).toBeGreaterThan(
        0
      )
    })

    it('should render trained professionals metric', () => {
      render(<About />)

      expect(screen.getAllByText('6000+').length).toBeGreaterThan(0)
      expect(
        screen.getAllByText('Profissionais Treinados').length
      ).toBeGreaterThan(0)
    })

    it('should render metric cards with accessible aria-label', () => {
      render(<About />)

      const experienceMetric = screen.getAllByRole('region', {
        name: /mais de 15 anos de experiência/i,
      })
      expect(experienceMetric.length).toBeGreaterThan(0)

      const trainedMetric = screen.getAllByRole('region', {
        name: /mais de 6000 profissionais capacitados/i,
      })
      expect(trainedMetric.length).toBeGreaterThan(0)
    })

    it('should render courses button with accessible label', () => {
      render(<About />)

      const buttons = screen.getAllByRole('button', {
        name: /conheça os cursos de emergências médicas/i,
      })
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should scroll to courses section when button is clicked', async () => {
      const user = userEvent.setup()
      render(<About />)

      const buttons = screen.getAllByRole('button', {
        name: /conheça os cursos de emergências médicas/i,
      })
      await user.click(buttons[0])

      expect(mockScrollTo).toHaveBeenCalledWith('treinamentos')
    })

    it('should render BookOpen icon hidden from assistive technology', () => {
      render(<About />)

      const svgs = document.querySelectorAll(
        '[aria-label*="conheça nossos treinamentos"] svg, button svg'
      )
      svgs.forEach(svg => {
        if (svg.closest('button')) {
          expect(svg).toHaveAttribute('aria-hidden', 'true')
        }
      })
    })
  })

  describe('SEO Schema', () => {
    it('should render InstructorSchema JSON-LD', () => {
      render(<About />)

      const script = document.querySelector(
        'script[type="application/ld+json"]'
      )
      expect(script).toBeInTheDocument()

      const jsonContent = JSON.parse(script?.textContent || '{}')
      expect(jsonContent['@type']).toBe('Person')
      expect(jsonContent.name).toBe('Juan Regenerati')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<About />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toHaveTextContent('Juan Regenerati')

      const h3s = screen.getAllByRole('heading', { level: 3 })
      expect(h3s.length).toBeGreaterThanOrEqual(3)
    })

    it('should have all SVG icons hidden from assistive technology', () => {
      render(<About />)

      const section = screen.getByRole('region', { name: /juan regenerati/i })
      const svgs = section.querySelectorAll('svg')
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should render metrics in both mobile and desktop layouts', () => {
      render(<About />)

      const experienceMetrics = screen.getAllByText('15+')
      expect(experienceMetrics.length).toBe(2)

      const trainedMetrics = screen.getAllByText('6000+')
      expect(trainedMetrics.length).toBe(2)
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive classes for desktop layout', () => {
      render(<About />)

      const section = screen.getByRole('region', { name: /juan regenerati/i })
      const container = section.querySelector('.lg\\:flex-row')
      expect(container).toBeInTheDocument()
    })

    it('should hide desktop metrics container on mobile', () => {
      render(<About />)

      const section = screen.getByRole('region', { name: /juan regenerati/i })
      const desktopMetrics = section.querySelector('.hidden.lg\\:block')
      expect(desktopMetrics).toBeInTheDocument()
    })

    it('should hide mobile metrics container on desktop', () => {
      render(<About />)

      const section = screen.getByRole('region', { name: /juan regenerati/i })
      const mobileMetrics = section.querySelector('.block.lg\\:hidden')
      expect(mobileMetrics).toBeInTheDocument()
    })
  })
})
