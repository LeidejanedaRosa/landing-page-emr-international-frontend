export type CourseType = 'tatico' | 'remoto'

export type Rating = 1 | 2 | 3 | 4 | 5

export interface Testimonial {
  id: string
  companyName: string
  courseType: CourseType
  testimonialText: string
  authorName: string
  authorRole: string
  rating: Rating
  image: string
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  totalItems: number
  isActive?: boolean
}

export interface CarouselControlsProps {
  currentIndex: number
  totalDots: number
  hasMultiplePages: boolean
  onPrevious: () => void
  onNext: () => void
  // eslint-disable-next-line no-unused-vars
  onGoToSlide: (index: number) => void
}

export interface StarRatingProps {
  rating: Rating
  size?: 'sm' | 'md' | 'lg'
}
