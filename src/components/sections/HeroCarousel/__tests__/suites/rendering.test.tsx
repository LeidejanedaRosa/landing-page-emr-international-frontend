import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as useCarouselHook from '../../../../../hooks/useCarousel'
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

describe('HeroCarousel - Rendering', () => {
  beforeEach(() => {
    setupTestEnvironment()
    setupHooks()
  })

  afterEach(() => {
    cleanupTestEnvironment()
  })

  describe('without courses', () => {
    beforeEach(() => {
      mockCoursesData(MOCK_COURSES_EMPTY)
    })

    it('should render only Hero component when no courses', () => {
      render(<HeroCarousel />)

      expect(screen.getByTestId('hero-component')).toBeInTheDocument()
      expect(screen.queryByTestId('carousel-container')).not.toBeInTheDocument()
    })

    it('should apply correct height classes without courses', () => {
      const { container } = render(<HeroCarousel />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('h-[100svh]')
      expect(wrapper).toHaveClass('landscape-mobile:h-auto')
      expect(wrapper).toHaveClass('landscape-mobile:min-h-[150vh]')
      expect(wrapper).toHaveClass('md:h-[calc(100svh-150px)]')
    })

    it('should not initialize useCarousel with autoPlay when no courses', () => {
      render(<HeroCarousel />)

      expect(useCarouselHook.useCarousel).toHaveBeenCalledWith(
        expect.objectContaining({
          enableAutoPlay: false,
        })
      )
    })
  })

  describe('with courses', () => {
    beforeEach(() => {
      mockCoursesData(MOCK_COURSES_SINGLE)
    })

    it('should render CarouselContainer when courses exist', () => {
      render(<HeroCarousel />)

      expect(screen.getByTestId('carousel-container')).toBeInTheDocument()
      expect(screen.queryByTestId('hero-component')).not.toBeInTheDocument()
    })

    it('should calculate totalSlides correctly', () => {
      render(<HeroCarousel />)

      expect(screen.getByTestId('total-slides')).toHaveTextContent('2')
    })

    it('should initialize useCarousel with correct settings', () => {
      render(<HeroCarousel />)

      expect(useCarouselHook.useCarousel).toHaveBeenCalledWith({
        totalItems: 2,
        autoPlayDelay: 5000,
        enableAutoPlay: true,
      })
    })
  })
})
