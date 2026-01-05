import { useEffect, useRef, useState } from 'react'

import { useScreenReaderAnnouncement } from './useAccessibility'

type PauseSource = 'manual' | 'hover' | 'auto'

interface BannerPauseState {
  isPaused: boolean
  pauseSource: PauseSource
  handleTogglePause: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

export const useBannerPauseState = (
  prefersReducedMotion: boolean,
  announce: ReturnType<typeof useScreenReaderAnnouncement>['announce']
): BannerPauseState => {
  const [isPaused, setIsPaused] = useState(prefersReducedMotion)
  const [pauseSource, setPauseSource] = useState<PauseSource>(
    prefersReducedMotion ? 'auto' : 'manual'
  )
  const prevPrefersReducedMotion = useRef(prefersReducedMotion)

  useEffect(() => {
    if (
      prefersReducedMotion &&
      !prevPrefersReducedMotion.current &&
      !isPaused
    ) {
      setIsPaused(true)
      setPauseSource('auto')
      announce('Animação do banner pausada automaticamente', 'polite')
    }
    prevPrefersReducedMotion.current = prefersReducedMotion
  }, [prefersReducedMotion, isPaused, announce])

  const handleTogglePause = () => {
    const newPausedState = !isPaused
    setIsPaused(newPausedState)
    setPauseSource('manual')
    announce(newPausedState ? 'Banner pausado' : 'Banner retomado', 'polite')
  }

  const handleMouseEnter = () => {
    if (!isPaused && pauseSource !== 'manual') {
      setIsPaused(true)
      setPauseSource('hover')
    }
  }

  const handleMouseLeave = () => {
    if (pauseSource === 'hover' && !prefersReducedMotion) {
      setIsPaused(false)
    }
  }

  return {
    isPaused,
    pauseSource,
    handleTogglePause,
    handleMouseEnter,
    handleMouseLeave,
  }
}
