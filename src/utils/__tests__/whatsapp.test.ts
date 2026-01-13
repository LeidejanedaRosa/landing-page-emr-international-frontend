import { describe, expect, it } from 'vitest'

import {
  buildCourseWhatsAppUrl,
  buildWhatsAppMessageUrl,
  getWhatsAppUrl,
  WHATSAPP_CONFIG,
} from '../whatsapp'

describe('whatsapp utils', () => {
  describe('WHATSAPP_CONFIG', () => {
    it('should have phoneNumber', () => {
      expect(WHATSAPP_CONFIG.phoneNumber).toBeDefined()
      expect(typeof WHATSAPP_CONFIG.phoneNumber).toBe('string')
    })

    it('should have valid phone number format', () => {
      // Brazilian format: country code + area code + number
      expect(WHATSAPP_CONFIG.phoneNumber).toMatch(/^55\d{10,11}$/)
    })

    it('should have baseUrl', () => {
      expect(WHATSAPP_CONFIG.baseUrl).toBe('https://wa.me')
    })
  })

  describe('getWhatsAppUrl', () => {
    it('should return URL with default phone number', () => {
      const url = getWhatsAppUrl()
      expect(url).toBe(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`)
    })

    it('should return URL with custom phone number', () => {
      const customNumber = '5511999999999'
      const url = getWhatsAppUrl(customNumber)
      expect(url).toBe(`https://wa.me/${customNumber}`)
    })

    it('should return valid wa.me URL', () => {
      const url = getWhatsAppUrl()
      expect(url).toMatch(/^https:\/\/wa\.me\/\d+$/)
    })
  })

  describe('buildWhatsAppMessageUrl', () => {
    it('should build URL with encoded message', () => {
      const message = 'Hello World'
      const url = buildWhatsAppMessageUrl(message)

      expect(url).toContain('https://wa.me/')
      expect(url).toContain('?text=')
      expect(url).toContain('Hello%20World')
    })

    it('should use default phone number', () => {
      const message = 'Test'
      const url = buildWhatsAppMessageUrl(message)

      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber)
    })

    it('should use custom phone number', () => {
      const message = 'Test'
      const customNumber = '5511888888888'
      const url = buildWhatsAppMessageUrl(message, customNumber)

      expect(url).toContain(customNumber)
      expect(url).not.toContain(WHATSAPP_CONFIG.phoneNumber)
    })

    it('should encode special characters', () => {
      const message = 'Olá! Como está?'
      const url = buildWhatsAppMessageUrl(message)

      // Note: encodeURIComponent does not encode ! per URI spec
      // It does encode: á (to %C3%A1) and ? in query value (to %3F)
      expect(url).not.toContain('á')
      expect(url).toContain(encodeURIComponent(message))
    })

    it('should encode emojis', () => {
      const message = 'Hello 👋'
      const url = buildWhatsAppMessageUrl(message)

      expect(url).toContain(encodeURIComponent('👋'))
    })

    it('should handle empty message', () => {
      const url = buildWhatsAppMessageUrl('')

      expect(url).toContain('?text=')
      expect(url).toMatch(/\?text=$/)
    })

    it('should handle long messages', () => {
      const longMessage = 'A'.repeat(1000)
      const url = buildWhatsAppMessageUrl(longMessage)

      expect(url).toContain('?text=')
      expect(url.length).toBeGreaterThan(1000)
    })
  })

  describe('buildCourseWhatsAppUrl', () => {
    it('should build URL with course title in message', () => {
      const courseTitle = 'Tactical Medical Response'
      const url = buildCourseWhatsAppUrl(courseTitle)

      expect(url).toContain(encodeURIComponent(courseTitle))
    })

    it('should include interest phrase', () => {
      const courseTitle = 'TMR'
      const url = buildCourseWhatsAppUrl(courseTitle)

      expect(url).toContain(encodeURIComponent('Tenho interesse'))
    })

    it('should include request for information', () => {
      const courseTitle = 'WMR'
      const url = buildCourseWhatsAppUrl(courseTitle)

      expect(url).toContain(encodeURIComponent('mais informações'))
    })

    it('should use default phone number', () => {
      const url = buildCourseWhatsAppUrl('Test Course')

      expect(url).toContain(WHATSAPP_CONFIG.phoneNumber)
    })

    it('should return valid WhatsApp URL', () => {
      const url = buildCourseWhatsAppUrl('Test')

      expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
    })

    it('should handle course titles with special characters', () => {
      const courseTitle = 'Curso Básico - Nível 1'
      const url = buildCourseWhatsAppUrl(courseTitle)

      expect(url).toContain(encodeURIComponent(courseTitle))
    })
  })

  describe('URL format validation', () => {
    it('should generate clickable WhatsApp URLs', () => {
      const url = buildWhatsAppMessageUrl('Test message')

      // URL should be parseable
      expect(() => new URL(url)).not.toThrow()

      const parsedUrl = new URL(url)
      expect(parsedUrl.protocol).toBe('https:')
      expect(parsedUrl.hostname).toBe('wa.me')
      expect(parsedUrl.searchParams.has('text')).toBe(true)
    })

    it('should preserve message content after encoding/decoding', () => {
      const originalMessage = 'Olá! Tenho interesse no curso.'
      const url = buildWhatsAppMessageUrl(originalMessage)

      const parsedUrl = new URL(url)
      const decodedMessage = parsedUrl.searchParams.get('text')

      expect(decodedMessage).toBe(originalMessage)
    })
  })
})
