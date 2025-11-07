// Utilitários para acessibilidade
import { KEYBOARD_KEYS } from '../../types/accessibility'

/**
 * Gera um ID único para elementos
 */
export const generateId = (prefix = 'element'): string => {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Verifica se uma tecla específica foi pressionada
 */
export const isKeyPressed = (
  event: KeyboardEvent,
  key: (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS]
): boolean => {
  return event.key === key
}

/**
 * Previne a ação padrão e para a propagação do evento
 */
export const preventDefaultAndStopPropagation = (
  event: Event | KeyboardEvent | MouseEvent
): void => {
  event.preventDefault()
  event.stopPropagation()
}

/**
 * Move o foco para o próximo elemento na sequência de tabulação
 */
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

/**
 * Move o foco para o elemento anterior na sequência de tabulação
 */
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

/**
 * Obtém todos os elementos focusáveis na página
 */
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

/**
 * Captura o foco dentro de um container específico
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container)
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (isKeyPressed(event, 'Tab')) {
      if (event.shiftKey) {
        // Shift + Tab - foco reverso
        if (document.activeElement === firstElement) {
          preventDefaultAndStopPropagation(event)
          lastElement?.focus()
        }
      } else if (document.activeElement === lastElement) {
        // Tab - foco para frente
        preventDefaultAndStopPropagation(event)
        firstElement?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)
  firstElement?.focus()

  // Função para remover o trap
  return (): void => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Anuncia uma mensagem para screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.append(announcement)

  // Remove o elemento após um tempo para evitar acúmulo
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Verifica se o usuário prefere movimento reduzido
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Obtém a configuração de contraste preferida do usuário
 */
export const getContrastPreference = (): 'no-preference' | 'high' => {
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    return 'high'
  }
  return 'no-preference'
}

/**
 * Gera aria-label baseado no contexto
 */
export const generateAriaLabel = (
  action: string,
  target?: string,
  context?: string
): string => {
  let label = action

  if (target) {
    label += ` ${target}`
  }

  if (context) {
    label += ` - ${context}`
  }

  return label
}

/**
 * Valida se um elemento tem acessibilidade adequada
 */
export const validateAccessibility = (element: HTMLElement): string[] => {
  const issues: string[] = []

  // Verifica se elementos interativos têm labels
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

  // Verifica contraste de cores (simplificado)
  const style = getComputedStyle(element)
  const hasLowContrast = style.color === style.backgroundColor

  if (hasLowContrast) {
    issues.push('Possível problema de contraste')
  }

  return issues
}
