import { memo } from 'react'

import type { TestimonialImages } from '../types'

interface TestimonialImageProps {
  images: TestimonialImages
  showOverlay?: boolean
}

export const TestimonialImage = memo<TestimonialImageProps>(
  ({ images, showOverlay = true }) => (
    <div className='relative w-full h-full overflow-hidden'>
      <picture>
        {images.avif && (
          <source
            srcSet={images.avif}
            type='image/avif'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px'
          />
        )}
        {images.webp && (
          <source
            srcSet={images.webp}
            type='image/webp'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px'
          />
        )}
        <img
          src={images.jpg}
          alt={images.alt}
          width={640}
          height={384}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px'
          className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
          loading='lazy'
          decoding='async'
        />
      </picture>
      {showOverlay && (
        <div
          className='absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-transparent'
          aria-hidden='true'
        />
      )}
    </div>
  )
)

TestimonialImage.displayName = 'TestimonialImage'
