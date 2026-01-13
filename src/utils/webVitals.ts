import React from 'react'

import * as Sentry from '@sentry/react'
import { type Metric } from 'web-vitals'

export interface WebVitalsConfig {
  endpoint?: string
  // eslint-disable-next-line no-unused-vars
  onMetric?: (_metric: Metric) => void

  debug?: boolean
}

interface MetricData {
  name: string
  value: number
  rating: string
  delta: number
  id: string
  timestamp: number
  url: string
  userAgent: string
  connection: string
}

const THRESHOLDS = {
  // Largest Contentful Paint - Good: ≤2.5s
  LCP: { good: 2500, poor: 4000 },
  // Interaction to Next Paint - Good: ≤200ms
  INP: { good: 200, poor: 500 },
  // Cumulative Layout Shift - Good: ≤0.1
  CLS: { good: 0.1, poor: 0.25 },
  // First Contentful Paint - Good: ≤1.5s
  FCP: { good: 1500, poor: 3000 },
  // Time to First Byte - Good: ≤200ms
  TTFB: { good: 200, poor: 1800 },
} as const

const classifyMetric = (
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

// Helper: Envia métrica para endpoint
const sendMetricToEndpoint = async (endpoint: string, data: MetricData) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
  } catch {
    // Silently fail - metrics are not critical for app functionality
  } finally {
    clearTimeout(timeoutId)
  }
}

// Helper: Envia para Google Analytics se disponível
const sendToGoogleAnalytics = (metric: Metric) => {
  if (
    typeof window === 'undefined' ||
    typeof (window as any).gtag !== 'function'
  ) {
    return
  }

  // CLS is a unitless score (0-1 range), scale by 10000 for GA integer format
  // Other metrics are already in milliseconds
  ;(window as any).gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 10000 : metric.value
    ),
    non_interaction: true,
  })
}

const sendToSentry = (metric: Metric, rating: string) => {
  if (import.meta.env.DEV) {
    return
  }

  const measurement = {
    name: metric.name,
    value: metric.value,
    unit: metric.name === 'CLS' ? 'ratio' : 'millisecond',
  }

  Sentry.setMeasurement(metric.name, metric.value, measurement.unit)

  if (rating === 'poor') {
    Sentry.captureMessage(`Poor Web Vital: ${metric.name}`, {
      level: 'warning',
      tags: {
        metric_name: metric.name,
        metric_rating: rating,
      },
      contexts: {
        web_vitals: {
          name: metric.name,
          value: metric.value,
          rating,
          delta: metric.delta,
          id: metric.id,
          navigationType: metric.navigationType,
        },
      },
    })
  }
}

const sendToAnalytics = async (metric: Metric, config: WebVitalsConfig) => {
  const rating = classifyMetric(metric.name, metric.value)

  const data = {
    name: metric.name,
    value: metric.value,
    rating,
    delta: metric.delta,
    id: metric.id,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    connection: (navigator as any).connection?.effectiveType || 'unknown',
  }

  config.onMetric?.(metric)

  if (config.endpoint) {
    await sendMetricToEndpoint(config.endpoint, data)
  }

  sendToGoogleAnalytics(metric)
  sendToSentry(metric, rating)
}

let currentConfig: WebVitalsConfig | null = null

/**
 * Initializes Web Vitals monitoring.
 * Only reinitializes if config changes (deep comparison).
 * In production, call once at app startup for best performance.
 *
 * Loads web-vitals library asynchronously to avoid blocking initial render.
 *
 * @see https://web.dev/articles/vitals
 */
export const initWebVitals = async (config: WebVitalsConfig = {}) => {
  const configKey = JSON.stringify(config)
  const existingKey = currentConfig ? JSON.stringify(currentConfig) : null

  if (configKey === existingKey) {
    return
  }

  currentConfig = config

  const defaultConfig: WebVitalsConfig = {
    debug: typeof import.meta !== 'undefined' && import.meta.env?.DEV,
    ...config,
  }

  const sendMetric = (metric: Metric) => sendToAnalytics(metric, defaultConfig)

  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals')

    onCLS(sendMetric)
    onINP(sendMetric)
    onLCP(sendMetric)
    onFCP(sendMetric)
    onTTFB(sendMetric)
  } catch {
    // Silently fail if web-vitals library fails to load
  }
}

export const useWebVitals = (config: WebVitalsConfig = {}) => {
  React.useEffect(() => {
    initWebVitals(config)
  }, [config])
}

export const WebVitalsReporter: React.FC<{ config?: WebVitalsConfig }> = ({
  config,
}) => {
  useWebVitals(config)
  return null
}
