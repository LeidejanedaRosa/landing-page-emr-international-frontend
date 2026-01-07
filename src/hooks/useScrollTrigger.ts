import { useCallback, useEffect, useRef, useState } from 'react'

interface UseScrollTriggerOptions {
  targetSectionId: string
  storageKey?: string
  enabled?: boolean
}

const getInitialState = (storageKey?: string): boolean => {
  if (storageKey && typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(storageKey) === 'true'
  }
  return false
}

const createIntersectionObserver = (
  onTrigger: () => void
): IntersectionObserver => {
  return new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onTrigger()
        }
      })
    },
    { threshold: 0.3 }
  )
}

export function useScrollTrigger({
  targetSectionId,
  storageKey,
  enabled = true,
}: UseScrollTriggerOptions) {
  const [hasTriggered, setHasTriggered] = useState(() =>
    getInitialState(storageKey)
  )
  const observerRef = useRef<IntersectionObserver | null>(null)

  const resetTrigger = useCallback(() => {
    setHasTriggered(false)
    if (storageKey) sessionStorage.removeItem(storageKey)
  }, [storageKey])

  useEffect(() => {
    if (!enabled || (storageKey && sessionStorage.getItem(storageKey))) return

    const handleTrigger = () => {
      setHasTriggered(true)
      if (storageKey) sessionStorage.setItem(storageKey, 'true')
      observerRef.current?.disconnect()
    }

    const setupObserver = (section: Element) => {
      observerRef.current?.disconnect()
      observerRef.current = createIntersectionObserver(handleTrigger)
      observerRef.current.observe(section)
    }

    const targetSection = document.getElementById(targetSectionId)
    if (targetSection) {
      setupObserver(targetSection)
      return () => observerRef.current?.disconnect()
    }

    let cancelled = false
    let attempts = 0
    const checkForElement = () => {
      if (cancelled) return
      const section = document.getElementById(targetSectionId)
      if (section) return setupObserver(section)
      if (++attempts < 10) {
        setTimeout(checkForElement, 100)
      }
    }

    const timeoutId = setTimeout(checkForElement, 100)
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      observerRef.current?.disconnect()
    }
  }, [targetSectionId, storageKey, enabled])

  return { hasTriggered, resetTrigger }
}
