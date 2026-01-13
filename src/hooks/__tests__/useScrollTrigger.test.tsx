import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useScrollTrigger } from '../useScrollTrigger'

const TEST_SECTION_ID = 'test-section'
const TEST_STORAGE_KEY = 'test-key'

type ObserverCallback = (
  _entries: IntersectionObserverEntry[],
  _observer: IntersectionObserver
) => void

describe('useScrollTrigger', () => {
  let intersectionObserverCallback: ObserverCallback
  let observeMock: ReturnType<typeof vi.fn>
  let disconnectMock: ReturnType<typeof vi.fn>

  const createTestSection = (): HTMLDivElement => {
    const section = document.createElement('div')
    section.id = TEST_SECTION_ID
    document.body.appendChild(section)
    return section
  }

  const createMockIntersectionObserverEntry = (
    target: HTMLElement,
    isIntersecting: boolean
  ): IntersectionObserverEntry => {
    return {
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: target.getBoundingClientRect(),
      isIntersecting,
      rootBounds: null,
      target,
      time: Date.now(),
    }
  }

  const simulateIntersection = (
    section: HTMLElement,
    isIntersecting: boolean
  ): void => {
    intersectionObserverCallback(
      [createMockIntersectionObserverEntry(section, isIntersecting)],
      {} as IntersectionObserver
    )
  }

  beforeEach(() => {
    observeMock = vi.fn()
    disconnectMock = vi.fn()

    // biome-ignore lint/suspicious/noExplicitAny: Required for test mocking
    globalThis.IntersectionObserver = class IntersectionObserver {
      constructor(callback: ObserverCallback) {
        intersectionObserverCallback = callback
      }
      observe = observeMock
      disconnect = disconnectMock
      unobserve = vi.fn()
      takeRecords = vi.fn()
      root = null
      rootMargin = ''
      thresholds = []
    } as any

    globalThis.sessionStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }

    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  it('should initialize with hasTriggered as false', () => {
    const { result } = renderHook(() =>
      useScrollTrigger({ targetSectionId: TEST_SECTION_ID })
    )

    expect(result.current.hasTriggered).toBe(false)
  })

  describe('Observer setup', () => {
    it('should observe target section when it exists', async () => {
      const section = createTestSection()

      renderHook(() => useScrollTrigger({ targetSectionId: TEST_SECTION_ID }))

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalledWith(section)
      })
    })

    it('should not setup observer when enabled is false', () => {
      createTestSection()

      renderHook(() =>
        useScrollTrigger({ targetSectionId: TEST_SECTION_ID, enabled: false })
      )

      expect(observeMock).not.toHaveBeenCalled()
    })

    it('should cleanup observer on unmount', async () => {
      createTestSection()

      const { unmount } = renderHook(() =>
        useScrollTrigger({ targetSectionId: TEST_SECTION_ID })
      )

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      unmount()

      expect(disconnectMock).toHaveBeenCalled()
    })
  })

  describe('Intersection behavior', () => {
    it('should trigger when section becomes visible', async () => {
      const section = createTestSection()

      const { result } = renderHook(() =>
        useScrollTrigger({
          targetSectionId: TEST_SECTION_ID,
          storageKey: TEST_STORAGE_KEY,
        })
      )

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      simulateIntersection(section, true)

      await waitFor(() => {
        expect(result.current.hasTriggered).toBe(true)
        expect(sessionStorage.setItem).toHaveBeenCalledWith(
          TEST_STORAGE_KEY,
          'true'
        )
      })
    })

    it('should not trigger when section is not intersecting', async () => {
      const section = createTestSection()

      const { result } = renderHook(() =>
        useScrollTrigger({ targetSectionId: TEST_SECTION_ID })
      )

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      simulateIntersection(section, false)

      expect(result.current.hasTriggered).toBe(false)
    })

    it('should disconnect observer after triggering', async () => {
      const section = createTestSection()

      renderHook(() => useScrollTrigger({ targetSectionId: TEST_SECTION_ID }))

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      simulateIntersection(section, true)

      await waitFor(() => {
        expect(disconnectMock).toHaveBeenCalled()
      })
    })

    it('should handle multiple intersection entries', async () => {
      const section = createTestSection()

      const { result } = renderHook(() =>
        useScrollTrigger({ targetSectionId: TEST_SECTION_ID })
      )

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      intersectionObserverCallback(
        [
          createMockIntersectionObserverEntry(section, false),
          createMockIntersectionObserverEntry(section, true),
        ],
        {} as IntersectionObserver
      )

      await waitFor(() => {
        expect(result.current.hasTriggered).toBe(true)
      })
    })
  })

  describe('SessionStorage integration', () => {
    it('should initialize with true if storageKey exists', () => {
      vi.mocked(sessionStorage.getItem).mockReturnValue('true')

      const { result } = renderHook(() =>
        useScrollTrigger({
          targetSectionId: TEST_SECTION_ID,
          storageKey: TEST_STORAGE_KEY,
        })
      )

      expect(result.current.hasTriggered).toBe(true)
    })

    it('should not setup observer if already triggered from storage', () => {
      vi.mocked(sessionStorage.getItem).mockReturnValue('true')

      renderHook(() =>
        useScrollTrigger({
          targetSectionId: TEST_SECTION_ID,
          storageKey: TEST_STORAGE_KEY,
        })
      )

      expect(observeMock).not.toHaveBeenCalled()
    })

    it('should work without storageKey', async () => {
      const section = createTestSection()

      const { result } = renderHook(() =>
        useScrollTrigger({ targetSectionId: TEST_SECTION_ID })
      )

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      simulateIntersection(section, true)

      await waitFor(() => {
        expect(result.current.hasTriggered).toBe(true)
        expect(sessionStorage.setItem).not.toHaveBeenCalled()
      })
    })

    it('should reset trigger state', async () => {
      const section = createTestSection()

      const { result } = renderHook(() =>
        useScrollTrigger({
          targetSectionId: TEST_SECTION_ID,
          storageKey: TEST_STORAGE_KEY,
        })
      )

      await waitFor(() => {
        expect(observeMock).toHaveBeenCalled()
      })

      simulateIntersection(section, true)

      await waitFor(() => {
        expect(result.current.hasTriggered).toBe(true)
      })

      result.current.resetTrigger()

      await waitFor(() => {
        expect(result.current.hasTriggered).toBe(false)
        expect(sessionStorage.removeItem).toHaveBeenCalledWith(TEST_STORAGE_KEY)
      })
    })
  })

  describe('Element retry mechanism', () => {
    it('should retry finding element if not immediately available', async () => {
      vi.useFakeTimers()

      renderHook(() => useScrollTrigger({ targetSectionId: TEST_SECTION_ID }))

      expect(observeMock).not.toHaveBeenCalled()

      const section = createTestSection()

      await vi.advanceTimersByTimeAsync(150)

      expect(observeMock).toHaveBeenCalledWith(section)

      vi.useRealTimers()
    })

    it('should stop retrying after 10 attempts', async () => {
      vi.useFakeTimers()

      renderHook(() =>
        useScrollTrigger({ targetSectionId: 'non-existent-section' })
      )

      for (let i = 0; i < 10; i++) {
        vi.advanceTimersByTime(100)
      }

      expect(observeMock).not.toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('should cancel element search on unmount', async () => {
      vi.useFakeTimers()

      const { unmount } = renderHook(() =>
        useScrollTrigger({ targetSectionId: TEST_SECTION_ID })
      )

      unmount()

      createTestSection()

      vi.advanceTimersByTime(200)

      expect(observeMock).not.toHaveBeenCalled()

      vi.useRealTimers()
    })
  })
})
