import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useMobileMenu } from '../useMobileMenu'

describe('useMobileMenu', () => {
  it('should initialize with menu closed', () => {
    const { result } = renderHook(() => useMobileMenu())

    expect(result.current.isMobileMenuOpen).toBe(false)
  })

  it('should open menu when openMobileMenu is called', () => {
    const { result } = renderHook(() => useMobileMenu())

    act(() => {
      result.current.openMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(true)
  })

  it('should close menu when closeMobileMenu is called', () => {
    const { result } = renderHook(() => useMobileMenu())

    act(() => {
      result.current.openMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(true)

    act(() => {
      result.current.closeMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(false)
  })

  it('should toggle menu state when toggleMobileMenu is called', () => {
    const { result } = renderHook(() => useMobileMenu())

    expect(result.current.isMobileMenuOpen).toBe(false)

    act(() => {
      result.current.toggleMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(true)

    act(() => {
      result.current.toggleMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(false)
  })

  it('should toggle menu multiple times correctly', () => {
    const { result } = renderHook(() => useMobileMenu())

    act(() => {
      result.current.toggleMobileMenu()
      result.current.toggleMobileMenu()
      result.current.toggleMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(true)
  })

  it('should remain closed when closeMobileMenu is called multiple times', () => {
    const { result } = renderHook(() => useMobileMenu())

    act(() => {
      result.current.closeMobileMenu()
      result.current.closeMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(false)
  })

  it('should remain open when openMobileMenu is called multiple times', () => {
    const { result } = renderHook(() => useMobileMenu())

    act(() => {
      result.current.openMobileMenu()
      result.current.openMobileMenu()
    })

    expect(result.current.isMobileMenuOpen).toBe(true)
  })

  it('should return all expected methods', () => {
    const { result } = renderHook(() => useMobileMenu())

    expect(result.current).toHaveProperty('isMobileMenuOpen')
    expect(result.current).toHaveProperty('toggleMobileMenu')
    expect(result.current).toHaveProperty('closeMobileMenu')
    expect(result.current).toHaveProperty('openMobileMenu')
    expect(typeof result.current.toggleMobileMenu).toBe('function')
    expect(typeof result.current.closeMobileMenu).toBe('function')
    expect(typeof result.current.openMobileMenu).toBe('function')
  })
})
