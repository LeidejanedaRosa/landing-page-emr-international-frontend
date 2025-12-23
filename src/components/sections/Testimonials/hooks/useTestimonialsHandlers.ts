import { useEffect, useRef } from 'react'

interface UseTestimonialsHandlersParams {
  // eslint-disable-next-line no-unused-vars
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  nextSlide: () => void
  previousSlide: () => void
  // eslint-disable-next-line no-unused-vars
  goToSlide: (index: number) => void
  currentIndex: number
  maxIndex: number
  totalItems: number
}

export const useTestimonialsHandlers = ({
  announce,
  nextSlide,
  previousSlide,
  goToSlide,
  currentIndex,
  maxIndex,
  totalItems,
}: UseTestimonialsHandlersParams) => {
  const previousIndexRef = useRef(currentIndex)
  const isUserInteractionRef = useRef(false)

  useEffect(() => {
    if (
      isUserInteractionRef.current &&
      previousIndexRef.current !== currentIndex
    ) {
      const realIndex =
        currentIndex === 0 || currentIndex > maxIndex + 1
          ? ((currentIndex - 1 + maxIndex + 1) % (maxIndex + 1)) + 1
          : currentIndex

      announce(`Mostrando depoimento ${realIndex} de ${totalItems}`, 'polite')
      isUserInteractionRef.current = false
    }
    previousIndexRef.current = currentIndex
  }, [currentIndex, announce, maxIndex, totalItems])

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
