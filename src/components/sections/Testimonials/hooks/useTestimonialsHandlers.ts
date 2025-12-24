import { useEffect, useRef } from 'react'

interface UseTestimonialsHandlersParams {
  // eslint-disable-next-line no-unused-vars
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  nextSlide: () => void
  previousSlide: () => void
  // eslint-disable-next-line no-unused-vars
  goToSlide: (index: number) => void
  currentIndex: number
  totalItems: number
}

export const useTestimonialsHandlers = ({
  announce,
  nextSlide,
  previousSlide,
  goToSlide,
  currentIndex,
  totalItems,
}: UseTestimonialsHandlersParams) => {
  const previousIndexRef = useRef(currentIndex)
  const isUserInteractionRef = useRef(false)

  useEffect(() => {
    if (
      isUserInteractionRef.current &&
      previousIndexRef.current !== currentIndex
    ) {
      // Converte índice do carrossel (1 a totalItems, com 0 e totalItems+1 como clones)
      // para índice de exibição 1-based
      const displayIndex =
        currentIndex === 0
          ? totalItems
          : currentIndex > totalItems
            ? 1
            : currentIndex

      announce(
        `Mostrando depoimento ${displayIndex} de ${totalItems}`,
        'polite'
      )
      isUserInteractionRef.current = false
    }
    previousIndexRef.current = currentIndex
  }, [currentIndex, announce, totalItems])

  const handlePrevious = () => {
    isUserInteractionRef.current = true
    previousSlide()
  }

  const handleNext = () => {
    isUserInteractionRef.current = true
    nextSlide()
  }

  const handleGoToSlide = (index: number) => {
    isUserInteractionRef.current = true
    goToSlide(index)
  }

  return { handlePrevious, handleNext, handleGoToSlide }
}
