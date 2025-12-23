import { useCallback, useEffect, useRef, useState } from 'react'

import { useAccessibilityPreferences } from '../../../../hooks/useAccessibility'
import type { UseHeroCarouselOptions, UseHeroCarouselReturn } from '../types'

export const useHeroCarousel = ({
  totalSlides,
  autoPlayDelay = 5000,
  enableAutoPlay = true,
}: UseHeroCarouselOptions): UseHeroCarouselReturn => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { prefersReducedMotion } = useAccessibilityPreferences()

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides)
  }, [totalSlides])

  const previousSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlide(index)
      }
    },
    [totalSlides]
  )

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
  }, [])

  const resumeAutoPlay = useCallback(() => {
    if (enableAutoPlay && !prefersReducedMotion) {
      setIsAutoPlaying(true)
    }
  }, [enableAutoPlay, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAutoPlaying(false)
      return
    }

    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayDelay)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }, [isAutoPlaying, autoPlayDelay, nextSlide, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion && isAutoPlaying) {
      setIsAutoPlaying(false)
    }
  }, [prefersReducedMotion, isAutoPlaying])

  return {
    currentSlide,
    isAutoPlaying,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  }
}
