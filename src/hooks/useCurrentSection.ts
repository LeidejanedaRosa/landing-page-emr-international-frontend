import { useEffect, useRef, useState } from 'react'

export const useCurrentSection = (sections: string[] = []) => {
  const [currentSection, setCurrentSection] = useState<string>('')
  const rafIdRef = useRef<number | null>(null)
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    // Cache dos elementos para evitar queries repetidas no DOM
    elementsRef.current.clear()
    for (const section of sections) {
      const element = document.querySelector(
        `[data-section="${CSS.escape(section)}"]`
      ) as HTMLElement | null
      if (element) {
        elementsRef.current.set(section, element)
      }
    }

    const handleScroll = () => {
      // Cancela frame anterior para evitar acúmulo
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Usa requestAnimationFrame para throttling natural
      rafIdRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = elementsRef.current.get(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setCurrentSection(prev => (prev !== section ? section : prev))
              return
            }
          }
        }

        setCurrentSection(prev => (prev !== '' ? '' : prev))
      })
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [sections])

  return currentSection
}
