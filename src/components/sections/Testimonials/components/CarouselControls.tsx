import { memo } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { CarouselControlsProps } from '../types'

const CarouselControls = memo(
  ({
    currentIndex,
    totalDots,
    hasMultiplePages,
    onPrevious,
    onNext,
    onGoToSlide,
  }: CarouselControlsProps) => {
    if (!hasMultiplePages) return null

    return (
      <div className='flex items-center justify-center gap-4 mt-8'>
        <button
          onClick={onPrevious}
          className='p-2 rounded-full bg-primary-900/10 text-primary-900 hover:bg-primary-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          aria-label='Depoimento anterior'
        >
          <ChevronLeft className='w-5 h-5' aria-hidden='true' />
        </button>

        <div
          className='flex items-center gap-2'
          role='tablist'
          aria-label='Navegação dos depoimentos'
        >
          {Array.from({ length: totalDots }, (_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                index === currentIndex
                  ? 'bg-primary-900 w-6'
                  : 'bg-primary-300 hover:bg-primary-400'
              }`}
              role='tab'
              aria-selected={index === currentIndex}
              aria-label={`Ir para grupo de depoimentos ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className='p-2 rounded-full bg-primary-900/10 text-primary-900 hover:bg-primary-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          aria-label='Próximo depoimento'
        >
          <ChevronRight className='w-5 h-5' aria-hidden='true' />
        </button>
      </div>
    )
  }
)

CarouselControls.displayName = 'CarouselControls'

export default CarouselControls
