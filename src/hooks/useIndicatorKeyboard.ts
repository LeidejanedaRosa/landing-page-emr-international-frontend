import { type KeyboardEvent, useCallback, useRef } from 'react'

/* eslint-disable no-unused-vars */
interface UseIndicatorKeyboardOptions {
  totalSlides: number
  goToSlide: (index: number) => void
}
/* eslint-enable no-unused-vars */

/**
 * Hook para navegação por teclado em indicadores de carrossel
 * Suporta: ArrowRight/Down (próximo), ArrowLeft/Up (anterior), Home (primeiro), End (último)
 */
export function useIndicatorKeyboard({
  totalSlides,
  goToSlide,
}: UseIndicatorKeyboardOptions) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, slideIndex: number) => {
      let nextIndex: number | null = null

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        nextIndex = (slideIndex + 1) % totalSlides
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        nextIndex = (slideIndex - 1 + totalSlides) % totalSlides
      } else if (event.key === 'Home') {
        event.preventDefault()
        nextIndex = 0
      } else if (event.key === 'End') {
        event.preventDefault()
        nextIndex = totalSlides - 1
      }

      if (nextIndex !== null) {
        goToSlide(nextIndex)
        buttonsRef.current[nextIndex]?.focus()
      }
    },
    [totalSlides, goToSlide]
  )

  return { buttonsRef, handleKeyDown }
}
