import type { Plugin } from 'vite'

/**
 * Canonical production origin. Used whenever `VITE_SITE_URL` is not provided
 * (local `vite dev`, tests, or a misconfigured deploy) so the generated HTML
 * never ships an unresolved `%SITE_URL%` token.
 */
export const DEFAULT_SITE_URL = 'https://emr.international'

/**
 * Placeholder replaced in `index.html`. Kept distinct from Vite's native
 * `%VITE_*%` HTML replacement so the two mechanisms never collide.
 */
export const SITE_URL_TOKEN = '%SITE_URL%'

/**
 * Normalizes a site URL: trims whitespace and drops trailing slashes so
 * callers can safely append paths (`${siteUrl}/social-image.jpg`).
 * Falls back to {@link DEFAULT_SITE_URL} for empty/undefined input.
 */
export const resolveSiteUrl = (raw?: string): string => {
  const value = raw?.trim()
  if (!value) return DEFAULT_SITE_URL
  return value.replace(/\/+$/, '')
}

/** Replaces every {@link SITE_URL_TOKEN} occurrence in an HTML string. */
export const injectSiteUrl = (html: string, siteUrl: string): string =>
  html.split(SITE_URL_TOKEN).join(siteUrl)

/**
 * Vite plugin: single source of truth for the site origin in `index.html`.
 *
 * Replaces `%SITE_URL%` in canonical / Open Graph / Twitter tags with the value
 * of `VITE_SITE_URL` at build time. Set it per environment (Vercel dashboard,
 * `.env.local`, `.env.production`) instead of hardcoding the domain across meta
 * tags — which also keeps preview deployments pointing at their own origin.
 *
 * `vite` is imported dynamically inside the hook so this module stays free of
 * the esbuild runtime and its pure helpers remain unit-testable.
 */
export function htmlSiteUrl(): Plugin {
  let siteUrl = DEFAULT_SITE_URL

  return {
    name: 'html-site-url',
    enforce: 'pre',
    async config(_config, { mode }) {
      const { loadEnv } = await import('vite')
      const env = loadEnv(mode, process.cwd(), '')
      siteUrl = resolveSiteUrl(env.VITE_SITE_URL)
    },
    transformIndexHtml(html) {
      return injectSiteUrl(html, siteUrl)
    },
  }
}
