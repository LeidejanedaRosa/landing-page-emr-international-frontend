export const LAZY_SECTION_REVEAL_EVENT = 'lazysection:reveal'

/**
 * Ask every mounted `<LazySection>` to render its content immediately, bypassing
 * the scroll-triggered IntersectionObserver.
 *
 * Used when navigation needs a section that may still be a placeholder — e.g.
 * clicking a menu anchor or opening a deep link to `#treinamentos`. The lazy
 * boundary exists to speed up the initial paint; an explicit navigation intent
 * overrides it.
 */
export const revealLazySections = (): void => {
  window.dispatchEvent(new Event(LAZY_SECTION_REVEAL_EVENT))
}
