import { useCallback } from 'react'

/**
 * Hook personalizado para navegação suave entre seções
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return { scrollToSection }
}
