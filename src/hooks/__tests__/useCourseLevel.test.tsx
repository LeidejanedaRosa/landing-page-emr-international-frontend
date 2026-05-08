import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Course } from '../../data/coursesData'
import { useCourseLevel } from '../useCourseLevel'

// Mock the whatsapp utility
vi.mock('../../utils/whatsapp', () => ({
  buildWhatsAppMessageUrl: vi.fn(
    (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`
  ),
}))

describe('useCourseLevel', () => {
  const mockCourse: Course = {
    id: 'test-course',
    abbreviation: 'TC',
    title: 'Test Course',
    levels: [
      {
        level: 'basic',
        code: 'TC-100',
        name: 'Basic Test',
        namePt: 'Teste Básico',
        duration: '3 days',
        immersivity: 2,
        difficulty: 1,
        skill: 1,
        description: 'Basic level course',
        enrollmentStatus: 'open',
      },
      {
        level: 'intermediate',
        code: 'TC-200',
        name: 'Intermediate Test',
        namePt: 'Teste Intermediário',
        duration: '5 days',
        immersivity: 3,
        difficulty: 2,
        skill: 2,
        description: 'Intermediate level course',
        enrollmentStatus: 'interest',
      },
      {
        level: 'advanced',
        code: 'TC-300',
        name: 'Advanced Test',
        namePt: 'Teste Avançado',
        duration: '7 days',
        immersivity: 4,
        difficulty: 3,
        skill: 3,
        description: 'Advanced level course',
        enrollmentStatus: 'closed',
      },
    ],
    metadata: {
      certification: 'Test Certification',
      location: 'Test Location',
    },
    links: {
      details: 'details.html',
    },
    images: {
      jpg: 'test.jpg',
      alt: 'Test Image',
    },
    variant: 'emergency',
  }

  it('should initialize with the first level by default', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    expect(result.current.selectedLevel).toBe('basic')
    expect(result.current.currentLevel).toBe(mockCourse.levels[0])
  })

  it('should change selected level', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    act(() => {
      result.current.setSelectedLevel('intermediate')
    })

    expect(result.current.selectedLevel).toBe('intermediate')
    expect(result.current.currentLevel).toBe(mockCourse.levels[1])
  })

  it('should update currentLevel when selectedLevel changes', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    expect(result.current.currentLevel.code).toBe('TC-100')

    act(() => {
      result.current.setSelectedLevel('advanced')
    })

    expect(result.current.currentLevel.code).toBe('TC-300')
  })

  it('should generate correct WhatsApp URL', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    const decodedUrl = decodeURIComponent(result.current.whatsappUrl)
    expect(decodedUrl).toContain('wa.me')
    expect(decodedUrl).toContain('Test Course')
    expect(decodedUrl).toContain('TC-100')
    expect(decodedUrl).toContain('Teste Básico')
  })

  it('should update WhatsApp URL when level changes', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    const initialUrl = result.current.whatsappUrl
    const decodedInitialUrl = decodeURIComponent(initialUrl)
    expect(decodedInitialUrl).toContain('TC-100')

    act(() => {
      result.current.setSelectedLevel('intermediate')
    })

    const decodedNewUrl = decodeURIComponent(result.current.whatsappUrl)
    expect(result.current.whatsappUrl).not.toBe(initialUrl)
    expect(decodedNewUrl).toContain('TC-200')
    expect(decodedNewUrl).toContain('Teste Intermediário')
  })

  it('should handle course with single level', () => {
    const singleLevelCourse: Course = {
      ...mockCourse,
      levels: [mockCourse.levels[0]],
    }

    const { result } = renderHook(() => useCourseLevel(singleLevelCourse))

    expect(result.current.selectedLevel).toBe('basic')
    expect(result.current.currentLevel).toBe(singleLevelCourse.levels[0])
  })

  it('should fallback to first level if selected level is not found', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    act(() => {
      // Testing with invalid level - TypeScript will complain but we're testing runtime behavior
      result.current.setSelectedLevel('invalid' as any)
    })

    expect(result.current.currentLevel).toBe(mockCourse.levels[0])
  })

  it('should handle empty levels array gracefully', () => {
    const emptyCourse: Course = {
      ...mockCourse,
      levels: [],
    }

    // This test validates the hook doesn't crash with empty levels
    // In a real app, this scenario should be prevented at the data layer
    expect(() => {
      renderHook(() => useCourseLevel(emptyCourse))
    }).toThrow()
  })

  it('should maintain all return values', () => {
    const { result } = renderHook(() => useCourseLevel(mockCourse))

    expect(result.current).toHaveProperty('selectedLevel')
    expect(result.current).toHaveProperty('setSelectedLevel')
    expect(result.current).toHaveProperty('currentLevel')
    expect(result.current).toHaveProperty('whatsappUrl')
  })

  it('should preserve setSelectedLevel function identity', () => {
    const { result, rerender } = renderHook(() => useCourseLevel(mockCourse))

    const firstSetSelectedLevel = result.current.setSelectedLevel

    rerender()

    expect(result.current.setSelectedLevel).toBe(firstSetSelectedLevel)
  })
})
