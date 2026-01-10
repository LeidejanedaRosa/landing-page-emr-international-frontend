import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as useTouchSwipeHook from '../../../../../hooks/useTouchSwipe'
import HeroCarousel from '../../index'
import { MOCK_COURSES_EMPTY, MOCK_COURSES_SINGLE } from '../fixtures'
import {
  cleanupTestEnvironment,
  mockCoursesData,
  setupHooks,
  setupMocks,
  setupTestEnvironment,
} from '../testHelpers'

setupMocks()

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

  it('should enable touch handlers when multiple slides exist', () => {
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
