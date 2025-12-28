import { type KeyboardEvent, memo, type MutableRefObject } from 'react'

import { PROGRESS_KEYFRAMES, TESTIMONIALS_A11Y } from '../constants'
import type { TestimonialIndicatorsProps } from '../types'

/* eslint-disable no-unused-vars */
interface IndicatorButtonProps {
  slideIndex: number
  isActive: boolean
  isAutoPlaying: boolean
  autoPlayDelay: number
  buttonsRef: MutableRefObject<(HTMLButtonElement | null)[]>
  onSelect: (n: number) => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>, n: number) => void
}
/* eslint-enable no-unused-vars */

const IndicatorButton = memo<IndicatorButtonProps>(
  ({
    slideIndex,
    isActive,
    isAutoPlaying,
    autoPlayDelay,
    buttonsRef,
    onSelect,
    onKeyDown,
  }) => (
    <button
      ref={el => {
        buttonsRef.current[slideIndex] = el
      }}
      type='button'
      role='tab'
      aria-selected={isActive}
      aria-controls={`testimonial-slide-${slideIndex}`}
      tabIndex={isActive ? 0 : -1}
      aria-label={TESTIMONIALS_A11Y.goToSlide(slideIndex + 1)}
      onClick={() => onSelect(slideIndex)}
      onKeyDown={event => onKeyDown(event, slideIndex)}
      className='relative min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900 group'
    >
      <span
        className={`block rounded-full transition-all duration-300 ${isActive ? 'w-10 h-3 bg-white overflow-hidden' : 'w-3 h-3 bg-primary-400 group-hover:bg-primary-300'}`}
      >
        {isActive && isAutoPlaying && (
          <span
            className='block h-full bg-cta-500 rounded-full'
            style={{ animation: `progress ${autoPlayDelay}ms linear` }}
          />
        )}
      </span>
    </button>
  )
)

IndicatorButton.displayName = 'IndicatorButton'

export type { IndicatorButtonProps }

export const TestimonialIndicators = memo<TestimonialIndicatorsProps>(
  ({
    currentIndex,
    totalSlides,
    onSelect,
    buttonsRef,
    handleKeyDown,
    isAutoPlaying = false,
    autoPlayDelay = 5000,
  }) => (
    <nav aria-label='Navegação dos depoimentos'>
      <div
        className='flex justify-center gap-3 mt-8'
        role='tablist'
        aria-label='Selecionar depoimento'
      >
        {Array.from({ length: totalSlides }, (_, i) => (
          <IndicatorButton
            key={i}
            slideIndex={i}
            isActive={i === currentIndex}
            isAutoPlaying={isAutoPlaying}
            autoPlayDelay={autoPlayDelay}
            buttonsRef={buttonsRef}
            onSelect={onSelect}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      <p
        className='text-center mt-4 text-primary-300 text-sm font-medium'
        aria-live='polite'
        aria-atomic='true'
      >
        {TESTIMONIALS_A11Y.counter(currentIndex + 1, totalSlides)}
      </p>
      <style>{PROGRESS_KEYFRAMES}</style>
    </nav>
  )
)

TestimonialIndicators.displayName = 'TestimonialIndicators'
