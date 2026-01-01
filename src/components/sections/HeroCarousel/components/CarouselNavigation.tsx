import { memo } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { CarouselNavigationProps } from '../types'

export const CarouselNavigation = memo<CarouselNavigationProps>(
  ({ onPrev, onNext, currentSlide, totalSlides }) => {
    const buttonBaseClasses = `
      hidden lg:block
      absolute top-1/2 -translate-y-1/2 z-30
      w-14 h-14
      grid place-items-center
      bg-black/30 hover:bg-black/50
      text-white rounded-full
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
      backdrop-blur-sm
    `

    return (
      <>
        <button
          type='button'
          onClick={onPrev}
          className={`${buttonBaseClasses} left-4 md:left-6`}
          aria-label={`Slide anterior (${currentSlide === 0 ? totalSlides : currentSlide} de ${totalSlides})`}
        >
          <ChevronLeft className='w-6 h-6 md:w-8 md:h-8' aria-hidden='true' />
        </button>

        <button
          type='button'
          onClick={onNext}
          className={`${buttonBaseClasses} right-4 md:right-6`}
          aria-label={`Próximo slide (${currentSlide + 2 > totalSlides ? 1 : currentSlide + 2} de ${totalSlides})`}
        >
          <ChevronRight className='w-6 h-6 md:w-8 md:h-8' aria-hidden='true' />
        </button>
      </>
    )
  }
)

CarouselNavigation.displayName = 'CarouselNavigation'
