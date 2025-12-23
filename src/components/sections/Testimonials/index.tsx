import { memo, useMemo } from 'react'

import { getTestimonials } from '../../../data/testimonialsData'
import {
  useAccessibilityPreferences,
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import TestimonialsSectionContent from './components/TestimonialsSectionContent'
import { useTestimonialsCarousel } from './hooks/useTestimonialsCarousel'
import { useTestimonialsHandlers } from './hooks/useTestimonialsHandlers'

const Testimonials = memo(() => {
  const titleId = useUniqueId('testimonials-title')
  const descriptionId = useUniqueId('testimonials-description')
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const { announce } = useScreenReaderAnnouncement()

  const testimonials = useMemo(() => getTestimonials(), [])

  const {
    currentIndex,
    itemsVisible,
    maxIndex,
    hasMultiplePages,
    isTransitioning,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useTestimonialsCarousel({
    totalItems: testimonials.length,
    enableAutoPlay: !prefersReducedMotion,
    autoPlayDelay: 5000,
    itemsPerView: { mobile: 1, tablet: 2, desktop: 3 },
  })

  const { handlePrevious, handleNext, handleGoToSlide } =
    useTestimonialsHandlers({
      announce,
      nextSlide,
      previousSlide,
      goToSlide,
      currentIndex,
      maxIndex,
      totalItems: testimonials.length,
    })

  const extendedTestimonials = useMemo(
    () => [
      ...testimonials.slice(-itemsVisible),
      ...testimonials,
      ...testimonials.slice(0, itemsVisible),
    ],
    [testimonials, itemsVisible]
  )

  const realCurrentIndex =
    currentIndex === 0
      ? testimonials.length - 1
      : currentIndex === testimonials.length + 1
        ? 0
        : currentIndex - 1

  return (
    <TestimonialsSectionContent
      titleId={titleId}
      descriptionId={descriptionId}
      pauseAutoPlay={pauseAutoPlay}
      resumeAutoPlay={resumeAutoPlay}
      extendedTestimonials={extendedTestimonials}
      currentIndex={currentIndex}
      itemsVisible={itemsVisible}
      isTransitioning={isTransitioning}
      prefersReducedMotion={prefersReducedMotion}
      realCurrentIndex={realCurrentIndex}
      hasMultiplePages={hasMultiplePages}
      totalItems={testimonials.length}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      handleGoToSlide={handleGoToSlide}
    />
  )
})

Testimonials.displayName = 'Testimonials'

export default Testimonials
