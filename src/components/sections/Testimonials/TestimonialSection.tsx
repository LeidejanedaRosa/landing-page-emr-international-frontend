import React, { memo } from 'react'

import { testimonials } from '../../../data/testimonialsData'
import { TestimonialsSchema } from '../../seo/schemas'
import {
  TestimonialCard,
  TestimonialIndicators,
  TestimonialNavigation,
} from './components'
import { TESTIMONIALS_A11Y, TESTIMONIALS_CONFIG } from './constants'
import { useTestimonialCarousel } from './hooks/useTestimonialCarousel'
import type { TestimonialIndicatorsProps } from './types'

const TestimonialSection = memo(() => {
  const {
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
    touchHandlers,
  } = useTestimonialCarousel()

  return (
    <>
      <TestimonialsSchema testimonials={testimonials} />
      <section
        id='depoimentos'
        data-section='depoimentos'
        className='min-h-svh flex flex-col justify-center bg-gradient-to-b from-primary-950 via-primary-900 to-cta-700 py-12 md:py-20 px-4 sm:px-6 lg:px-8'
        aria-labelledby='depoimentos-heading'
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
          touchHandlers={touchHandlers}
        />
      </section>
    </>
  )
})

const TestimonialHeader = memo(() => (
  <header className='text-center mb-8 md:mb-16'>
    <span className='text-cta-500 font-semibold tracking-wider uppercase text-sm mb-2 block'>
      O que dizem sobre nós
    </span>

    <h2
      id='depoimentos-heading'
      className='text-3xl md:text-4xl lg:text-5xl tracking-tight text-white max-w-4xl mx-auto'
    >
      <span className='font-capture-it'>Histórias</span> reais de empresas e
      profissionais que se capacitaram conosco
    </h2>
  </header>
))

TestimonialHeader.displayName = 'TestimonialHeader'

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
  touchHandlers: React.DOMAttributes<HTMLElement>
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
    touchHandlers,
  }) => (
    <div className='w-full max-w-screen-2xl mx-auto'>
      <TestimonialHeader />

      <div
        className='relative lg:px-12 xl:px-16'
        onMouseEnter={onPauseAutoPlay}
        onMouseLeave={onResumeAutoPlay}
        onFocus={onPauseAutoPlay}
        onBlur={onResumeAutoPlay}
        onKeyDown={onKeyDown}
        {...touchHandlers}
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
