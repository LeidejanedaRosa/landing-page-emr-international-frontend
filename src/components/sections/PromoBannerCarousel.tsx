import React, { memo, useEffect, useState } from 'react'

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

/**
 * Banner promocional com carousel acessível seguindo WCAG 2.1 AA:
 * ✅ Controles de pausa para usuários com vestibular disorders
 * ✅ Reduced motion support
 * ✅ Screen reader friendly
 * ✅ Keyboard navigation
 * ✅ ARIA live region para atualizações
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
 */
const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = memo(
  // eslint-disable-next-line max-lines-per-function
  ({
    text = 'CURSOS DE EMERGÊNCIA MÉDICA COM CERTIFICAÇÃO INTERNACIONAL',
    speed = 15,
    className = '',
  }) => {
    const { prefersReducedMotion } = useAccessibilityPreferences()
    const { announce } = useScreenReaderAnnouncement()
    const bannerId = useUniqueId('promo-banner')
    const [isPaused, setIsPaused] = useState(prefersReducedMotion)

    // Pausa automática se o usuário preferir movimento reduzido
    useEffect(() => {
      if (prefersReducedMotion && !isPaused) {
        setIsPaused(true)
        announce('Animação do banner pausada automaticamente', 'polite')
      }
    }, [prefersReducedMotion, isPaused, announce])

    const handleTogglePause = () => {
      const newPausedState = !isPaused
      setIsPaused(newPausedState)
      announce(newPausedState ? 'Banner pausado' : 'Banner retomado', 'polite')
    }

    // Pausa ao hover para melhor acessibilidade
    const handleMouseEnter = () => {
      if (!isPaused) {
        setIsPaused(true)
      }
    }

    const handleMouseLeave = () => {
      if (!prefersReducedMotion) {
        setIsPaused(false)
      }
    }

    return (
      <section
        id={bannerId}
        className={`w-full max-h-10 bg-white border-t border-b border-gray-200 overflow-hidden relative ${className}`}
        role='banner'
        aria-labelledby={`${bannerId}-heading`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cabeçalho hidden para screen readers */}
        <ScreenReaderOnly>
          <h2 id={`${bannerId}-heading`}>
            Banner promocional da EMR Internacional
          </h2>
          <div id={`${bannerId}-status`} aria-live='polite'>
            {isPaused ? 'Banner pausado' : 'Banner em movimento'}
          </div>
        </ScreenReaderOnly>

        {/* Conteúdo do banner */}
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
          {Array.from({ length: 8 }, (_, index) => (
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

        {/* Gradientes de fade */}
        <div
          className='absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none'
          aria-hidden='true'
        />

        {/* Controles de acessibilidade */}
        {!prefersReducedMotion && (
          <BannerControls
            isPaused={isPaused}
            onToggle={handleTogglePause}
            bannerId={bannerId}
          />
        )}

        {/* Conteúdo legível para screen readers */}
        <ScreenReaderOnly>
          <p>Promoção atual: {text}</p>
        </ScreenReaderOnly>
      </section>
    )
  }
)

export default PromoBannerCarousel
