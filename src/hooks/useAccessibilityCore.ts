// Hooks básicos de acessibilidade
import { useCallback, useRef, useState } from 'react'

import { generateId } from '../utils/accessibility/helpers'

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
