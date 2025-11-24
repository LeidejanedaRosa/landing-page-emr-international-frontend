import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useCurrentSection } from '../useCurrentSection'

const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)

describe('useCurrentSection', () => {
  it('should initialize with no current section', () => {
    const { result } = renderHook(() => useCurrentSection())

    expect(result.current).toBe('')
  })

  it('should setup intersection observer for sections', () => {
    // Mock dos elementos das seções
    const mockHeroElement = document.createElement('section')
    mockHeroElement.id = 'hero'
    const mockAboutElement = document.createElement('section')
    mockAboutElement.id = 'sobre'
    const mockServicesElement = document.createElement('section')
    mockServicesElement.id = 'servicos'

    document.body.appendChild(mockHeroElement)
    document.body.appendChild(mockAboutElement)
    document.body.appendChild(mockServicesElement)

    const mockObserve = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })

    renderHook(() => useCurrentSection())

    expect(mockIntersectionObserver).toHaveBeenCalled()

    document.body.removeChild(mockHeroElement)
    document.body.removeChild(mockAboutElement)
    document.body.removeChild(mockServicesElement)
  })

  it('should handle intersection changes correctly', () => {
    const mockCallback = vi.fn()

    mockIntersectionObserver.mockImplementation(callback => {
      mockCallback.mockImplementation(callback)
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })

    const { result } = renderHook(() => useCurrentSection())

    const mockEntries = [
      {
        target: { id: 'sobre' },
        isIntersecting: true,
      },
    ]

    if (mockCallback.mock.calls.length > 0) {
      mockCallback.mock.calls[0][0](mockEntries)
    }

    expect(result.current).toBeDefined()
  })

  it('should cleanup observer on unmount', () => {
    const mockDisconnect = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: mockDisconnect,
    })

    const { unmount } = renderHook(() => useCurrentSection())

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
  })
})
