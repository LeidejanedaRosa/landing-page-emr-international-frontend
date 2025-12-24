import { useCallback, useState } from 'react'

import { useAutoPlay } from './useAutoPlay'
import { useInfiniteLoop } from './useInfiniteLoop'
import { useResponsiveItems } from './useResponsiveItems'

interface UseTestimonialsCarouselProps {
  totalItems: number
  autoPlayDelay?: number
  enableAutoPlay?: boolean
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export const useTestimonialsCarousel = ({
  totalItems,
  autoPlayDelay = 5000,
  enableAutoPlay = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: UseTestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const itemsVisible = useResponsiveItems(itemsPerView)

  const maxIndex = Math.max(0, totalItems - itemsVisible)
  const hasMultiplePages = totalItems > itemsVisible

  useInfiniteLoop({
    currentIndex,
    totalItems,
    setCurrentIndex,
    setIsTransitioning,
  })

  const nextSlide = useCallback(() => {
    if (hasMultiplePages) {
      setIsTransitioning(true)
      setCurrentIndex(prev => prev + 1)
    }
  }, [hasMultiplePages])

  const previousSlide = useCallback(() => {
    if (hasMultiplePages) {
      setIsTransitioning(true)
      setCurrentIndex(prev => prev - 1)
    }
  }, [hasMultiplePages])

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index <= maxIndex) {
        setIsTransitioning(true)
        setCurrentIndex(index + 1)
      }
    },
    [maxIndex]
  )

  const { isAutoPlaying, pauseAutoPlay, resumeAutoPlay } = useAutoPlay({
    enableAutoPlay,
    hasMultiplePages,
    autoPlayDelay,
    nextSlide,
  })

  return {
    currentIndex,
    totalItems,
    itemsVisible,
    hasMultiplePages,
    isTransitioning,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    isAutoPlaying,
  }
}
