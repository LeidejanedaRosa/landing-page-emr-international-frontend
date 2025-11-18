/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'

interface UseHeroCarouselProps {
  autoPlayDelay?: number
  enableAutoPlay?: boolean
}

export const useHeroCarousel = ({
  autoPlayDelay = 5000,
  enableAutoPlay = true,
}: UseHeroCarouselProps = {}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay)
  const totalSlides = 2

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
    setIsAutoPlaying(true)
  }, [])

  return {
    currentSlide,
    totalSlides,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    isAutoPlaying,
    autoPlayDelay,
  }
}

export const useCarouselGestures = (
  nextSlide: () => void,
  previousSlide: () => void
) => {
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    return { startX: touch.clientX, startY: touch.clientY }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent, startX: number, startY: number) => {
      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      const minSwipeDistance = 50

      if (
        Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > minSwipeDistance
      ) {
        if (deltaX > 0) {
          previousSlide()
        } else {
          nextSlide()
        }
      }
    },
    [nextSlide, previousSlide]
  )

  return { handleTouchStart, handleTouchEnd }
}

export const useCarouselKeyboard = (
  nextSlide: () => void,
  previousSlide: () => void,
  goToSlide: (slideIndex: number) => void,
  slidesLength: number
) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          previousSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(slidesLength - 1)
          break
        case '1':
        case '2':
          e.preventDefault()
          goToSlide(parseInt(e.key) - 1)
          break
      }
    },
    [nextSlide, previousSlide, goToSlide, slidesLength]
  )

  return { handleKeyDown }
}

export const useCarouselAutoPlay = (
  isAutoPlaying: boolean,
  nextSlide: () => void,
  autoPlayDelay: number,
  slidesLength: number
) => {
  useEffect(() => {
    if (!isAutoPlaying || slidesLength <= 1) return

    const interval = setInterval(nextSlide, autoPlayDelay)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayDelay, slidesLength])
}
