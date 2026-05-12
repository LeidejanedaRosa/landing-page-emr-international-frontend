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
