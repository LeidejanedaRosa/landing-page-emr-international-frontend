import { describe, expect, it } from 'vitest'

import type { Product } from '../../components/sections/ProductsModal/types'
import { PRODUCTS_MODAL_CONFIG, productsData } from '../productsData'

describe('productsData', () => {
  describe('productsData array', () => {
    it('should be an array', () => {
      expect(Array.isArray(productsData)).toBe(true)
    })

    it('should have 2 products', () => {
      expect(productsData).toHaveLength(2)
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
    it('should have FAK-b product', () => {
      const fakBasic = productsData.find(p => p.id === 'kit1')
      expect(fakBasic).toBeDefined()
      expect(fakBasic?.name).toContain('FAK-b')
      expect(fakBasic?.description).toContain('emergências básicas')
    })

    it('should have FRK-a product', () => {
      const frkAdvanced = productsData.find(p => p.id === 'kit2')
      expect(frkAdvanced).toBeDefined()
      expect(frkAdvanced?.name).toContain('FRK-a')
      expect(frkAdvanced?.description).toContain('primeiros socorristas')
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
