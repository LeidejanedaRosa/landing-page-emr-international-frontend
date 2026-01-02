import React, { memo } from 'react'

import Hero from '../../Hero'
import { HERO_SECTION_ID } from '../../Hero/constants'
import { HeroEnrollmentOpen } from '../../HeroEnrollmentOpen'
import { COURSES_DATA } from '../../HeroEnrollmentOpen/constants'
import { HERO_CAROUSEL_A11Y } from '../constants'
import type { CarouselIndicatorsProps } from '../types'
import { CarouselIndicators } from './CarouselIndicators'
import { CarouselNavigation } from './CarouselNavigation'

interface CarouselContainerProps {
  currentSlide: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  onSelect: CarouselIndicatorsProps['onSelect']
  onPause: () => void
  onResume: () => void
  onKeyDown: React.KeyboardEventHandler
}

export const CarouselContainer = memo<CarouselContainerProps>(
  ({
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    onSelect,
    onPause,
    onResume,
    onKeyDown,
  }) => {
    return (
      <section
        id={HERO_SECTION_ID}
        aria-roledescription={HERO_CAROUSEL_A11Y.roleDescription}
        aria-label={HERO_CAROUSEL_A11Y.ariaLabel}
      >
        <div
          className='relative'
          onMouseEnter={onPause}
          onMouseLeave={onResume}
          onFocus={onPause}
          onBlur={onResume}
          onKeyDown={onKeyDown}
        >
          {currentSlide === 0 && (
            <div
              id='hero-slide-0'
              role='tabpanel'
              aria-label='Página principal'
            >
              <Hero />
            </div>
          )}

          {COURSES_DATA.map((course, index) => {
            const slideIndex = index + 1
            return (
              currentSlide === slideIndex && (
                <div
                  key={course.id}
                  id={`hero-slide-${slideIndex}`}
                  role='tabpanel'
                  aria-label={`Curso ${course.title}`}
                >
                  <HeroEnrollmentOpen courseIndex={index} />
                </div>
              )
            )
          })}

          <CarouselNavigation
            onPrev={onPrev}
            onNext={onNext}
            currentSlide={currentSlide}
            totalSlides={totalSlides}
          />
        </div>

        <CarouselIndicators
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSelect={onSelect}
        />
      </section>
    )
  }
)

CarouselContainer.displayName = 'CarouselContainer'
