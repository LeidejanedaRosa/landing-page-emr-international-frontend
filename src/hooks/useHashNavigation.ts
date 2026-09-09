import { useEffect } from 'react'

import { scrollToSection } from '../utils/scrollToSection'

const readHashId = (): string => {
  const raw = window.location.hash.replace(/^#/, '')
  try {
    return decodeURIComponent(raw)
  } catch {
    // Malformed percent-encoding (e.g. "#%") — use the literal value.
    return raw
  }
}

/**
 * Keeps in-page anchor navigation working with lazy-loaded sections.
 *
 * On mount (deep links like `/#treinamentos`) and on every `hashchange`
 * (menu clicks), it scrolls to the section named by the URL hash — revealing
 * the section first if it has not mounted yet. Without this, clicking a menu
 * item whose section is still a placeholder does nothing.
 */
export function useHashNavigation(): void {
  useEffect(() => {
    const goToHash = () => {
      const id = readHashId()
      if (id) scrollToSection(id)
    }

    goToHash()
    window.addEventListener('hashchange', goToHash)
    return () => window.removeEventListener('hashchange', goToHash)
  }, [])
}
