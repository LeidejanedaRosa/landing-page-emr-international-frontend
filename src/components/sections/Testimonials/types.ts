/* eslint-disable no-unused-vars */
import type { KeyboardEvent, MutableRefObject } from 'react'

export interface TestimonialImages {
  avif: string
  webp: string
  jpg: string
  alt: string
}

export type TestimonialVariant = 'full' | 'text-only' | 'image-only'

export interface Testimonial {
  id: string
  variant: TestimonialVariant
  courseType: 'tatico' | 'remoto'
  companyName?: string
  testimonialText?: string
  authorName?: string
  authorRole?: string
  rating?: number
  images?: TestimonialImages
}

export interface UseTestimonialsCarouselOptions {
  totalSlides: number
  autoPlayDelay?: number
  enableAutoPlay?: boolean
}

export interface UseTestimonialsCarouselReturn {
  currentIndex: number
  isAutoPlaying: boolean
  nextSlide: () => void
  previousSlide: () => void
  goToSlide: (slideIndex: number) => void
  pauseAutoPlay: () => void
  resumeAutoPlay: () => void
}

export interface TestimonialIndicatorsProps {
  currentIndex: number
  totalSlides: number
  onSelect: (n: number) => void
  buttonsRef: MutableRefObject<(HTMLButtonElement | null)[]>
  handleKeyDown: (e: KeyboardEvent<HTMLButtonElement>, n: number) => void
  isAutoPlaying?: boolean
  autoPlayDelay?: number
}

export interface TestimonialNavigationProps {
  onPrev: () => void
  onNext: () => void
  currentIndex: number
  totalSlides: number
}

export interface TestimonialCardProps {
  testimonial: Testimonial
}

export interface StarRatingProps {
  rating: number
  maxRating?: number
}
