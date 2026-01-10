import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../../test/test-utils'
import type {
  FullTestimonial,
  ImageOnlyTestimonial,
  TextOnlyTestimonial,
} from '../../types'
import { TestimonialCard } from '../TestimonialCard'

const fullTestimonial: FullTestimonial = {
  id: 'test-full',
  variant: 'full',
  courseType: 'tatico',
  testimonialText: 'Este é um depoimento completo de teste.',
  authorName: 'João Silva',
  authorRole: 'Engenheiro',
  rating: 5,
  companyName: 'Empresa Teste',
  images: {
    jpg: '/test-image.jpg',
    alt: 'Foto de João Silva',
  },
}

const textOnlyTestimonial: TextOnlyTestimonial = {
  id: 'test-text',
  variant: 'text-only',
  courseType: 'remoto',
  testimonialText: 'Este é um depoimento somente texto.',
  authorName: 'Maria Santos',
  authorRole: 'Médica',
  rating: 4,
  companyName: 'Hospital Central',
}

const imageOnlyTestimonial: ImageOnlyTestimonial = {
  id: 'test-image',
  variant: 'image-only',
  courseType: 'tatico',
  companyName: 'Corpo de Bombeiros',
  images: {
    jpg: '/test-image.jpg',
    webp: '/test-image.webp',
    avif: '/test-image.avif',
    alt: 'Equipe de treinamento',
  },
}

describe('TestimonialCard', () => {
  describe('Variante Full', () => {
    it('deve renderizar article como elemento raiz', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const article = document.querySelector('article')
      expect(article).toBeInTheDocument()
    })

    it('deve exibir o texto do depoimento em blockquote', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const blockquote = document.querySelector('blockquote')
      expect(blockquote).toBeInTheDocument()
      expect(
        screen.getByText(/este é um depoimento completo de teste/i)
      ).toBeInTheDocument()
    })

    it('deve exibir o nome do autor', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    it('deve exibir o cargo do autor', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      expect(screen.getByText('Engenheiro')).toBeInTheDocument()
    })

    it('deve exibir o nome da empresa', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      expect(screen.getByText('Empresa Teste')).toBeInTheDocument()
    })

    it('deve exibir a tag do tipo de curso', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      expect(screen.getByText('Tático')).toBeInTheDocument()
    })

    it('deve exibir a avaliação com estrelas', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const rating = screen.getByRole('img', { name: /avaliação/i })
      expect(rating).toBeInTheDocument()
    })

    it('deve renderizar a imagem com figure', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const figure = document.querySelector('figure')
      expect(figure).toBeInTheDocument()
    })

    it('deve ter grid de duas colunas quando há imagem', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('md:grid-cols-2')
    })
  })

  describe('Variante Text Only', () => {
    it('deve renderizar article como elemento raiz', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      const article = document.querySelector('article')
      expect(article).toBeInTheDocument()
    })

    it('deve exibir o texto do depoimento', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      expect(
        screen.getByText(/este é um depoimento somente texto/i)
      ).toBeInTheDocument()
    })

    it('deve exibir o nome do autor', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    })

    it('deve exibir o cargo do autor', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      expect(screen.getByText('Médica')).toBeInTheDocument()
    })

    it('deve exibir a tag do tipo de curso remoto', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      expect(screen.getByText('Remoto')).toBeInTheDocument()
    })

    it('deve exibir avaliação quando disponível', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      const rating = screen.getByRole('img', { name: /avaliação: 4 de 5/i })
      expect(rating).toBeInTheDocument()
    })

    it('não deve renderizar imagem', () => {
      render(<TestimonialCard testimonial={textOnlyTestimonial} />)

      const img = document.querySelector('img')
      expect(img).not.toBeInTheDocument()
    })

    it('não deve exibir companyName no autor (apenas em casos específicos)', () => {
      const testimonialWithoutCompany: TextOnlyTestimonial = {
        ...textOnlyTestimonial,
        companyName: undefined,
      }
      render(<TestimonialCard testimonial={testimonialWithoutCompany} />)

      expect(screen.queryByText('Hospital Central')).not.toBeInTheDocument()
    })
  })

  describe('Variante Image Only', () => {
    it('deve renderizar article como elemento raiz', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const article = document.querySelector('article')
      expect(article).toBeInTheDocument()
    })

    it('deve renderizar figure para a imagem', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const figure = document.querySelector('figure')
      expect(figure).toBeInTheDocument()
    })

    it('deve renderizar a imagem com alt correto', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const img = screen.getByAltText('Equipe de treinamento')
      expect(img).toBeInTheDocument()
    })

    it('deve exibir o nome da empresa em figcaption', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const figcaption = document.querySelector('figcaption')
      expect(figcaption).toBeInTheDocument()
      expect(screen.getByText('Corpo de Bombeiros')).toBeInTheDocument()
    })

    it('deve exibir a tag do tipo de curso', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      expect(screen.getByText('Tático')).toBeInTheDocument()
    })

    it('não deve renderizar blockquote', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const blockquote = document.querySelector('blockquote')
      expect(blockquote).not.toBeInTheDocument()
    })

    it('não deve exibir figcaption quando companyName não existe', () => {
      const testimonialWithoutCompany: ImageOnlyTestimonial = {
        ...imageOnlyTestimonial,
        companyName: undefined,
      }
      render(<TestimonialCard testimonial={testimonialWithoutCompany} />)

      const figcaption = document.querySelector('figcaption')
      expect(figcaption).not.toBeInTheDocument()
    })
  })

  describe('HTML Semântico', () => {
    it('deve usar cite para informações do autor', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const cite = document.querySelector('cite')
      expect(cite).toBeInTheDocument()
    })

    it('deve ter cite com not-italic para manter formatação', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const cite = document.querySelector('cite')
      expect(cite?.className).toContain('not-italic')
    })

    it('deve usar footer para informações do autor', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const footer = document.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter altura fixa com classe consistente', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('h-[400px]')
    })

    it('deve ter animação de fade-in', () => {
      render(<TestimonialCard testimonial={fullTestimonial} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('animate-fade-in')
    })
  })

  describe('Imagens Otimizadas', () => {
    it('deve usar picture element para variante image-only', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const picture = document.querySelector('picture')
      expect(picture).toBeInTheDocument()
    })

    it('deve ter source para avif quando disponível', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const avifSource = document.querySelector('source[type="image/avif"]')
      expect(avifSource).toBeInTheDocument()
    })

    it('deve ter source para webp quando disponível', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const webpSource = document.querySelector('source[type="image/webp"]')
      expect(webpSource).toBeInTheDocument()
    })

    it('deve ter img com loading lazy', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('loading', 'lazy')
    })

    it('deve ter img com decoding async', () => {
      render(<TestimonialCard testimonial={imageOnlyTestimonial} />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('decoding', 'async')
    })
  })
})
