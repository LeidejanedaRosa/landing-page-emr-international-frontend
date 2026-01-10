import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import HeroCarousel from '../../index'
import { MOCK_COURSES_SINGLE } from '../fixtures'
import {
  cleanupTestEnvironment,
  mockCoursesData,
  setupHooks,
  setupMocks,
  setupTestEnvironment,
} from '../testHelpers'

setupMocks()

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

    expect(mockGoToSlide).toHaveBeenCalledWith(1)
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
