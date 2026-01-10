import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
    fireEvent.keyDown(keyboardHandler, { key: 'Space' })
    fireEvent.keyDown(keyboardHandler, { key: 'Escape' })

    expect(mockNextSlide).not.toHaveBeenCalled()
    expect(mockPreviousSlide).not.toHaveBeenCalled()
  })
})
