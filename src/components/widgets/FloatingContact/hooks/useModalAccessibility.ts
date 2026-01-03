import { useCallback, useEffect, useRef } from 'react'

export const useModalAccessibility = (isOpen: boolean, onClose: () => void) => {
  const previousActiveElement = useRef<Element | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCloseRef.current()
      }
    },
    [isOpen]
  )

  useEffect(() => {
    if (!isOpen) return

    previousActiveElement.current = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      if (
        closeButtonRef.current &&
        document.body.contains(closeButtonRef.current)
      ) {
        closeButtonRef.current.focus()
      }
    }, 100)

    document.addEventListener('keydown', handleEscape)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleEscape)
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, handleEscape])

  return { closeButtonRef }
}
