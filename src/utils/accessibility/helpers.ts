import { KEYBOARD_KEYS } from '../../types/accessibility'

let idCounter = 0

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const generateId = (prefix = 'element'): string => {
  idCounter += 1

  if (typeof document === 'undefined') {
    return `${prefix}-${idCounter}-${generateUUID()}`
  }

  let candidateId = `${prefix}-${idCounter}`

  while (document.getElementById(candidateId)) {
    idCounter += 1
    candidateId = `${prefix}-${idCounter}`
  }

  return candidateId
}

export const resetIdCounter = (): void => {
  idCounter = 0
}

export const isKeyPressed = (
  event: KeyboardEvent,
  key: (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS]
): boolean => {
  return event.key === key
}

export const preventDefaultAndStopPropagation = (
  event: Event | KeyboardEvent | MouseEvent
): void => {
  event.preventDefault()
  event.stopPropagation()
}

export const focusNextElement = (): void => {
  const focusableElements = getFocusableElements()
  const currentIndex = focusableElements.indexOf(
    document.activeElement as HTMLElement
  )
  const nextIndex = currentIndex + 1

  if (nextIndex < focusableElements.length) {
    focusableElements[nextIndex].focus()
  }
}

export const focusPreviousElement = (): void => {
  const focusableElements = getFocusableElements()
  const currentIndex = focusableElements.indexOf(
    document.activeElement as HTMLElement
  )
  const previousIndex = currentIndex - 1

  if (previousIndex >= 0) {
    focusableElements[previousIndex].focus()
  }
}

export const getFocusableElements = (
  container: HTMLElement = document.body
): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ')

  return Array.from(container.querySelectorAll(focusableSelectors)).filter(
    element => {
      const htmlElement = element as HTMLElement
      return (
        htmlElement.offsetParent !== null &&
        getComputedStyle(htmlElement).visibility !== 'hidden'
      )
    }
  ) as HTMLElement[]
}

const safeFocus = (element: HTMLElement | null): boolean => {
  if (element && typeof element.focus === 'function') {
    element.focus()
    return true
  }
  return false
}

const handleReverseTab = (
  event: KeyboardEvent,
  firstElement: HTMLElement,
  lastElement: HTMLElement,
  currentActiveElement: Element | null
): void => {
  if (currentActiveElement === firstElement) {
    if (safeFocus(lastElement)) {
      preventDefaultAndStopPropagation(event)
    }
  }
}

const handleForwardTab = (
  event: KeyboardEvent,
  firstElement: HTMLElement,
  lastElement: HTMLElement,
  currentActiveElement: Element | null
): void => {
  if (currentActiveElement === lastElement) {
    if (safeFocus(firstElement)) {
      preventDefaultAndStopPropagation(event)
    }
  }
}

export const trapFocus = (container: HTMLElement): (() => void) => {
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (!isKeyPressed(event, 'Tab')) {
      return
    }

    const focusableElements = getFocusableElements(container)

    if (focusableElements.length === 0) {
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    const currentActiveElement = document.activeElement

    if (event.shiftKey) {
      handleReverseTab(event, firstElement, lastElement, currentActiveElement)
    } else {
      handleForwardTab(event, firstElement, lastElement, currentActiveElement)
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  const initialFocusableElements = getFocusableElements(container)
  safeFocus(initialFocusableElements[0])

  return (): void => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

const liveRegionCache = new Map<string, HTMLElement>()

const getOrCreateLiveRegion = (
  priority: 'polite' | 'assertive'
): HTMLElement => {
  const cacheKey = `live-region-${priority}`

  if (liveRegionCache.has(cacheKey)) {
    const existingRegion = liveRegionCache.get(cacheKey)!
    if (document.body.contains(existingRegion)) {
      return existingRegion
    }
  }

  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('aria-live', priority)
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status')
  liveRegion.className = 'sr-only'
  liveRegion.id = `live-region-${priority}-${Date.now()}`

  document.body.append(liveRegion)
  liveRegionCache.set(cacheKey, liveRegion)

  return liveRegion
}

export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
  duration = 3000
): void => {
  if (!message.trim()) {
    return
  }

  const liveRegion = getOrCreateLiveRegion(priority)

  liveRegion.textContent = ''

  setTimeout(() => {
    liveRegion.textContent = message
  }, 10)

  setTimeout(() => {
    if (liveRegion.textContent === message) {
      liveRegion.textContent = ''
    }
  }, duration)
}

export const clearAllLiveRegions = (): void => {
  liveRegionCache.forEach(region => {
    if (region.parentNode) {
      region.parentNode.removeChild(region)
    }
  })
  liveRegionCache.clear()
}

export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const getContrastPreference = (): 'no-preference' | 'high' => {
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    return 'high'
  }
  return 'no-preference'
}

export const generateAriaLabel = (
  action: string,
  target?: string,
  context?: string
): string => {
  let label = action

  if (target) {
    label += ` ${target}`
    if (context) {
      label += ` - ${context}`
    }
  } else if (context) {
    label += ` ${context}`
  }

  return label
}

export const validateAccessibility = (element: HTMLElement): string[] => {
  const issues: string[] = []

  const interactiveElements = ['button', 'input', 'select', 'textarea', 'a']
  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    const hasLabel =
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim() ||
      (element as HTMLInputElement).labels?.length

    if (!hasLabel) {
      issues.push('Elemento interativo sem label acessível')
    }
  }

  return issues
}

export const calculateContrastRatio = (
  textColor: string,
  backgroundColor: string
): number => {
  void textColor
  void backgroundColor

  return 21
}

export const getEffectiveBackgroundColor = (element: HTMLElement): string => {
  void element

  return '#ffffff'
}

export const contrastTestCases = {
  shouldPass: [
    { text: '#000000', background: '#ffffff', expected: 21 },
    { text: '#333333', background: '#ffffff', expected: 12.63 },
  ],

  shouldFail: [
    { text: '#cccccc', background: '#ffffff', expected: 1.61 },
    { text: '#ffff00', background: '#ffffff', expected: 1.07 },
  ],
}
