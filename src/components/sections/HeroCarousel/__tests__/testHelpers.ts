import { type Mock, vi } from 'vitest'

import * as useAccessibilityHook from '../../../../hooks/useAccessibility'
import * as useCarouselHook from '../../../../hooks/useCarousel'
import * as useTouchSwipeHook from '../../../../hooks/useTouchSwipe'
import * as CoursesConstants from '../../HeroEnrollmentOpen/constants'
import type { CourseData } from '../../HeroEnrollmentOpen/types'
import {
  createMockCarouselReturn,
  createMockTouchHandlers,
  type MockCarouselReturn,
  type MockTouchHandlers,
} from './mocks'

interface SetupHooksReturn {
  mockAnnounce: Mock
  mockCarouselReturn: MockCarouselReturn
  mockTouchHandlers: MockTouchHandlers
}

export const setupHooks = (): SetupHooksReturn => {
  const mockAnnounce: Mock = vi.fn()
  const mockCarouselReturn = createMockCarouselReturn()
  const mockTouchHandlers = createMockTouchHandlers()

  vi.spyOn(useAccessibilityHook, 'useScreenReaderAnnouncement').mockReturnValue(
    {
      announce: mockAnnounce,
    }
  )

  vi.spyOn(useCarouselHook, 'useCarousel').mockReturnValue(mockCarouselReturn)

  vi.spyOn(useTouchSwipeHook, 'useTouchSwipe').mockReturnValue(
    mockTouchHandlers
  )

  return {
    mockAnnounce,
    mockCarouselReturn,
    mockTouchHandlers,
  }
}

export const mockCoursesData = (courses: CourseData[]) => {
  vi.spyOn(CoursesConstants, 'COURSES_DATA', 'get').mockReturnValue(courses)
}

export const setupTestEnvironment = () => {
  vi.clearAllMocks()
  vi.clearAllTimers()
  vi.useFakeTimers()
}

export const cleanupTestEnvironment = () => {
  vi.useRealTimers()
  vi.restoreAllMocks()
}
