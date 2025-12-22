import { memo } from 'react'

import { OptimizedImage } from '../../../ui/OptimizedImage'
import { HERO_CONTENT, HERO_IMAGE } from '../constants'
import type { HeroVisualProps } from '../types'

/**
 * Hero Visual Component
 *
 * Displays the main hero image with optimizations
 *
 * Clean Code principles:
 * - Single Responsibility: Only displays hero image
 * - Performance: Uses OptimizedImage for better LCP
 * - Accessibility: Proper alt text and ARIA labels
 * - SEO: Optimized image loading with proper formats
 */
export const HeroVisual = memo<HeroVisualProps>(
  ({ imageSrc, alt = HERO_CONTENT.visual.alt, className = '' }) => {
    return (
      <div
        className={`relative h-full w-full min-h-[400px] lg:min-h-[600px] group overflow-hidden rounded-sm lg:rounded-none ${className}`}
      >
        <OptimizedImage
          src={imageSrc}
          alt={alt}
          sizes={[...HERO_IMAGE.sizes]}
          formats={[...HERO_IMAGE.formats]}
          quality={HERO_IMAGE.quality}
          lazy={false}
          className='absolute w-full h-full object-cover object-[center_30%] scale-90 transition-transform duration-700 group-hover:scale-105'
          fetchPriority={HERO_IMAGE.fetchPriority}
        />

        {/* Gradient Overlay - Vignette Effect */}
        <div
          className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 lg:bg-gradient-to-l lg:via-black/20 lg:to-black pointer-events-none'
          aria-hidden='true'
        />

        {/* Floating Badge */}
        <div
          className='absolute bottom-6 right-6 lg:bottom-10 lg:right-10'
          role='status'
          aria-label={HERO_CONTENT.visual.badge.ariaLabel}
        >
          <div className='bg-black/80 backdrop-blur-md border border-red-900/30 px-4 py-2 rounded flex items-center gap-2 shadow-2xl'>
            <div
              className='w-2 h-2 bg-red-500 rounded-full animate-pulse'
              aria-hidden='true'
            />
            <span className='text-white text-xs font-bold tracking-widest uppercase'>
              {HERO_CONTENT.visual.badge.label}
            </span>
          </div>
        </div>
      </div>
    )
  }
)

HeroVisual.displayName = 'HeroVisual'
