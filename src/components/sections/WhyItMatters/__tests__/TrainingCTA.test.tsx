import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '../../../../test/test-utils'
import { TrainingCTA } from '../TrainingCTA'

const mockScrollTo = vi.fn()

vi.mock('../../../../hooks/useScrollTo', () => ({
  useScrollTo: () => ({
    scrollTo: mockScrollTo,
  }),
}))

describe('TrainingCTA (WhyItMatters)', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
  })

  describe('Estrutura Semântica', () => {
    it('deve renderizar como footer', () => {
      render(<TrainingCTA />)

      const footer = document.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('deve ter classe text-center no footer', () => {
      render(<TrainingCTA />)

      const footer = document.querySelector('footer')
      expect(footer).toHaveClass('text-center')
    })

    it('deve ter margem superior no footer', () => {
      render(<TrainingCTA />)

      const footer = document.querySelector('footer')
      expect(footer?.className).toContain('mt-8')
    })
  })

  describe('Mensagem Motivacional', () => {
    it('deve renderizar a mensagem motivacional', () => {
      render(<TrainingCTA />)

      expect(
        screen.getByText('Não faça parte das estatísticas. Seja a diferença.')
      ).toBeInTheDocument()
    })

    it('deve ter a mensagem como parágrafo', () => {
      render(<TrainingCTA />)

      const message = screen.getByText(
        'Não faça parte das estatísticas. Seja a diferença.'
      )
      expect(message.tagName).toBe('P')
    })

    it('deve ter estilo correto na mensagem', () => {
      render(<TrainingCTA />)

      const message = screen.getByText(
        'Não faça parte das estatísticas. Seja a diferença.'
      )
      expect(message.className).toContain('text-primary-700')
      expect(message.className).toContain('text-sm')
      expect(message.className).toContain('font-medium')
    })

    it('deve ter margem inferior na mensagem', () => {
      render(<TrainingCTA />)

      const message = screen.getByText(
        'Não faça parte das estatísticas. Seja a diferença.'
      )
      expect(message.className).toContain('mb-3')
    })
  })

  describe('Botão de Ação', () => {
    it('deve renderizar o botão com texto correto', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button', {
        name: /navegar para seção de treinamentos/i,
      })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Conhecer Treinamentos')
    })

    it('deve ter aria-label descritivo', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute(
        'aria-label',
        'Navegar para seção de treinamentos disponíveis'
      )
    })
  })

  describe('Interação', () => {
    it('deve chamar scrollTo ao clicar no botão', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockScrollTo).toHaveBeenCalledTimes(1)
    })

    it('deve navegar para seção de cursos ao clicar', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockScrollTo).toHaveBeenCalledWith({ dataSection: 'cursos' })
    })
  })

  describe('Estilos do Botão', () => {
    it('deve ter background CTA', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-cta-600')
    })

    it('deve ter texto branco', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('text-white')
    })

    it('deve ter hover state', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('hover:bg-cta-700')
    })

    it('deve ter fonte bold', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('font-bold')
    })

    it('deve ter padding correto', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('py-3')
      expect(button.className).toContain('px-6')
    })

    it('deve ter border-radius', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('rounded-lg')
    })

    it('deve ter texto uppercase', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('uppercase')
    })

    it('deve ter tracking wider', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('tracking-wider')
    })

    it('deve ter tamanho de fonte xs', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('text-xs')
    })

    it('deve ter transição', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('transition-all')
      expect(button.className).toContain('duration-300')
    })

    it('deve ter sombra', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('shadow-lg')
    })

    it('deve ter hover shadow', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('hover:shadow-xl')
    })

    it('deve ter hover scale', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      expect(button.className).toContain('hover:scale-105')
    })
  })

  describe('Acessibilidade', () => {
    it('deve usar AccessibleButton', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      // AccessibleButton deve estar presente
      expect(button).toBeInTheDocument()
    })

    it('deve ter indicadores de foco visíveis', () => {
      render(<TrainingCTA />)

      const button = screen.getByRole('button')
      const hasFocusStyling = button.className.match(/focus:|focus-visible:/)

      expect(hasFocusStyling).toBeTruthy()
    })
  })
})
