import { useCallback, useRef, useState } from 'react'

import { generateId } from '../utils/accessibility/helpers'

export const useUniqueId = (prefix = 'element'): string => {
  const [id] = useState(() => generateId(prefix))
  return id
}

export const useFocus = () => {
  const elementRef = useRef<HTMLElement>(null)
  const [focused, setFocused] = useState(false)

  const focus = useCallback(() => {
    elementRef.current?.focus()
  }, [])

  const blur = useCallback(() => {
    elementRef.current?.blur()
  }, [])

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const isFocused = focused

  return {
    elementRef,
    focus,
    blur,
    isFocused,
    onFocus,
    onBlur,
  }
}
