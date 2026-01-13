import type { IncomingMessage, ServerResponse } from 'http'
import type { ViteDevServer } from 'vite'
import { describe, expect, it, vi } from 'vitest'

import {
  securityHeaders,
  type SecurityHeadersOptions,
} from '../security-headers'

// Mock response object
const createMockResponse = () => {
  const headers: Record<string, string> = {}
  return {
    setHeader: vi.fn((name: string, value: string) => {
      headers[name] = value
    }),
    getHeaders: () => headers,
  } as unknown as ServerResponse
}

const createMockRequest = (
  options: { https?: boolean; forwardedProto?: string } = {}
) => {
  const req = {
    headers: {} as Record<string, string>,
    socket: {} as any,
  } as unknown as IncomingMessage

  if (options.forwardedProto) {
    req.headers['x-forwarded-proto'] = options.forwardedProto
  }

  if (options.https) {
    req.socket = { encrypted: true }
  }

  return req
}

const getMiddleware = (options?: SecurityHeadersOptions) => {
  const plugin = securityHeaders(options)
  let middleware: (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ) => void

  const mockServer = {
    middlewares: {
      use: (fn: typeof middleware) => {
        middleware = fn
      },
    },
  } as unknown as ViteDevServer

  plugin.configureServer!(mockServer)
  return middleware!
}

describe('securityHeaders plugin', () => {
  describe('plugin configuration', () => {
    it('should have correct plugin name', () => {
      const plugin = securityHeaders()
      expect(plugin.name).toBe('security-headers')
    })

    it('should have configureServer method', () => {
      const plugin = securityHeaders()
      expect(plugin.configureServer).toBeDefined()
      expect(typeof plugin.configureServer).toBe('function')
    })
  })

  describe('default headers', () => {
    it('should set X-Frame-Options to DENY by default', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'DENY')
    })

    it('should set X-Content-Type-Options to nosniff by default', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'X-Content-Type-Options',
        'nosniff'
      )
    })

    it('should set Referrer-Policy by default', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Referrer-Policy',
        'strict-origin-when-cross-origin'
      )
    })

    it('should set Permissions-Policy by default', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=()'
      )
    })

    it('should not set Content-Security-Policy by default', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'Content-Security-Policy',
        expect.any(String)
      )
    })

    it('should call next() to continue middleware chain', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe('custom options', () => {
    it('should set CSP when provided', () => {
      const csp = "default-src 'self'"
      const middleware = getMiddleware({ csp })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith('Content-Security-Policy', csp)
    })

    it('should not set CSP when empty string', () => {
      const middleware = getMiddleware({ csp: '' })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'Content-Security-Policy',
        expect.any(String)
      )
    })

    it('should set X-Frame-Options to SAMEORIGIN when configured', () => {
      const middleware = getMiddleware({ frameOptions: 'SAMEORIGIN' })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'X-Frame-Options',
        'SAMEORIGIN'
      )
    })

    it('should not set X-Frame-Options when disabled', () => {
      const middleware = getMiddleware({ frameOptions: false })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'X-Frame-Options',
        expect.any(String)
      )
    })

    it('should not set X-Content-Type-Options when disabled', () => {
      const middleware = getMiddleware({ contentTypeOptions: false })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'X-Content-Type-Options',
        expect.any(String)
      )
    })

    it('should set custom Referrer-Policy', () => {
      const middleware = getMiddleware({ referrerPolicy: 'no-referrer' })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Referrer-Policy',
        'no-referrer'
      )
    })

    it('should not set Referrer-Policy when disabled', () => {
      const middleware = getMiddleware({ referrerPolicy: false })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'Referrer-Policy',
        expect.any(String)
      )
    })

    it('should set custom Permissions-Policy', () => {
      const customPolicy = 'camera=(self), microphone=()'
      const middleware = getMiddleware({ permissionsPolicy: customPolicy })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Permissions-Policy',
        customPolicy
      )
    })

    it('should not set Permissions-Policy when disabled', () => {
      const middleware = getMiddleware({ permissionsPolicy: false })
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'Permissions-Policy',
        expect.any(String)
      )
    })
  })

  describe('HTTPS detection and HSTS', () => {
    it('should set HSTS header for HTTPS connections via encrypted socket', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest({ https: true })
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    })

    it('should set HSTS header when x-forwarded-proto is https', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest({ forwardedProto: 'https' })
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).toHaveBeenCalledWith(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    })

    it('should not set HSTS header for HTTP connections', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'Strict-Transport-Security',
        expect.any(String)
      )
    })

    it('should not set HSTS when x-forwarded-proto is http', () => {
      const middleware = getMiddleware()
      const res = createMockResponse()
      const req = createMockRequest({ forwardedProto: 'http' })
      const next = vi.fn()

      middleware(req, res, next)

      expect(res.setHeader).not.toHaveBeenCalledWith(
        'Strict-Transport-Security',
        expect.any(String)
      )
    })
  })

  describe('SecurityHeadersOptions interface', () => {
    it('should accept empty options', () => {
      const options: SecurityHeadersOptions = {}
      const plugin = securityHeaders(options)
      expect(plugin.name).toBe('security-headers')
    })

    it('should accept all options', () => {
      const options: SecurityHeadersOptions = {
        csp: "default-src 'self'",
        frameOptions: 'SAMEORIGIN',
        contentTypeOptions: true,
        referrerPolicy: 'no-referrer',
        permissionsPolicy: 'camera=()',
      }
      const plugin = securityHeaders(options)
      expect(plugin.name).toBe('security-headers')
    })

    it('should accept disabled options', () => {
      const options: SecurityHeadersOptions = {
        frameOptions: false,
        referrerPolicy: false,
        permissionsPolicy: false,
        contentTypeOptions: false,
      }
      const middleware = getMiddleware(options)
      const res = createMockResponse()
      const req = createMockRequest()
      const next = vi.fn()

      middleware(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })
})
