import React, { memo } from 'react'

import { HERO_CAROUSEL_A11Y } from '../constants'
import type { CarouselIndicatorsProps } from '../types'
import { CarouselHeader } from './CarouselHeader'
import { CarouselIndicators } from './CarouselIndicators'
import { CarouselNavigation } from './CarouselNavigation'
import { SlidesTrack } from './SlidesTrack'

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
        className='relative w-full h-screen max-h-screen bg-black overflow-hidden flex flex-col'
        role='region'
        aria-roledescription={HERO_CAROUSEL_A11Y.roleDescription}
        aria-label={HERO_CAROUSEL_A11Y.ariaLabel}
      >
        <CarouselHeader />

        <div
          className='flex-1 relative overflow-hidden'
          onMouseEnter={onPause}
          onMouseLeave={onResume}
          onFocus={onPause}
          onBlur={onResume}
          onKeyDown={onKeyDown}
        >
          <SlidesTrack currentSlide={currentSlide} />

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
)

CarouselContainer.displayName = 'CarouselContainer'
