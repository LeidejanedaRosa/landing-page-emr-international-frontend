import { describe, expect, it } from 'vitest'

import { ORGANIZATION_STRUCTURED_DATA } from '../organizationSchema'

describe('organizationSchema', () => {
  describe('ORGANIZATION_STRUCTURED_DATA', () => {
    it('should have valid JSON-LD context', () => {
      expect(ORGANIZATION_STRUCTURED_DATA['@context']).toBe(
        'https://schema.org'
      )
    })

    it('should have @graph array', () => {
      expect(Array.isArray(ORGANIZATION_STRUCTURED_DATA['@graph'])).toBe(true)
      expect(ORGANIZATION_STRUCTURED_DATA['@graph'].length).toBeGreaterThan(0)
    })
  })

  describe('WebSite schema', () => {
    const webSite = ORGANIZATION_STRUCTURED_DATA['@graph'].find(
      item => item['@type'] === 'WebSite'
    )

    it('should exist in graph', () => {
      expect(webSite).toBeDefined()
    })

    it('should have required properties', () => {
      expect(webSite).toHaveProperty('@id')
      expect(webSite).toHaveProperty('name')
      expect(webSite).toHaveProperty('url')
      expect(webSite).toHaveProperty('description')
      expect(webSite).toHaveProperty('publisher')
      expect(webSite).toHaveProperty('inLanguage')
    })

    it('should have valid URL', () => {
      expect(webSite?.url).toMatch(/^https:\/\//)
    })

    it('should be in Portuguese', () => {
      expect(webSite?.inLanguage).toBe('pt-BR')
    })
  })

  describe('Organization schema', () => {
    const organization = ORGANIZATION_STRUCTURED_DATA['@graph'].find(
      item => item['@type'] === 'Organization'
    )

    it('should exist in graph', () => {
      expect(organization).toBeDefined()
    })

    it('should have required properties', () => {
      expect(organization).toHaveProperty('@id')
      expect(organization).toHaveProperty('name')
      expect(organization).toHaveProperty('legalName')
      expect(organization).toHaveProperty('url')
      expect(organization).toHaveProperty('logo')
      expect(organization).toHaveProperty('description')
    })

    it('should have EMR International as name', () => {
      expect(organization?.name).toBe('EMR International')
    })

    it('should have logo with ImageObject type', () => {
      expect(organization?.logo['@type']).toBe('ImageObject')
      expect(organization?.logo).toHaveProperty('url')
      expect(organization?.logo).toHaveProperty('width')
      expect(organization?.logo).toHaveProperty('height')
    })

    it('should have address with PostalAddress type', () => {
      expect(organization?.address['@type']).toBe('PostalAddress')
      expect(organization?.address.addressCountry).toBe('BR')
    })

    it('should have contact points', () => {
      expect(Array.isArray(organization?.contactPoint)).toBe(true)
      expect(organization?.contactPoint.length).toBeGreaterThan(0)

      organization?.contactPoint.forEach(
        (contact: { '@type': string; contactType: string }) => {
          expect(contact['@type']).toBe('ContactPoint')
          expect(contact).toHaveProperty('contactType')
        }
      )
    })

    it('should have social media links in sameAs', () => {
      expect(Array.isArray(organization?.sameAs)).toBe(true)
      expect(organization?.sameAs.length).toBeGreaterThan(0)

      organization?.sameAs.forEach((url: string) => {
        expect(url).toMatch(/^https:\/\//)
      })
    })

    it('should have knowsAbout topics', () => {
      expect(Array.isArray(organization?.knowsAbout)).toBe(true)
      expect(organization?.knowsAbout).toContain('APH Tático')
      expect(organization?.knowsAbout).toContain('TECC')
      expect(organization?.knowsAbout).toContain('Wilderness Medicine')
    })

    it('should have founding date', () => {
      expect(organization?.foundingDate).toBeDefined()
      expect(organization?.foundingDate).toMatch(/^\d{4}$/)
    })
  })

  describe('Service schemas', () => {
    const services = ORGANIZATION_STRUCTURED_DATA['@graph'].filter(
      item => item['@type'] === 'Service'
    )

    it('should have services in graph', () => {
      expect(services.length).toBeGreaterThan(0)
    })

    it('should have TMR service', () => {
      const tmr = services.find(s =>
        s['@id']?.toString().includes('service-tmr')
      )
      expect(tmr).toBeDefined()
      expect(tmr?.name).toContain('Tactical Medical Responder')
      expect(tmr?.alternateName).toBe('APH Tático')
    })

    it('should have WMR service', () => {
      const wmr = services.find(s =>
        s['@id']?.toString().includes('service-wmr')
      )
      expect(wmr).toBeDefined()
      expect(wmr?.name).toContain('Wilderness Medical Responder')
    })

    it('should have required properties for each service', () => {
      services.forEach(service => {
        expect(service).toHaveProperty('@id')
        expect(service).toHaveProperty('name')
        expect(service).toHaveProperty('description')
        expect(service).toHaveProperty('provider')
        expect(service).toHaveProperty('areaServed')
        expect(service).toHaveProperty('serviceType')
      })
    })

    it('should reference organization as provider', () => {
      services.forEach(service => {
        expect(service.provider['@id']).toContain('#organization')
      })
    })
  })

  describe('Schema.org compliance', () => {
    it('should have valid @context', () => {
      expect(ORGANIZATION_STRUCTURED_DATA['@context']).toBe(
        'https://schema.org'
      )
    })

    it('should have all @type values as strings', () => {
      const checkTypes = (obj: Record<string, unknown>): void => {
        if (obj['@type']) {
          expect(typeof obj['@type']).toBe('string')
        }
        Object.values(obj).forEach(value => {
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            checkTypes(value as Record<string, unknown>)
          }
        })
      }

      ORGANIZATION_STRUCTURED_DATA['@graph'].forEach(item => {
        checkTypes(item as Record<string, unknown>)
      })
    })

    it('should have all @id values as strings', () => {
      const checkIds = (obj: Record<string, unknown>): void => {
        if (obj['@id']) {
          expect(typeof obj['@id']).toBe('string')
          expect(obj['@id']).toMatch(/^https:\/\//)
        }
        Object.values(obj).forEach(value => {
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            checkIds(value as Record<string, unknown>)
          }
        })
      }

      ORGANIZATION_STRUCTURED_DATA['@graph'].forEach(item => {
        checkIds(item as Record<string, unknown>)
      })
    })
  })
})
