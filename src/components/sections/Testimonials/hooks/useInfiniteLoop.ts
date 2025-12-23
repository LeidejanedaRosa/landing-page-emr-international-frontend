import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react'

interface UseInfiniteLoopParams {
  currentIndex: number
  totalItems: number
  setCurrentIndex: Dispatch<SetStateAction<number>>
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
}

export const useInfiniteLoop = ({
  currentIndex,
  totalItems,
  setCurrentIndex,
  setIsTransitioning,
}: UseInfiniteLoopParams) => {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (currentIndex === totalItems + 1 || currentIndex === 0) {
      timeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex === totalItems + 1 ? 1 : totalItems)
      }, 500)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, totalItems, setCurrentIndex, setIsTransitioning])
}
