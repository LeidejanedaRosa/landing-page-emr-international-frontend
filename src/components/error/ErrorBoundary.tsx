import React, { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

// eslint-disable-next-line no-unused-vars
type ErrorHandler = (error: Error, errorInfo: ErrorInfo) => void

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: ErrorHandler
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Em desenvolvimento, log do erro para debugging
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Chama callback personalizado se fornecido
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      // Fallback customizado ou padrão
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-6'>
            <div className='flex items-center mb-4'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-8 w-8 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.695-.833-3.464 0L.33 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Algo deu errado
                </h3>
              </div>
            </div>
            <div className='text-sm text-gray-600 mb-4'>
              Ocorreu um erro inesperado. Nossa equipe foi notificada e está
              trabalhando para resolver o problema.
            </div>
            <button
              onClick={() => window.location.reload()}
              className='w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200'
              type='button'
            >
              Recarregar página
            </button>
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className='mt-4 p-3 bg-gray-100 rounded text-xs'>
                <summary className='cursor-pointer font-medium'>
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className='mt-2 text-red-600 whitespace-pre-wrap'>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
