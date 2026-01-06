import React, { useCallback, useEffect } from 'react'

import { testimonials } from '../../../../data/testimonialsData'
import { useScreenReaderAnnouncement } from '../../../../hooks/useAccessibility'
import { useCarousel } from '../../../../hooks/useCarousel'
import { useIndicatorKeyboard } from '../../../../hooks/useIndicatorKeyboard'
import { TESTIMONIALS_A11Y, TESTIMONIALS_CONFIG } from '../constants'

export const useTestimonialCarousel = () => {
  const { announce } = useScreenReaderAnnouncement()
  const totalSlides = testimonials.length

  const {
    currentIndex,
    isAutoPlaying,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useCarousel({
    totalItems: totalSlides,
    autoPlayDelay: TESTIMONIALS_CONFIG.autoPlayDelay,
    enableAutoPlay: true,
  })

  const { buttonsRef, handleKeyDown: handleIndicatorKeyDown } =
    useIndicatorKeyboard({ totalSlides, goToSlide })

  const currentTestimonial = testimonials[currentIndex]

  const handleKeyDown: React.KeyboardEventHandler = useCallback(
    event => {
      if (event.key === 'ArrowLeft') {
        previousSlide()
        event.preventDefault()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
        event.preventDefault()
      }
    },
    [nextSlide, previousSlide]
  )

  useEffect(() => {
    if (!currentTestimonial) return

    const name: string =
      currentTestimonial.authorName ??
      currentTestimonial.companyName ??
      `Slide ${currentIndex + 1}`
    announce(
      TESTIMONIALS_A11Y.slideAnnouncement(name, currentIndex + 1, totalSlides),
      'polite'
    )
  }, [currentIndex, announce, currentTestimonial, totalSlides])

  return {
    currentIndex,
    totalSlides,
    currentTestimonial,
    isAutoPlaying,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    buttonsRef,
    handleIndicatorKeyDown,
    handleKeyDown,
  }
}
