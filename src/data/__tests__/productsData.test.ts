import { describe, expect, it } from 'vitest'

import type { Product } from '../../components/sections/ProductsModal/types'
import { PRODUCTS_MODAL_CONFIG, productsData } from '../productsData'

describe('productsData', () => {
  describe('productsData array', () => {
    it('should be an array', () => {
      expect(Array.isArray(productsData)).toBe(true)
    })

    it('should have 3 products', () => {
      expect(productsData).toHaveLength(3)
    })

    it('should have correct structure for each product', () => {
      productsData.forEach((product: Product) => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('description')
        expect(product).toHaveProperty('price')
        expect(product).toHaveProperty('image')
      })
    })

    it('should have unique ids', () => {
      const ids = productsData.map(p => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have non-empty names', () => {
      productsData.forEach((product: Product) => {
        expect(product.name.length).toBeGreaterThan(0)
      })
    })

    it('should have non-empty descriptions', () => {
      productsData.forEach((product: Product) => {
        expect(product.description.length).toBeGreaterThan(0)
      })
    })

    it('should have images defined', () => {
      productsData.forEach((product: Product) => {
        expect(product.image).toBeDefined()
      })
    })
  })

  describe('individual products', () => {
    it('should have tourniquet product', () => {
      const tourniquet = productsData.find(p => p.id === 'tourniquet')
      expect(tourniquet).toBeDefined()
      expect(tourniquet?.name).toContain('Torniquete')
      expect(tourniquet?.description).toContain('hemorragias')
    })

    it('should have hemostatic product', () => {
      const hemostatic = productsData.find(p => p.id === 'hemostatic')
      expect(hemostatic).toBeDefined()
      expect(hemostatic?.name).toContain('Hemostático')
      expect(hemostatic?.description).toContain('sangramento')
    })

    it('should have IFAK kit product', () => {
      const ifak = productsData.find(p => p.id === 'kit-ifak')
      expect(ifak).toBeDefined()
      expect(ifak?.name).toContain('IFAK')
      expect(ifak?.description).toContain('primeiros socorros')
    })
  })

  describe('PRODUCTS_MODAL_CONFIG', () => {
    it('should have title', () => {
      expect(PRODUCTS_MODAL_CONFIG).toHaveProperty('title')
      expect(PRODUCTS_MODAL_CONFIG.title.length).toBeGreaterThan(0)
    })

    it('should have subtitle', () => {
      expect(PRODUCTS_MODAL_CONFIG).toHaveProperty('subtitle')
      expect(PRODUCTS_MODAL_CONFIG.subtitle.length).toBeGreaterThan(0)
    })

    it('should have ctaText', () => {
      expect(PRODUCTS_MODAL_CONFIG).toHaveProperty('ctaText')
      expect(PRODUCTS_MODAL_CONFIG.ctaText).toBe('Falar com Especialista')
    })

    it('should have whatsappMessage', () => {
      expect(PRODUCTS_MODAL_CONFIG).toHaveProperty('whatsappMessage')
      expect(PRODUCTS_MODAL_CONFIG.whatsappMessage).toContain('equipamentos')
    })

    it('should have professional content', () => {
      expect(PRODUCTS_MODAL_CONFIG.title).not.toContain('TODO')
      expect(PRODUCTS_MODAL_CONFIG.subtitle).not.toContain('Lorem')
    })
  })
})
