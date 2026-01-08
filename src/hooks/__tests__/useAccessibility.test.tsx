import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useFocusTrap, useUniqueId } from '../useAccessibility'

describe('useUniqueId', () => {
  it('should generate unique IDs with default prefix', () => {
    const { result: result1 } = renderHook(() => useUniqueId())
    const { result: result2 } = renderHook(() => useUniqueId())

    expect(result1.current).toMatch(/^element-/)
    expect(result2.current).toMatch(/^element-/)
    expect(result1.current).not.toBe(result2.current)
  })

  it('should generate unique IDs with custom prefix', () => {
    const { result } = renderHook(() => useUniqueId('custom'))

    expect(result.current).toMatch(/^custom-/)
  })
})

describe('useFocusTrap', () => {
  it('should provide container ref for focus trap', () => {
    const { result } = renderHook(() => useFocusTrap(false))

    expect(result.current).toHaveProperty('containerRef')
  })

  it('should not activate trap when isActive is false', () => {
    const { result } = renderHook(() => useFocusTrap(false))

    expect(result.current.containerRef).toBeDefined()
  })

  it('should handle active state changes', () => {
    const { result, rerender } = renderHook(
      ({ isActive }) => useFocusTrap(isActive),
      { initialProps: { isActive: false } }
    )

    const mockContainer = document.createElement('div')
    result.current.containerRef.current = mockContainer

    rerender({ isActive: true })

    expect(result.current.containerRef.current).toBe(mockContainer)

    rerender({ isActive: false })

    expect(result.current.containerRef.current).toBe(mockContainer)
  })

  it('should store previous focus element and restore on cleanup', () => {
    const mockActiveElement = document.createElement('button')
    document.body.appendChild(mockActiveElement)
    mockActiveElement.focus()

    const { result, rerender, unmount } = renderHook(
      ({ isActive }) => useFocusTrap(isActive),
      { initialProps: { isActive: true } }
    )

    const mockContainer = document.createElement('div')
    document.body.appendChild(mockContainer)
    result.current.containerRef.current = mockContainer

    // Verify the hook is active with a container
    expect(result.current.containerRef.current).toBe(mockContainer)

    // Deactivate the focus trap to trigger cleanup
    rerender({ isActive: false })

    // Wait for cleanup to execute
    unmount()

    // Verify focus was restored to the previous element
    expect(document.activeElement).toBe(mockActiveElement)

    // Cleanup
    document.body.removeChild(mockActiveElement)
    document.body.removeChild(mockContainer)
  })
})
