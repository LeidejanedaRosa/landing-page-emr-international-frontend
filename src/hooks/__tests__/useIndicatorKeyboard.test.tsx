import { type KeyboardEvent } from 'react'

import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useIndicatorKeyboard } from '../useIndicatorKeyboard'

describe('useIndicatorKeyboard', () => {
  const createMockKeyboardEvent = (
    key: string,
    currentTarget?: HTMLButtonElement
  ): KeyboardEvent<HTMLButtonElement> => {
    return {
      key,
      preventDefault: vi.fn(),
      currentTarget: currentTarget || document.createElement('button'),
    } as unknown as KeyboardEvent<HTMLButtonElement>
  }

  it('should initialize with buttonsRef and handleKeyDown', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    expect(result.current.buttonsRef).toBeDefined()
    expect(result.current.handleKeyDown).toBeInstanceOf(Function)
  })

  it('should navigate to next slide with ArrowRight', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowRight')
    result.current.handleKeyDown(event, 2)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(goToSlide).toHaveBeenCalledWith(3)
  })

  it('should navigate to next slide with ArrowDown', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowDown')
    result.current.handleKeyDown(event, 1)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(goToSlide).toHaveBeenCalledWith(2)
  })

  it('should wrap to first slide when navigating right from last slide', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowRight')
    result.current.handleKeyDown(event, 4)

    expect(goToSlide).toHaveBeenCalledWith(0)
  })

  it('should navigate to previous slide with ArrowLeft', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowLeft')
    result.current.handleKeyDown(event, 2)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(goToSlide).toHaveBeenCalledWith(1)
  })

  it('should navigate to previous slide with ArrowUp', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowUp')
    result.current.handleKeyDown(event, 3)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(goToSlide).toHaveBeenCalledWith(2)
  })

  it('should wrap to last slide when navigating left from first slide', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowLeft')
    result.current.handleKeyDown(event, 0)

    expect(goToSlide).toHaveBeenCalledWith(4)
  })

  it('should navigate to first slide with Home', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('Home')
    result.current.handleKeyDown(event, 3)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(goToSlide).toHaveBeenCalledWith(0)
  })

  it('should navigate to last slide with End', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('End')
    result.current.handleKeyDown(event, 1)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(goToSlide).toHaveBeenCalledWith(4)
  })

  it('should not navigate with unhandled keys', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 5, goToSlide })
    )

    const event = createMockKeyboardEvent('Enter')
    result.current.handleKeyDown(event, 2)

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(goToSlide).not.toHaveBeenCalled()
  })

  it('should not navigate when totalSlides is 0', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 0, goToSlide })
    )

    const event = createMockKeyboardEvent('ArrowRight')
    result.current.handleKeyDown(event, 0)

    expect(goToSlide).not.toHaveBeenCalled()
  })

  it('should focus the next button after navigation', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 3, goToSlide })
    )

    const button0 = document.createElement('button')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')

    button0.focus = vi.fn()
    button1.focus = vi.fn()
    button2.focus = vi.fn()

    result.current.buttonsRef.current = [button0, button1, button2]

    const event = createMockKeyboardEvent('ArrowRight')
    result.current.handleKeyDown(event, 0)

    expect(goToSlide).toHaveBeenCalledWith(1)
    expect(button1.focus).toHaveBeenCalled()
  })

  it('should handle null button reference gracefully', () => {
    const goToSlide = vi.fn()
    const { result } = renderHook(() =>
      useIndicatorKeyboard({ totalSlides: 3, goToSlide })
    )

    result.current.buttonsRef.current = [null, null, null]

    const event = createMockKeyboardEvent('ArrowRight')
    result.current.handleKeyDown(event, 0)

    expect(goToSlide).toHaveBeenCalledWith(1)
    // Should not throw error when trying to focus null
  })
})
