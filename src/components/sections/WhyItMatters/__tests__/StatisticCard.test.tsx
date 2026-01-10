import { describe, expect, it } from 'vitest'

import type { StatisticData } from '../../../../data/whyItMattersData'
import { render, screen } from '../../../../test/test-utils'
import { StatisticCard } from '../StatisticCard'

const mockStatistic: StatisticData = {
  id: 'test-stat',
  icon: <span data-testid='stat-icon'>TestIcon</span>,
  value: '75%',
  label: 'Estatística de teste importante',
  subtext: 'Informação adicional relevante',
}

describe('StatisticCard', () => {
  const defaultProps = {
    statistic: mockStatistic,
    activeTabId: 'tactical',
  }

  describe('Estrutura Semântica', () => {
    it('deve renderizar como article', () => {
      render(<StatisticCard {...defaultProps} />)

      const article = document.querySelector('article')
      expect(article).toBeInTheDocument()
    })
  })

  describe('Conteúdo', () => {
    it('deve exibir o valor da estatística', () => {
      render(<StatisticCard {...defaultProps} />)

      expect(screen.getByText('75%')).toBeInTheDocument()
    })

    it('deve exibir o label da estatística', () => {
      render(<StatisticCard {...defaultProps} />)

      expect(
        screen.getByText('Estatística de teste importante')
      ).toBeInTheDocument()
    })

    it('deve exibir o subtext quando presente', () => {
      render(<StatisticCard {...defaultProps} />)

      expect(
        screen.getByText('Informação adicional relevante')
      ).toBeInTheDocument()
    })

    it('não deve exibir subtext quando não presente', () => {
      const statWithoutSubtext = { ...mockStatistic, subtext: undefined }
      render(<StatisticCard {...defaultProps} statistic={statWithoutSubtext} />)

      const subtextElements = document.querySelectorAll('.border-l-2')
      expect(subtextElements.length).toBe(0)
    })

    it('deve renderizar o ícone', () => {
      render(<StatisticCard {...defaultProps} />)

      expect(screen.getByTestId('stat-icon')).toBeInTheDocument()
    })
  })

  describe('Card Destacado (isHighlight)', () => {
    it('deve exibir badge "Fator Crítico" quando destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={true} />)

      expect(screen.getByText('Fator Crítico')).toBeInTheDocument()
    })

    it('não deve exibir badge quando não destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={false} />)

      expect(screen.queryByText('Fator Crítico')).not.toBeInTheDocument()
    })

    it('deve ter estilos diferentes quando destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={true} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('bg-gradient-to-br')
      expect(article?.className).toContain('min-h-[250px]')
    })

    it('deve ter estilos normais quando não destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={false} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('bg-primary-700')
      expect(article?.className).toContain('min-h-[130px]')
    })

    it('deve exibir linha decorativa quando não destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={false} />)

      const decorativeLine = document.querySelector('.h-1.w-8.rounded-full')
      expect(decorativeLine).toBeInTheDocument()
    })

    it('não deve exibir linha decorativa quando destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={true} />)

      const decorativeLine = document.querySelector(
        'article > div:last-child .h-1.w-8.rounded-full'
      )
      expect(decorativeLine).not.toBeInTheDocument()
    })
  })

  describe('Variação por Tab Ativo', () => {
    describe('quando tab tactical está ativo', () => {
      it('deve ter gradiente vermelho no card destacado', () => {
        render(
          <StatisticCard
            {...defaultProps}
            isHighlight={true}
            activeTabId='tactical'
          />
        )

        const article = document.querySelector('article')
        expect(article?.className).toContain('from-cta-700')
        expect(article?.className).toContain('to-cta-500')
      })

      it('deve ter linha decorativa cta no card normal', () => {
        render(
          <StatisticCard
            {...defaultProps}
            isHighlight={false}
            activeTabId='tactical'
          />
        )

        const decorativeLine = document.querySelector('.h-1.w-8.rounded-full')
        expect(decorativeLine?.className).toContain('bg-cta-500')
      })
    })

    describe('quando tab remote está ativo', () => {
      it('deve ter gradiente warning no card destacado', () => {
        render(
          <StatisticCard
            {...defaultProps}
            isHighlight={true}
            activeTabId='remote'
          />
        )

        const article = document.querySelector('article')
        expect(article?.className).toContain('from-warning-700')
        expect(article?.className).toContain('to-warning-500')
      })

      it('deve ter linha decorativa warning no card normal', () => {
        render(
          <StatisticCard
            {...defaultProps}
            isHighlight={false}
            activeTabId='remote'
          />
        )

        const decorativeLine = document.querySelector('.h-1.w-8.rounded-full')
        expect(decorativeLine?.className).toContain('bg-warning-500')
      })
    })
  })

  describe('Estilos de Texto', () => {
    describe('card destacado', () => {
      it('deve ter valor com texto maior', () => {
        render(<StatisticCard {...defaultProps} isHighlight={true} />)

        const value = screen.getByText('75%')
        expect(value.className).toContain('text-3xl')
        expect(value.className).toContain('md:text-4xl')
      })

      it('deve ter label com texto branco', () => {
        render(<StatisticCard {...defaultProps} isHighlight={true} />)

        const label = screen.getByText('Estatística de teste importante')
        expect(label.className).toContain('text-white')
      })

      it('deve ter subtext com estilo itálico', () => {
        render(<StatisticCard {...defaultProps} isHighlight={true} />)

        const subtext = screen.getByText('Informação adicional relevante')
        expect(subtext.className).toContain('italic')
      })
    })

    describe('card normal', () => {
      it('deve ter valor com texto menor', () => {
        render(<StatisticCard {...defaultProps} isHighlight={false} />)

        const value = screen.getByText('75%')
        expect(value.className).toContain('text-xl')
      })

      it('deve ter label com texto primary-100', () => {
        render(<StatisticCard {...defaultProps} isHighlight={false} />)

        const label = screen.getByText('Estatística de teste importante')
        expect(label.className).toContain('text-primary-100')
      })

      it('deve ter subtext com texto primary-300', () => {
        render(<StatisticCard {...defaultProps} isHighlight={false} />)

        const subtext = screen.getByText('Informação adicional relevante')
        expect(subtext.className).toContain('text-primary-300')
      })
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter container de ícone com aria-hidden', () => {
      render(<StatisticCard {...defaultProps} />)

      const iconContainer = document.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })

    it('deve ter linha decorativa com aria-hidden quando presente', () => {
      render(<StatisticCard {...defaultProps} isHighlight={false} />)

      const decorativeElements = document.querySelectorAll(
        '[aria-hidden="true"]'
      )
      expect(decorativeElements.length).toBeGreaterThan(0)
    })
  })

  describe('Layout', () => {
    it('deve ter border-radius', () => {
      render(<StatisticCard {...defaultProps} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('rounded-xl')
    })

    it('deve ter sombra', () => {
      render(<StatisticCard {...defaultProps} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('shadow-xl')
    })

    it('deve ter altura total', () => {
      render(<StatisticCard {...defaultProps} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('h-full')
    })

    it('deve ter flexbox com justify-end', () => {
      render(<StatisticCard {...defaultProps} />)

      const article = document.querySelector('article')
      expect(article?.className).toContain('flex')
      expect(article?.className).toContain('flex-col')
      expect(article?.className).toContain('justify-end')
    })

    it('deve ter ícone posicionado no canto superior direito', () => {
      render(<StatisticCard {...defaultProps} />)

      const iconWrapper = document.querySelector('.absolute.inset-0')
      expect(iconWrapper?.className).toContain('justify-end')
      expect(iconWrapper?.className).toContain('items-start')
    })
  })

  describe('Tipografia', () => {
    it('deve ter valor com font-black', () => {
      render(<StatisticCard {...defaultProps} />)

      const value = screen.getByText('75%')
      expect(value.className).toContain('font-black')
    })

    it('deve ter valor com tracking-tight', () => {
      render(<StatisticCard {...defaultProps} />)

      const value = screen.getByText('75%')
      expect(value.className).toContain('tracking-tight')
    })

    it('deve ter label com leading-snug', () => {
      render(<StatisticCard {...defaultProps} />)

      const label = screen.getByText('Estatística de teste importante')
      expect(label.className).toContain('leading-snug')
    })
  })

  describe('Subtext Border', () => {
    it('deve ter borda esquerda no subtext quando destacado', () => {
      render(<StatisticCard {...defaultProps} isHighlight={true} />)

      const subtext = screen.getByText('Informação adicional relevante')
      expect(subtext.className).toContain('border-l-2')
      expect(subtext.className).toContain('border-white/40')
    })

    it('deve ter borda esquerda no subtext quando normal', () => {
      render(<StatisticCard {...defaultProps} isHighlight={false} />)

      const subtext = screen.getByText('Informação adicional relevante')
      expect(subtext.className).toContain('border-l-2')
      expect(subtext.className).toContain('border-primary-800')
    })
  })
})
