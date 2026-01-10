import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '../../../../../test/test-utils'
import { TestimonialIndicators } from '../TestimonialIndicators'

describe('TestimonialIndicators', () => {
  const defaultProps = {
    currentIndex: 0,
    totalSlides: 5,
    onSelect: vi.fn(),
    buttonsRef: { current: [] as (HTMLButtonElement | null)[] },
    handleKeyDown: vi.fn(),
    isAutoPlaying: false,
    autoPlayDelay: 5000,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Estrutura Semântica', () => {
    it('deve renderizar nav como elemento raiz', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const nav = screen.getByRole('navigation', {
        name: 'Navegação dos depoimentos',
      })
      expect(nav).toBeInTheDocument()
    })

    it('deve renderizar tablist para indicadores', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tablist = screen.getByRole('tablist', {
        name: 'Selecionar depoimento',
      })
      expect(tablist).toBeInTheDocument()
    })

    it('deve renderizar tabs para cada slide', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(5)
    })
  })

  describe('Indicadores', () => {
    it('deve marcar o indicador ativo com aria-selected true', () => {
      render(<TestimonialIndicators {...defaultProps} currentIndex={2} />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    })

    it('deve ter aria-selected false para indicadores inativos', () => {
      render(<TestimonialIndicators {...defaultProps} currentIndex={0} />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
    })

    it('deve ter tabIndex 0 apenas no indicador ativo', () => {
      render(<TestimonialIndicators {...defaultProps} currentIndex={1} />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs[1]).toHaveAttribute('tabIndex', '0')
      expect(tabs[0]).toHaveAttribute('tabIndex', '-1')
      expect(tabs[2]).toHaveAttribute('tabIndex', '-1')
    })

    it('deve ter aria-controls apontando para o slide correspondente', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute(
          'aria-controls',
          `testimonial-slide-${index}`
        )
      })
    })

    it('deve ter aria-label descritivo em cada indicador', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute(
          'aria-label',
          `Ir para depoimento ${index + 1}`
        )
      })
    })
  })

  describe('Interação', () => {
    it('deve chamar onSelect ao clicar em um indicador', () => {
      const onSelect = vi.fn()
      render(<TestimonialIndicators {...defaultProps} onSelect={onSelect} />)

      const tabs = screen.getAllByRole('tab')
      fireEvent.click(tabs[3])

      expect(onSelect).toHaveBeenCalledWith(3)
    })

    it('deve chamar handleKeyDown ao pressionar tecla', () => {
      const handleKeyDown = vi.fn()
      render(
        <TestimonialIndicators
          {...defaultProps}
          handleKeyDown={handleKeyDown}
        />
      )

      const tabs = screen.getAllByRole('tab')
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })

      expect(handleKeyDown).toHaveBeenCalled()
    })
  })

  describe('Contador', () => {
    it('deve exibir contador de slides', () => {
      render(<TestimonialIndicators {...defaultProps} currentIndex={2} />)

      expect(screen.getByText('3 de 5')).toBeInTheDocument()
    })

    it('deve ter aria-live polite no contador', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const counter = screen.getByText('1 de 5')
      expect(counter).toHaveAttribute('aria-live', 'polite')
    })

    it('deve ter aria-atomic true no contador', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const counter = screen.getByText('1 de 5')
      expect(counter).toHaveAttribute('aria-atomic', 'true')
    })
  })

  describe('Barra de Progresso', () => {
    it('deve mostrar barra de progresso quando autoPlaying é true', () => {
      render(<TestimonialIndicators {...defaultProps} isAutoPlaying={true} />)

      const progressBar = document.querySelector(
        '[style*="animation: progress"]'
      )
      expect(progressBar).toBeInTheDocument()
    })

    it('não deve mostrar barra de progresso quando autoPlaying é false', () => {
      render(<TestimonialIndicators {...defaultProps} isAutoPlaying={false} />)

      const progressBars = document.querySelectorAll(
        '[style*="animation: progress"]'
      )
      expect(progressBars).toHaveLength(0)
    })

    it('deve usar autoPlayDelay na animação', () => {
      render(
        <TestimonialIndicators
          {...defaultProps}
          isAutoPlaying={true}
          autoPlayDelay={3000}
        />
      )

      const progressBar = document.querySelector(
        '[style*="animation: progress 3000ms"]'
      )
      expect(progressBar).toBeInTheDocument()
    })
  })

  describe('Muitos Slides (Dots Colapsados)', () => {
    it('deve limitar dots visíveis quando há muitos slides', () => {
      render(<TestimonialIndicators {...defaultProps} totalSlides={15} />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeLessThanOrEqual(7)
    })

    it('deve mostrar primeiro e último dot quando colapsado', () => {
      render(
        <TestimonialIndicators
          {...defaultProps}
          totalSlides={15}
          currentIndex={7}
        />
      )

      const tabs = screen.getAllByRole('tab')
      const firstTab = tabs.find(
        tab => tab.getAttribute('aria-label') === 'Ir para depoimento 1'
      )
      const lastTab = tabs.find(
        tab => tab.getAttribute('aria-label') === 'Ir para depoimento 15'
      )

      expect(firstTab).toBeInTheDocument()
      expect(lastTab).toBeInTheDocument()
    })
  })

  describe('Ref dos Botões', () => {
    it('deve atribuir ref aos botões', () => {
      const buttonsRef = { current: [] as (HTMLButtonElement | null)[] }
      render(
        <TestimonialIndicators {...defaultProps} buttonsRef={buttonsRef} />
      )

      expect(buttonsRef.current.length).toBeGreaterThan(0)
      expect(buttonsRef.current[0]).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Estilos', () => {
    it('deve ter foco visível nos indicadores', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab.className).toContain('focus:outline-none')
        expect(tab.className).toContain('focus:ring-2')
      })
    })

    it('deve ter tamanho mínimo de 44px para acessibilidade', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab.className).toContain('min-w-[44px]')
        expect(tab.className).toContain('min-h-[44px]')
      })
    })

    it('deve ter style tag com keyframes de progresso', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const style = document.querySelector('style')
      expect(style?.textContent).toContain('@keyframes progress')
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter botões com type button', () => {
      render(<TestimonialIndicators {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('type', 'button')
      })
    })
  })
})
