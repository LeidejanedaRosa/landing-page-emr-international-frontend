import { memo, useMemo } from 'react'

import { getSlideLabels } from '../constants'
import type { CarouselIndicatorsProps } from '../types'

export const CarouselIndicators = memo<CarouselIndicatorsProps>(
  ({ currentSlide, totalSlides, onSelect }) => {
    const slideLabels = useMemo(() => getSlideLabels(), [])

    return (
      <div
        className='absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3'
        role='tablist'
        aria-label='Navegação do carrossel'
      >
        {Array.from({ length: totalSlides }, (_, slideIndex) => {
          const isActive = slideIndex === currentSlide
          const label = slideLabels[slideIndex] || `Slide ${slideIndex + 1}`

          return (
            <button
              key={slideIndex}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={`hero-slide-${slideIndex}`}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${label} - Slide ${slideIndex + 1} de ${totalSlides}`}
              onClick={() => onSelect(slideIndex)}
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
