import { memo } from 'react'

import type { StarRatingProps } from '../types'

const StarIcon = memo(() => (
  <svg
    className='w-6 h-6 text-yellow-400 fill-current'
    viewBox='0 0 20 20'
    aria-hidden='true'
  >
    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
  </svg>
))

StarIcon.displayName = 'StarIcon'

export const StarRating = memo<StarRatingProps>(({ rating, maxRating = 5 }) => {
  const stars = Math.min(Math.max(0, rating), maxRating)

  return (
    <div
      className='flex gap-1'
      role='img'
      aria-label={`Avaliação: ${stars} de ${maxRating} estrelas`}
    >
      {Array.from({ length: stars }, (_, starIndex) => (
        <StarIcon key={starIndex} />
      ))}
    </div>
  )
})

StarRating.displayName = 'StarRating'
