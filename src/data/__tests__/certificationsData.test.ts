import { describe, expect, it } from 'vitest'

import { type Certification, certifications } from '../certificationsData'

describe('certificationsData', () => {
  describe('certifications array', () => {
    it('should be an array', () => {
      expect(Array.isArray(certifications)).toBe(true)
    })

    it('should have 5 certifications', () => {
      expect(certifications).toHaveLength(5)
    })

    it('should have correct structure for each certification', () => {
      certifications.forEach((cert: Certification) => {
        expect(cert).toHaveProperty('id')
        expect(cert).toHaveProperty('name')
        expect(cert).toHaveProperty('organization')
        expect(cert).toHaveProperty('description')
        expect(cert).toHaveProperty('year')
        expect(cert).toHaveProperty('logo')
      })
    })

    it('should have unique ids', () => {
      const ids = certifications.map(c => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have logo with all image formats', () => {
      certifications.forEach((cert: Certification) => {
        expect(cert.logo).toHaveProperty('avif')
        expect(cert.logo).toHaveProperty('webp')
        expect(cert.logo).toHaveProperty('jpg')
      })
    })

    it('should have non-empty descriptions', () => {
      certifications.forEach((cert: Certification) => {
        expect(cert.description.length).toBeGreaterThan(50)
      })
    })

    it('should have valid year format', () => {
      certifications.forEach((cert: Certification) => {
        expect(cert.year).toMatch(/^\d{4}$/)
      })
    })
  })

  describe('individual certifications', () => {
    it('should have HSI certification', () => {
      const hsi = certifications.find(c => c.id === 'hsi')
      expect(hsi).toBeDefined()
      expect(hsi?.name).toBe('Health & Safety Institute')
      expect(hsi?.description).toContain('HSI')
    })

    it('should have NAUI certification', () => {
      const naui = certifications.find(c => c.id === 'naui')
      expect(naui).toBeDefined()
      expect(naui?.name).toContain('Underwater Instructors')
      expect(naui?.description).toContain('mergulho')
    })

    it('should have ACS certification', () => {
      const acs = certifications.find(c => c.id === 'acs')
      expect(acs).toBeDefined()
      expect(acs?.name).toBe('American College of Surgeons')
      expect(acs?.description).toContain('Stop the Bleed')
    })

    it('should have C-TECC certification', () => {
      const ctecc = certifications.find(c => c.id === 'ctecc')
      expect(ctecc).toBeDefined()
      expect(ctecc?.name).toContain('Tactical Emergency Casualty Care')
      expect(ctecc?.description).toContain('APH Tático')
    })

    it('should have ARC certification', () => {
      const arc = certifications.find(c => c.id === 'arc')
      expect(arc).toBeDefined()
      expect(arc?.name).toBe('American Red Cross')
      expect(arc?.description).toContain('Cruz Vermelha')
    })
  })

  describe('certification content quality', () => {
    it('should have professional descriptions', () => {
      certifications.forEach((cert: Certification) => {
        // Description should be substantial
        expect(cert.description.length).toBeGreaterThan(100)
        // Should not have placeholder text
        expect(cert.description).not.toContain('TODO')
        expect(cert.description).not.toContain('Lorem ipsum')
      })
    })

    it('should have matching name and organization', () => {
      certifications.forEach((cert: Certification) => {
        expect(cert.name).toBe(cert.organization)
      })
    })
  })
})
