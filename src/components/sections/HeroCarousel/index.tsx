import React, { memo, useCallback, useEffect, useMemo } from 'react'

import { useScreenReaderAnnouncement } from '../../../hooks/useAccessibility'
import { useCarousel } from '../../../hooks/useCarousel'
import Hero from '../Hero'
import { COURSES_DATA } from '../HeroEnrollmentOpen/constants'
import { CarouselContainer } from './components'
import {
  getSlideLabels,
  getTotalSlides,
  HERO_CAROUSEL_A11Y,
  HERO_CAROUSEL_CONFIG,
} from './constants'

const HeroCarousel = memo(() => {
  const { announce } = useScreenReaderAnnouncement()
  const hasOpenEnrollment = COURSES_DATA.length > 0

  const totalSlides = useMemo(() => getTotalSlides(), [])
  const slideLabels = useMemo(() => getSlideLabels(), [])

  const {
    currentIndex: currentSlide,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useCarousel({
    totalItems: totalSlides,
    autoPlayDelay: HERO_CAROUSEL_CONFIG.autoPlayDelay,
    enableAutoPlay: hasOpenEnrollment,
  })

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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
    if (hasOpenEnrollment) {
      const label = slideLabels[currentSlide] || `Slide ${currentSlide + 1}`
      announce(
        HERO_CAROUSEL_A11Y.slideAnnouncement(
          label,
          currentSlide + 1,
          totalSlides
        ),
        'polite'
      )
    }
  }, [currentSlide, announce, hasOpenEnrollment, slideLabels, totalSlides])

  if (!hasOpenEnrollment) {
    return <Hero />
  }

  return (
    <CarouselContainer
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      onPrev={previousSlide}
      onNext={nextSlide}
      onSelect={goToSlide}
      onPause={pauseAutoPlay}
      onResume={resumeAutoPlay}
      onKeyDown={handleKeyDown}
    />
  )
})

HeroCarousel.displayName = 'HeroCarousel'

export default HeroCarousel
