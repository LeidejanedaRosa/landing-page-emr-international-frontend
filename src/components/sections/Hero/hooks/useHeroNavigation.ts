import { useCallback } from 'react'

import { COURSES_SECTION_ID, HERO_ANIMATION } from '../constants'

export const useHeroNavigation = () => {
  const scrollToCourses = useCallback(() => {
    const element = document.getElementById(COURSES_SECTION_ID)

    if (!element) {
      console.warn(`Element with id "${COURSES_SECTION_ID}" not found`)
      return
    }

    element.scrollIntoView({
      behavior: HERO_ANIMATION.scroll.behavior,
      block: 'start',
    })
  }, [])

  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)

    if (!element) {
      console.warn(`Element with id "${elementId}" not found`)
      return
    }

    element.scrollIntoView({
      behavior: HERO_ANIMATION.scroll.behavior,
      block: 'start',
    })
  }, [])

  return {
    scrollToCourses,
    scrollToElement,
  }
}
