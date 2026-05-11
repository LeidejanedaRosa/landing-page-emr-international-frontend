import { describe, expect, it } from 'vitest'

import { BUSINESS_HOURS, NAVIGATION_LINKS, SOCIAL_LINKS } from '../constants'

describe('Footer constants', () => {
  describe('SOCIAL_LINKS', () => {
    it('should export an array of social links', () => {
      expect(Array.isArray(SOCIAL_LINKS)).toBe(true)
      expect(SOCIAL_LINKS.length).toBe(2)
    })

    it('should have correct structure for each social link', () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link).toHaveProperty('id')
        expect(link).toHaveProperty('name')
        expect(link).toHaveProperty('href')
        expect(link).toHaveProperty('ariaLabel')
        expect(link).toHaveProperty('bgColor')
        expect(link).toHaveProperty('hoverBgColor')
        expect(link).toHaveProperty('iconName')

        expect(typeof link.id).toBe('string')
        expect(typeof link.name).toBe('string')
        expect(typeof link.href).toBe('string')
        expect(typeof link.ariaLabel).toBe('string')
        expect(typeof link.bgColor).toBe('string')
        expect(typeof link.hoverBgColor).toBe('string')
        expect(typeof link.iconName).toBe('string')
      })
    })

    it('should have valid URLs for all social links', () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link.href).toMatch(/^https:\/\//)
      })
    })

    it('should have unique ids', () => {
      const ids = SOCIAL_LINKS.map(link => link.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have aria labels mentioning new tab', () => {
      SOCIAL_LINKS.forEach(link => {
        expect(link.ariaLabel.toLowerCase()).toContain('abre em nova aba')
      })
    })

    describe('Instagram link', () => {
      const instagramLink = SOCIAL_LINKS.find(link => link.id === 'instagram')

      it('should exist', () => {
        expect(instagramLink).toBeDefined()
      })

      it('should have correct properties', () => {
        expect(instagramLink?.name).toBe('Instagram')
        expect(instagramLink?.href).toBe(
          'https://www.instagram.com/emr_international/'
        )
        expect(instagramLink?.iconName).toBe('instagram')
      })

      it('should have gradient background colors', () => {
        expect(instagramLink?.bgColor).toContain('bg-gradient-to-br')
      })
    })

    describe('WhatsApp link', () => {
      const whatsappLink = SOCIAL_LINKS.find(link => link.id === 'whatsapp')

      it('should exist', () => {
        expect(whatsappLink).toBeDefined()
      })

      it('should have correct properties', () => {
        expect(whatsappLink?.name).toBe('WhatsApp')
        expect(whatsappLink?.href).toMatch(/^https:\/\/wa\.me\/\d+$/)
        expect(whatsappLink?.iconName).toBe('whatsapp')
      })

      it('should have WhatsApp brand color', () => {
        expect(whatsappLink?.bgColor).toContain('#128C7E')
      })
    })
  })

  describe('NAVIGATION_LINKS', () => {
    it('should export an array of navigation links', () => {
      expect(Array.isArray(NAVIGATION_LINKS)).toBe(true)
      expect(NAVIGATION_LINKS.length).toBe(5)
    })

    it('should have correct structure for each navigation link', () => {
      NAVIGATION_LINKS.forEach(link => {
        expect(link).toHaveProperty('id')
        expect(link).toHaveProperty('href')
        expect(link).toHaveProperty('label')
        expect(link).toHaveProperty('ariaLabel')

        expect(typeof link.id).toBe('string')
        expect(typeof link.href).toBe('string')
        expect(typeof link.label).toBe('string')
        expect(typeof link.ariaLabel).toBe('string')
      })
    })

    it('should have href starting with # for anchor navigation', () => {
      NAVIGATION_LINKS.forEach(link => {
        expect(link.href).toMatch(/^#/)
      })
    })

    it('should have href matching the id', () => {
      NAVIGATION_LINKS.forEach(link => {
        expect(link.href).toBe(`#${link.id}`)
      })
    })

    it('should have unique ids', () => {
      const ids = NAVIGATION_LINKS.map(link => link.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should contain expected sections in correct order', () => {
      const expectedOrder = [
        'sobre',
        'certificacoes',
        'treinamentos',
        'depoimentos',
        'contato',
      ]

      NAVIGATION_LINKS.forEach((link, index) => {
        expect(link.id).toBe(expectedOrder[index])
      })
    })

    it('should have only contato link disabled', () => {
      const enabledLinks = NAVIGATION_LINKS.filter(link => !link.disabled)
      const disabledLinks = NAVIGATION_LINKS.filter(link => link.disabled)

      expect(enabledLinks.length).toBe(4)
      expect(disabledLinks.length).toBe(1)
      expect(disabledLinks[0].id).toBe('contato')
    })

    it('should have descriptive aria labels', () => {
      NAVIGATION_LINKS.forEach(link => {
        expect(link.ariaLabel.length).toBeGreaterThan(0)
        expect(link.ariaLabel.toLowerCase()).toContain('navegar')
      })
    })
  })

  describe('BUSINESS_HOURS', () => {
    it('should have days property', () => {
      expect(BUSINESS_HOURS).toHaveProperty('days')
      expect(typeof BUSINESS_HOURS.days).toBe('string')
    })

    it('should have hours property', () => {
      expect(BUSINESS_HOURS).toHaveProperty('hours')
      expect(typeof BUSINESS_HOURS.hours).toBe('string')
    })

    it('should have correct business days', () => {
      expect(BUSINESS_HOURS.days).toBe('Segunda a Sexta')
    })

    it('should have correct business hours', () => {
      expect(BUSINESS_HOURS.hours).toBe('8h às 18h')
    })
  })
})
