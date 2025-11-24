import React from 'react'

import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

export interface WebVitalsConfig {
  endpoint?: string
  // eslint-disable-next-line no-unused-vars
  onMetric?: (_metric: Metric) => void

  debug?: boolean
}

const THRESHOLDS = {
  // Largest Contentful Paint - Bom: ≤2.5s
  LCP: { good: 2500, poor: 4000 },
  // First Input Delay - Bom: ≤100ms
  INP: { good: 200, poor: 500 },
  // Cumulative Layout Shift - Bom: ≤0.1
  CLS: { good: 0.1, poor: 0.25 },
  // First Contentful Paint - Bom: ≤1.8s
  FCP: { good: 1800, poor: 3000 },
  // Time to First Byte - Bom: ≤800ms
  TTFB: { good: 800, poor: 1800 },
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

// Helper: Log de debug para métricas
const logMetricDebug = (metric: Metric, rating: string) => {
  // eslint-disable-next-line no-console
  console.group(`📊 Web Vital: ${metric.name}`)
  // eslint-disable-next-line no-console
  console.log(`Value: ${metric.value}${metric.name === 'CLS' ? '' : 'ms'}`)
  // eslint-disable-next-line no-console
  console.log(`Rating: ${rating.toUpperCase()}`)
  // eslint-disable-next-line no-console
  console.log(`Delta: ${metric.delta}`)
  // eslint-disable-next-line no-console
  console.groupEnd()
}

// Helper: Envia métrica para endpoint
const sendMetricToEndpoint = async (
  endpoint: string,
  data: any,
  debug: boolean
) => {
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (debug) {
      // eslint-disable-next-line no-console
      console.error('Failed to send Web Vitals:', error)
    }
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

  ;(window as any).gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ),
    non_interaction: true,
  })
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

  if (config.debug && import.meta.env.DEV) {
    logMetricDebug(metric, rating)
  }

  config.onMetric?.(metric)

  if (config.endpoint) {
    await sendMetricToEndpoint(config.endpoint, data, config.debug || false)
  }

  sendToGoogleAnalytics(metric)
}

export const initWebVitals = (config: WebVitalsConfig = {}) => {
  const defaultConfig: WebVitalsConfig = {
    debug: import.meta.env.DEV,
    ...config,
  }

  const sendMetric = (metric: Metric) => sendToAnalytics(metric, defaultConfig)

  onCLS(sendMetric)
  onINP(sendMetric)
  onLCP(sendMetric)

  onFCP(sendMetric)
  onTTFB(sendMetric)
}

export const useWebVitals = (config: WebVitalsConfig = {}) => {
  React.useEffect(() => {
    initWebVitals(config)
  }, [])
}

export const WebVitalsReporter: React.FC<{ config?: WebVitalsConfig }> = ({
  config,
}) => {
  useWebVitals(config)
  return null
}
