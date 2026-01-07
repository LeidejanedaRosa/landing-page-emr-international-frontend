import { type KeyboardEvent, useEffect } from 'react'

import { useScreenReaderAnnouncement } from '../../../hooks/useAccessibility'
import { useCarousel } from '../../../hooks/useCarousel'
import { useTouchSwipe } from '../../../hooks/useTouchSwipe'
import Hero from '../Hero'
import { COURSES_DATA } from '../HeroEnrollmentOpen/constants'
import { CarouselContainer } from './components'
import {
  getSlideLabels,
  getTotalSlides,
  HERO_CAROUSEL_A11Y,
  HERO_CAROUSEL_CONFIG,
} from './constants'

const HeroCarousel = () => {
  const { announce } = useScreenReaderAnnouncement()
  const hasOpenEnrollment = COURSES_DATA.length > 0

  const totalSlides = getTotalSlides()
  const slideLabels = getSlideLabels()

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

  const touchHandlers = useTouchSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: previousSlide,
    enabled: hasOpenEnrollment && totalSlides > 1,
  })

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      previousSlide()
      event.preventDefault()
    } else if (event.key === 'ArrowRight') {
      nextSlide()
      event.preventDefault()
    }
  }

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
    return (
      <div className='h-[100svh] landscape-mobile:h-auto landscape-mobile:min-h-[150vh] md:h-[calc(100svh-150px)]'>
        <Hero />
      </div>
    )
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
      touchHandlers={touchHandlers}
    />
  )
}

export default HeroCarousel
