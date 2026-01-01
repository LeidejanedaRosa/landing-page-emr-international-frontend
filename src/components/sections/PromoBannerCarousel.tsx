import React, { memo, useEffect, useRef, useState } from 'react'

import {
  useAccessibilityPreferences,
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../ui/Accessibility'
import { AccessibleButton } from '../ui/AccessibleButton'

interface PromoBannerCarouselProps {
  text?: string
  speed?: number
  className?: string
}

interface BannerControlsProps {
  isPaused: boolean
  onToggle: () => void
  bannerId: string
}

const BannerControls: React.FC<BannerControlsProps> = memo(
  ({ isPaused, onToggle, bannerId }) => {
    return (
      <div className='absolute top-1/2 right-2 -translate-y-1/2 z-10'>
        <AccessibleButton
          onClick={onToggle}
          className='p-1 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded'
          aria-label={
            isPaused
              ? 'Retomar animação do banner'
              : 'Pausar animação do banner'
          }
          aria-describedby={`${bannerId}-status`}
        >
          {isPaused ? (
            <svg
              className='w-4 h-4'
              fill='currentColor'
              viewBox='0 0 24 24'
              role='presentation'
            >
              <path d='M8 5v14l11-7z' />
            </svg>
          ) : (
            <svg
              className='w-4 h-4'
              fill='currentColor'
              viewBox='0 0 24 24'
              role='presentation'
            >
              <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
            </svg>
          )}
        </AccessibleButton>
      </div>
    )
  }
)

BannerControls.displayName = 'BannerControls'

type PauseSource = 'manual' | 'hover' | 'auto'

interface BannerState {
  isPaused: boolean
  pauseSource: PauseSource
}

const useBannerPauseState = (
  prefersReducedMotion: boolean,
  announce: ReturnType<typeof useScreenReaderAnnouncement>['announce']
): BannerState & {
  handleTogglePause: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
} => {
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

const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = memo(
  ({ text = 'INSCRIÇÕES ABERTAS', speed = 15, className = '' }) => {
    const { prefersReducedMotion } = useAccessibilityPreferences()
    const { announce } = useScreenReaderAnnouncement()
    const bannerId = useUniqueId('promo-banner')

    const { isPaused, handleTogglePause, handleMouseEnter, handleMouseLeave } =
      useBannerPauseState(prefersReducedMotion, announce)

    return (
      <section
        id={bannerId}
        className={`w-full max-w-full max-h-10 bg-white border-t border-b border-gray-200 overflow-hidden relative z-50 ${className}`}
        role='region'
        aria-labelledby={`${bannerId}-heading`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ScreenReaderOnly>
          <h2 id={`${bannerId}-heading`}>
            Banner promocional da EMR Internacional
          </h2>
          <div id={`${bannerId}-status`} aria-live='polite'>
            {isPaused ? 'Banner pausado' : 'Banner em movimento'}
          </div>
        </ScreenReaderOnly>

        <div
          className={`flex whitespace-nowrap ${
            isPaused || prefersReducedMotion ? '' : 'animate-scroll'
          }`}
          style={{
            animationDuration: prefersReducedMotion ? '0s' : `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
          aria-hidden='true'
        >
          {Array.from({ length: 20 }, (_, index) => (
            <React.Fragment key={index}>
              <div className='flex items-center justify-center px-8'>
                <span className='text-black font-bold text-sm md:text-base lg:text-xs uppercase tracking-wider'>
                  {text}
                </span>
              </div>
              <div className='flex h-fit items-center justify-center px-4'>
                <span
                  className='text-black text-lg font-bold'
                  role='presentation'
                >
                  •
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div
          className='absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none'
          aria-hidden='true'
        />

        {!prefersReducedMotion && (
          <BannerControls
            isPaused={isPaused}
            onToggle={handleTogglePause}
            bannerId={bannerId}
          />
        )}

        <ScreenReaderOnly>
          <p>Promoção atual: {text}</p>
        </ScreenReaderOnly>
      </section>
    )
  }
)

export default PromoBannerCarousel
