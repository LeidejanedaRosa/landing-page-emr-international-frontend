import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useModalAccessibility } from '../useModalAccessibility'

describe('useModalAccessibility', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('should return closeButtonRef', () => {
    const onClose = vi.fn()
    const { result } = renderHook(() => useModalAccessibility(false, onClose))

    expect(result.current).toHaveProperty('closeButtonRef')
    expect(result.current.closeButtonRef).toBeDefined()
  })

  it('should not modify body overflow when modal is closed', () => {
    const onClose = vi.fn()
    const originalOverflow = document.body.style.overflow

    renderHook(() => useModalAccessibility(false, onClose))

    expect(document.body.style.overflow).toBe(originalOverflow)
  })

  it('should set body overflow to hidden when modal is opened', () => {
    const onClose = vi.fn()
    const { rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should restore previous overflow value on cleanup', () => {
    const onClose = vi.fn()
    document.body.style.overflow = 'auto'

    const { rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })
    expect(document.body.style.overflow).toBe('hidden')

    rerender({ isOpen: false })
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should store and restore focus to previous element', () => {
    const mockActiveElement = document.createElement('button')
    document.body.appendChild(mockActiveElement)
    mockActiveElement.focus()

    const onClose = vi.fn()
    const { rerender, unmount } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    expect(document.activeElement).toBe(mockActiveElement)

    rerender({ isOpen: true })
    rerender({ isOpen: false })
    unmount()

    expect(document.activeElement).toBe(mockActiveElement)

    document.body.removeChild(mockActiveElement)
  })

  it('should focus close button after timeout when modal opens', () => {
    const onClose = vi.fn()
    const mockCloseButton = document.createElement('button')
    document.body.appendChild(mockCloseButton)

    const { result, rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    result.current.closeButtonRef.current = mockCloseButton
    rerender({ isOpen: true })

    expect(document.activeElement).not.toBe(mockCloseButton)

    vi.advanceTimersByTime(100)

    expect(document.activeElement).toBe(mockCloseButton)

    document.body.removeChild(mockCloseButton)
  })

  it('should not focus close button if it is not in the document', () => {
    const onClose = vi.fn()
    const mockCloseButton = document.createElement('button')

    const { result, rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    result.current.closeButtonRef.current = mockCloseButton
    rerender({ isOpen: true })

    vi.advanceTimersByTime(100)

    expect(document.activeElement).not.toBe(mockCloseButton)
  })

  it('should call onClose when Escape key is pressed and modal is open', () => {
    const onClose = vi.fn()
    const { rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when Escape key is pressed and modal is closed', () => {
    const onClose = vi.fn()
    renderHook(() => useModalAccessibility(false, onClose))

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should not call onClose when other keys are pressed', () => {
    const onClose = vi.fn()
    const { rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    document.dispatchEvent(enterEvent)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should remove keydown event listener on cleanup', () => {
    const onClose = vi.fn()
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    const { rerender, unmount } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    )
  })

  it('should update onClose ref when onClose function changes', () => {
    const onClose1 = vi.fn()
    const onClose2 = vi.fn()

    const { rerender } = renderHook(
      ({ isOpen, onClose }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false, onClose: onClose1 } }
    )

    rerender({ isOpen: true, onClose: onClose1 })

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(onClose1).toHaveBeenCalledTimes(1)
    expect(onClose2).not.toHaveBeenCalled()

    rerender({ isOpen: true, onClose: onClose2 })

    document.dispatchEvent(escapeEvent)

    expect(onClose1).toHaveBeenCalledTimes(1)
    expect(onClose2).toHaveBeenCalledTimes(1)
  })

  it('should clear timeout on cleanup', () => {
    const onClose = vi.fn()
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    const { rerender, unmount } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })
    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
  })

  it('should handle multiple open/close cycles correctly', () => {
    const onClose = vi.fn()
    const mockCloseButton = document.createElement('button')
    document.body.appendChild(mockCloseButton)

    const { result, rerender } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    result.current.closeButtonRef.current = mockCloseButton

    // First open
    rerender({ isOpen: true })
    expect(document.body.style.overflow).toBe('hidden')

    // Close
    rerender({ isOpen: false })
    expect(document.body.style.overflow).toBe('')

    // Second open
    rerender({ isOpen: true })
    expect(document.body.style.overflow).toBe('hidden')

    vi.advanceTimersByTime(100)
    expect(document.activeElement).toBe(mockCloseButton)

    document.body.removeChild(mockCloseButton)
  })

  it('should not restore focus if previous element is not an HTMLElement', () => {
    const onClose = vi.fn()

    Object.defineProperty(document, 'activeElement', {
      writable: true,
      configurable: true,
      value: { focus: vi.fn() } as unknown as Element,
    })

    const { rerender, unmount } = renderHook(
      ({ isOpen }) => useModalAccessibility(isOpen, onClose),
      { initialProps: { isOpen: false } }
    )

    rerender({ isOpen: true })
    rerender({ isOpen: false })
    unmount()

    expect(
      (document.activeElement as unknown as { focus: () => void }).focus
    ).not.toHaveBeenCalled()

    Object.defineProperty(document, 'activeElement', {
      writable: true,
      configurable: true,
      value: document.body,
    })
  })
})
