import React, { memo } from 'react'

import { generateId } from '../../utils/accessibility/helpers'

export const CheckIcon: React.FC<{ ariaLabel?: string }> = memo(
  ({ ariaLabel }) => {
    const iconId = generateId('check-icon')

    return (
      <svg
        id={iconId}
        className='flex-shrink-0 w-6 h-6 text-cta-600 mt-1 mr-3'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        strokeWidth={2.5}
        role='img'
        aria-label={ariaLabel || 'Item validado'}
        aria-hidden={!ariaLabel}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
      </svg>
    )
  }
)

CheckIcon.displayName = 'CheckIcon'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const OptimizedImage: React.FC<OptimizedImageProps> = memo(
  ({ src, alt, className = '', loading = 'lazy', priority = false }) => {
    const imageId = generateId('image')

    return (
      <img
        id={imageId}
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
        decoding='async'
        role='img'
        onError={e => {
          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.error(`Erro ao carregar imagem: ${src}`, e)
          }
        }}
      />
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

interface MainContentProps {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

export const MainContent: React.FC<MainContentProps> = memo(
  ({ children, className = '', ariaLabel }) => {
    const mainId = generateId('main-content')

    return (
      <main
        id={mainId}
        className={className}
        role='main'
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        {children}
      </main>
    )
  }
)

MainContent.displayName = 'MainContent'
