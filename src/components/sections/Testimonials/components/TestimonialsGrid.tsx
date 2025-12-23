import { memo } from 'react'

import type { Testimonial } from '../types'
import TestimonialCard from './TestimonialCard'

interface TestimonialsGridProps {
  extendedTestimonials: Testimonial[]
  currentIndex: number
  itemsVisible: number
  isTransitioning: boolean
  prefersReducedMotion: boolean
  totalItems: number
}

const TestimonialsGrid = memo(
  ({
    extendedTestimonials,
    currentIndex,
    itemsVisible,
    isTransitioning,
    prefersReducedMotion,
    totalItems,
  }: TestimonialsGridProps) => {
    const centerOffset = Math.floor(itemsVisible / 2)
    const activeIndex = currentIndex + centerOffset

    return (
      <div className='overflow-hidden py-4'>
        <div
          className='flex items-stretch'
          role='list'
          aria-label='Depoimentos'
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
            transition:
              isTransitioning && !prefersReducedMotion
                ? 'transform 0.5s ease-out'
                : 'none',
          }}
        >
          {extendedTestimonials.map((testimonial, idx) => {
            const isActiveCard = idx === activeIndex
            return (
              <div
                key={`${testimonial.id}-${idx}`}
                className='flex-shrink-0 px-2 md:px-4'
                style={{ width: `${100 / itemsVisible}%` }}
                role='listitem'
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={idx}
                  totalItems={totalItems}
                  isActive={isActiveCard}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

TestimonialsGrid.displayName = 'TestimonialsGrid'

export default TestimonialsGrid
