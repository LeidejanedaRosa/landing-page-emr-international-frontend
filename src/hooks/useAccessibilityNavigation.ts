import { useCallback, useState } from 'react'

import { KEYBOARD_KEYS } from '../types/accessibility'
import {
  getFocusableElements,
  isKeyPressed,
} from '../utils/accessibility/helpers'

const navigateInList = <T extends HTMLElement>(
  currentIndex: number,
  items: T[],
  direction: 'up' | 'down' | 'first' | 'last'
): number => {
  let newIndex = currentIndex

  switch (direction) {
    case 'up': {
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
      break
    }
    case 'down': {
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
      break
    }
    case 'first': {
      newIndex = 0
      break
    }
    case 'last': {
      newIndex = items.length - 1
      break
    }
  }

  return newIndex
}

export const useListNavigation = <T extends HTMLElement>(items: T[]) => {
  const [currentIndex, setCurrentIndex] = useState(-1)

  const navigate = useCallback(
    (direction: 'up' | 'down' | 'first' | 'last') => {
      const newIndex = navigateInList(currentIndex, items, direction)
      setCurrentIndex(newIndex)

      if (items.length > newIndex && newIndex >= 0) {
        const element = items[Number(newIndex)]
        if (element) {
          element.focus()
        }
      }
    },
    [currentIndex, items]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isKeyPressed(event, KEYBOARD_KEYS.ARROW_UP)) {
        event.preventDefault()
        navigate('up')
      } else if (isKeyPressed(event, KEYBOARD_KEYS.ARROW_DOWN)) {
        event.preventDefault()
        navigate('down')
      } else if (isKeyPressed(event, KEYBOARD_KEYS.HOME)) {
        event.preventDefault()
        navigate('first')
      } else if (isKeyPressed(event, KEYBOARD_KEYS.END)) {
        event.preventDefault()
        navigate('last')
      }
    },
    [navigate, currentIndex]
  )

  return {
    currentIndex,
    setCurrentIndex,
    navigate,
    handleKeyDown,
  }
}

export const useSkipLinks = () => {
  const skipToContent = useCallback(() => {
    const mainContent = document.querySelector(
      '#main-content, main, [role="main"]'
    ) as HTMLElement
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const skipToNavigation = useCallback(() => {
    const navigation = document.querySelector(
      'nav, [role="navigation"]'
    ) as HTMLElement
    if (navigation) {
      const firstLink = getFocusableElements(navigation)[0]
      firstLink?.focus()
      navigation.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return {
    skipToContent,
    skipToNavigation,
  }
}
