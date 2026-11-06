/** Build-time variables that decide whether a build reports to Sentry. */
export interface SentryBuildEnv {
  NODE_ENV?: string
  VERCEL_ENV?: string
  SENTRY_AUTH_TOKEN?: string
  SENTRY_ORG?: string
  SENTRY_PROJECT?: string
  VITE_APP_VERSION?: string
  VERCEL_GIT_COMMIT_SHA?: string
}

export interface SentryBuildConfig {
  org: string
  project: string
  authToken: string
  /** `undefined` lets the Sentry plugin detect the release from git. */
  release?: string
}

// Vercel does not expand `$VAR` references inside dashboard values: setting
// VITE_APP_VERSION to "$VERCEL_GIT_COMMIT_SHA" shipped that literal text as the
// release name, so any unexpanded reference counts as unset.
const UNEXPANDED_REFERENCE = /^\${?\w+}?$/

const explicitVersion = (value: string | undefined): string | undefined => {
  const version = value?.trim()
  if (!version || UNEXPANDED_REFERENCE.test(version)) return undefined
  return version
}

/**
 * Returns the Sentry release settings for this build, or `null` when the build
 * must not create a release nor upload source maps.
 */
export const resolveSentryBuild = (
  env: SentryBuildEnv
): SentryBuildConfig | null => {
  if (env.NODE_ENV !== 'production') return null

  // Every PR — Dependabot's included — gets a Vercel preview build that never
  // reaches production; creating a release for each one floods Sentry with
  // releases and deploy e-mails.
  if (env.VERCEL_ENV === 'preview') return null

  const {
    SENTRY_AUTH_TOKEN: authToken,
    SENTRY_ORG: org,
    SENTRY_PROJECT: project,
  } = env
  if (!authToken || !org || !project) return null

  const release =
    explicitVersion(env.VITE_APP_VERSION) ||
    env.VERCEL_GIT_COMMIT_SHA ||
    undefined

  return { org, project, authToken, release }
}
