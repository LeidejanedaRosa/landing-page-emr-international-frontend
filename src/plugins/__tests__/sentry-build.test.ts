import { describe, expect, it } from 'vitest'

import { resolveSentryBuild, type SentryBuildEnv } from '../sentry-build'

const productionBuild: SentryBuildEnv = {
  NODE_ENV: 'production',
  SENTRY_AUTH_TOKEN: 'token',
  SENTRY_ORG: 'org',
  SENTRY_PROJECT: 'project',
}

describe('resolveSentryBuild', () => {
  it('skips Sentry outside production builds', () => {
    expect(
      resolveSentryBuild({ ...productionBuild, NODE_ENV: 'development' })
    ).toBeNull()
    expect(
      resolveSentryBuild({ ...productionBuild, NODE_ENV: undefined })
    ).toBeNull()
  })

  it('skips Sentry on Vercel preview deployments', () => {
    expect(
      resolveSentryBuild({
        ...productionBuild,
        VERCEL_ENV: 'preview',
        VERCEL_GIT_COMMIT_SHA: 'abc123',
      })
    ).toBeNull()
  })

  it('reports on Vercel production deployments', () => {
    expect(
      resolveSentryBuild({
        ...productionBuild,
        VERCEL_ENV: 'production',
        VERCEL_GIT_COMMIT_SHA: 'abc123',
      })
    ).toEqual({
      org: 'org',
      project: 'project',
      authToken: 'token',
      release: 'abc123',
    })
  })

  it.each(['SENTRY_AUTH_TOKEN', 'SENTRY_ORG', 'SENTRY_PROJECT'] as const)(
    'skips Sentry when %s is missing',
    key => {
      expect(resolveSentryBuild({ ...productionBuild, [key]: '' })).toBeNull()
    }
  )

  it('prefers an explicit VITE_APP_VERSION over the commit SHA', () => {
    expect(
      resolveSentryBuild({
        ...productionBuild,
        VITE_APP_VERSION: '1.4.0',
        VERCEL_GIT_COMMIT_SHA: 'abc123',
      })?.release
    ).toBe('1.4.0')
  })

  it('falls back to the commit SHA when VITE_APP_VERSION is blank', () => {
    expect(
      resolveSentryBuild({
        ...productionBuild,
        VITE_APP_VERSION: '  ',
        VERCEL_GIT_COMMIT_SHA: 'abc123',
      })?.release
    ).toBe('abc123')
  })

  it.each([
    '$VERCEL_GIT_COMMIT_SHA',
    '${VERCEL_GIT_COMMIT_SHA}',
    ' $npm_package_version ',
  ])(
    'ignores an unexpanded VITE_APP_VERSION reference (%s) and uses the commit',
    unexpanded => {
      expect(
        resolveSentryBuild({
          ...productionBuild,
          VITE_APP_VERSION: unexpanded,
          VERCEL_GIT_COMMIT_SHA: 'abc123',
        })?.release
      ).toBe('abc123')
    }
  )

  it('leaves the release undefined so the plugin can detect it from git', () => {
    const config = resolveSentryBuild(productionBuild)

    expect(config).not.toBeNull()
    expect(config?.release).toBeUndefined()
  })
})
