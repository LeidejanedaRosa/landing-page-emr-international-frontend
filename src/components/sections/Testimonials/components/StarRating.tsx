import { memo } from 'react'

import { Star } from 'lucide-react'

import type { StarRatingProps } from '../types'

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
} as const

const StarRating = memo(({ rating, size = 'md' }: StarRatingProps) => {
  const sizeClass = sizeClasses[size]

  return (
    <div
      className='flex items-center gap-0.5'
      role='img'
      aria-label={`Avaliação: ${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${sizeClass} ${
            index < rating
              ? 'text-warning-400 fill-warning-400'
              : 'text-primary-600 fill-primary-600'
          }`}
          aria-hidden='true'
        />
      ))}
    </div>
  )
})

StarRating.displayName = 'StarRating'

export default StarRating
