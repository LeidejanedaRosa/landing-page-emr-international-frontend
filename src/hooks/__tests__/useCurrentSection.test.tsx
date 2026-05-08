import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCurrentSection } from '../useCurrentSection'

const createMockSection = (
  id: string,
  offsetTop: number,
  offsetHeight: number
) => {
  const element = document.createElement('section')
  element.setAttribute('data-section', id)
  Object.defineProperty(element, 'offsetTop', {
    value: offsetTop,
    writable: true,
  })
  Object.defineProperty(element, 'offsetHeight', {
    value: offsetHeight,
    writable: true,
  })
  return element
}

const setupScrollMock = () => {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: 0,
  })
}

const setupScrollEventListener = () => {
  let scrollEventListener: (() => void) | null = null
  const originalAddEventListener = window.addEventListener
  vi.spyOn(window, 'addEventListener').mockImplementation(
    (event, handler, options) => {
      if (event === 'scroll' && typeof handler === 'function') {
        scrollEventListener = handler as () => void
      }
      return originalAddEventListener.call(window, event, handler, options)
    }
  )
  return () => scrollEventListener
}

const updateScrollPosition = (position: number) => {
  Object.defineProperty(window, 'scrollY', {
    value: position,
    writable: true,
    configurable: true,
  })
}

describe('useCurrentSection', () => {
  let getScrollEventListener: (() => (() => void) | null) | null = null

  beforeEach(() => {
    setupScrollMock()
    getScrollEventListener = setupScrollEventListener()
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
    getScrollEventListener = null
  })

  it('should initialize with no current section', () => {
    const { result } = renderHook(() => useCurrentSection([]))
    expect(result.current).toBe('')
  })

  it('should setup scroll listener and detect sections', () => {
    const mockInicio = createMockSection('inicio', 0, 500)
    const mockSobre = createMockSection('sobre', 500, 500)
    const mockTreinamentos = createMockSection('treinamentos', 1000, 500)

    document.body.append(mockInicio, mockSobre, mockTreinamentos)

    const { result } = renderHook(() =>
      useCurrentSection(['inicio', 'sobre', 'treinamentos'])
    )

    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )

    act(() => {
      getScrollEventListener?.()?.()
    })

    expect(result.current).toBe('inicio')
  })

  it('should update current section when scroll position changes', () => {
    const mockSobre = createMockSection('sobre', 500, 500)
    document.body.appendChild(mockSobre)

    const { result } = renderHook(() => useCurrentSection(['sobre']))

    act(() => {
      updateScrollPosition(600)
      getScrollEventListener?.()?.()
    })

    expect(result.current).toBe('sobre')
  })

  it('should cleanup scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useCurrentSection([]))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    )
  })
})
