import { useCallback } from 'react'

import { scrollToSection } from '../utils/scrollToSection'

type ScrollTarget = { id: string } | { dataSection: string }

interface UseScrollToOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
}

const DEFAULT_OPTIONS: Required<UseScrollToOptions> = {
  behavior: 'smooth',
  block: 'start',
}

const resolveId = (target: ScrollTarget | string): string => {
  if (typeof target === 'string') return target
  if ('id' in target) return target.id
  return target.dataSection
}

export function useScrollTo(options: UseScrollToOptions = {}) {
  const { behavior, block } = { ...DEFAULT_OPTIONS, ...options }

  const scrollTo = useCallback(
    (target: ScrollTarget | string) => {
      scrollToSection(resolveId(target), { behavior, block, updateHash: true })
    },
    [behavior, block]
  )

  return { scrollTo }
}
