import { describe, expect, it } from 'vitest'

import { render } from '../../../test/test-utils'
import type {
  FullTestimonial,
  ImageOnlyTestimonial,
  TextOnlyTestimonial,
} from '../../sections/Testimonials/types'
import { TestimonialsSchema } from '../schemas/TestimonialsSchema'

const fullTestimonial: FullTestimonial = {
  id: 't-1',
  variant: 'full',
  courseType: 'tatico',
  testimonialText: 'Excelente curso, recomendo muito.',
  authorName: 'João Silva',
  authorRole: 'Bombeiro Civil',
  rating: 5,
  images: { jpg: '/test.jpg', alt: 'Foto de João' },
}

const textOnlyWithRating: TextOnlyTestimonial = {
  id: 't-2',
  variant: 'text-only',
  courseType: 'remoto',
  testimonialText: 'Aprendi muito sobre medicina de campo.',
  authorName: 'Maria Costa',
  authorRole: 'Enfermeira',
  rating: 4,
}

const textOnlyWithoutRating: TextOnlyTestimonial = {
  id: 't-3',
  variant: 'text-only',
  courseType: 'tatico',
  testimonialText: 'Ótimo treinamento.',
  authorName: 'Pedro Alves',
  authorRole: 'Policial',
}

const imageOnly: ImageOnlyTestimonial = {
  id: 't-4',
  variant: 'image-only',
  courseType: 'remoto',
  images: { jpg: '/test2.jpg', alt: 'Foto' },
}

const getScriptData = (container: HTMLElement) => {
  const script = container.querySelector('script[type="application/ld+json"]')
  return script ? JSON.parse(script.innerHTML) : null
}

describe('TestimonialsSchema', () => {
  describe('retorna null', () => {
    it('quando lista de depoimentos é vazia', () => {
      const { container } = render(<TestimonialsSchema testimonials={[]} />)
      expect(container.querySelector('script')).toBeNull()
    })

    it('quando todos depoimentos são image-only (sem rating)', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[imageOnly]} />
      )
      expect(container.querySelector('script')).toBeNull()
    })

    it('quando text-only não tem rating', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[textOnlyWithoutRating]} />
      )
      expect(container.querySelector('script')).toBeNull()
    })
  })

  describe('renderiza schema JSON-LD', () => {
    it('quando há full testimonial com rating', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      expect(container.querySelector('script')).not.toBeNull()
    })

    it('quando há text-only com rating', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[textOnlyWithRating]} />
      )
      expect(container.querySelector('script')).not.toBeNull()
    })
  })

  describe('estrutura do schema', () => {
    it('tem @context e @type corretos', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)

      expect(data['@context']).toBe('https://schema.org')
      expect(data['@type']).toBe('Organization')
    })

    it('tem @id com URL da empresa', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)

      expect(data['@id']).toBe('https://www.emrinternational.com/#organization')
    })

    it('contém aggregateRating com campos obrigatórios', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)
      const { aggregateRating } = data

      expect(aggregateRating['@type']).toBe('AggregateRating')
      expect(aggregateRating.bestRating).toBe(5)
      expect(aggregateRating.worstRating).toBe(1)
      expect(aggregateRating.ratingCount).toBe(1)
      expect(aggregateRating.reviewCount).toBe(1)
    })
  })

  describe('cálculo de média', () => {
    it('calcula ratingValue correto para um depoimento (5)', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)
      expect(data.aggregateRating.ratingValue).toBe('5.0')
    })

    it('calcula ratingValue correto para múltiplos depoimentos', () => {
      const { container } = render(
        <TestimonialsSchema
          testimonials={[fullTestimonial, textOnlyWithRating]}
        />
      )
      const data = getScriptData(container)
      // (5 + 4) / 2 = 4.5
      expect(data.aggregateRating.ratingValue).toBe('4.5')
    })

    it('ignora depoimentos sem rating no cálculo', () => {
      const { container } = render(
        <TestimonialsSchema
          testimonials={[fullTestimonial, textOnlyWithoutRating, imageOnly]}
        />
      )
      const data = getScriptData(container)
      // Apenas fullTestimonial tem rating
      expect(data.aggregateRating.ratingCount).toBe(1)
      expect(data.aggregateRating.ratingValue).toBe('5.0')
    })
  })

  describe('array de reviews', () => {
    it('gera Review com dados do autor corretos', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)
      const review = data.review[0]

      expect(review['@type']).toBe('Review')
      expect(review.author['@type']).toBe('Person')
      expect(review.author.name).toBe('João Silva')
      expect(review.author.jobTitle).toBe('Bombeiro Civil')
    })

    it('gera Review com texto e rating corretos', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)
      const review = data.review[0]

      expect(review.reviewBody).toBe('Excelente curso, recomendo muito.')
      expect(review.reviewRating['@type']).toBe('Rating')
      expect(review.reviewRating.ratingValue).toBe(5)
      expect(review.reviewRating.bestRating).toBe(5)
      expect(review.reviewRating.worstRating).toBe(1)
    })

    it('gera reviews para todos os depoimentos com rating', () => {
      const { container } = render(
        <TestimonialsSchema
          testimonials={[fullTestimonial, textOnlyWithRating, imageOnly]}
        />
      )
      const data = getScriptData(container)
      expect(data.review).toHaveLength(2)
    })

    it('review tem itemReviewed apontando para a organização', () => {
      const { container } = render(
        <TestimonialsSchema testimonials={[fullTestimonial]} />
      )
      const data = getScriptData(container)
      const { itemReviewed } = data.review[0]

      expect(itemReviewed['@type']).toBe('Organization')
      expect(itemReviewed['@id']).toBe(
        'https://www.emrinternational.com/#organization'
      )
    })
  })
})
