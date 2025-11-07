// Componentes de acessibilidade simples e funcionais
import React from 'react'

// Skip Link para navegação rápida
export const SkipLink: React.FC<{
  href: string
  children: React.ReactNode
}> = ({ href, children }) => (
  <a
    href={href}
    className='sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-secondary focus:px-4 focus:py-2 focus:text-base focus:font-medium focus:rounded-br focus:shadow-lg'
  >
    {children}
  </a>
)

// Container principal
export const MainContent: React.FC<{
  children: React.ReactNode
  className?: string
  id?: string
}> = ({ children, className = '', id = 'main-content' }) => (
  <main id={id} className={`focus:outline-none ${className}`} tabIndex={-1}>
    {children}
  </main>
)

// Botão acessível básico
export const AccessibleButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

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

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Link acessível básico
export const AccessibleLink: React.FC<{
  children: React.ReactNode
  href: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  'aria-label'?: string
}> = ({
  children,
  href,
  external = false,
  variant = 'primary',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const baseClasses =
    'inline-flex items-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:underline'

  const variantClasses = {
    primary: 'text-primary hover:text-primary-700',
    secondary: 'text-gray-600 hover:text-gray-800',
    ghost: 'text-gray-400 hover:text-gray-600',
  }

  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': ariaLabel || `${children} (abre em nova aba)`,
      }
    : {
        'aria-label': ariaLabel,
      }

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...externalProps}
    >
      {children}
      {external && (
        <span className='ml-1' aria-hidden='true'>
          ↗
        </span>
      )}
    </a>
  )
}
