import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as useTouchSwipeHook from '../../../../../hooks/useTouchSwipe'
import HeroCarousel from '../../index'
import { MOCK_COURSES_EMPTY, MOCK_COURSES_SINGLE } from '../fixtures'
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

describe('HeroCarousel - Touch Swipe', () => {
  let mockNextSlide: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['nextSlide']
  let mockPreviousSlide: ReturnType<
    typeof setupHooks
  >['mockCarouselReturn']['previousSlide']

  beforeEach(() => {
    setupTestEnvironment()
    const hooks = setupHooks()
    mockNextSlide = hooks.mockCarouselReturn.nextSlide
    mockPreviousSlide = hooks.mockCarouselReturn.previousSlide
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  it('should enable touch handlers when slides exist', () => {
    mockCoursesData(MOCK_COURSES_SINGLE)

    render(<HeroCarousel />)

    expect(useTouchSwipeHook.useTouchSwipe).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
      })
    )
  })

  it('should disable touch handlers when no courses', () => {
    mockCoursesData(MOCK_COURSES_EMPTY)

    render(<HeroCarousel />)

    expect(useTouchSwipeHook.useTouchSwipe).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    )
  })

  it('should configure swipe left to navigate next', () => {
    mockCoursesData(MOCK_COURSES_SINGLE)

    render(<HeroCarousel />)

    const callArgs = vi.mocked(useTouchSwipeHook.useTouchSwipe).mock.calls[0][0]

    expect(callArgs.onSwipeLeft).toBe(mockNextSlide)
  })

  it('should configure swipe right to navigate previous', () => {
    mockCoursesData(MOCK_COURSES_SINGLE)

    render(<HeroCarousel />)

    const callArgs = vi.mocked(useTouchSwipeHook.useTouchSwipe).mock.calls[0][0]

    expect(callArgs.onSwipeRight).toBe(mockPreviousSlide)
  })
})
