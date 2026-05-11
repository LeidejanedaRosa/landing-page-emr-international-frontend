import { describe, expect, it } from 'vitest'

import type { Testimonial } from '../../components/sections/Testimonials/types'
import { getTestimonials, testimonials } from '../testimonialsData'

describe('testimonialsData', () => {
  describe('testimonials array', () => {
    it('should be an array', () => {
      expect(Array.isArray(testimonials)).toBe(true)
    })

    it('should have 6 testimonials', () => {
      expect(testimonials).toHaveLength(6)
    })

    it('should have unique ids', () => {
      const ids = testimonials.map(t => t.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have correct structure for each testimonial', () => {
      testimonials.forEach((testimonial: Testimonial) => {
        expect(testimonial).toHaveProperty('id')
        expect(testimonial).toHaveProperty('variant')
        expect(testimonial).toHaveProperty('courseType')
      })
    })

    it('should have valid variants', () => {
      testimonials.forEach((testimonial: Testimonial) => {
        expect(['full', 'text-only', 'image-only']).toContain(
          testimonial.variant
        )
      })
    })

    it('should have valid courseTypes', () => {
      testimonials.forEach((testimonial: Testimonial) => {
        expect(['tatico', 'remoto']).toContain(testimonial.courseType)
      })
    })
  })

  describe('full variant testimonials', () => {
    const fullTestimonials = testimonials.filter(t => t.variant === 'full')

    it('should have multiple full testimonials', () => {
      expect(fullTestimonials.length).toBeGreaterThan(0)
    })

    it('should have all required fields for full variant', () => {
      fullTestimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'full') {
          expect(testimonial.companyName).toBeDefined()
          expect(testimonial.testimonialText).toBeDefined()
          expect(testimonial.authorName).toBeDefined()
          expect(testimonial.authorRole).toBeDefined()
          expect(testimonial.rating).toBeDefined()
          expect(testimonial.images).toBeDefined()
        }
      })
    })

    it('should have images with all formats', () => {
      fullTestimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'full') {
          expect(testimonial.images).toHaveProperty('avif')
          expect(testimonial.images).toHaveProperty('webp')
          expect(testimonial.images).toHaveProperty('jpg')
          expect(testimonial.images).toHaveProperty('alt')
        }
      })
    })
  })

  describe('getTestimonials', () => {
    it('should return an array', () => {
      const result = getTestimonials()
      expect(Array.isArray(result)).toBe(true)
    })

    it('should return all testimonials', () => {
      const result = getTestimonials()
      expect(result).toHaveLength(testimonials.length)
    })

    it('should return a new array (immutability)', () => {
      const result1 = getTestimonials()
      const result2 = getTestimonials()
      expect(result1).not.toBe(result2)
      expect(result1).toEqual(result2)
    })
  })

  describe('content quality', () => {
    it('should have non-empty testimonial texts where applicable', () => {
      testimonials.forEach((testimonial: Testimonial) => {
        if (
          testimonial.variant === 'full' ||
          testimonial.variant === 'text-only'
        ) {
          expect(testimonial.testimonialText.length).toBeGreaterThan(20)
        }
      })
    })

    it('should have recognizable company names', () => {
      const fullAndImageTestimonials = testimonials.filter(
        t => t.variant === 'full' || t.variant === 'image-only'
      )

      fullAndImageTestimonials.forEach((testimonial: Testimonial) => {
        expect(testimonial.companyName).toBeDefined()
        expect(testimonial.companyName!.length).toBeGreaterThan(0)
      })
    })

    it('should all have 5-star ratings where applicable', () => {
      testimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'full') {
          expect(testimonial.rating).toBe(5)
        } else if (
          testimonial.variant === 'text-only' &&
          testimonial.rating !== undefined
        ) {
          expect(testimonial.rating).toBe(5)
        }
      })
    })
  })
})
