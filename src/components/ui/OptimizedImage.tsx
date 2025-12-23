import React, { type ComponentProps, useEffect, useState } from 'react'

interface OptimizedImageProps extends Omit<
  ComponentProps<'img'>,
  'src' | 'sizes' | 'onLoad' | 'onError'
> {
  src: string

  sizes?: readonly string[]

  mediaSizes?: string

  formats?: readonly ('webp' | 'avif' | 'jpg' | 'png')[]

  quality?: number

  lazy?: boolean

  onLoad?: () => void
  // eslint-disable-next-line no-unused-vars
  onError?: (_error: Error) => void
}

const generateSrcSet = (
  src: string,
  sizes: readonly string[],
  format: string,
  quality: number
): string => {
  return sizes
    .map(size => {
      const width = parseInt(size.replace('w', ''), 10)
      const optimizedSrc = `${src}?w=${width}&format=${format}&quality=${quality}`
      return `${optimizedSrc} ${width}w`
    })
    .join(', ')
}

const generateSources = (
  src: string,
  sizes: readonly string[],
  formats: readonly string[],
  quality: number,
  mediaSizes?: string
) => {
  const defaultMediaSizes =
    '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return formats
    .slice(0, -1)
    .map(format => (
      <source
        key={format}
        srcSet={generateSrcSet(src, sizes, format, quality)}
        sizes={mediaSizes || defaultMediaSizes}
        type={`image/${format}`}
      />
    ))
}

const ErrorPlaceholder: React.FC<{
  alt: string
  className?: string
  style?: React.CSSProperties
}> = ({ alt, className, style }) => (
  <div
    className={`bg-gray-200 flex items-center justify-center text-gray-400 ${className || ''}`}
    role='img'
    aria-label={alt}
    style={{ minHeight: '12rem', ...style }}
  >
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
      />
    </svg>
  </div>
)

const useImageState = (
  src: string,
  onLoad?: () => void,
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error) => void
) => {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    const error = new Error(`Failed to load image: ${src}`)
    onError?.(error)
  }

  return { hasError, isLoaded, handleLoad, handleError }
}

const ImageElement: React.FC<{
  src: string
  alt?: string
  fallbackFormat: string
  quality: number
  lazy: boolean
  isLoaded: boolean
  handleLoad: () => void
  handleError: () => void
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}> = ({
  src,
  alt,
  fallbackFormat,
  quality,
  lazy,
  isLoaded,
  handleLoad,
  handleError,
  className,
  style,
  ...props
}) => {
  const imageClassName = `transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`

  return (
    <img
      src={`${src}?w=800&format=${fallbackFormat}&quality=${quality}`}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      className={imageClassName}
      style={style}
      {...props}
    />
  )
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  sizes = ['400w', '800w', '1200w'],
  mediaSizes,
  formats = ['avif', 'webp', 'jpg'],
  quality = 80,
  lazy = true,
  onLoad,
  onError: _onError,
  className,
  style,
  ...props
}) => {
  const { hasError, isLoaded, handleLoad, handleError } = useImageState(
    src,
    onLoad,
    _onError
  )

  if (hasError) {
    return (
      <ErrorPlaceholder alt={alt || ''} className={className} style={style} />
    )
  }

  const fallbackFormat = formats[formats.length - 1] || 'jpg'

  return (
    <picture>
      {generateSources(src, sizes, formats, quality, mediaSizes)}
      <ImageElement
        src={src}
        alt={alt}
        fallbackFormat={fallbackFormat}
        quality={quality}
        lazy={lazy}
        isLoaded={isLoaded}
        handleLoad={handleLoad}
        handleError={handleError}
        className={className}
        style={style}
        {...props}
      />
    </picture>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useImagePreload = (sources: string[]) => {
  useEffect(() => {
    // Map para armazenar referências dos elementos link para limpeza
    const preloadedLinks = new Map<string, HTMLLinkElement>()

    sources.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      preloadedLinks.set(src, link)
    })

    return () => {
      sources.forEach(src => {
        const link = preloadedLinks.get(src)
        if (link && document.head.contains(link)) {
          document.head.removeChild(link)
        }
      })
      preloadedLinks.clear()
    }
  }, [sources])
}

export default OptimizedImage
