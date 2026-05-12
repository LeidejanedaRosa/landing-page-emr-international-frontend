import { describe, expect, it } from 'vitest'

import {
  ABOUT_SECTION_ID,
  CERTIFICATIONS_SECTION_ID,
  CONTACT_SECTION_ID,
  COURSES_SECTION_ID,
  HERO_ANIMATION,
  HERO_CONTENT,
  HERO_IMAGE,
  HERO_MAIN_TITLE_ID,
  HERO_SECTION_ID,
  TESTIMONIALS_SECTION_ID,
} from '../constants'

describe('Hero constants', () => {
  describe('Section IDs', () => {
    it('should have correct HERO_SECTION_ID', () => {
      expect(HERO_SECTION_ID).toBe('inicio')
    })

    it('should have correct HERO_MAIN_TITLE_ID', () => {
      expect(HERO_MAIN_TITLE_ID).toBe('hero-main-title')
    })

    it('should have correct ABOUT_SECTION_ID', () => {
      expect(ABOUT_SECTION_ID).toBe('sobre')
    })

    it('should have correct CERTIFICATIONS_SECTION_ID', () => {
      expect(CERTIFICATIONS_SECTION_ID).toBe('certificacoes')
    })

    it('should have correct COURSES_SECTION_ID', () => {
      expect(COURSES_SECTION_ID).toBe('treinamentos')
    })

    it('should have correct TESTIMONIALS_SECTION_ID', () => {
      expect(TESTIMONIALS_SECTION_ID).toBe('depoimentos')
    })

    it('should have correct CONTACT_SECTION_ID', () => {
      expect(CONTACT_SECTION_ID).toBe('contato')
    })

    it('should all be strings', () => {
      expect(typeof HERO_SECTION_ID).toBe('string')
      expect(typeof HERO_MAIN_TITLE_ID).toBe('string')
      expect(typeof ABOUT_SECTION_ID).toBe('string')
      expect(typeof CERTIFICATIONS_SECTION_ID).toBe('string')
      expect(typeof COURSES_SECTION_ID).toBe('string')
      expect(typeof TESTIMONIALS_SECTION_ID).toBe('string')
      expect(typeof CONTACT_SECTION_ID).toBe('string')
    })
  })

  describe('HERO_CONTENT', () => {
    describe('seo', () => {
      it('should have title', () => {
        expect(HERO_CONTENT.seo.title).toBeDefined()
        expect(HERO_CONTENT.seo.title).toContain('EMR International')
      })

      it('should have description', () => {
        expect(HERO_CONTENT.seo.description).toBeDefined()
        expect(HERO_CONTENT.seo.description.length).toBeGreaterThan(0)
      })

      it('should have contextDescription', () => {
        expect(HERO_CONTENT.seo.contextDescription).toBeDefined()
      })
    })

    describe('badge', () => {
      it('should have label', () => {
        expect(HERO_CONTENT.badge.label).toBe('Certificação Internacional')
      })

      it('should have ariaLabel', () => {
        expect(HERO_CONTENT.badge.ariaLabel).toBeDefined()
      })
    })

    describe('headline', () => {
      it('should have all headline parts', () => {
        expect(HERO_CONTENT.headline.firstLine).toBe('O Imprevisível')
        expect(HERO_CONTENT.headline.highlightLine).toBe('Acontece.')
        expect(HERO_CONTENT.headline.thirdLine).toBe('VOCÊ ESTÁ ')
        expect(HERO_CONTENT.headline.fourthLine).toBe('REALMENTE PREPARADO?')
      })
    })

    describe('cta', () => {
      it('should have text', () => {
        expect(HERO_CONTENT.cta.text).toBe('CONHEÇA NOSSOS TREINAMENTOS')
      })
    })

    describe('visual', () => {
      it('should have alt text', () => {
        expect(HERO_CONTENT.visual.alt).toBeDefined()
        expect(HERO_CONTENT.visual.alt.length).toBeGreaterThan(0)
      })

      it('should have ariaLabel', () => {
        expect(HERO_CONTENT.visual.ariaLabel).toBeDefined()
      })

      it('should have badge with label and ariaLabel', () => {
        expect(HERO_CONTENT.visual.badge.label).toBe('Simulação realística')
        expect(HERO_CONTENT.visual.badge.ariaLabel).toBeDefined()
      })
    })

    describe('socialProof', () => {
      it('should have students count', () => {
        expect(HERO_CONTENT.socialProof.students).toContain('6.000')
      })

      it('should have methodology text', () => {
        expect(HERO_CONTENT.socialProof.methodology).toBe(
          'Metodologia Internacional'
        )
      })

      it('should have separator', () => {
        expect(HERO_CONTENT.socialProof.separator).toBe('•')
      })
    })

    describe('about', () => {
      it('should have title', () => {
        expect(HERO_CONTENT.about.title).toBe('Sobre a EMR International')
      })

      it('should have description', () => {
        expect(HERO_CONTENT.about.description).toBeDefined()
        expect(HERO_CONTENT.about.description.length).toBeGreaterThan(0)
      })
    })
  })

  describe('HERO_ANIMATION', () => {
    describe('duration', () => {
      it('should have fadeIn duration', () => {
        expect(HERO_ANIMATION.duration.fadeIn).toBe(300)
      })

      it('should have hover duration', () => {
        expect(HERO_ANIMATION.duration.hover).toBe(700)
      })

      it('should have shine duration', () => {
        expect(HERO_ANIMATION.duration.shine).toBe(500)
      })

      it('should all be positive numbers', () => {
        expect(HERO_ANIMATION.duration.fadeIn).toBeGreaterThan(0)
        expect(HERO_ANIMATION.duration.hover).toBeGreaterThan(0)
        expect(HERO_ANIMATION.duration.shine).toBeGreaterThan(0)
      })
    })

    describe('scroll', () => {
      it('should have smooth behavior', () => {
        expect(HERO_ANIMATION.scroll.behavior).toBe('smooth')
      })
    })
  })

  describe('HERO_IMAGE', () => {
    it('should have eager loading', () => {
      expect(HERO_IMAGE.loading).toBe('eager')
    })

    it('should have high fetchPriority', () => {
      expect(HERO_IMAGE.fetchPriority).toBe('high')
    })

    it('should have sizes array', () => {
      expect(Array.isArray(HERO_IMAGE.sizes)).toBe(true)
      expect(HERO_IMAGE.sizes).toHaveLength(4)
      expect(HERO_IMAGE.sizes).toContain('400w')
      expect(HERO_IMAGE.sizes).toContain('1600w')
    })

    it('should have formats array', () => {
      expect(Array.isArray(HERO_IMAGE.formats)).toBe(true)
      expect(HERO_IMAGE.formats).toContain('avif')
      expect(HERO_IMAGE.formats).toContain('webp')
      expect(HERO_IMAGE.formats).toContain('jpg')
    })

    it('should have quality setting', () => {
      expect(HERO_IMAGE.quality).toBe(85)
    })
  })
})
