import { describe, expect, it } from 'vitest'

import { COMPANY_LEGAL_INFO, formatCNPJ } from '../companyInfo'

describe('companyInfo', () => {
  describe('COMPANY_LEGAL_INFO', () => {
    it('should have cnpj property', () => {
      expect(COMPANY_LEGAL_INFO).toHaveProperty('cnpj')
      expect(typeof COMPANY_LEGAL_INFO.cnpj).toBe('string')
    })

    it('should have legalName property', () => {
      expect(COMPANY_LEGAL_INFO).toHaveProperty('legalName')
      expect(COMPANY_LEGAL_INFO.legalName).toBe('EMR International')
    })

    it('should have address object with required fields', () => {
      expect(COMPANY_LEGAL_INFO).toHaveProperty('address')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('street')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('number')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('complement')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('neighborhood')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('city')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('state')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('zipCode')
      expect(COMPANY_LEGAL_INFO.address).toHaveProperty('country')
    })

    it('should have country set to Brasil', () => {
      expect(COMPANY_LEGAL_INFO.address.country).toBe('Brasil')
    })

    it('should have contact object with required fields', () => {
      expect(COMPANY_LEGAL_INFO).toHaveProperty('contact')
      expect(COMPANY_LEGAL_INFO.contact).toHaveProperty('email')
      expect(COMPANY_LEGAL_INFO.contact).toHaveProperty('whatsapp')
    })
  })

  describe('formatCNPJ', () => {
    it('should format valid 14-digit CNPJ', () => {
      const result = formatCNPJ('12345678000199')
      expect(result).toBe('12.345.678/0001-99')
    })

    it('should format CNPJ with existing formatting', () => {
      const result = formatCNPJ('12.345.678/0001-99')
      expect(result).toBe('12.345.678/0001-99')
    })

    it('should return original string if not 14 digits', () => {
      expect(formatCNPJ('123')).toBe('123')
      expect(formatCNPJ('123456789012345')).toBe('123456789012345')
    })

    it('should handle empty string', () => {
      expect(formatCNPJ('')).toBe('')
    })

    it('should strip non-digit characters before formatting', () => {
      const result = formatCNPJ('12-345-678-0001-99')
      expect(result).toBe('12.345.678/0001-99')
    })

    it('should format placeholder CNPJ correctly', () => {
      const result = formatCNPJ('00000000000000')
      expect(result).toBe('00.000.000/0000-00')
    })
  })
})
