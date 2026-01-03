import { useEffect, useRef } from 'react'

export const useModalAccessibility = (isOpen: boolean, onClose: () => void) => {
  const previousActiveElement = useRef<Element | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    previousActiveElement.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 100)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, onClose])

  return { closeButtonRef }
}
