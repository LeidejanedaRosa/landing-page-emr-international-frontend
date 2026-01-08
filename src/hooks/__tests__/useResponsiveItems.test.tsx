import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { type ItemsPerView, useResponsiveItems } from '../useResponsiveItems'

describe('useResponsiveItems', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with desktop value by default', () => {
    const { result } = renderHook(() => useResponsiveItems())

    expect(result.current).toBe(4)
  })

  it('should use custom itemsPerView configuration', () => {
    const customConfig: ItemsPerView = {
      mobile: 2,
      tablet: 3,
      desktop: 5,
    }

    const { result } = renderHook(() => useResponsiveItems(customConfig))

    expect(result.current).toBe(5)
  })

  it('should return mobile items for width < 768', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(1)
    })
  })

  it('should return tablet items for width >= 768 and < 1024', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(2)
    })
  })

  it('should return desktop items for width >= 1024', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(4)
    })
  })

  it('should update items on resize events', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    // Start with desktop
    expect(result.current).toBe(4)

    // Resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 400,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(1)
    })

    // Resize to tablet
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 900,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(2)
    })
  })

  it('should clean up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useResponsiveItems())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
  })

  it('should handle exact breakpoint values correctly', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    // Exactly at mobile/tablet breakpoint (768)
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(2) // Should be tablet
    })

    // Exactly at tablet/desktop breakpoint (1024)
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(4) // Should be desktop
    })
  })

  it('should update when itemsPerView config changes', async () => {
    const { result, rerender } = renderHook(
      ({ itemsPerView }) => useResponsiveItems(itemsPerView),
      {
        initialProps: {
          itemsPerView: { mobile: 1, tablet: 2, desktop: 4 },
        },
      }
    )

    expect(result.current).toBe(4)

    rerender({
      itemsPerView: { mobile: 2, tablet: 3, desktop: 6 },
    })

    await waitFor(() => {
      expect(result.current).toBe(6)
    })
  })

  it('should handle very small screen widths', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(1)
    })
  })

  it('should handle very large screen widths', async () => {
    const { result } = renderHook(() => useResponsiveItems())

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 2560,
      })
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(result.current).toBe(4)
    })
  })
})
