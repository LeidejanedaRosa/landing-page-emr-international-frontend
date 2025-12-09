import { useEffect, useState } from 'react'

export const useCurrentSection = (sections: string[] = []) => {
  const [currentSection, setCurrentSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.querySelector(`[data-section="${section}"]`)
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section)
            return
          }
        }
      }

      setCurrentSection('')
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections])

  return currentSection
}
