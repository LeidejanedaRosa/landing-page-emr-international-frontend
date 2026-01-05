import React from 'react'

import Hero from '../../Hero'
import { HERO_SECTION_ID } from '../../Hero/constants'
import { HeroEnrollmentOpen } from '../../HeroEnrollmentOpen'
import { COURSES_DATA } from '../../HeroEnrollmentOpen/constants'
import { HERO_CAROUSEL_A11Y } from '../constants'
import { useSlideTransition } from '../hooks/useSlideTransition'
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

export const CarouselContainer = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSelect,
  onPause,
  onResume,
  onKeyDown,
}: CarouselContainerProps) => {
  const { shouldRenderSlide, getSlideClassName } =
    useSlideTransition(currentSlide)

  return (
    <section
      id={HERO_SECTION_ID}
      aria-roledescription={HERO_CAROUSEL_A11Y.roleDescription}
      aria-label={HERO_CAROUSEL_A11Y.ariaLabel}
    >
      <div
        className='relative min-h-screen h-[150vh] lg:h-[calc(100svh-150px)]'
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        onFocus={onPause}
        onBlur={onResume}
        onKeyDown={onKeyDown}
      >
        {shouldRenderSlide(0) && (
          <div
            id='hero-slide-0'
            role='tabpanel'
            aria-label='Página principal'
            aria-hidden={currentSlide !== 0}
            className={getSlideClassName(0)}
          >
            <Hero />
          </div>
        )}

        {COURSES_DATA.map((course, index) => {
          const slideIndex = index + 1
          return (
            shouldRenderSlide(slideIndex) && (
              <div
                key={course.id}
                id={`hero-slide-${slideIndex}`}
                role='tabpanel'
                aria-label={`Curso ${course.title}`}
                aria-hidden={currentSlide !== slideIndex}
                className={getSlideClassName(slideIndex)}
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

        <CarouselIndicators
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSelect={onSelect}
        />
      </div>
    </section>
  )
}
