import React, { forwardRef } from 'react'

/**
 * Spinner de carregamento acessível
 */
const LoadingSpinner = () => (
  <svg
    className='animate-spin h-4 w-4'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
)

/**
 * Botão acessível com suporte completo a teclado
 */
interface AccessibleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
}

export const AccessibleButton = forwardRef<
  HTMLButtonElement,
  AccessibleButtonProps
>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText = 'Carregando...',
      disabled,
      'aria-label': ariaLabel,
      className = '',
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    ]

    const variantClasses = {
      primary: 'bg-cta hover:bg-cta-800 text-secondary focus:ring-cta-500',
      secondary:
        'bg-secondary hover:bg-gray-50 text-primary border-2 border-primary focus:ring-primary',
      ghost: 'bg-transparent hover:bg-gray-100 text-primary focus:ring-primary',
    }

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    }

    const isDisabled = disabled || loading

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && onClick) {
        onClick(event)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (onKeyDown) {
        onKeyDown(event)
      }
    }

    return (
      <button
        ref={ref}
        type='button'
        className={[
          ...baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        disabled={isDisabled}
        aria-label={loading ? loadingText : ariaLabel}
        aria-disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {loading && (
          <span className='mr-2' aria-hidden='true'>
            <LoadingSpinner />
          </span>
        )}
        {loading ? loadingText : children}
      </button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'
