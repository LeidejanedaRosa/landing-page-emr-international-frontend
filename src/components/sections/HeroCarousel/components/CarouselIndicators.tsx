import { type KeyboardEvent, memo, useCallback, useMemo, useRef } from 'react'

import { getSlideLabels } from '../constants'
import type { CarouselIndicatorsProps } from '../types'

export const CarouselIndicators = memo<CarouselIndicatorsProps>(
  ({ currentSlide, totalSlides, onSelect }) => {
    const slideLabels = useMemo(() => getSlideLabels(), [])
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>, slideIndex: number) => {
        let nextIndex: number | null = null

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          nextIndex = (slideIndex + 1) % totalSlides
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          nextIndex = (slideIndex - 1 + totalSlides) % totalSlides
        } else if (e.key === 'Home') {
          e.preventDefault()
          nextIndex = 0
        } else if (e.key === 'End') {
          e.preventDefault()
          nextIndex = totalSlides - 1
        }

        if (nextIndex !== null) {
          onSelect(nextIndex)
          buttonsRef.current[nextIndex]?.focus()
        }
      },
      [totalSlides, onSelect]
    )

    return (
      <div
        className='absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-3 z-10'
        role='tablist'
        aria-label='Navegação do carrossel'
      >
        {Array.from({ length: totalSlides }, (_, slideIndex) => {
          const isActive = slideIndex === currentSlide
          const label = slideLabels[slideIndex] || `Slide ${slideIndex + 1}`

          return (
            <button
              key={slideIndex}
              ref={el => {
                buttonsRef.current[slideIndex] = el
              }}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={`hero-slide-${slideIndex}`}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${label} - Slide ${slideIndex + 1} de ${totalSlides}`}
              onClick={() => onSelect(slideIndex)}
              onKeyDown={e => handleKeyDown(e, slideIndex)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                ${
                  isActive
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }
              `}
            />
          )
        })}
      </div>
    )
  }
)

CarouselIndicators.displayName = 'CarouselIndicators'
