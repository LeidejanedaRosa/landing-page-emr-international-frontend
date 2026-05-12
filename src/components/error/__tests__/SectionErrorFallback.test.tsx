import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../test/test-utils'
import { SectionErrorFallback } from '../SectionErrorFallback'

describe('SectionErrorFallback', () => {
  describe('Rendering', () => {
    it('should render generic error message without sectionName', () => {
      render(<SectionErrorFallback />)

      expect(
        screen.getByText('Não foi possível carregar esta seção')
      ).toBeInTheDocument()
    })

    it('should render section-specific message when sectionName is provided', () => {
      render(<SectionErrorFallback sectionName='Rodapé' />)

      expect(
        screen.getByText('Não foi possível carregar: Rodapé')
      ).toBeInTheDocument()
    })

    it('should always render retry instructions', () => {
      render(<SectionErrorFallback />)

      expect(
        screen.getByText(
          'Ocorreu um erro ao carregar este conteúdo. Tente novamente.'
        )
      ).toBeInTheDocument()
    })

    it('should not render retry button when onRetry is not provided', () => {
      render(<SectionErrorFallback />)

      expect(
        screen.queryByRole('button', { name: /tentar novamente/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('onRetry', () => {
    it('should render retry button when onRetry is provided', () => {
      const onRetry = vi.fn()
      render(<SectionErrorFallback onRetry={onRetry} />)

      expect(
        screen.getByRole('button', { name: /tentar novamente/i })
      ).toBeInTheDocument()
    })

    it('should call onRetry when retry button is clicked', async () => {
      const user = userEvent.setup()
      const onRetry = vi.fn()
      render(<SectionErrorFallback onRetry={onRetry} />)

      await user.click(
        screen.getByRole('button', { name: /tentar novamente/i })
      )

      expect(onRetry).toHaveBeenCalledTimes(1)
    })
  })
})
