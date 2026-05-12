import { useEffect, useRef, useState } from 'react'

const TRANSITION_DURATION = 500

interface UseSlideTransitionReturn {
  previousSlide: number | null
  isTransitioning: boolean
  shouldRenderSlide: (slideIndex: number) => boolean
  getSlideClassName: (slideIndex: number) => string
}

export const useSlideTransition = (
  currentSlide: number
): UseSlideTransitionReturn => {
  const [previousSlide, setPreviousSlide] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevSlideRef = useRef(currentSlide)

  useEffect(() => {
    if (prevSlideRef.current !== currentSlide) {
      setPreviousSlide(prevSlideRef.current)
      prevSlideRef.current = currentSlide
    }
  }, [currentSlide])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsTransitioning(true)

    timeoutRef.current = setTimeout(() => {
      setPreviousSlide(null)
      setIsTransitioning(false)
    }, TRANSITION_DURATION)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentSlide])

  const shouldRenderSlide = (slideIndex: number) =>
    slideIndex === currentSlide || slideIndex === previousSlide

  const getSlideClassName = (slideIndex: number) => {
    const isActive = slideIndex === currentSlide
    const baseClass = 'absolute inset-0 transition-opacity duration-500'

    if (isActive) {
      return `${baseClass} opacity-100 z-10`
    }
    if (slideIndex === previousSlide && isTransitioning) {
      return `${baseClass} opacity-0 z-0`
    }
    return `${baseClass} opacity-0 z-0`
  }

  return {
    previousSlide,
    isTransitioning,
    shouldRenderSlide,
    getSlideClassName,
  }
}
