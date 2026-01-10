import { describe, expect, it, vi } from 'vitest'

import { testimonials } from '../../../../data/testimonialsData'
import { render, screen } from '../../../../test/test-utils'
import TestimonialSection from '../index'

vi.mock('../hooks/useTestimonialCarousel', () => ({
  useTestimonialCarousel: () => ({
    currentIndex: 0,
    totalSlides: testimonials.length,
    currentTestimonial: testimonials[0],
    isAutoPlaying: true,
    nextSlide: vi.fn(),
    previousSlide: vi.fn(),
    goToSlide: vi.fn(),
    pauseAutoPlay: vi.fn(),
    resumeAutoPlay: vi.fn(),
    buttonsRef: { current: [] },
    handleIndicatorKeyDown: vi.fn(),
    handleKeyDown: vi.fn(),
    touchHandlers: {},
  }),
}))

vi.mock('../../../seo/schemas', () => ({
  TestimonialsSchema: () => null,
}))

describe('TestimonialSection', () => {
  describe('Estrutura Semântica', () => {
    it('deve renderizar a seção com id correto', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('section#depoimentos')
      expect(section).toBeInTheDocument()
    })

    it('deve ter aria-labelledby apontando para o heading', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('section#depoimentos')
      expect(section).toHaveAttribute('aria-labelledby', 'depoimentos-heading')
    })

    it('deve ter aria-roledescription para carrossel', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('section#depoimentos')
      expect(section).toHaveAttribute(
        'aria-roledescription',
        'carrossel de depoimentos'
      )
    })

    it('deve ter data-section para navegação', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('[data-section="depoimentos"]')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Cabeçalho', () => {
    it('deve renderizar o título com nível h2', () => {
      render(<TestimonialSection />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveAttribute('id', 'depoimentos-heading')
    })

    it('deve conter o texto correto no título', () => {
      render(<TestimonialSection />)

      expect(screen.getByText(/o que dizem sobre/i)).toBeInTheDocument()
      expect(screen.getByText('nós')).toBeInTheDocument()
    })

    it('deve renderizar a descrição', () => {
      render(<TestimonialSection />)

      expect(
        screen.getByText(
          /reais de empresas e profissionais que se capacitaram conosco/i
        )
      ).toBeInTheDocument()
    })

    it('deve ter header com estrutura correta', () => {
      render(<TestimonialSection />)

      const header = document.querySelector('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('text-center')
    })
  })

  describe('Área do Carrossel', () => {
    it('deve renderizar região com role e aria-label', () => {
      render(<TestimonialSection />)

      const region = screen.getByRole('region', {
        name: /depoimento 1 de/i,
      })
      expect(region).toBeInTheDocument()
    })

    it('deve ter id dinâmico baseado no índice atual', () => {
      render(<TestimonialSection />)

      const region = document.querySelector('#testimonial-slide-0')
      expect(region).toBeInTheDocument()
    })
  })

  describe('Navegação', () => {
    it('deve renderizar botões de navegação anterior e próximo', () => {
      render(<TestimonialSection />)

      const prevButton = screen.getByRole('button', {
        name: /depoimento anterior/i,
      })
      const nextButton = screen.getByRole('button', {
        name: /próximo depoimento/i,
      })

      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe('Indicadores', () => {
    it('deve renderizar navegação de indicadores', () => {
      render(<TestimonialSection />)

      const nav = screen.getByRole('navigation', {
        name: 'Navegação dos depoimentos',
      })
      expect(nav).toBeInTheDocument()
    })

    it('deve renderizar tablist para indicadores', () => {
      render(<TestimonialSection />)

      const tablist = screen.getByRole('tablist', {
        name: 'Selecionar depoimento',
      })
      expect(tablist).toBeInTheDocument()
    })

    it('deve renderizar contador de slides', () => {
      render(<TestimonialSection />)

      expect(
        screen.getByText(`1 de ${testimonials.length}`)
      ).toBeInTheDocument()
    })

    it('deve ter indicadores com role tab', () => {
      render(<TestimonialSection />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    })

    it('deve marcar o indicador ativo com aria-selected', () => {
      render(<TestimonialSection />)

      const tabs = screen.getAllByRole('tab')
      const activeTab = tabs.find(
        tab => tab.getAttribute('aria-selected') === 'true'
      )
      expect(activeTab).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter aria-live no contador para anúncios', () => {
      render(<TestimonialSection />)

      const counter = screen.getByText(`1 de ${testimonials.length}`)
      expect(counter).toHaveAttribute('aria-live', 'polite')
      expect(counter).toHaveAttribute('aria-atomic', 'true')
    })

    it('deve ter ícones de navegação com aria-hidden', () => {
      render(<TestimonialSection />)

      const icons = document.querySelectorAll('svg[aria-hidden="true"]')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('deve ter indicadores com aria-controls apontando para slide', () => {
      render(<TestimonialSection />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute(
          'aria-controls',
          expect.stringMatching(/testimonial-slide-\d+/)
        )
      })
    })

    it('deve ter indicadores com aria-label descritivo', () => {
      render(<TestimonialSection />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute(
          'aria-label',
          expect.stringMatching(/ir para depoimento \d+/i)
        )
      })
    })
  })

  describe('Estilos', () => {
    it('deve ter classe de gradiente no background', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('section#depoimentos')
      expect(section?.className).toContain('bg-gradient-to-b')
    })

    it('deve ter padding responsivo', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('section#depoimentos')
      expect(section?.className).toContain('py-12')
      expect(section?.className).toContain('md:py-20')
    })

    it('deve ter altura mínima da viewport', () => {
      render(<TestimonialSection />)

      const section = document.querySelector('section#depoimentos')
      expect(section?.className).toContain('min-h-svh')
    })
  })

  describe('Card do Depoimento', () => {
    it('deve renderizar o card com article', () => {
      render(<TestimonialSection />)

      const articles = document.querySelectorAll('article')
      expect(articles.length).toBeGreaterThan(0)
    })

    it('deve exibir o depoimento atual', () => {
      render(<TestimonialSection />)

      if (testimonials[0].variant === 'full') {
        expect(
          screen.getByText(new RegExp(testimonials[0].testimonialText, 'i'))
        ).toBeInTheDocument()
      }
    })
  })

  describe('Conteúdo do Primeiro Depoimento', () => {
    it('deve exibir o nome do autor quando disponível', () => {
      render(<TestimonialSection />)

      if (testimonials[0].authorName) {
        expect(screen.getByText(testimonials[0].authorName)).toBeInTheDocument()
      }
    })

    it('deve exibir o cargo do autor quando disponível', () => {
      render(<TestimonialSection />)

      if (
        testimonials[0].variant === 'full' ||
        testimonials[0].variant === 'text-only'
      ) {
        expect(screen.getByText(testimonials[0].authorRole)).toBeInTheDocument()
      }
    })

    it('deve exibir tag do tipo de curso', () => {
      render(<TestimonialSection />)

      const expectedLabel =
        testimonials[0].courseType === 'tatico' ? 'Tático' : 'Remoto'
      expect(screen.getByText(expectedLabel)).toBeInTheDocument()
    })
  })
})
