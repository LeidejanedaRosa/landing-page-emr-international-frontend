import { act } from 'react'

import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import { LazySection } from '../LazySection'
import {
  LAZY_SECTION_REVEAL_EVENT,
  revealLazySections,
} from '../lazySectionReveal'

const Section = () => <section id='sobre'>conteúdo real</section>

describe('LazySection', () => {
  it('renders the placeholder until it becomes visible', () => {
    render(<LazySection sectionName='Sobre' component={Section} />)

    expect(screen.getByLabelText('Carregando seção')).toBeInTheDocument()
    expect(screen.queryByText('conteúdo real')).not.toBeInTheDocument()
  })

  it('renders the real component after a reveal event', () => {
    render(<LazySection sectionName='Sobre' component={Section} />)

    act(() => {
      revealLazySections()
    })

    expect(screen.getByText('conteúdo real')).toBeInTheDocument()
    expect(screen.queryByLabelText('Carregando seção')).not.toBeInTheDocument()
  })

  it('stops listening for reveal events after unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(
      <LazySection sectionName='Sobre' component={Section} />
    )

    unmount()

    expect(removeSpy).toHaveBeenCalledWith(
      LAZY_SECTION_REVEAL_EVENT,
      expect.any(Function)
    )
    removeSpy.mockRestore()
  })
})
