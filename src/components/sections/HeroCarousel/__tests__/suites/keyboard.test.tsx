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

describe('HeroCarousel - Keyboard Navigation', () => {
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
    mockCoursesData(MOCK_COURSES_SINGLE)
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  it('should navigate to next slide on ArrowRight key', () => {
    render(<HeroCarousel />)

    const keyboardHandler = screen.getByTestId('keyboard-handler')
    fireEvent.keyDown(keyboardHandler, { key: 'ArrowRight' })

    expect(mockNextSlide).toHaveBeenCalledTimes(1)
  })

  it('should navigate to previous slide on ArrowLeft key', () => {
    render(<HeroCarousel />)

    const keyboardHandler = screen.getByTestId('keyboard-handler')
    fireEvent.keyDown(keyboardHandler, { key: 'ArrowLeft' })

    expect(mockPreviousSlide).toHaveBeenCalledTimes(1)
  })

  it('should prevent default behavior on ArrowRight', () => {
    render(<HeroCarousel />)

    const keyboardHandler = screen.getByTestId('keyboard-handler')
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true,
    })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    keyboardHandler.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should prevent default behavior on ArrowLeft', () => {
    render(<HeroCarousel />)

    const keyboardHandler = screen.getByTestId('keyboard-handler')
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      cancelable: true,
    })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    keyboardHandler.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should not navigate on other keys', () => {
    render(<HeroCarousel />)

    const keyboardHandler = screen.getByTestId('keyboard-handler')
    fireEvent.keyDown(keyboardHandler, { key: 'Enter' })
    fireEvent.keyDown(keyboardHandler, { key: ' ' })
    fireEvent.keyDown(keyboardHandler, { key: 'Escape' })

    expect(mockNextSlide).not.toHaveBeenCalled()
    expect(mockPreviousSlide).not.toHaveBeenCalled()
  })
})
