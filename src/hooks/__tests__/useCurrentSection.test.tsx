import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCurrentSection } from '../useCurrentSection'

const createMockSection = (
  id: string,
  offsetTop: number,
  offsetHeight: number
) => {
  const element = document.createElement('section')
  element.id = id
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

describe('useCurrentSection', () => {
  let scrollEventListener: (() => void) | null = null

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })

    const originalAddEventListener = window.addEventListener
    vi.spyOn(window, 'addEventListener').mockImplementation(
      (event, handler, options) => {
        if (event === 'scroll' && typeof handler === 'function') {
          scrollEventListener = handler as () => void
        }
        return originalAddEventListener.call(window, event, handler, options)
      }
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
    scrollEventListener = null
  })

  it('should initialize with no current section', () => {
    const { result } = renderHook(() => useCurrentSection([]))
    expect(result.current).toBe('')
  })

  it('should setup scroll listener and detect sections', () => {
    const mockHero = createMockSection('hero', 0, 500)
    const mockAbout = createMockSection('sobre', 500, 500)
    const mockServices = createMockSection('servicos', 1000, 500)

    document.body.append(mockHero, mockAbout, mockServices)

    const { result } = renderHook(() =>
      useCurrentSection(['hero', 'sobre', 'servicos'])
    )

    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )
    expect(result.current).toBe('hero')
  })

  it('should update current section when scroll position changes', () => {
    document.body.appendChild(createMockSection('sobre', 500, 500))

    const { result } = renderHook(() => useCurrentSection(['sobre']))

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true })
      scrollEventListener?.()
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
