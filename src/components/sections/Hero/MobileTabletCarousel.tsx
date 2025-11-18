import React, { useCallback } from 'react'

import CarouselIndicators from './CarouselIndicators'
import CarouselNavigation from './CarouselNavigation'
import { HeroEmergencySlide, HeroTextSlide } from './HeroSlides'

interface MobileTabletCarouselProps {
  currentSlide: number
  onViewCoursesClick: () => void
  setIsAutoPlaying: React.Dispatch<React.SetStateAction<boolean>>
  nextSlide: () => void
  previousSlide: () => void
  // eslint-disable-next-line no-unused-vars
  goToSlide: (slideIndex: number) => void
}

const MobileTabletCarousel: React.FC<MobileTabletCarouselProps> = ({
  currentSlide,
  onViewCoursesClick,
  setIsAutoPlaying,
  nextSlide,
  previousSlide,
  goToSlide,
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          previousSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(1)
          break
        case '1':
          e.preventDefault()
          goToSlide(0)
          break
        case '2':
          e.preventDefault()
          goToSlide(1)
          break
      }
    },
    [nextSlide, previousSlide, goToSlide]
  )

  return (
    <div className='lg:hidden w-full'>
      <div
        className='backdrop-blur-sm bg-black/20 rounded-2xl p-6 md:p-8 min-h-[400px] relative'
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role='region'
        aria-label='Carrossel hero com informações sobre emergências médicas'
        aria-live='polite'
        aria-describedby='carousel-instructions'
      >
        <div id='carousel-instructions' className='sr-only'>
          Use as setas esquerda e direita para navegar entre os slides.
          Pressione Home para ir ao primeiro slide, End para o último.
        </div>

        <div
          className='hero-carousel-wrapper'
          aria-label={`Slide ${currentSlide + 1} de 2`}
        >
          <div
            className='hero-carousel-slides transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${currentSlide * 50}%)` }}
          >
            <HeroTextSlide />
            <HeroEmergencySlide onViewCoursesClick={onViewCoursesClick} />
          </div>
        </div>

        <CarouselNavigation onPrevious={previousSlide} onNext={nextSlide} />
        <CarouselIndicators currentSlide={currentSlide} goToSlide={goToSlide} />
      </div>
    </div>
  )
}

export default MobileTabletCarousel
