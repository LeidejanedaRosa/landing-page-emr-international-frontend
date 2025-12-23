import { memo } from 'react'

import { ScreenReaderOnly } from '../../../ui/Accessibility'
import type { Testimonial } from '../types'
import CarouselControls from './CarouselControls'
import TestimonialsGrid from './TestimonialsGrid'
import TestimonialsHeader from './TestimonialsHeader'

interface TestimonialsSectionContentProps {
  titleId: string
  descriptionId: string
  pauseAutoPlay: () => void
  resumeAutoPlay: () => void
  extendedTestimonials: Testimonial[]
  currentIndex: number
  itemsVisible: number
  isTransitioning: boolean
  prefersReducedMotion: boolean
  realCurrentIndex: number
  hasMultiplePages: boolean
  totalItems: number
  handlePrevious: () => void
  handleNext: () => void
  // eslint-disable-next-line no-unused-vars
  handleGoToSlide: (index: number) => void
}

const TestimonialsSectionContent = memo(
  ({
    titleId,
    descriptionId,
    pauseAutoPlay,
    resumeAutoPlay,
    extendedTestimonials,
    currentIndex,
    itemsVisible,
    isTransitioning,
    prefersReducedMotion,
    realCurrentIndex,
    hasMultiplePages,
    totalItems,
    handlePrevious,
    handleNext,
    handleGoToSlide,
  }: TestimonialsSectionContentProps) => (
    <section
      id='testimonials'
      data-section='testimonials'
      className='relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className='relative max-w-7xl mx-auto w-full'>
        <TestimonialsHeader titleId={titleId} descriptionId={descriptionId} />
        <div
          className='relative'
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onFocus={pauseAutoPlay}
          onBlur={resumeAutoPlay}
        >
          <TestimonialsGrid
            extendedTestimonials={extendedTestimonials}
            currentIndex={currentIndex}
            itemsVisible={itemsVisible}
            isTransitioning={isTransitioning}
            prefersReducedMotion={prefersReducedMotion}
            totalItems={totalItems}
          />

          <ScreenReaderOnly>
            <span aria-live='polite' aria-atomic='true'>
              Mostrando depoimento {realCurrentIndex + 1} de {totalItems}
            </span>
          </ScreenReaderOnly>

          {hasMultiplePages && (
            <CarouselControls
              currentIndex={realCurrentIndex}
              totalDots={totalItems}
              hasMultiplePages={hasMultiplePages}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onGoToSlide={handleGoToSlide}
            />
          )}
        </div>
      </div>
    </section>
  )
)

TestimonialsSectionContent.displayName = 'TestimonialsSectionContent'

export default TestimonialsSectionContent
