import type { Plugin } from 'vite'

export interface SecurityHeadersOptions {
  csp?: string
  frameOptions?: 'DENY' | 'SAMEORIGIN' | false
  contentTypeOptions?: boolean
  referrerPolicy?: string | false
  permissionsPolicy?: string | false
}
export declare function securityHeaders(
  options?: SecurityHeadersOptions
): Plugin
