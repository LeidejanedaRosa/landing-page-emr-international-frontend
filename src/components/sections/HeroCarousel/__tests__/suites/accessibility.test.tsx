import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import * as useAccessibilityHook from '../../../../../hooks/useAccessibility'
import * as useCarouselHook from '../../../../../hooks/useCarousel'
import HeroCarousel from '../../index'
import { MOCK_COURSES_DOUBLE, MOCK_COURSES_EMPTY } from '../fixtures'
import { createMockCarouselReturn } from '../mocks'
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

describe('HeroCarousel - Accessibility', () => {
  let mockAnnounce: ReturnType<typeof setupHooks>['mockAnnounce']

  beforeEach(() => {
    setupTestEnvironment()
    const hooks = setupHooks()
    mockAnnounce = hooks.mockAnnounce
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  describe('screen reader announcements', () => {
    beforeEach(() => {
      mockCoursesData(MOCK_COURSES_DOUBLE)
    })

    it('should announce initial slide on mount', () => {
      render(<HeroCarousel />)

      expect(mockAnnounce).toHaveBeenCalledWith(
        'Página principal EMR International - Slide 1 de 3',
        'polite'
      )
    })

    it('should announce first course slide', () => {
      vi.spyOn(useCarouselHook, 'useCarousel').mockReturnValue(
        createMockCarouselReturn({ currentIndex: 1 })
      )

      render(<HeroCarousel />)

      expect(mockAnnounce).toHaveBeenCalledWith(
        'Curso Tactical Medical Response - Slide 2 de 3',
        'polite'
      )
    })

    it('should announce second course slide', () => {
      vi.spyOn(useCarouselHook, 'useCarousel').mockReturnValue(
        createMockCarouselReturn({ currentIndex: 2 })
      )

      render(<HeroCarousel />)

      expect(mockAnnounce).toHaveBeenCalledWith(
        'Curso Wilderness Medical Response - Slide 3 de 3',
        'polite'
      )
    })

    it('should use default label for undefined slide', () => {
      vi.spyOn(useCarouselHook, 'useCarousel').mockReturnValue(
        createMockCarouselReturn({ currentIndex: 99 })
      )

      render(<HeroCarousel />)

      expect(mockAnnounce).toHaveBeenCalledWith(
        'Slide 100 - Slide 100 de 3',
        'polite'
      )
    })

    it('should use polite priority for announcements', () => {
      render(<HeroCarousel />)

      expect(mockAnnounce).toHaveBeenCalledWith(expect.any(String), 'polite')
    })
  })

  describe('without courses', () => {
    it('should not make announcements when no courses', () => {
      mockCoursesData(MOCK_COURSES_EMPTY)

      render(<HeroCarousel />)

      expect(mockAnnounce).not.toHaveBeenCalled()
    })
  })

  describe('hook integration', () => {
    it('should call useScreenReaderAnnouncement hook', () => {
      mockCoursesData(MOCK_COURSES_DOUBLE)

      render(<HeroCarousel />)

      expect(
        useAccessibilityHook.useScreenReaderAnnouncement
      ).toHaveBeenCalled()
    })
  })
})
