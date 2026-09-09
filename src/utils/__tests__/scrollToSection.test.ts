import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { scrollToSection } from '../scrollToSection'

const SECTION_ID = 'treinamentos'

const addSection = (id: string, attrs: Partial<HTMLElement> = {}) => {
  const el = document.createElement('section')
  el.id = attrs.id ?? id
  const scrollIntoView = vi.fn()
  el.scrollIntoView = scrollIntoView as unknown as HTMLElement['scrollIntoView']
  document.body.appendChild(el)
  return { el, scrollIntoView }
}

describe('scrollToSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('history', { replaceState: vi.fn() })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('does nothing for an empty id', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
    scrollToSection('')
    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  it('scrolls immediately when the section is already in the DOM', () => {
    const { scrollIntoView } = addSection(SECTION_ID)

    scrollToSection(SECTION_ID, { updateHash: true })

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      `#${SECTION_ID}`
    )
  })

  it('does not re-scroll a section that was already mounted', () => {
    const { scrollIntoView } = addSection(SECTION_ID)

    scrollToSection(SECTION_ID)
    vi.advanceTimersByTime(1000)

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('finds a section by data-section when there is no matching id', () => {
    const el = document.createElement('section')
    el.setAttribute('data-section', SECTION_ID)
    const scrollIntoView = vi.fn()
    el.scrollIntoView =
      scrollIntoView as unknown as HTMLElement['scrollIntoView']
    document.body.appendChild(el)

    scrollToSection(SECTION_ID)

    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('reveals lazy sections and scrolls once the target mounts', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

    scrollToSection(SECTION_ID)

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'lazysection:reveal' })
    )

    const { scrollIntoView } = addSection(SECTION_ID)
    vi.advanceTimersByTime(120)

    // After a reveal it snaps ('auto'), not a slow smooth scroll.
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    })
  })

  it('re-scrolls a revealed section as sibling chunks finish loading', () => {
    scrollToSection(SECTION_ID)

    const { scrollIntoView } = addSection(SECTION_ID)
    vi.advanceTimersByTime(120)
    expect(scrollIntoView).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(600)
    expect(scrollIntoView.mock.calls.length).toBeGreaterThan(1)
  })

  it('warns once when the target never mounts', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    scrollToSection(SECTION_ID)
    vi.advanceTimersByTime(5000)

    expect(warn).toHaveBeenCalledWith(`Scroll target not found: ${SECTION_ID}`)
  })

  it('a later navigation supersedes an in-flight one', () => {
    scrollToSection('sobre')
    scrollToSection('depoimentos')

    const sobre = addSection('sobre')
    const depoimentos = addSection('depoimentos')
    vi.advanceTimersByTime(1000)

    expect(sobre.scrollIntoView).not.toHaveBeenCalled()
    expect(depoimentos.scrollIntoView).toHaveBeenCalled()
  })

  it('a stale settle re-scroll does not fire after a newer navigation', () => {
    scrollToSection('sobre')
    const sobre = addSection('sobre')
    vi.advanceTimersByTime(120)
    const callsBeforeSupersede = sobre.scrollIntoView.mock.calls.length

    scrollToSection('depoimentos')
    vi.advanceTimersByTime(600)

    expect(sobre.scrollIntoView.mock.calls).toHaveLength(callsBeforeSupersede)
  })
})
