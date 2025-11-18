import React from 'react'

interface CarouselIndicatorsProps {
  currentSlide: number
  // eslint-disable-next-line no-unused-vars
  goToSlide: (slideIndex: number) => void
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  currentSlide,
  goToSlide,
}) => (
  <div
    className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'
    role='tablist'
    aria-label='Indicadores do carrossel'
  >
    {[0, 1].map(slideIndex => (
      <button
        key={slideIndex}
        onClick={() => goToSlide(slideIndex)}
        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
          currentSlide === slideIndex
            ? 'bg-red-500 scale-125'
            : 'bg-white/50 hover:bg-white/75'
        }`}
        aria-label={`Ir para slide ${slideIndex + 1}`}
        aria-current={currentSlide === slideIndex ? 'true' : 'false'}
        role='tab'
        type='button'
      />
    ))}
  </div>
)

export default CarouselIndicators
