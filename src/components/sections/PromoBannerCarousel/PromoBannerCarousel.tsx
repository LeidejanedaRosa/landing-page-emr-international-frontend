import React from 'react'

import {
  useAccessibilityPreferences,
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { useBannerPauseState } from '../../../hooks/useBannerPauseState'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import { BannerControls } from './BannerControls'
import { CarouselContent } from './CarouselContent'
import { FadeOverlay } from './FadeOverlay'

interface PromoBannerCarouselProps {
  text?: string
  speed?: number
  className?: string
}

export const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
  text = 'INSCRIÇÕES ABERTAS',
  speed = 15,
  className = '',
}) => {
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
      aria-label='Banner promocional da EMR Internacional'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ScreenReaderOnly>
        <div aria-live='polite'>
          {isPaused ? 'Banner pausado' : 'Banner em movimento'}
        </div>
      </ScreenReaderOnly>

      <CarouselContent
        text={text}
        speed={speed}
        isPaused={isPaused}
        prefersReducedMotion={prefersReducedMotion}
      />

      <FadeOverlay position='left' />
      <FadeOverlay position='right' />

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
