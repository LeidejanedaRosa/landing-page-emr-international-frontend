import { useCallback, useEffect, useRef, useState } from 'react'

interface UseScrollTriggerOptions {
  targetSectionId: string
  storageKey?: string
  enabled?: boolean
}

export function useScrollTrigger({
  targetSectionId,
  storageKey,
  enabled = true,
}: UseScrollTriggerOptions) {
  const [hasTriggered, setHasTriggered] = useState(() => {
    if (storageKey && typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(storageKey) === 'true'
    }
    return false
  })
  const observerRef = useRef<IntersectionObserver | null>(null)

  const resetTrigger = useCallback(() => {
    setHasTriggered(false)
    if (storageKey) {
      sessionStorage.removeItem(storageKey)
    }
  }, [storageKey])

  useEffect(() => {
    if (!enabled) return

    if (storageKey && sessionStorage.getItem(storageKey)) {
      return
    }

    const setupObserver = (targetSection: Element) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              setHasTriggered(true)
              if (storageKey) {
                sessionStorage.setItem(storageKey, 'true')
              }
              observerRef.current?.disconnect()
            }
          })
        },
        { threshold: 0 }
      )

      observerRef.current.observe(targetSection)
    }

    const targetSection = document.getElementById(targetSectionId)
    if (targetSection) {
      setupObserver(targetSection)
      return () => {
        observerRef.current?.disconnect()
      }
    }

    const mutationObserver = new MutationObserver(() => {
      const section = document.getElementById(targetSectionId)
      if (section) {
        mutationObserver.disconnect()
        setupObserver(section)
      }
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutationObserver.disconnect()
      observerRef.current?.disconnect()
    }
  }, [targetSectionId, storageKey, enabled])

  return { hasTriggered, resetTrigger }
}
