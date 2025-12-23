import { memo } from 'react'

import { Quote } from 'lucide-react'

import type { TestimonialCardProps } from '../types'
import StarRating from './StarRating'

const courseTypeLabels = {
  tatico: 'Tático',
  remoto: 'Remoto',
} as const
const courseTypeStyles = {
  tatico: 'bg-cta-600 text-white',
  remoto: 'bg-warning-500 text-primary-900',
} as const

const baseCardStyles =
  'relative h-full min-h-[24rem] rounded-xl overflow-hidden group transition-all duration-500'
const activeCardStyles =
  'w-[200%] -translate-x-1/2 left-1/2 shadow-2xl z-50 ring-4 ring-primary-500/50'
const inactiveCardStyles = 'scale-95 opacity-60'

const TestimonialCard = memo(
  ({
    testimonial,
    index,
    totalItems,
    isActive = false,
  }: TestimonialCardProps) => {
    const {
      companyName,
      courseType,
      testimonialText,
      authorName,
      authorRole,
      rating,
      image,
    } = testimonial

    const cardClassName = `${baseCardStyles} ${isActive ? activeCardStyles : inactiveCardStyles}`

    return (
      <article
        className={cardClassName}
        aria-posinset={index + 1}
        aria-setsize={totalItems}
        aria-label={`Depoimento de ${authorName}, ${authorRole} da ${companyName}`}
      >
        <div
          className='absolute inset-0 bg-primary-800 bg-center bg-cover transition-transform duration-700 group-hover:scale-105'
          style={{
            backgroundImage: `url(${image})`,
          }}
          aria-hidden='true'
        />
        <div
          className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent'
          aria-hidden='true'
        />
        <div className='absolute top-4 left-4 z-10'>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${courseTypeStyles[courseType]}`}
          >
            {courseTypeLabels[courseType]}
          </span>
        </div>
        <div className='absolute top-4 right-4 z-10'>
          <Quote className='w-8 h-8 text-white/20' aria-hidden='true' />
        </div>
        <div className='absolute bottom-0 left-0 right-0 p-6'>
          <div className='space-y-3'>
            <h3 className='text-xl font-bold text-white'>{companyName}</h3>
            <blockquote className='text-sm text-white/90 leading-relaxed line-clamp-3'>
              "{testimonialText}"
            </blockquote>
            <div className='pt-2 border-t border-white/10'>
              <StarRating rating={rating} size='sm' />
              <p className='mt-2 text-sm font-medium text-white'>
                {authorName}
              </p>
              <p className='text-xs text-white/60'>{authorRole}</p>
            </div>
          </div>
        </div>
      </article>
    )
  }
)
TestimonialCard.displayName = 'TestimonialCard'
export default TestimonialCard
