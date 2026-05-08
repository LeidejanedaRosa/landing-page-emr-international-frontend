import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import Courses from '../index'

vi.mock('../../../../data/coursesData', () => ({
  getCourses: vi.fn(() => [
    {
      id: 'tmr',
      abbreviation: 'TMR',
      title: 'Tactical Medical Responder - Operador de Emergência Tática',
      levels: [
        {
          level: 'basic',
          code: 'TMR:1',
          name: 'First Response',
          namePt: 'Primeira Resposta',
          duration: '20 horas',
          immersivity: 3,
          difficulty: 4,
          skill: 5,
          description: 'Descrição do nível básico para testes.',
          enrollmentStatus: 'open',
        },
        {
          level: 'intermediate',
          code: 'TMR:2',
          name: 'Tactical Response',
          namePt: 'Resposta Tática',
          duration: '40 horas',
          immersivity: 5,
          difficulty: 7,
          skill: 7,
          description: 'Descrição do nível intermediário para testes.',
          enrollmentStatus: 'interest',
        },
      ],
      metadata: {
        certification: 'Certificação Internacional TMR',
        location: 'In-Company ou Sede EMR',
      },
      links: {
        details: '/treinamentos/tmr',
        brochure: '/tmr.pdf',
      },
      images: {
        avif: 'tmr.avif',
        webp: 'tmr.webp',
        jpg: 'tmr.jpg',
        alt: 'Descrição da imagem TMR para testes',
      },
      variant: 'emergency',
    },
    {
      id: 'wmr',
      abbreviation: 'WMR',
      title:
        'Wilderness Medical Responder - Operador de Emergências em Áreas Remotas',
      levels: [
        {
          level: 'basic',
          code: 'WEC:1',
          name: 'First Aid',
          namePt: 'Primeiros Socorros',
          duration: '20 horas',
          immersivity: 3,
          difficulty: 4,
          skill: 5,
          description: 'Descrição do nível básico WMR para testes.',
          enrollmentStatus: 'open',
        },
      ],
      metadata: {
        certification: 'Certificação Internacional Wilderness',
        location: 'In-Company ou Sede EMR',
      },
      links: {
        details: '/treinamentos/wmr',
        brochure: '/wmr.pdf',
      },
      images: {
        avif: 'wmr.avif',
        webp: 'wmr.webp',
        jpg: 'wmr.jpg',
        alt: 'Descrição da imagem WMR para testes',
      },
      variant: 'wilderness',
    },
  ]),
  LEVEL_LABELS: {
    basic: 'Básico',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  },
}))

vi.mock('../../../../hooks/useAccessibility', () => {
  let counter = 0
  return {
    useUniqueId: vi.fn((prefix: string) => `${prefix}-${++counter}`),
  }
})

vi.mock('../../../../utils/whatsapp', () => ({
  buildWhatsAppMessageUrl: vi.fn(
    (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`
  ),
}))

describe('Courses', () => {
  describe('Rendering', () => {
    it('should render section with correct semantic structure', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'treinamentos')
      expect(section).toHaveAttribute('data-section', 'treinamentos')
    })

    it('should have correct aria-labelledby and aria-describedby', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      expect(section).toHaveAttribute('aria-labelledby')
      expect(section).toHaveAttribute('aria-describedby')
    })

    it('should render main heading with correct text', () => {
      render(<Courses />)

      const heading = screen.getByRole('heading', {
        name: /treinamentos de aph tático/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render section subtitle', () => {
      render(<Courses />)

      expect(
        screen.getByText(
          'Formação de Operadores de Emergência Tática e de Áreas Remotas'
        )
      ).toBeInTheDocument()
    })

    it('should render description paragraph', () => {
      render(<Courses />)

      expect(
        screen.getByText(
          /capacitação profissional de excelência em resgate e emergências/i
        )
      ).toBeInTheDocument()
    })

    it('should render English term with lang attribute', () => {
      render(<Courses />)

      const heading = screen.getByRole('heading', { level: 2 })
      const englishTerm = heading.querySelector('span[lang="en"]')
      expect(englishTerm).toBeInTheDocument()
      expect(englishTerm).toHaveTextContent('Wilderness Medicine')
    })
  })

  describe('Courses List', () => {
    it('should render courses list with accessible label', () => {
      render(<Courses />)

      const list = screen.getByRole('list', {
        name: 'Lista de cursos de especialização disponíveis',
      })
      expect(list).toBeInTheDocument()
    })

    it('should render list items for each course', () => {
      render(<Courses />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(2)
    })

    it('should render course cards as articles', () => {
      render(<Courses />)

      const articles = screen.getAllByRole('article')
      expect(articles).toHaveLength(2)
    })

    it('should render TMR course card', () => {
      render(<Courses />)

      const tmrTexts = screen.getAllByText('TMR')
      expect(tmrTexts.length).toBeGreaterThanOrEqual(1)
      expect(
        screen.getByText(/operador de emergência tática/i)
      ).toBeInTheDocument()
    })

    it('should render WMR course card', () => {
      render(<Courses />)

      const wmrTexts = screen.getAllByText('WMR')
      expect(wmrTexts.length).toBeGreaterThanOrEqual(1)
      expect(
        screen.getByText(/operador de emergências em áreas remotas/i)
      ).toBeInTheDocument()
    })
  })

  describe('Course Card Structure', () => {
    it('should render course images with alt text', () => {
      render(<Courses />)

      expect(
        screen.getByAltText('Descrição da imagem TMR para testes')
      ).toBeInTheDocument()
      expect(
        screen.getByAltText('Descrição da imagem WMR para testes')
      ).toBeInTheDocument()
    })

    it('should render course abbreviation badge', () => {
      render(<Courses />)

      const tmrBadges = screen.getAllByText('TMR')
      const wmrBadges = screen.getAllByText('WMR')

      expect(tmrBadges.length).toBeGreaterThanOrEqual(1)
      expect(wmrBadges.length).toBeGreaterThanOrEqual(1)
    })

    it('should render h3 headings for each course', () => {
      render(<Courses />)

      const h3s = screen.getAllByRole('heading', { level: 3 })
      expect(h3s).toHaveLength(2)
    })
  })

  describe('Header Component', () => {
    it('should render header element', () => {
      render(<Courses />)

      const headers = document.querySelectorAll('header.text-center')
      expect(headers.length).toBeGreaterThan(0)
    })

    it('should have proper text styling classes', () => {
      render(<Courses />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-white')
    })
  })

  describe('Background and Layout', () => {
    it('should have decorative background with aria-hidden', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      const decorativeBg = section.querySelector('[aria-hidden="true"]')
      expect(decorativeBg).toBeInTheDocument()
    })

    it('should have responsive grid for course cards', () => {
      render(<Courses />)

      const list = screen.getByRole('list', {
        name: 'Lista de cursos de especialização disponíveis',
      })
      expect(list).toHaveClass('grid', 'md:grid-cols-2')
    })
  })

  describe('SEO Schema', () => {
    it('should render CourseListSchema JSON-LD', () => {
      render(<Courses />)

      const script = document.querySelector(
        'script[type="application/ld+json"]'
      )
      expect(script).toBeInTheDocument()

      const jsonContent = JSON.parse(script?.textContent || '{}')
      expect(jsonContent['@type']).toBe('ItemList')
      expect(jsonContent.name).toBe(
        'Cursos de Especialização EMR International'
      )
    })

    it('should include course items in schema', () => {
      render(<Courses />)

      const script = document.querySelector(
        'script[type="application/ld+json"]'
      )
      const jsonContent = JSON.parse(script?.textContent || '{}')

      expect(jsonContent.itemListElement).toBeDefined()
      expect(jsonContent.itemListElement.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Courses />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()

      const h3s = screen.getAllByRole('heading', { level: 3 })
      expect(h3s.length).toBeGreaterThanOrEqual(2)
    })

    it('should have all SVG icons hidden from assistive technology', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      const svgs = section.querySelectorAll('svg')
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should have article elements with aria-labelledby', () => {
      render(<Courses />)

      const articles = screen.getAllByRole('article')
      articles.forEach(article => {
        expect(article).toHaveAttribute('aria-labelledby')
      })
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive padding classes on section', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })

    it('should have max-width container', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      const container = section.querySelector('.max-w-screen-2xl')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Visual Styling', () => {
    it('should have correct background color class', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      expect(section).toHaveClass('bg-primary-900')
    })

    it('should have correct text color class', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      expect(section).toHaveClass('text-white')
    })

    it('should have overflow hidden class', () => {
      render(<Courses />)

      const section = screen.getByRole('region', {
        name: /treinamentos de aph tático/i,
      })
      expect(section).toHaveClass('overflow-hidden')
    })
  })
})
