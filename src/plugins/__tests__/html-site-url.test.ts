import { describe, expect, it } from 'vitest'

import {
  DEFAULT_SITE_URL,
  htmlSiteUrl,
  injectSiteUrl,
  resolveSiteUrl,
  SITE_URL_TOKEN,
} from '../html-site-url'

describe('htmlSiteUrl plugin', () => {
  describe('resolveSiteUrl', () => {
    it('falls back to the default origin when value is undefined', () => {
      expect(resolveSiteUrl(undefined)).toBe(DEFAULT_SITE_URL)
    })

    it('falls back to the default origin when value is empty or whitespace', () => {
      expect(resolveSiteUrl('')).toBe(DEFAULT_SITE_URL)
      expect(resolveSiteUrl('   ')).toBe(DEFAULT_SITE_URL)
    })

    it('trims surrounding whitespace', () => {
      expect(resolveSiteUrl('  https://emr.international  ')).toBe(
        'https://emr.international'
      )
    })

    it('strips trailing slashes so paths can be appended safely', () => {
      expect(resolveSiteUrl('https://emr.international/')).toBe(
        'https://emr.international'
      )
      expect(resolveSiteUrl('https://emr.international///')).toBe(
        'https://emr.international'
      )
    })

    it('preserves a preview deployment origin', () => {
      expect(resolveSiteUrl('https://emr-git-feature.vercel.app')).toBe(
        'https://emr-git-feature.vercel.app'
      )
    })
  })

  describe('injectSiteUrl', () => {
    it('replaces every token occurrence', () => {
      const html = `
        <link rel="canonical" href="${SITE_URL_TOKEN}/" />
        <meta property="og:image" content="${SITE_URL_TOKEN}/social-image.jpg" />
      `
      const result = injectSiteUrl(html, 'https://emr.international')

      expect(result).not.toContain(SITE_URL_TOKEN)
      expect(result).toContain('href="https://emr.international/"')
      expect(result).toContain(
        'content="https://emr.international/social-image.jpg"'
      )
    })

    it('returns the html untouched when no token is present', () => {
      const html = '<html><head></head><body></body></html>'
      expect(injectSiteUrl(html, 'https://emr.international')).toBe(html)
    })
  })

  describe('plugin object', () => {
    it('has the expected name and runs before other plugins', () => {
      const plugin = htmlSiteUrl()
      expect(plugin.name).toBe('html-site-url')
      expect(plugin.enforce).toBe('pre')
    })

    it('exposes a transformIndexHtml hook', () => {
      const plugin = htmlSiteUrl()
      expect(plugin.transformIndexHtml).toBeTypeOf('function')
    })

    it('injects the default origin until config() resolves an env value', () => {
      const plugin = htmlSiteUrl()
      const transform = plugin.transformIndexHtml as (_html: string) => string

      expect(transform(`${SITE_URL_TOKEN}/social-image.jpg`)).toBe(
        `${DEFAULT_SITE_URL}/social-image.jpg`
      )
    })
  })
})
