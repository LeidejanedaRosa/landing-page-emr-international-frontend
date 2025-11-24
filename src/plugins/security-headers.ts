import type { IncomingMessage, ServerResponse } from 'http'
import type { Plugin } from 'vite'

export interface SecurityHeadersOptions {
  csp?: string

  frameOptions?: 'DENY' | 'SAMEORIGIN' | false

  contentTypeOptions?: boolean

  referrerPolicy?: string | false

  permissionsPolicy?: string | false
}

// Helper: Set header conditionally
const setHeaderIf = (
  res: ServerResponse,
  condition: any,
  header: string,
  value: string
) => {
  if (condition) {
    res.setHeader(header, value)
  }
}

// Helper: Check if connection is HTTPS
const isSecureConnection = (req: IncomingMessage): boolean => {
  return (
    req.headers['x-forwarded-proto'] === 'https' ||
    Boolean(req.socket && 'encrypted' in req.socket && req.socket.encrypted)
  )
}

export function securityHeaders(options: SecurityHeadersOptions = {}): Plugin {
  const {
    csp,
    frameOptions = 'DENY',
    contentTypeOptions = true,
    referrerPolicy = 'strict-origin-when-cross-origin',
    permissionsPolicy = 'camera=(), microphone=(), geolocation=()',
  } = options

  return {
    name: 'security-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        setHeaderIf(
          res,
          csp !== undefined && csp !== '',
          'Content-Security-Policy',
          csp!
        )
        setHeaderIf(res, frameOptions, 'X-Frame-Options', frameOptions || '')
        setHeaderIf(
          res,
          contentTypeOptions,
          'X-Content-Type-Options',
          'nosniff'
        )
        setHeaderIf(
          res,
          referrerPolicy,
          'Referrer-Policy',
          referrerPolicy || ''
        )
        setHeaderIf(
          res,
          permissionsPolicy,
          'Permissions-Policy',
          permissionsPolicy || ''
        )

        if (isSecureConnection(req)) {
          res.setHeader(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
          )
        }

        next()
      })
    },
  }
}
