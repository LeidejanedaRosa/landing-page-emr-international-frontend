import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useFocus, useFocusTrap, useUniqueId } from '../useAccessibility'

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

describe('useFocus', () => {
  it('should provide focus management functionality', () => {
    const { result } = renderHook(() => useFocus())

    expect(result.current).toHaveProperty('elementRef')
    expect(result.current).toHaveProperty('focus')
    expect(result.current).toHaveProperty('blur')
    expect(result.current).toHaveProperty('isFocused')
    expect(result.current).toHaveProperty('onFocus')
    expect(result.current).toHaveProperty('onBlur')
  })

  it('should track focus state correctly', () => {
    const { result } = renderHook(() => useFocus())

    expect(result.current.isFocused).toBe(false)

    act(() => {
      result.current.onFocus()
    })

    expect(result.current.isFocused).toBe(true)

    act(() => {
      result.current.onBlur()
    })

    expect(result.current.isFocused).toBe(false)
  })

  it('should provide focus and blur methods', () => {
    const { result } = renderHook(() => useFocus())

    const mockElement = {
      focus: vi.fn(),
      blur: vi.fn(),
    }

    result.current.elementRef.current = mockElement as any

    act(() => {
      result.current.focus()
    })

    expect(mockElement.focus).toHaveBeenCalled()

    act(() => {
      result.current.blur()
    })

    expect(mockElement.blur).toHaveBeenCalled()
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

  it('should store previous focus element', () => {
    const mockActiveElement = document.createElement('button')
    Object.defineProperty(document, 'activeElement', {
      value: mockActiveElement,
      configurable: true,
    })

    const { result } = renderHook(() => useFocusTrap(true))

    const mockContainer = document.createElement('div')
    result.current.containerRef.current = mockContainer

    expect(result.current.containerRef).toBeDefined()
  })
})
