import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSkipLinks } from '../useAccessibilityNavigation'

vi.mock('../../utils/accessibility/helpers', () => ({
  getFocusableElements: vi.fn(container => {
    const elements = Array.from(
      container.querySelectorAll('button, a, input, [tabindex]')
    )
    return elements as HTMLElement[]
  }),
}))

describe('useSkipLinks', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('skipToContent', () => {
    it('should focus main content with #main-content', () => {
      const mainContent = document.createElement('div')
      mainContent.id = 'main-content'
      mainContent.focus = vi.fn()
      mainContent.scrollIntoView = vi.fn()
      document.body.appendChild(mainContent)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToContent()
      })

      expect(mainContent.getAttribute('tabindex')).toBe('-1')
      expect(mainContent.focus).toHaveBeenCalled()
      expect(mainContent.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      })
    })

    it('should focus main element', () => {
      const main = document.createElement('main')
      main.focus = vi.fn()
      main.scrollIntoView = vi.fn()
      document.body.appendChild(main)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToContent()
      })

      expect(main.getAttribute('tabindex')).toBe('-1')
      expect(main.focus).toHaveBeenCalled()
      expect(main.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should focus element with role="main"', () => {
      const mainContent = document.createElement('div')
      mainContent.setAttribute('role', 'main')
      mainContent.focus = vi.fn()
      mainContent.scrollIntoView = vi.fn()
      document.body.appendChild(mainContent)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToContent()
      })

      expect(mainContent.getAttribute('tabindex')).toBe('-1')
      expect(mainContent.focus).toHaveBeenCalled()
      expect(mainContent.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      })
    })

    it('should prioritize #main-content over other selectors', () => {
      const mainElement = document.createElement('main')
      mainElement.focus = vi.fn()
      mainElement.scrollIntoView = vi.fn()

      const mainId = document.createElement('div')
      mainId.id = 'main-content'
      mainId.focus = vi.fn()
      mainId.scrollIntoView = vi.fn()

      document.body.appendChild(mainId)
      document.body.appendChild(mainElement)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToContent()
      })

      expect(mainId.focus).toHaveBeenCalled()
      expect(mainElement.focus).not.toHaveBeenCalled()
    })

    it('should do nothing if main content is not found', () => {
      const { result } = renderHook(() => useSkipLinks())

      expect(() => {
        act(() => {
          result.current.skipToContent()
        })
      }).not.toThrow()
    })

    it('should set tabindex to -1 for programmatic focus', () => {
      const main = document.createElement('main')
      main.focus = vi.fn()
      main.scrollIntoView = vi.fn()
      document.body.appendChild(main)

      const { result } = renderHook(() => useSkipLinks())

      expect(main.getAttribute('tabindex')).toBeNull()

      act(() => {
        result.current.skipToContent()
      })

      expect(main.getAttribute('tabindex')).toBe('-1')
    })
  })

  describe('skipToNavigation', () => {
    it('should focus first link in nav element', () => {
      const nav = document.createElement('nav')
      const link1 = document.createElement('a')
      link1.href = '#'
      link1.focus = vi.fn()
      const link2 = document.createElement('a')
      link2.href = '#'
      link2.focus = vi.fn()

      nav.appendChild(link1)
      nav.appendChild(link2)
      nav.scrollIntoView = vi.fn()
      document.body.appendChild(nav)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToNavigation()
      })

      expect(link1.focus).toHaveBeenCalled()
      expect(link2.focus).not.toHaveBeenCalled()
      expect(nav.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should focus first focusable element in role="navigation"', () => {
      const nav = document.createElement('div')
      nav.setAttribute('role', 'navigation')
      const button = document.createElement('button')
      button.textContent = 'Menu'
      button.focus = vi.fn()

      nav.appendChild(button)
      nav.scrollIntoView = vi.fn()
      document.body.appendChild(nav)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToNavigation()
      })

      expect(button.focus).toHaveBeenCalled()
      expect(nav.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle nav with multiple focusable elements', () => {
      const nav = document.createElement('nav')
      const button = document.createElement('button')
      button.focus = vi.fn()
      const link = document.createElement('a')
      link.href = '#'
      link.focus = vi.fn()
      const input = document.createElement('input')
      input.focus = vi.fn()

      nav.appendChild(button)
      nav.appendChild(link)
      nav.appendChild(input)
      nav.scrollIntoView = vi.fn()
      document.body.appendChild(nav)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToNavigation()
      })

      expect(button.focus).toHaveBeenCalled()
      expect(link.focus).not.toHaveBeenCalled()
      expect(input.focus).not.toHaveBeenCalled()
    })

    it('should do nothing if navigation is not found', () => {
      const { result } = renderHook(() => useSkipLinks())

      expect(() => {
        act(() => {
          result.current.skipToNavigation()
        })
      }).not.toThrow()
    })

    it('should scroll to navigation container even when no focusable elements exist', () => {
      const nav = document.createElement('nav')
      nav.scrollIntoView = vi.fn()
      document.body.appendChild(nav)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToNavigation()
      })

      expect(nav.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should prioritize nav element over role="navigation"', () => {
      const roleNav = document.createElement('div')
      roleNav.setAttribute('role', 'navigation')
      const roleLink = document.createElement('a')
      roleLink.href = '#'
      roleLink.focus = vi.fn()
      roleNav.appendChild(roleLink)
      roleNav.scrollIntoView = vi.fn()

      const navElement = document.createElement('nav')
      const navLink = document.createElement('a')
      navLink.href = '#'
      navLink.focus = vi.fn()
      navElement.appendChild(navLink)
      navElement.scrollIntoView = vi.fn()

      document.body.appendChild(navElement)
      document.body.appendChild(roleNav)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToNavigation()
      })

      expect(navLink.focus).toHaveBeenCalled()
      expect(roleLink.focus).not.toHaveBeenCalled()
    })
  })

  describe('hook stability', () => {
    it('should maintain function identity across renders', () => {
      const { result, rerender } = renderHook(() => useSkipLinks())

      const firstSkipToContent = result.current.skipToContent
      const firstSkipToNavigation = result.current.skipToNavigation

      rerender()

      expect(result.current.skipToContent).toBe(firstSkipToContent)
      expect(result.current.skipToNavigation).toBe(firstSkipToNavigation)
    })

    it('should return object with both functions', () => {
      const { result } = renderHook(() => useSkipLinks())

      expect(result.current).toHaveProperty('skipToContent')
      expect(result.current).toHaveProperty('skipToNavigation')
      expect(typeof result.current.skipToContent).toBe('function')
      expect(typeof result.current.skipToNavigation).toBe('function')
    })
  })

  describe('real-world scenarios', () => {
    it('should work with complex document structure', () => {
      const header = document.createElement('header')
      const nav = document.createElement('nav')
      const navLink = document.createElement('a')
      navLink.href = '#'
      navLink.focus = vi.fn()
      nav.appendChild(navLink)
      nav.scrollIntoView = vi.fn()
      header.appendChild(nav)

      const main = document.createElement('main')
      main.id = 'main-content'
      main.focus = vi.fn()
      main.scrollIntoView = vi.fn()

      const footer = document.createElement('footer')

      document.body.appendChild(header)
      document.body.appendChild(main)
      document.body.appendChild(footer)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToContent()
      })
      expect(main.focus).toHaveBeenCalled()

      act(() => {
        result.current.skipToNavigation()
      })
      expect(navLink.focus).toHaveBeenCalled()
    })

    it('should handle multiple nav elements by focusing first', () => {
      const nav1 = document.createElement('nav')
      const link1 = document.createElement('a')
      link1.href = '#'
      link1.focus = vi.fn()
      nav1.appendChild(link1)
      nav1.scrollIntoView = vi.fn()

      const nav2 = document.createElement('nav')
      const link2 = document.createElement('a')
      link2.href = '#'
      link2.focus = vi.fn()
      nav2.appendChild(link2)
      nav2.scrollIntoView = vi.fn()

      document.body.appendChild(nav1)
      document.body.appendChild(nav2)

      const { result } = renderHook(() => useSkipLinks())

      act(() => {
        result.current.skipToNavigation()
      })

      expect(link1.focus).toHaveBeenCalled()
      expect(link2.focus).not.toHaveBeenCalled()
    })
  })
})
