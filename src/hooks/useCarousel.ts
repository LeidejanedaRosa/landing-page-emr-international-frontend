import { useCallback, useEffect, useRef, useState } from 'react'

import { useAccessibilityPreferences } from './useAccessibility'

interface UseCarouselOptions {
  totalItems: number
  autoPlayDelay?: number
  enableAutoPlay?: boolean
  /** Quando true, usa navegação com loop infinito (para múltiplos items visíveis) */
  infiniteLoop?: boolean
  /** Número de items visíveis (para carrosséis responsivos) */
  itemsVisible?: number
}

/* eslint-disable no-unused-vars */
interface UseCarouselReturn {
  currentIndex: number
  isAutoPlaying: boolean
  isTransitioning: boolean
  nextSlide: () => void
  previousSlide: () => void
  goToSlide: (index: number) => void
  pauseAutoPlay: () => void
  resumeAutoPlay: () => void
  /** Para carrosséis com múltiplos items */
  maxIndex: number
  hasMultiplePages: boolean
}
/* eslint-enable no-unused-vars */

// eslint-disable-next-line max-lines-per-function
export const useCarousel = ({
  totalItems,
  autoPlayDelay = 5000,
  enableAutoPlay = true,
  infiniteLoop = false,
  itemsVisible = 1,
}: UseCarouselOptions): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? 1 : 0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { prefersReducedMotion } = useAccessibilityPreferences()

  const maxIndex = Math.max(0, totalItems - itemsVisible)
  const hasMultiplePages = totalItems > itemsVisible

  // Loop infinito: quando chega nas cópias, reseta sem transição
  useEffect(() => {
    if (!infiniteLoop) return

    if (currentIndex === totalItems + 1 || currentIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex === totalItems + 1 ? 1 : totalItems)
      }, 500)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [currentIndex, totalItems, infiniteLoop])

  const nextSlide = useCallback(() => {
    if (infiniteLoop) {
      if (hasMultiplePages) {
        setIsTransitioning(true)
        setCurrentIndex(prev => prev + 1)
      }
    } else {
      setCurrentIndex(prev => (prev + 1) % totalItems)
    }
  }, [totalItems, infiniteLoop, hasMultiplePages])

  const previousSlide = useCallback(() => {
    if (infiniteLoop) {
      if (hasMultiplePages) {
        setIsTransitioning(true)
        setCurrentIndex(prev => prev - 1)
      }
    } else {
      setCurrentIndex(prev => (prev - 1 + totalItems) % totalItems)
    }
  }, [totalItems, infiniteLoop, hasMultiplePages])

  const goToSlide = useCallback(
    (index: number) => {
      if (infiniteLoop) {
        if (index >= 0 && index <= maxIndex) {
          setIsTransitioning(true)
          setCurrentIndex(index + 1)
        }
      } else {
        if (index >= 0 && index < totalItems) {
          setCurrentIndex(index)
        }
      }
    },
    [totalItems, infiniteLoop, maxIndex]
  )

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
  }, [])

  const resumeAutoPlay = useCallback(() => {
    if (enableAutoPlay && !prefersReducedMotion) {
      setIsAutoPlaying(true)
    }
  }, [enableAutoPlay, prefersReducedMotion])

  // Desativa autoplay se usuário prefere reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAutoPlaying(false)
      return
    }

    if (isAutoPlaying && enableAutoPlay) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayDelay)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }, [
    isAutoPlaying,
    autoPlayDelay,
    nextSlide,
    prefersReducedMotion,
    enableAutoPlay,
  ])

  // Reage a mudanças em prefersReducedMotion
  useEffect(() => {
    if (prefersReducedMotion && isAutoPlaying) {
      setIsAutoPlaying(false)
    }
  }, [prefersReducedMotion, isAutoPlaying])

  return {
    currentIndex,
    isAutoPlaying,
    isTransitioning,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    maxIndex,
    hasMultiplePages,
  }
}
