import { useCallback, useEffect, useId, useRef, useState } from 'react'

import {
  announceToScreenReader,
  trapFocus,
} from '../utils/accessibility/helpers'

export const useUniqueId = (prefix = 'element'): string => {
  const id = useId()
  return `${prefix}-${id}`
}

export const useFocus = () => {
  const elementRef = useRef<HTMLElement>(null)
  const [focused, setFocused] = useState(false)

  const focus = useCallback(() => {
    elementRef.current?.focus()
  }, [])

  const blur = useCallback(() => {
    elementRef.current?.blur()
  }, [])

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const isFocused = focused

  return {
    elementRef,
    focus,
    blur,
    isFocused,
    onFocus,
    onBlur,
  }
}

export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    previousFocusRef.current = document.activeElement as HTMLElement

    const cleanup = trapFocus(containerRef.current)

    return () => {
      cleanup()
      previousFocusRef.current?.focus()
    }
  }, [isActive])

  return { containerRef }
}

export const useScreenReaderAnnouncement = () => {
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      announceToScreenReader(message, priority)
    },
    []
  )

  return { announce }
}

export const useAccessibilityPreferences = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')

    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches)
    }

    const updateContrastPreference = () => {
      setPrefersHighContrast(contrastQuery.matches)
    }

    updateMotionPreference()
    updateContrastPreference()

    motionQuery.addEventListener('change', updateMotionPreference)
    contrastQuery.addEventListener('change', updateContrastPreference)

    return () => {
      motionQuery.removeEventListener('change', updateMotionPreference)
      contrastQuery.removeEventListener('change', updateContrastPreference)
    }
  }, [])

  return {
    prefersReducedMotion,
    prefersHighContrast,
  }
}

export { useListNavigation, useSkipLinks } from './useAccessibilityNavigation'
