import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../../test/test-utils'
import type { TestimonialImages } from '../../types'
import { TestimonialImage } from '../TestimonialImage'

describe('TestimonialImage', () => {
  const fullImages: TestimonialImages = {
    avif: '/test-image.avif',
    webp: '/test-image.webp',
    jpg: '/test-image.jpg',
    alt: 'Descrição da imagem de teste',
  }

  const minimalImages: TestimonialImages = {
    jpg: '/test-image.jpg',
    alt: 'Imagem mínima',
  }

  describe('Renderização', () => {
    it('deve renderizar a imagem com alt correto', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = screen.getByAltText('Descrição da imagem de teste')
      expect(img).toBeInTheDocument()
    })

    it('deve renderizar picture element', () => {
      render(<TestimonialImage images={fullImages} />)

      const picture = document.querySelector('picture')
      expect(picture).toBeInTheDocument()
    })

    it('deve ter img com src jpg', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('src', '/test-image.jpg')
    })
  })

  describe('Formatos de Imagem', () => {
    it('deve ter source para avif quando disponível', () => {
      render(<TestimonialImage images={fullImages} />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).toBeInTheDocument()
      expect(avifSource).toHaveAttribute('srcSet', '/test-image.avif')
    })

    it('deve ter source para webp quando disponível', () => {
      render(<TestimonialImage images={fullImages} />)

      const webpSource = document.querySelector('source[type="image/webp"]')
      expect(webpSource).toBeInTheDocument()
      expect(webpSource).toHaveAttribute('srcSet', '/test-image.webp')
    })

    it('não deve ter source para avif quando não disponível', () => {
      render(<TestimonialImage images={minimalImages} />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).not.toBeInTheDocument()
    })

    it('não deve ter source para webp quando não disponível', () => {
      render(<TestimonialImage images={minimalImages} />)

      const webpSource = document.querySelector('source[type="image/webp"]')
      expect(webpSource).not.toBeInTheDocument()
    })
  })

  describe('Otimização', () => {
    it('deve ter loading lazy', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('loading', 'lazy')
    })

    it('deve ter decoding async', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('decoding', 'async')
    })

    it('deve ter width e height definidos', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('width', '640')
      expect(img).toHaveAttribute('height', '384')
    })

    it('deve ter sizes responsivo', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute(
        'sizes',
        '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px'
      )
    })

    it('deve ter sizes nos source elements', () => {
      render(<TestimonialImage images={fullImages} />)

      const sources = document.querySelectorAll('source')
      sources.forEach(source => {
        expect(source).toHaveAttribute(
          'sizes',
          '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px'
        )
      })
    })
  })

  describe('Overlay', () => {
    it('deve mostrar overlay por padrão', () => {
      render(<TestimonialImage images={fullImages} />)

      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay).toBeInTheDocument()
    })

    it('deve ter overlay com gradiente', () => {
      render(<TestimonialImage images={fullImages} />)

      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay?.className).toContain('bg-gradient-to-t')
    })

    it('não deve mostrar overlay quando showOverlay é false', () => {
      render(<TestimonialImage images={fullImages} showOverlay={false} />)

      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay).not.toBeInTheDocument()
    })

    it('deve mostrar overlay quando showOverlay é true', () => {
      render(<TestimonialImage images={fullImages} showOverlay={true} />)

      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay).toBeInTheDocument()
    })
  })

  describe('Estilos', () => {
    it('deve ter container com overflow hidden', () => {
      const { container } = render(<TestimonialImage images={fullImages} />)

      const wrapper = container.firstChild
      expect((wrapper as HTMLElement).className).toContain('overflow-hidden')
    })

    it('deve ter imagem com object-cover', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img?.className).toContain('object-cover')
    })

    it('deve ter transição de hover scale na imagem', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img?.className).toContain('hover:scale-105')
    })

    it('deve ter transição de transform', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img?.className).toContain('transition-transform')
    })

    it('deve ter altura e largura 100%', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = document.querySelector('img')
      expect(img?.className).toContain('w-full')
      expect(img?.className).toContain('h-full')
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter alt text descritivo', () => {
      render(<TestimonialImage images={fullImages} />)

      const img = screen.getByAltText('Descrição da imagem de teste')
      expect(img).toBeInTheDocument()
    })

    it('overlay deve ter aria-hidden true', () => {
      render(<TestimonialImage images={fullImages} />)

      const overlay = document.querySelector('.bg-gradient-to-t')
      expect(overlay).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
