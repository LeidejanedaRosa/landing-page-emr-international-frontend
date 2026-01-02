import { memo } from 'react'

import { HERO_CONTENT } from '../constants'
import type { HeroVisualProps } from '../types'

export const HeroVisual = memo<HeroVisualProps>(
  ({ images, alt = HERO_CONTENT.visual.alt, className = '' }) => {
    return (
      <div
        className={`relative h-full w-full min-h-0 group overflow-hidden rounded-sm lg:rounded-none ${className}`}
      >
        <picture>
          {images.avif && (
            <source
              srcSet={images.avif}
              type='image/avif'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          )}
          {images.webp && (
            <source
              srcSet={images.webp}
              type='image/webp'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          )}
          <img
            src={images.jpg}
            alt={alt}
            width={1600}
            height={1067}
            loading='eager'
            decoding='async'
            fetchPriority='high'
            className='absolute w-full h-full object-cover object-[center_25%] lg:object-[center_30%] scale-100 transition-transform duration-700 group-hover:scale-105'
          />
        </picture>

        <div
          className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black opacity-90 md:bg-gradient-to-l pointer-events-none'
          aria-hidden='true'
        />

        <div
          className='absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10'
          role='status'
          aria-label={HERO_CONTENT.visual.badge.ariaLabel}
        >
          <div className='bg-black/80 backdrop-blur-md border border-red-900/30 px-3 py-2 sm:px-4 sm:py-2.5 rounded flex items-center gap-2 shadow-2xl'>
            <div
              className='w-2 h-2 bg-red-500 rounded-full animate-pulse'
              aria-hidden='true'
            />
            <span className='text-white text-xs sm:text-sm font-bold tracking-widest uppercase'>
              {HERO_CONTENT.visual.badge.label}
            </span>
          </div>
        </div>
      </div>
    )
  }
)

HeroVisual.displayName = 'HeroVisual'
