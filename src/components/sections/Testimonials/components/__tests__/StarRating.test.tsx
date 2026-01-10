import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../../test/test-utils'
import { StarRating } from '../StarRating'

describe('StarRating', () => {
  describe('Renderização', () => {
    it('deve renderizar o número correto de estrelas para rating 5', () => {
      const { container } = render(<StarRating rating={5} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(5)
    })

    it('deve renderizar o número correto de estrelas para rating 3', () => {
      const { container } = render(<StarRating rating={3} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(3)
    })

    it('deve renderizar o número correto de estrelas para rating 1', () => {
      const { container } = render(<StarRating rating={1} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(1)
    })

    it('deve renderizar 0 estrelas para rating 0', () => {
      const { container } = render(<StarRating rating={0} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(0)
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter role img no container', () => {
      render(<StarRating rating={4} />)

      const ratingContainer = screen.getByRole('img')
      expect(ratingContainer).toBeInTheDocument()
    })

    it('deve ter aria-label descritivo', () => {
      render(<StarRating rating={4} />)

      const ratingContainer = screen.getByRole('img', {
        name: 'Avaliação: 4 de 5 estrelas',
      })
      expect(ratingContainer).toBeInTheDocument()
    })

    it('deve ter aria-label com maxRating customizado', () => {
      render(<StarRating rating={8} maxRating={10} />)

      const ratingContainer = screen.getByRole('img', {
        name: 'Avaliação: 8 de 10 estrelas',
      })
      expect(ratingContainer).toBeInTheDocument()
    })

    it('deve ter aria-hidden nas estrelas SVG', () => {
      const { container } = render(<StarRating rating={3} />)

      const stars = container.querySelectorAll('svg')
      stars.forEach(star => {
        expect(star).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Limites', () => {
    it('não deve renderizar mais estrelas que o maxRating', () => {
      const { container } = render(<StarRating rating={10} maxRating={5} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(5)
    })

    it('não deve renderizar estrelas negativas', () => {
      const { container } = render(<StarRating rating={-3} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(0)
    })

    it('deve usar maxRating padrão de 5', () => {
      render(<StarRating rating={5} />)

      const ratingContainer = screen.getByRole('img', {
        name: 'Avaliação: 5 de 5 estrelas',
      })
      expect(ratingContainer).toBeInTheDocument()
    })

    it('deve limitar ao maxRating customizado', () => {
      const { container } = render(<StarRating rating={15} maxRating={10} />)

      const stars = container.querySelectorAll('svg')
      expect(stars).toHaveLength(10)
    })
  })

  describe('Estilos', () => {
    it('deve ter container com flex e gap', () => {
      render(<StarRating rating={3} />)

      const container = screen.getByRole('img')
      expect(container.className).toContain('flex')
      expect(container.className).toContain('gap-1')
    })

    it('deve ter estrelas com cor amarela', () => {
      const { container } = render(<StarRating rating={1} />)

      const star = container.querySelector('svg')
      expect(star?.getAttribute('class')).toContain('text-yellow-400')
    })

    it('deve ter estrelas com fill-current', () => {
      const { container } = render(<StarRating rating={1} />)

      const star = container.querySelector('svg')
      expect(star?.getAttribute('class')).toContain('fill-current')
    })

    it('deve ter estrelas com tamanho consistente', () => {
      const { container } = render(<StarRating rating={1} />)

      const star = container.querySelector('svg')
      expect(star?.getAttribute('class')).toContain('w-6')
      expect(star?.getAttribute('class')).toContain('h-6')
    })
  })

  describe('SVG Path', () => {
    it('deve renderizar path de estrela', () => {
      const { container } = render(<StarRating rating={1} />)

      const path = container.querySelector('svg path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d')
    })

    it('deve ter viewBox correto', () => {
      const { container } = render(<StarRating rating={1} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 20 20')
    })
  })
})
