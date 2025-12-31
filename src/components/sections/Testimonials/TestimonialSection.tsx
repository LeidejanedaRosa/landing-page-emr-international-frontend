import React, { memo, useCallback, useEffect } from 'react'

import { testimonials } from '../../../data/testimonialsData'
import { useScreenReaderAnnouncement } from '../../../hooks/useAccessibility'
import {
  TestimonialCard,
  TestimonialIndicators,
  TestimonialNavigation,
} from './components'
import {
  TESTIMONIALS_A11Y,
  TESTIMONIALS_CONFIG,
  TESTIMONIALS_CONTENT,
} from './constants'
import { useIndicatorKeyboard } from './hooks/useIndicatorKeyboard'
import { useTestimonialsCarousel } from './hooks/useTestimonialsCarousel'
import type { TestimonialIndicatorsProps } from './types'

const TestimonialSection = memo(() => {
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
  } = useTestimonialsCarousel({
    totalSlides,
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
    const name: string =
      currentTestimonial.authorName ??
      currentTestimonial.companyName ??
      `Slide ${currentIndex + 1}`
    announce(
      TESTIMONIALS_A11Y.slideAnnouncement(name, currentIndex + 1, totalSlides),
      'polite'
    )
  }, [
    currentIndex,
    announce,
    currentTestimonial.authorName,
    currentTestimonial.companyName,
    totalSlides,
  ])

  return (
    <section
      id='testimonials'
      data-section='testimonials'
      className='min-h-svh flex flex-col justify-center bg-gradient-to-b from-primary-950 via-primary-900 to-cta-700 py-12 md:py-20 px-4 sm:px-6 lg:px-8'
      aria-labelledby='testimonials-heading'
      aria-roledescription={TESTIMONIALS_A11Y.roleDescription}
    >
      <TestimonialSectionContent
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        currentTestimonial={currentTestimonial}
        onKeyDown={handleKeyDown}
        onPauseAutoPlay={pauseAutoPlay}
        onResumeAutoPlay={resumeAutoPlay}
        onPrev={previousSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
        buttonsRef={buttonsRef}
        handleIndicatorKeyDown={handleIndicatorKeyDown}
        isAutoPlaying={isAutoPlaying}
        autoPlayDelay={TESTIMONIALS_CONFIG.autoPlayDelay}
      />
    </section>
  )
})

interface TestimonialSectionContentProps {
  currentIndex: number
  totalSlides: number
  currentTestimonial: (typeof testimonials)[number]
  onKeyDown: React.KeyboardEventHandler
  onPauseAutoPlay: () => void
  onResumeAutoPlay: () => void
  onPrev: () => void
  onNext: () => void
  onSelect: TestimonialIndicatorsProps['onSelect']
  buttonsRef: TestimonialIndicatorsProps['buttonsRef']
  handleIndicatorKeyDown: TestimonialIndicatorsProps['handleKeyDown']
  isAutoPlaying: boolean
  autoPlayDelay: number
}

const TestimonialSectionContent = memo<TestimonialSectionContentProps>(
  ({
    currentIndex,
    totalSlides,
    currentTestimonial,
    onKeyDown,
    onPauseAutoPlay,
    onResumeAutoPlay,
    onPrev,
    onNext,
    onSelect,
    buttonsRef,
    handleIndicatorKeyDown,
    isAutoPlaying,
    autoPlayDelay,
  }) => (
    <div className='w-full max-w-screen-2xl mx-auto'>
      <header className='text-center mb-8 md:mb-16'>
        <h2
          id='testimonials-heading'
          className='text-3xl md:text-5xl font-bold text-white mb-4'
        >
          {TESTIMONIALS_CONTENT.title}
        </h2>
        <p className='text-primary-300 text-base md:text-lg max-w-2xl mx-auto'>
          {TESTIMONIALS_CONTENT.subtitle}
        </p>
      </header>

      <div
        className='relative lg:px-12 xl:px-16'
        onMouseEnter={onPauseAutoPlay}
        onMouseLeave={onResumeAutoPlay}
        onFocus={onPauseAutoPlay}
        onBlur={onResumeAutoPlay}
        onKeyDown={onKeyDown}
      >
        <div
          className='overflow-hidden rounded-2xl bg-primary-900/60 backdrop-blur-sm border border-primary-700/50 shadow-2xl'
          role='region'
          id={`testimonial-slide-${currentIndex}`}
          aria-label={TESTIMONIALS_A11Y.slideLabel(
            currentIndex + 1,
            totalSlides
          )}
        >
          <TestimonialCard
            key={currentTestimonial.id}
            testimonial={currentTestimonial}
          />
        </div>

        <TestimonialNavigation
          onPrev={onPrev}
          onNext={onNext}
          currentIndex={currentIndex}
          totalSlides={totalSlides}
        />
      </div>

      <TestimonialIndicators
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        onSelect={onSelect}
        buttonsRef={buttonsRef}
        handleKeyDown={handleIndicatorKeyDown}
        isAutoPlaying={isAutoPlaying}
        autoPlayDelay={autoPlayDelay}
      />
    </div>
  )
)

TestimonialSectionContent.displayName = 'TestimonialSectionContent'
TestimonialSection.displayName = 'TestimonialSection'

export default TestimonialSection
