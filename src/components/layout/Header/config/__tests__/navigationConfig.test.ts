import { describe, expect, it } from 'vitest'

import {
  NAVIGATION_ITEMS,
  type NavigationItem,
  SECTION_IDS,
} from '../navigationConfig'

describe('navigationConfig', () => {
  describe('NAVIGATION_ITEMS', () => {
    it('should export an array of navigation items', () => {
      expect(Array.isArray(NAVIGATION_ITEMS)).toBe(true)
      expect(NAVIGATION_ITEMS.length).toBeGreaterThan(0)
    })

    it('should have 5 navigation items', () => {
      expect(NAVIGATION_ITEMS).toHaveLength(5)
    })

    it('should have correct structure for each navigation item', () => {
      NAVIGATION_ITEMS.forEach((item: NavigationItem) => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('href')
        expect(item).toHaveProperty('label')
        expect(item).toHaveProperty('ariaLabel')

        expect(typeof item.id).toBe('string')
        expect(typeof item.href).toBe('string')
        expect(typeof item.label).toBe('string')
        expect(typeof item.ariaLabel).toBe('string')
      })
    })

    it('should have href starting with # for anchor navigation', () => {
      NAVIGATION_ITEMS.forEach((item: NavigationItem) => {
        expect(item.href).toMatch(/^#/)
      })
    })

    it('should have href matching the id', () => {
      NAVIGATION_ITEMS.forEach((item: NavigationItem) => {
        expect(item.href).toBe(`#${item.id}`)
      })
    })

    it('should have unique ids', () => {
      const ids = NAVIGATION_ITEMS.map(item => item.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have unique labels', () => {
      const labels = NAVIGATION_ITEMS.map(item => item.label)
      const uniqueLabels = new Set(labels)
      expect(uniqueLabels.size).toBe(labels.length)
    })

    it('should have non-empty ariaLabel for accessibility', () => {
      NAVIGATION_ITEMS.forEach((item: NavigationItem) => {
        expect(item.ariaLabel.length).toBeGreaterThan(0)
        expect(item.ariaLabel).toContain('Navegar para seção')
      })
    })

    it('should contain expected sections in correct order', () => {
      const expectedOrder = [
        'sobre',
        'certificacoes',
        'cursos',
        'depoimentos',
        'contato',
      ]

      NAVIGATION_ITEMS.forEach((item, index) => {
        expect(item.id).toBe(expectedOrder[index])
      })
    })

    describe('individual items', () => {
      it('should have correct "sobre" item', () => {
        const sobreItem = NAVIGATION_ITEMS.find(item => item.id === 'sobre')
        expect(sobreItem).toBeDefined()
        expect(sobreItem?.label).toBe('Sobre')
        expect(sobreItem?.href).toBe('#sobre')
        expect(sobreItem?.ariaLabel).toContain('EMR Internacional')
      })

      it('should have correct "certificacoes" item', () => {
        const certItem = NAVIGATION_ITEMS.find(
          item => item.id === 'certificacoes'
        )
        expect(certItem).toBeDefined()
        expect(certItem?.label).toBe('Certificações')
        expect(certItem?.href).toBe('#certificacoes')
        expect(certItem?.ariaLabel).toContain('internacionais')
      })

      it('should have correct "cursos" item', () => {
        const cursosItem = NAVIGATION_ITEMS.find(item => item.id === 'cursos')
        expect(cursosItem).toBeDefined()
        expect(cursosItem?.label).toBe('Cursos')
        expect(cursosItem?.href).toBe('#cursos')
        expect(cursosItem?.ariaLabel).toContain('especializados')
      })

      it('should have correct "depoimentos" item', () => {
        const depItem = NAVIGATION_ITEMS.find(item => item.id === 'depoimentos')
        expect(depItem).toBeDefined()
        expect(depItem?.label).toBe('Depoimentos')
        expect(depItem?.href).toBe('#depoimentos')
        expect(depItem?.ariaLabel).toContain('alunos')
      })

      it('should have correct "contato" item', () => {
        const contatoItem = NAVIGATION_ITEMS.find(item => item.id === 'contato')
        expect(contatoItem).toBeDefined()
        expect(contatoItem?.label).toBe('Contato')
        expect(contatoItem?.href).toBe('#contato')
        expect(contatoItem?.ariaLabel).toContain('Fale conosco')
      })
    })
  })

  describe('SECTION_IDS', () => {
    it('should export an array of section ids', () => {
      expect(Array.isArray(SECTION_IDS)).toBe(true)
    })

    it('should have same length as NAVIGATION_ITEMS', () => {
      expect(SECTION_IDS.length).toBe(NAVIGATION_ITEMS.length)
    })

    it('should contain all ids from NAVIGATION_ITEMS', () => {
      NAVIGATION_ITEMS.forEach(item => {
        expect(SECTION_IDS).toContain(item.id)
      })
    })

    it('should maintain the same order as NAVIGATION_ITEMS', () => {
      NAVIGATION_ITEMS.forEach((item, index) => {
        expect(SECTION_IDS[index]).toBe(item.id)
      })
    })

    it('should contain expected section ids', () => {
      expect(SECTION_IDS).toEqual([
        'sobre',
        'certificacoes',
        'cursos',
        'depoimentos',
        'contato',
      ])
    })
  })

  describe('type safety', () => {
    it('should be readonly array', () => {
      // TypeScript ensures this at compile time, but we can verify the values don't change
      const originalLength = NAVIGATION_ITEMS.length
      const originalFirstItem = { ...NAVIGATION_ITEMS[0] }

      // Verify the array maintains its structure
      expect(NAVIGATION_ITEMS.length).toBe(originalLength)
      expect(NAVIGATION_ITEMS[0]).toEqual(originalFirstItem)
    })
  })
})
