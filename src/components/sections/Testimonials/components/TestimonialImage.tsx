import { memo } from 'react'

import type { TestimonialImages } from '../types'

interface TestimonialImageProps {
  images: TestimonialImages
  showOverlay?: boolean
}

export const TestimonialImage = memo<TestimonialImageProps>(
  ({ images, showOverlay = true }) => (
    <picture>
      <source srcSet={images.avif} type='image/avif' />
      <source srcSet={images.webp} type='image/webp' />
      <img
        src={images.jpg}
        alt={images.alt}
        width={640}
        height={384}
        className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
        loading='lazy'
      />
      {showOverlay && (
        <div
          className='absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-transparent'
          aria-hidden='true'
        />
      )}
    </picture>
  )
)

TestimonialImage.displayName = 'TestimonialImage'
