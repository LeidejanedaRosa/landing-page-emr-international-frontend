export interface CarouselIndicatorsProps {
  currentSlide: number
  totalSlides: number
  // eslint-disable-next-line no-unused-vars
  onSelect: (index: number) => void
}

export interface CarouselNavigationProps {
  onPrev: () => void
  onNext: () => void
  currentSlide: number
  totalSlides: number
}
