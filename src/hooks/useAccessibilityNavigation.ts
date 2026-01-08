import { useCallback } from 'react'

import { getFocusableElements } from '../utils/accessibility/helpers'

export const useSkipLinks = () => {
  const skipToContent = useCallback(() => {
    const mainContent = document.querySelector(
      '#main-content, main, [role="main"]'
    ) as HTMLElement
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const skipToNavigation = useCallback(() => {
    const navigation = document.querySelector(
      'nav, [role="navigation"]'
    ) as HTMLElement
    if (navigation) {
      const firstLink = getFocusableElements(navigation)[0]
      firstLink?.focus()
      navigation.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return {
    skipToContent,
    skipToNavigation,
  }
}
