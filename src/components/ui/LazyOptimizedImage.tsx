import { memo } from 'react'

import { OptimizedImage } from './OptimizedImage'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export const LazyOptimizedImage = memo(
  ({
    src,
    alt,
    className,
    priority = false,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }: LazyImageProps) => {
    return (
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        sizes={[sizes]}
        decoding='async'
      />
    )
  }
)

LazyOptimizedImage.displayName = 'LazyOptimizedImage'

export default LazyOptimizedImage
