import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '../../../../../test/test-utils'
import { TestimonialNavigation } from '../TestimonialNavigation'

describe('TestimonialNavigation', () => {
  const defaultProps = {
    onPrev: vi.fn(),
    onNext: vi.fn(),
    currentIndex: 0,
    totalSlides: 5,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderização', () => {
    it('deve renderizar botão de anterior', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const prevButton = screen.getByRole('button', {
        name: /depoimento anterior/i,
      })
      expect(prevButton).toBeInTheDocument()
    })

    it('deve renderizar botão de próximo', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const nextButton = screen.getByRole('button', {
        name: /próximo depoimento/i,
      })
      expect(nextButton).toBeInTheDocument()
    })

    it('deve renderizar ícones ChevronLeft e ChevronRight', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const icons = document.querySelectorAll('svg')
      expect(icons).toHaveLength(2)
    })
  })

  describe('Interação', () => {
    it('deve chamar onPrev ao clicar no botão anterior', () => {
      const onPrev = vi.fn()
      render(<TestimonialNavigation {...defaultProps} onPrev={onPrev} />)

      const prevButton = screen.getByRole('button', {
        name: /depoimento anterior/i,
      })
      fireEvent.click(prevButton)

      expect(onPrev).toHaveBeenCalledTimes(1)
    })

    it('deve chamar onNext ao clicar no botão próximo', () => {
      const onNext = vi.fn()
      render(<TestimonialNavigation {...defaultProps} onNext={onNext} />)

      const nextButton = screen.getByRole('button', {
        name: /próximo depoimento/i,
      })
      fireEvent.click(nextButton)

      expect(onNext).toHaveBeenCalledTimes(1)
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter type button em ambos os botões', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button')
      })
    })

    it('deve ter aria-label descritivo no botão anterior', () => {
      render(<TestimonialNavigation {...defaultProps} currentIndex={2} />)

      const prevButton = screen.getByRole('button', {
        name: /depoimento anterior \(2 de 5\)/i,
      })
      expect(prevButton).toBeInTheDocument()
    })

    it('deve ter aria-label descritivo no botão próximo', () => {
      render(<TestimonialNavigation {...defaultProps} currentIndex={2} />)

      const nextButton = screen.getByRole('button', {
        name: /próximo depoimento \(4 de 5\)/i,
      })
      expect(nextButton).toBeInTheDocument()
    })

    it('deve indicar totalSlides quando no primeiro slide', () => {
      render(<TestimonialNavigation {...defaultProps} currentIndex={0} />)

      const prevButton = screen.getByRole('button', {
        name: /depoimento anterior \(5 de 5\)/i,
      })
      expect(prevButton).toBeInTheDocument()
    })

    it('deve indicar 1 quando no último slide para próximo', () => {
      render(<TestimonialNavigation {...defaultProps} currentIndex={4} />)

      const nextButton = screen.getByRole('button', {
        name: /próximo depoimento \(1 de 5\)/i,
      })
      expect(nextButton).toBeInTheDocument()
    })

    it('deve ter ícones com aria-hidden true', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const icons = document.querySelectorAll('svg')
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('deve ter foco visível nos botões', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toContain('focus:outline-none')
        expect(button.className).toContain('focus:ring-2')
      })
    })
  })

  describe('Estilos', () => {
    it('deve ter posicionamento absoluto nos botões', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toContain('absolute')
      })
    })

    it('deve ter centralização vertical nos botões', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toContain('top-1/2')
        expect(button.className).toContain('-translate-y-1/2')
      })
    })

    it('deve ter botões arredondados', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toContain('rounded-full')
      })
    })

    it('deve ter transição de hover scale', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toContain('hover:scale-110')
      })
    })

    it('deve estar oculto em mobile e visível em lg', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toContain('hidden')
        expect(button.className).toContain('lg:flex')
      })
    })

    it('deve ter botão anterior posicionado à esquerda', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const prevButton = screen.getByRole('button', {
        name: /depoimento anterior/i,
      })
      expect(prevButton.className).toContain('-left-6')
    })

    it('deve ter botão próximo posicionado à direita', () => {
      render(<TestimonialNavigation {...defaultProps} />)

      const nextButton = screen.getByRole('button', {
        name: /próximo depoimento/i,
      })
      expect(nextButton.className).toContain('-right-6')
    })
  })

  describe('Renderização de Fragment', () => {
    it('deve renderizar dois botões diretamente sem wrapper', () => {
      const { container } = render(<TestimonialNavigation {...defaultProps} />)

      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(2)
    })
  })
})
