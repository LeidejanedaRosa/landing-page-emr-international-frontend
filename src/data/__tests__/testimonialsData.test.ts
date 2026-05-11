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

  describe.skip('text-only variant testimonials', () => {
    const textOnlyTestimonials = testimonials.filter(
      t => t.variant === 'text-only'
    )

    it('should have text-only testimonials', () => {
      expect(textOnlyTestimonials.length).toBeGreaterThan(0)
    })

    it('should have required fields for text-only variant', () => {
      textOnlyTestimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'text-only') {
          expect(testimonial.testimonialText).toBeDefined()
          expect(testimonial.authorName).toBeDefined()
          expect(testimonial.authorRole).toBeDefined()
          expect(testimonial.rating).toBeDefined()
        }
      })
    })

    it('should not require images for text-only', () => {
      textOnlyTestimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'text-only') {
          expect(testimonial.testimonialText).toBeDefined()
          expect(testimonial.variant).toBe('text-only')
        }
      })
    })
  })

  describe.skip('image-only variant testimonials', () => {
    const imageOnlyTestimonials = testimonials.filter(
      t => t.variant === 'image-only'
    )

    it('should have image-only testimonials', () => {
      expect(imageOnlyTestimonials.length).toBeGreaterThan(0)
    })

    it('should have required fields for image-only variant', () => {
      imageOnlyTestimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'image-only') {
          expect(testimonial.companyName).toBeDefined()
          expect(testimonial.images).toBeDefined()
        }
      })
    })

    it('should have images with alt text for accessibility', () => {
      imageOnlyTestimonials.forEach((testimonial: Testimonial) => {
        if (testimonial.variant === 'image-only') {
          expect(testimonial.images.alt).toBeDefined()
          expect(testimonial.images.alt.length).toBeGreaterThan(0)
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
