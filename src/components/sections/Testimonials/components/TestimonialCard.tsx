import { memo } from 'react'

import type { TestimonialCardProps } from '../types'
import { StarRating } from './StarRating'

export const TestimonialCard = memo<TestimonialCardProps>(({ testimonial }) => {
  const {
    images,
    companyName,
    testimonialText,
    rating,
    authorName,
    authorRole,
  } = testimonial

  return (
    <article className='grid md:grid-cols-2 gap-0 animate-fade-in'>
      <figure className='relative h-80 md:h-96 overflow-hidden'>
        <picture>
          <source srcSet={images.avif} type='image/avif' />
          <source srcSet={images.webp} type='image/webp' />
          <img
            src={images.jpg}
            alt={images.alt}
            className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
            loading='lazy'
          />
        </picture>
        <div
          className='absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-transparent'
          aria-hidden='true'
        />
      </figure>

      <div className='p-8 md:p-12 flex flex-col justify-center bg-primary-900/40'>
        <StarRating rating={rating} />

        <blockquote className='text-xl md:text-2xl font-medium text-white my-6 leading-relaxed'>
          <p>&ldquo;{testimonialText}&rdquo;</p>
        </blockquote>

        <footer className='mt-auto'>
          <cite className='not-italic'>
            <p className='text-white font-semibold text-lg'>{authorName}</p>
            <p className='text-primary-300 text-sm'>{authorRole}</p>
          </cite>
          <p className='text-cta-400 text-sm font-medium mt-2'>{companyName}</p>
        </footer>
      </div>
    </article>
  )
})

TestimonialCard.displayName = 'TestimonialCard'
