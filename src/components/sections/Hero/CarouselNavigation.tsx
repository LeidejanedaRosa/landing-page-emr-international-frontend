import React from 'react'

interface CarouselNavigationProps {
  onPrevious: () => void
  onNext: () => void
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevious,
  onNext,
}) => (
  <>
    <button
      onClick={onPrevious}
      className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 focus:bg-black/80 text-white p-3 rounded-full transition-all z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
      aria-label='Ir para o slide anterior'
      type='button'
      title='Slide anterior (seta esquerda)'
    >
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </button>
    <button
      onClick={onNext}
      className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 focus:bg-black/80 text-white p-3 rounded-full transition-all z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
      aria-label='Ir para o próximo slide'
      type='button'
      title='Próximo slide (seta direita)'
    >
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 5l7 7-7 7'
        />
      </svg>
    </button>
  </>
)

export default CarouselNavigation
