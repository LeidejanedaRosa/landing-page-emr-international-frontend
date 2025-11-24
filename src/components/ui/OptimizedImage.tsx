import React, { type ComponentProps, useEffect, useState } from 'react'

interface OptimizedImageProps
  extends Omit<ComponentProps<'img'>, 'src' | 'sizes' | 'onLoad' | 'onError'> {
  /**
   * Caminho da imagem original
   */
  src: string
  /**
   * Tamanhos responsivos
   * @example ['400w', '800w', '1200w']
   */
  sizes?: string[]
  /**
   * Formatos a serem gerados
   * @default ['webp', 'avif', 'jpg']
   */
  formats?: ('webp' | 'avif' | 'jpg' | 'png')[]
  /**
   * Qualidade da compressão (1-100)
   * @default 80
   */
  quality?: number
  /**
   * Lazy loading
   * @default true
   */
  lazy?: boolean
  /**
   * Callback para quando a imagem carregar
   */
  onLoad?: () => void
  /**
   * Callback para erro no carregamento
   */
  // eslint-disable-next-line no-unused-vars
  onError?: (_error: Error) => void
}

// Helper: Gera srcset para um formato específico
const generateSrcSet = (
  src: string,
  sizes: string[],
  format: string,
  quality: number
): string => {
  return sizes
    .map(size => {
      const width = parseInt(size.replace('w', ''))
      const optimizedSrc = `${src}?w=${width}&format=${format}&quality=${quality}`
      return `${optimizedSrc} ${width}w`
    })
    .join(', ')
}

// Helper: Gera elementos <source> para formatos modernos
const generateSources = (
  src: string,
  sizes: string[],
  formats: string[],
  quality: number
) => {
  return formats
    .slice(0, -1)
    .map(format => (
      <source
        key={format}
        srcSet={generateSrcSet(src, sizes, format, quality)}
        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        type={`image/${format}`}
      />
    ))
}

// Component: Placeholder de erro
const ErrorPlaceholder: React.FC<{ alt: string; className?: string }> = ({
  alt,
  className,
}) => (
  <div
    className={`bg-gray-200 flex items-center justify-center text-gray-400 ${className || ''}`}
    role='img'
    aria-label={alt}
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

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  sizes = ['400w', '800w', '1200w'],
  formats = ['avif', 'webp', 'jpg'],
  quality = 80,
  lazy = true,
  onLoad,
  onError: _onError,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    const error = new Error(`Failed to load image: ${src}`)
    _onError?.(error)
  }

  if (hasError) {
    return <ErrorPlaceholder alt={alt || ''} className={className} />
  }

  return (
    <picture className={className}>
      {generateSources(src, sizes, formats, quality)}
      <img
        src={`${src}?w=800&format=${formats[formats.length - 1]}&quality=${quality}`}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className || ''}
        `}
        {...props}
      />
    </picture>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useImagePreload = (sources: string[]) => {
  useEffect(() => {
    sources.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    return () => {
      sources.forEach(src => {
        const existingLink = document.querySelector(`link[href="${src}"]`)
        if (existingLink) {
          document.head.removeChild(existingLink)
        }
      })
    }
  }, [sources])
}

export default OptimizedImage
