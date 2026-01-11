import React from 'react'

import { vi } from 'vitest'

export const createMockCarouselReturn = (overrides = {}) => ({
  currentIndex: 0,
  nextSlide: vi.fn(),
  previousSlide: vi.fn(),
  goToSlide: vi.fn(),
  pauseAutoPlay: vi.fn(),
  resumeAutoPlay: vi.fn(),
  isAutoPlaying: true,
  isTransitioning: false,
  maxIndex: 2,
  hasMultiplePages: true,
  ...overrides,
})

export const createMockTouchHandlers = () => ({
  onTouchStart: vi.fn(),
  onTouchMove: vi.fn(),
  onTouchEnd: vi.fn(),
})

export const mockHeroComponent = () => ({
  default: () => <div data-testid='hero-component'>Hero Component</div>,
})

interface CarouselContainerMockProps {
  currentSlide: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  // eslint-disable-next-line no-unused-vars
  onSelect: (index: number) => void
  onPause: () => void
  onResume: () => void
  onKeyDown: React.KeyboardEventHandler
  touchHandlers?: React.DOMAttributes<HTMLElement>
}

export const mockCarouselContainer = (): {
  CarouselContainer: React.FC<CarouselContainerMockProps>
} => ({
  CarouselContainer: ({
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    onSelect,
    onPause,
    onResume,
    onKeyDown,
    touchHandlers,
  }: CarouselContainerMockProps) => (
    <div data-testid='carousel-container'>
      <div data-testid='current-slide'>{currentSlide}</div>
      <div data-testid='total-slides'>{totalSlides}</div>
      <button data-testid='prev-button' onClick={onPrev}>
        Previous
      </button>
      <button data-testid='next-button' onClick={onNext}>
        Next
      </button>
      <button data-testid='select-button' onClick={() => onSelect(0)}>
        Select
      </button>
      <button data-testid='pause-button' onClick={onPause}>
        Pause
      </button>
      <button data-testid='resume-button' onClick={onResume}>
        Resume
      </button>
      <div
        data-testid='keyboard-handler'
        onKeyDown={onKeyDown}
        tabIndex={0}
        role='region'
        aria-label='Carousel keyboard controls'
      />
      {touchHandlers && (
        <div
          data-testid='touch-handler'
          {...touchHandlers}
          role='region'
          aria-label='Touch area'
        />
      )}
    </div>
  ),
})
