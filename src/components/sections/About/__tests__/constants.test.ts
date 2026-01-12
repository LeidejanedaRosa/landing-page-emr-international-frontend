import { describe, expect, it } from 'vitest'

import {
  ABOUT_METRICS,
  INSTRUCTOR_CAPTION,
  INSTRUCTOR_IMAGE_ALT,
  INSTRUCTOR_INFO,
  INTERNATIONAL_CREDENTIALS,
  OPERATIONAL_FORCES,
} from '../constants'

describe('About constants', () => {
  describe('INSTRUCTOR_IMAGE_ALT', () => {
    it('should be a non-empty string', () => {
      expect(typeof INSTRUCTOR_IMAGE_ALT).toBe('string')
      expect(INSTRUCTOR_IMAGE_ALT.length).toBeGreaterThan(0)
    })

    it('should contain instructor name', () => {
      expect(INSTRUCTOR_IMAGE_ALT).toContain('Juan Regenerati')
    })

    it('should be descriptive for accessibility', () => {
      expect(INSTRUCTOR_IMAGE_ALT).toContain('paramédico')
    })
  })

  describe('INSTRUCTOR_CAPTION', () => {
    it('should be a non-empty string', () => {
      expect(typeof INSTRUCTOR_CAPTION).toBe('string')
      expect(INSTRUCTOR_CAPTION.length).toBeGreaterThan(0)
    })

    it('should contain instructor name', () => {
      expect(INSTRUCTOR_CAPTION).toContain('Juan Regenerati')
    })

    it('should mention EMR Internacional', () => {
      expect(INSTRUCTOR_CAPTION).toContain('EMR Internacional')
    })
  })

  describe('INSTRUCTOR_INFO', () => {
    it('should have all required properties', () => {
      expect(INSTRUCTOR_INFO).toHaveProperty('name')
      expect(INSTRUCTOR_INFO).toHaveProperty('subtitle')
      expect(INSTRUCTOR_INFO).toHaveProperty('title')
      expect(INSTRUCTOR_INFO).toHaveProperty('description')
      expect(INSTRUCTOR_INFO).toHaveProperty('highlight')
    })

    it('should have correct name', () => {
      expect(INSTRUCTOR_INFO.name).toBe('Juan Regenerati')
    })

    it('should have EMR Internacional as subtitle', () => {
      expect(INSTRUCTOR_INFO.subtitle).toBe('EMR INTERNACIONAL')
    })

    it('should have title mentioning key roles', () => {
      expect(INSTRUCTOR_INFO.title).toContain('Paramédico')
      expect(INSTRUCTOR_INFO.title).toContain('Instrutor')
    })

    it('should have highlight mentioning specializations', () => {
      expect(INSTRUCTOR_INFO.highlight).toContain('APH Tático')
      expect(INSTRUCTOR_INFO.highlight).toContain('TECC')
      expect(INSTRUCTOR_INFO.highlight).toContain('Wilderness Medicine')
    })
  })

  describe('OPERATIONAL_FORCES', () => {
    it('should be an array', () => {
      expect(Array.isArray(OPERATIONAL_FORCES)).toBe(true)
    })

    it('should have 3 items', () => {
      expect(OPERATIONAL_FORCES).toHaveLength(3)
    })

    it('should have correct structure for each item', () => {
      OPERATIONAL_FORCES.forEach(force => {
        expect(force).toHaveProperty('id')
        expect(force).toHaveProperty('label')
        expect(typeof force.id).toBe('string')
        expect(typeof force.label).toBe('string')
      })
    })

    it('should have unique ids', () => {
      const ids = OPERATIONAL_FORCES.map(f => f.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should contain expected forces', () => {
      const ids = OPERATIONAL_FORCES.map(f => f.id)
      expect(ids).toContain('cbm')
      expect(ids).toContain('eb')
      expect(ids).toContain('fnsp')
    })
  })

  describe('INTERNATIONAL_CREDENTIALS', () => {
    it('should be an array', () => {
      expect(Array.isArray(INTERNATIONAL_CREDENTIALS)).toBe(true)
    })

    it('should have 3 items', () => {
      expect(INTERNATIONAL_CREDENTIALS).toHaveLength(3)
    })

    it('should have correct structure for each item', () => {
      INTERNATIONAL_CREDENTIALS.forEach(credential => {
        expect(credential).toHaveProperty('id')
        expect(credential).toHaveProperty('label')
        expect(typeof credential.id).toBe('string')
        expect(typeof credential.label).toBe('string')
      })
    })

    it('should have unique ids', () => {
      const ids = INTERNATIONAL_CREDENTIALS.map(c => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should contain expected credentials', () => {
      const ids = INTERNATIONAL_CREDENTIALS.map(c => c.id)
      expect(ids).toContain('hsi')
      expect(ids).toContain('acs')
      expect(ids).toContain('arc')
    })

    it('should have proper labels', () => {
      const labels = INTERNATIONAL_CREDENTIALS.map(c => c.label)
      expect(labels).toContain('Health & Safety Institute (HSI)')
      expect(labels).toContain('American College of Surgeons')
      expect(labels).toContain('American Red Cross')
    })
  })

  describe('ABOUT_METRICS', () => {
    it('should be an array', () => {
      expect(Array.isArray(ABOUT_METRICS)).toBe(true)
    })

    it('should have 2 metrics', () => {
      expect(ABOUT_METRICS).toHaveLength(2)
    })

    it('should have correct structure for each metric', () => {
      ABOUT_METRICS.forEach(metric => {
        expect(metric).toHaveProperty('id')
        expect(metric).toHaveProperty('value')
        expect(metric).toHaveProperty('label')
        expect(metric).toHaveProperty('ariaLabel')
        expect(metric).toHaveProperty('highlight')
      })
    })

    it('should have unique ids', () => {
      const ids = ABOUT_METRICS.map(m => m.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have experience metric', () => {
      const experience = ABOUT_METRICS.find(m => m.id === 'experience')
      expect(experience).toBeDefined()
      expect(experience?.value).toBe('15+')
      expect(experience?.label).toBe('Anos de Experiência')
    })

    it('should have trained metric', () => {
      const trained = ABOUT_METRICS.find(m => m.id === 'trained')
      expect(trained).toBeDefined()
      expect(trained?.value).toBe('6000+')
      expect(trained?.label).toBe('Profissionais Treinados')
    })

    it('should have accessible aria labels', () => {
      ABOUT_METRICS.forEach(metric => {
        expect(metric.ariaLabel.length).toBeGreaterThan(0)
      })
    })
  })
})
