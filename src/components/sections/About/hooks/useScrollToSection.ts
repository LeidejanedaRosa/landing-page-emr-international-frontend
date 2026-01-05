import { useCallback } from 'react'

export function useScrollToSection() {
  const scrollTo = useCallback((sectionId: string) => {
    const section = document.querySelector(
      `[data-section="${CSS.escape(sectionId)}"]`
    )
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return { scrollTo }
}
