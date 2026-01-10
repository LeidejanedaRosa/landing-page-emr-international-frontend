import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../../test/test-utils'
import { StarRating } from '../StarRating'

describe('StarRating', () => {
  describe('Renderização', () => {
    it('deve renderizar o número correto de estrelas para rating 5', () => {
      render(<StarRating rating={5} />)

      const stars = document.querySelectorAll('svg')
      expect(stars).toHaveLength(5)
    })

    it('deve renderizar o número correto de estrelas para rating 3', () => {
      render(<StarRating rating={3} />)

      const stars = document.querySelectorAll('svg')
      expect(stars).toHaveLength(3)
    })

    it('deve renderizar o número correto de estrelas para rating 1', () => {
      render(<StarRating rating={1} />)

      const stars = document.querySelectorAll('svg')
      expect(stars).toHaveLength(1)
    })

    it('deve renderizar 0 estrelas para rating 0', () => {
      render(<StarRating rating={0} />)

      const stars = document.querySelectorAll('svg')
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
      render(<StarRating rating={3} />)

      const stars = document.querySelectorAll('svg')
      stars.forEach(star => {
        expect(star).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Limites', () => {
    it('não deve renderizar mais estrelas que o maxRating', () => {
      render(<StarRating rating={10} maxRating={5} />)

      const stars = document.querySelectorAll('svg')
      expect(stars).toHaveLength(5)
    })

    it('não deve renderizar estrelas negativas', () => {
      render(<StarRating rating={-3} />)

      const stars = document.querySelectorAll('svg')
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
      render(<StarRating rating={15} maxRating={10} />)

      const stars = document.querySelectorAll('svg')
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
      render(<StarRating rating={1} />)

      const star = document.querySelector('svg')
      expect(star?.getAttribute('class')).toContain('text-yellow-400')
    })

    it('deve ter estrelas com fill-current', () => {
      render(<StarRating rating={1} />)

      const star = document.querySelector('svg')
      expect(star?.getAttribute('class')).toContain('fill-current')
    })

    it('deve ter estrelas com tamanho consistente', () => {
      render(<StarRating rating={1} />)

      const star = document.querySelector('svg')
      expect(star?.getAttribute('class')).toContain('w-6')
      expect(star?.getAttribute('class')).toContain('h-6')
    })
  })

  describe('SVG Path', () => {
    it('deve renderizar path de estrela', () => {
      render(<StarRating rating={1} />)

      const path = document.querySelector('svg path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d')
    })

    it('deve ter viewBox correto', () => {
      render(<StarRating rating={1} />)

      const svg = document.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 20 20')
    })
  })
})
