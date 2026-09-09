import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useHashNavigation } from '../useHashNavigation'

const setHash = (hash: string) => {
  window.history.replaceState(null, '', hash)
}

describe('useHashNavigation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setHash(' ')
    setHash('#')
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
    setHash('#')
  })

  it('scrolls to the section named by the hash on mount (deep link)', () => {
    setHash('#depoimentos')
    const section = document.createElement('section')
    section.id = 'depoimentos'
    const scrollIntoView = vi.fn()
    section.scrollIntoView =
      scrollIntoView as unknown as HTMLElement['scrollIntoView']
    document.body.appendChild(section)

    renderHook(() => useHashNavigation())
    vi.advanceTimersByTime(120)

    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('does nothing when there is no hash', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

    renderHook(() => useHashNavigation())

    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  it('responds to hashchange (menu clicks)', () => {
    renderHook(() => useHashNavigation())

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
    setHash('#sobre')
    window.dispatchEvent(new Event('hashchange'))

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'lazysection:reveal' })
    )
  })

  it('stops listening after unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useHashNavigation())

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('hashchange', expect.any(Function))
    removeSpy.mockRestore()
  })

  it('does not throw on a malformed hash and still registers the listener', () => {
    setHash('#%')
    const addSpy = vi.spyOn(window, 'addEventListener')

    expect(() => renderHook(() => useHashNavigation())).not.toThrow()
    expect(addSpy).toHaveBeenCalledWith('hashchange', expect.any(Function))
    addSpy.mockRestore()
  })
})
