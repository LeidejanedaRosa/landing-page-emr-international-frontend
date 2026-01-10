import { describe, expect, it } from 'vitest'

import type { StatisticData } from '../../../../data/whyItMattersData'
import { render, screen } from '../../../../test/test-utils'
import { StatisticsGrid } from '../StatisticsGrid'

const mockStatistics: StatisticData[] = [
  {
    id: 'stat-1',
    icon: <span data-testid='icon-1'>Icon1</span>,
    value: '50%',
    label: 'Estatística principal',
    highlight: true,
    subtext: 'Texto adicional',
    className: 'col-span-6',
  },
  {
    id: 'stat-2',
    icon: <span data-testid='icon-2'>Icon2</span>,
    value: '30%',
    label: 'Segunda estatística',
    subtext: 'Outro texto',
    className: 'col-span-3',
  },
  {
    id: 'stat-3',
    icon: <span data-testid='icon-3'>Icon3</span>,
    value: '20%',
    label: 'Terceira estatística',
    className: 'col-span-3',
  },
]

describe('StatisticsGrid', () => {
  const defaultProps = {
    statistics: mockStatistics,
    activeTabId: 'tactical',
    gridDescriptionId: 'test-grid-description',
  }

  describe('Renderização', () => {
    it('deve renderizar o container com role list', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const list = document.querySelector('[role="list"]')
      expect(list).toBeInTheDocument()
    })

    it('deve renderizar todos os itens da lista', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      expect(items).toHaveLength(mockStatistics.length)
    })

    it('não deve renderizar nada quando statistics está vazio', () => {
      render(<StatisticsGrid {...defaultProps} statistics={[]} />)

      const list = document.querySelector('[role="list"]')
      expect(list).not.toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter aria-describedby apontando para descrição', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const list = document.querySelector('[role="list"]')
      expect(list).toHaveAttribute('aria-describedby', 'test-grid-description')
    })

    it('deve ter descrição visível apenas para leitores de tela', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const description = screen.getByText(/lista de \d+ estatísticas/i)
      expect(description).toBeInTheDocument()
      expect(description).toHaveAttribute('id', 'test-grid-description')
    })

    it('deve mencionar quantidade correta de estatísticas na descrição', () => {
      render(<StatisticsGrid {...defaultProps} />)

      expect(
        screen.getByText(
          `Lista de ${mockStatistics.length} estatísticas críticas sobre emergências médicas`
        )
      ).toBeInTheDocument()
    })

    it('deve ter aria-posinset correto em cada item', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach((item, index) => {
        expect(item).toHaveAttribute('aria-posinset', String(index + 1))
      })
    })

    it('deve ter aria-setsize correto em cada item', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        expect(item).toHaveAttribute(
          'aria-setsize',
          String(mockStatistics.length)
        )
      })
    })
  })

  describe('Destaque do Primeiro Item', () => {
    it('deve passar isHighlight=true para o primeiro card', () => {
      render(<StatisticsGrid {...defaultProps} />)

      // O primeiro item deve ter o badge "Fator Crítico"
      expect(screen.getByText('Fator Crítico')).toBeInTheDocument()
    })

    it('deve renderizar o primeiro item com margem especial', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      const firstItem = items[0]

      expect(firstItem.className).toContain('mb-8')
    })
  })

  describe('Sticky Positioning', () => {
    it('deve ter sticky positioning nos itens', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        expect(item.className).toContain('sticky')
      })
    })

    it('deve ter CSS variables para sticky-top', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        const style = (item as HTMLElement).style.getPropertyValue(
          '--sticky-top'
        )
        expect(style).toBeTruthy()
      })
    })

    it('deve ter CSS variables para sticky-z', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        const style = (item as HTMLElement).style.getPropertyValue('--sticky-z')
        expect(style).toBeTruthy()
      })
    })

    it('deve ter offset incremental para cada item', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')

      // Primeiro item: 3.5rem
      expect(items[0]).toHaveStyle({ '--sticky-top': '3.5rem' })

      // Segundo item: 3.5 + 1 = 4.5rem
      expect(items[1]).toHaveStyle({ '--sticky-top': '4.5rem' })

      // Terceiro item: 3.5 + 2 = 5.5rem
      expect(items[2]).toHaveStyle({ '--sticky-top': '5.5rem' })
    })

    it('deve ter z-index incremental para cada item', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')

      expect(items[0]).toHaveStyle({ '--sticky-z': '10' })
      expect(items[1]).toHaveStyle({ '--sticky-z': '11' })
      expect(items[2]).toHaveStyle({ '--sticky-z': '12' })
    })
  })

  describe('Responsividade', () => {
    it('deve ter classes responsivas para grid', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const list = document.querySelector('[role="list"]')
      expect(list?.className).toContain('flex')
      expect(list?.className).toContain('flex-col')
      expect(list?.className).toContain('lg:grid')
      expect(list?.className).toContain('lg:grid-cols-12')
    })

    it('deve ter gap responsivo', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const list = document.querySelector('[role="list"]')
      expect(list?.className).toContain('gap-4')
      expect(list?.className).toContain('lg:gap-2')
    })

    it('deve ter static positioning em desktop', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        expect(item.className).toContain('lg:static')
      })
    })
  })

  describe('Classes Customizadas', () => {
    it('deve aplicar className de cada estatística', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')

      expect(items[0].className).toContain('col-span-6')
      expect(items[1].className).toContain('col-span-3')
      expect(items[2].className).toContain('col-span-3')
    })
  })

  describe('Efeitos de Hover', () => {
    it('deve ter transição em cada item', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        expect(item.className).toContain('transition-transform')
        expect(item.className).toContain('duration-300')
      })
    })

    it('deve ter hover scale em cada item', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const items = document.querySelectorAll('[role="listitem"]')
      items.forEach(item => {
        expect(item.className).toContain('hover:scale-[1.02]')
      })
    })
  })

  describe('StatisticCard Integration', () => {
    it('deve renderizar valores de todas as estatísticas', () => {
      render(<StatisticsGrid {...defaultProps} />)

      mockStatistics.forEach(stat => {
        expect(screen.getByText(stat.value)).toBeInTheDocument()
      })
    })

    it('deve renderizar labels de todas as estatísticas', () => {
      render(<StatisticsGrid {...defaultProps} />)

      mockStatistics.forEach(stat => {
        expect(screen.getByText(stat.label)).toBeInTheDocument()
      })
    })

    it('deve renderizar subtext quando presente', () => {
      render(<StatisticsGrid {...defaultProps} />)

      const statsWithSubtext = mockStatistics.filter(s => s.subtext)
      statsWithSubtext.forEach(stat => {
        expect(screen.getByText(stat.subtext!)).toBeInTheDocument()
      })
    })

    it('deve passar activeTabId para os cards', () => {
      render(<StatisticsGrid {...defaultProps} activeTabId='remote' />)

      // O card destacado deve usar cor warning em vez de cta
      const highlightCard = document.querySelector('article')
      expect(highlightCard?.className).toContain('from-warning-700')
    })
  })
})
