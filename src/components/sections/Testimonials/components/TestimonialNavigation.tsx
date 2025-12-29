import { memo } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { TESTIMONIALS_A11Y } from '../constants'
import type { TestimonialNavigationProps } from '../types'

export const TestimonialNavigation = memo<TestimonialNavigationProps>(
  ({ onPrev, onNext, currentIndex, totalSlides }) => {
    const buttonBaseClasses = `
      absolute top-1/2 -translate-y-1/2
      bg-white/90 hover:bg-white text-primary-900
      rounded-full p-3 shadow-lg
      transition-all duration-300 hover:scale-110
      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900
      hidden lg:flex items-center justify-center
    `

    const getPreviousIndex = () =>
      currentIndex === 0 ? totalSlides : currentIndex
    const getNextIndex = () =>
      currentIndex + 1 === totalSlides ? 1 : currentIndex + 2

    return (
      <>
        <button
          type='button'
          onClick={onPrev}
          className={`${buttonBaseClasses} -left-6 xl:-left-8`}
          aria-label={`${TESTIMONIALS_A11Y.previousButton} (${getPreviousIndex()} de ${totalSlides})`}
        >
          <ChevronLeft className='w-6 h-6' aria-hidden='true' />
        </button>

        <button
          type='button'
          onClick={onNext}
          className={`${buttonBaseClasses} -right-6 xl:-right-8`}
          aria-label={`${TESTIMONIALS_A11Y.nextButton} (${getNextIndex()} de ${totalSlides})`}
        >
          <ChevronRight className='w-6 h-6' aria-hidden='true' />
        </button>
      </>
    )
  }
)

TestimonialNavigation.displayName = 'TestimonialNavigation'
