import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import HeroCarousel from '../../index'
import { MOCK_COURSES_SINGLE } from '../fixtures'
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

describe('HeroCarousel - Navigation', () => {
  let mockNextSlide: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['nextSlide']
  let mockPreviousSlide: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['previousSlide']
  let mockGoToSlide: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['goToSlide']
  let mockPauseAutoPlay: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['pauseAutoPlay']
  let mockResumeAutoPlay: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['resumeAutoPlay']

  beforeEach(() => {
    setupTestEnvironment()
    const hooks = setupHooks()
    mockNextSlide = hooks.mockCarouselReturn.nextSlide
    mockPreviousSlide = hooks.mockCarouselReturn.previousSlide
    mockGoToSlide = hooks.mockCarouselReturn.goToSlide
    mockPauseAutoPlay = hooks.mockCarouselReturn.pauseAutoPlay
    mockResumeAutoPlay = hooks.mockCarouselReturn.resumeAutoPlay
    mockCoursesData(MOCK_COURSES_SINGLE)
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  it('should call nextSlide on next button click', () => {
    render(<HeroCarousel />)

    fireEvent.click(screen.getByTestId('next-button'))

    expect(mockNextSlide).toHaveBeenCalledTimes(1)
  })

  it('should call previousSlide on prev button click', () => {
    render(<HeroCarousel />)

    fireEvent.click(screen.getByTestId('prev-button'))

    expect(mockPreviousSlide).toHaveBeenCalledTimes(1)
  })

  it('should call goToSlide on select button click', () => {
    render(<HeroCarousel />)

    fireEvent.click(screen.getByTestId('select-button'))

    expect(mockGoToSlide).toHaveBeenCalled()
  })

  it('should call pauseAutoPlay on pause button click', () => {
    render(<HeroCarousel />)

    fireEvent.click(screen.getByTestId('pause-button'))

    expect(mockPauseAutoPlay).toHaveBeenCalledTimes(1)
  })

  it('should call resumeAutoPlay on resume button click', () => {
    render(<HeroCarousel />)

    fireEvent.click(screen.getByTestId('resume-button'))

    expect(mockResumeAutoPlay).toHaveBeenCalledTimes(1)
  })
})
