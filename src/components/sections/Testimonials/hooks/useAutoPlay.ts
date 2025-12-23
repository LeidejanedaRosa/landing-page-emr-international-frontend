import { useCallback, useEffect, useState } from 'react'

interface UseAutoPlayParams {
  enableAutoPlay: boolean
  hasMultiplePages: boolean
  autoPlayDelay: number
  nextSlide: () => void
}

export const useAutoPlay = ({
  enableAutoPlay,
  hasMultiplePages,
  autoPlayDelay,
  nextSlide,
}: UseAutoPlayParams) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay)

  const pauseAutoPlay = useCallback(() => setIsAutoPlaying(false), [])
  const resumeAutoPlay = useCallback(() => {
    if (enableAutoPlay) {
      setIsAutoPlaying(true)
    }
  }, [enableAutoPlay])

  useEffect(() => {
    if (!isAutoPlaying || !enableAutoPlay || !hasMultiplePages) return
    const interval = setInterval(nextSlide, autoPlayDelay)
    return () => clearInterval(interval)
  }, [
    isAutoPlaying,
    enableAutoPlay,
    hasMultiplePages,
    nextSlide,
    autoPlayDelay,
  ])

  return { isAutoPlaying, pauseAutoPlay, resumeAutoPlay }
}
