import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as useCarouselHook from '../../../../../hooks/useCarousel'
import HeroCarousel from '../../index'
import {
  MOCK_COURSES_DOUBLE,
  MOCK_COURSES_EMPTY,
  MOCK_COURSES_SINGLE,
  MOCK_COURSES_TRIPLE,
} from '../fixtures'
import {
  cleanupTestEnvironment,
  mockCoursesData,
  setupHooks,
  setupTestEnvironment,
} from '../testHelpers'

vi.mock('../../../../../components/sections/Hero', () => ({
  default: () => <div data-testid='hero-component'>Hero Component</div>,
}))

vi.mock('../../components', () => ({
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
  }: any) => (
    <div data-testid='carousel-container'>
      <div data-testid='current-slide'>{currentSlide}</div>
      <div data-testid='total-slides'>{totalSlides}</div>
      <button data-testid='prev-button' onClick={onPrev}>
        Previous
      </button>
      <button data-testid='next-button' onClick={onNext}>
        Next
      </button>
      <button data-testid='select-button' onClick={onSelect}>
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
}))

describe('HeroCarousel - Slide Calculations', () => {
  beforeEach(() => {
    setupTestEnvironment()
    setupHooks()
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  it('should calculate totalSlides with 0 courses', () => {
    mockCoursesData(MOCK_COURSES_EMPTY)

    render(<HeroCarousel />)

    expect(useCarouselHook.useCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        totalItems: 1,
      })
    )
  })

  it('should calculate totalSlides with 1 course', () => {
    mockCoursesData(MOCK_COURSES_SINGLE)

    render(<HeroCarousel />)

    expect(useCarouselHook.useCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        totalItems: 2,
      })
    )
  })

  it('should calculate totalSlides with 2 courses', () => {
    mockCoursesData(MOCK_COURSES_DOUBLE)

    render(<HeroCarousel />)

    expect(useCarouselHook.useCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        totalItems: 3,
      })
    )
  })

  it('should calculate totalSlides with 3 courses', () => {
    mockCoursesData(MOCK_COURSES_TRIPLE)

    render(<HeroCarousel />)

    expect(useCarouselHook.useCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        totalItems: 4,
      })
    )
  })

  it('should handle single slide scenario', () => {
    mockCoursesData(MOCK_COURSES_EMPTY)

    render(<HeroCarousel />)

    expect(screen.getByTestId('hero-component')).toBeInTheDocument()
  })

  it('should pass all required props to CarouselContainer', () => {
    mockCoursesData(MOCK_COURSES_SINGLE)

    render(<HeroCarousel />)

    expect(screen.getByTestId('carousel-container')).toBeInTheDocument()
    expect(screen.getByTestId('current-slide')).toBeInTheDocument()
    expect(screen.getByTestId('total-slides')).toBeInTheDocument()
    expect(screen.getByTestId('prev-button')).toBeInTheDocument()
    expect(screen.getByTestId('next-button')).toBeInTheDocument()
    expect(screen.getByTestId('keyboard-handler')).toBeInTheDocument()
    expect(screen.getByTestId('touch-handler')).toBeInTheDocument()
  })
})
