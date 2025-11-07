// Hooks para acessibilidade
import { useCallback, useEffect, useRef, useState } from 'react'

import { KEYBOARD_KEYS } from '../types/accessibility'
import {
  announceToScreenReader,
  generateId,
  isKeyPressed,
  trapFocus,
} from '../utils/accessibility/helpers'

/**
 * Hook para gerar IDs únicos
 */
export const useUniqueId = (prefix = 'element'): string => {
  const [id] = useState(() => generateId(prefix))
  return id
}

/**
 * Hook para gerenciar foco
 */
export const useFocus = () => {
  const elementRef = useRef<HTMLElement>(null)

  const focus = useCallback(() => {
    elementRef.current?.focus()
  }, [])

  const blur = useCallback(() => {
    elementRef.current?.blur()
  }, [])

  const isFocused = useCallback((): boolean => {
    return document.activeElement === elementRef.current
  }, [])

  return {
    elementRef,
    focus,
    blur,
    isFocused,
  }
}

/**
 * Hook para capturar foco em modais/dialogs
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Salva o elemento que tinha foco antes
    previousFocusRef.current = document.activeElement as HTMLElement

    // Configura o trap de foco
    const cleanup = trapFocus(containerRef.current)

    return () => {
      cleanup()
      // Restaura o foco anterior
      previousFocusRef.current?.focus()
    }
  }, [isActive])

  return containerRef
}

/**
 * Interface para handlers de teclado
 */
interface KeyboardHandlers {
  onEnter?: () => void
  onEscape?: () => void
  onSpace?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
}

/**
 * Hook para navegação por teclado (Refatorado)
 */
export const useKeyboardNavigation = (handlers: KeyboardHandlers) => {
  const {
    onEnter,
    onEscape,
    onSpace,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
  } = handlers
  // Objeto que mapeia o valor de KEYBOARD_KEYS com seus handlers
  const keyMap = [
    { key: KEYBOARD_KEYS.ENTER, handler: onEnter },
    { key: KEYBOARD_KEYS.ESCAPE, handler: onEscape },
    { key: KEYBOARD_KEYS.SPACE, handler: onSpace },
    { key: KEYBOARD_KEYS.ARROW_UP, handler: onArrowUp },
    { key: KEYBOARD_KEYS.ARROW_DOWN, handler: onArrowDown },
    { key: KEYBOARD_KEYS.ARROW_LEFT, handler: onArrowLeft },
    { key: KEYBOARD_KEYS.ARROW_RIGHT, handler: onArrowRight },
  ]

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Itera sobre o mapa para encontrar e executar o handler correto
      const matchedAction = keyMap.find(
        action => action.handler && isKeyPressed(event, action.key)
      )

      if (matchedAction) {
        event.preventDefault()
        matchedAction.handler!() // O '!' garante que o handler existe, devido ao 'action.handler &&'
      }
    },
    // Agora a lista de dependências é menor e mais limpa, referenciando o map
    // (Ainda precisamos de todos os callbacks no array de dependências para o useCallback)
    [
      onEnter,
      onEscape,
      onSpace,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
    ]
  )

  return { handleKeyDown }
}

/**
 * Hook para anúncios de screen reader
 */
export const useScreenReaderAnnouncement = () => {
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      announceToScreenReader(message, priority)
    },
    []
  )

  return { announce }
}

/**
 * Hook para detectar preferências de acessibilidade
 */
export const useAccessibilityPreferences = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')

    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches)
    }

    const updateContrastPreference = () => {
      setPrefersHighContrast(contrastQuery.matches)
    }

    // Define valores iniciais
    updateMotionPreference()
    updateContrastPreference()

    // Escuta mudanças
    motionQuery.addEventListener('change', updateMotionPreference)
    contrastQuery.addEventListener('change', updateContrastPreference)

    return () => {
      motionQuery.removeEventListener('change', updateMotionPreference)
      contrastQuery.removeEventListener('change', updateContrastPreference)
    }
  }, [])

  return {
    prefersReducedMotion,
    prefersHighContrast,
  }
}

/**
 * Hook para navegação em listas
 */
// Re-exportar hooks da navegação
export { useListNavigation, useSkipLinks } from './useAccessibilityNavigation'
