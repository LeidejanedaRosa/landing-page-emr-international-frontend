import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../test/test-utils'
import ErrorBoundary from '../ErrorBoundary'

const ThrowError = ({ message = 'test error' }: { message?: string }) => {
  throw new Error(message)
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Normal rendering', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>children content</div>
        </ErrorBoundary>
      )

      expect(screen.getByText('children content')).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('should render default fallback UI when error occurs without fallback prop', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )

      expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /tentar novamente/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /recarregar página/i })
      ).toBeInTheDocument()
    })

    it('should render JSX fallback when fallback prop is a ReactNode', () => {
      render(
        <ErrorBoundary fallback={<div>custom fallback</div>}>
          <ThrowError />
        </ErrorBoundary>
      )

      expect(screen.getByText('custom fallback')).toBeInTheDocument()
      expect(screen.queryByText('Algo deu errado')).not.toBeInTheDocument()
    })

    it('should render function fallback with resetError when fallback is a function', () => {
      const fallback = vi.fn(() => <div>function fallback</div>)

      render(
        <ErrorBoundary fallback={fallback}>
          <ThrowError />
        </ErrorBoundary>
      )

      expect(screen.getByText('function fallback')).toBeInTheDocument()
      expect(fallback).toHaveBeenCalledWith(
        expect.objectContaining({ resetError: expect.any(Function) })
      )
    })

    it('should call onError callback when error occurs', () => {
      const onError = vi.fn()

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError message='callback error' />
        </ErrorBoundary>
      )

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'callback error' }),
        expect.any(Object)
      )
    })
  })

  describe('resetError', () => {
    it('should reset error state and re-render children when resetError is called', async () => {
      const user = userEvent.setup()

      let shouldThrow = true
      const ConditionalError = () => {
        if (shouldThrow) throw new Error('recoverable error')
        return <div>recovered content</div>
      }

      const { rerender } = render(
        <ErrorBoundary>
          <ConditionalError />
        </ErrorBoundary>
      )

      expect(screen.getByText('Algo deu errado')).toBeInTheDocument()

      shouldThrow = false
      await user.click(
        screen.getByRole('button', { name: /tentar novamente/i })
      )

      rerender(
        <ErrorBoundary>
          <ConditionalError />
        </ErrorBoundary>
      )

      expect(screen.getByText('recovered content')).toBeInTheDocument()
    })
  })
})
