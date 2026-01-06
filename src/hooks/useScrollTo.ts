import { useCallback } from 'react'

type ScrollTarget = { id: string } | { dataSection: string }

interface UseScrollToOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
}

const DEFAULT_OPTIONS: UseScrollToOptions = {
  behavior: 'smooth',
  block: 'start',
}

export function useScrollTo(options: UseScrollToOptions = {}) {
  const { behavior, block } = { ...DEFAULT_OPTIONS, ...options }

  const scrollTo = useCallback(
    (target: ScrollTarget | string) => {
      let element: Element | null = null
      let sectionId = ''

      if (typeof target === 'string') {
        element =
          document.getElementById(target) ||
          document.querySelector(`[data-section="${CSS.escape(target)}"]`)
        sectionId = target
      } else if ('id' in target) {
        element = document.getElementById(target.id)
        sectionId = target.id
      } else if ('dataSection' in target) {
        element = document.querySelector(
          `[data-section="${CSS.escape(target.dataSection)}"]`
        )
        sectionId = target.dataSection
      }

      if (!element) {
        console.warn(`Scroll target not found:`, target)
        return
      }

      element.scrollIntoView({ behavior, block })

      if (sectionId && window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`)
      }
    },
    [behavior, block]
  )

  return { scrollTo }
}
