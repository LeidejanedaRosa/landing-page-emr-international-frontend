import { revealLazySections } from '../components/layout/lazySectionReveal'

const POLL_INTERVAL_MS = 60
const MAX_WAIT_MS = 4000

// When a section had to be revealed, the sections above it may still be loading
// their chunk; re-scroll a couple of times so the target settles into place.
const SETTLE_DELAYS_MS = [200, 600]

// Each call gets a token. A later navigation invalidates the earlier one so a
// pending poll loop or delayed re-scroll can't yank the page back to a stale
// target (e.g. clicking "Sobre" then "Depoimentos" before the first mounts).
let latestRequest = 0

export interface ScrollToSectionOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  /** Replace the URL hash with `#${id}` after scrolling. */
  updateHash?: boolean
}

const findSection = (id: string): Element | null =>
  document.getElementById(id) ??
  document.querySelector(`[data-section="${CSS.escape(id)}"]`)

/**
 * Scrolls the page to the section matching `id`.
 *
 * If the section is not in the DOM yet (a lazy-loaded section below the fold),
 * it triggers {@link revealLazySections} and polls until the element mounts,
 * giving up after {@link MAX_WAIT_MS}. A newer call supersedes an in-flight one.
 */
export function scrollToSection(
  id: string,
  {
    behavior = 'smooth',
    block = 'start',
    updateHash = false,
  }: ScrollToSectionOptions = {}
): void {
  if (!id) return

  const request = ++latestRequest
  const isStale = () => request !== latestRequest

  const scrollTo = (element: Element, { afterReveal = false } = {}) => {
    if (isStale()) return
    // After a reveal the user already waited for the chunk — snap, don't animate
    // (a slow smooth scroll is also what made this flaky on WebKit).
    const effectiveBehavior: ScrollBehavior = afterReveal ? 'auto' : behavior
    element.scrollIntoView({ behavior: effectiveBehavior, block })
    if (afterReveal) {
      SETTLE_DELAYS_MS.forEach(delay =>
        window.setTimeout(() => {
          if (!isStale())
            element.scrollIntoView({ behavior: effectiveBehavior, block })
        }, delay)
      )
    }
    if (updateHash && window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  const existing = findSection(id)
  if (existing) {
    scrollTo(existing)
    return
  }

  revealLazySections()

  let waited = 0
  const attempt = () => {
    if (isStale()) return
    const element = findSection(id)
    if (element) {
      scrollTo(element, { afterReveal: true })
      return
    }
    waited += POLL_INTERVAL_MS
    if (waited < MAX_WAIT_MS) {
      window.setTimeout(attempt, POLL_INTERVAL_MS)
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Scroll target not found: ${id}`)
    }
  }
  window.setTimeout(attempt, POLL_INTERVAL_MS)
}
