/* eslint-disable no-unused-vars */
export interface UseHeroCarouselOptions {
  totalSlides: number
  autoPlayDelay?: number
  enableAutoPlay?: boolean
}

export interface UseHeroCarouselReturn {
  currentSlide: number
  isAutoPlaying: boolean
  nextSlide: () => void
  previousSlide: () => void
  goToSlide: (index: number) => void
  pauseAutoPlay: () => void
  resumeAutoPlay: () => void
}

export interface CarouselIndicatorsProps {
  currentSlide: number
  totalSlides: number
  onSelect: (index: number) => void
}

export interface CarouselNavigationProps {
  onPrev: () => void
  onNext: () => void
  currentSlide: number
  totalSlides: number
}
