import { beforeEach, describe, expect, it, vi } from 'vitest'

import { whyItMattersData } from '../../../../data/whyItMattersData'
import { fireEvent, render, screen } from '../../../../test/test-utils'
import { TabSwitcher } from '../TabSwitcher'

describe('TabSwitcher', () => {
  const mockOnTabChange = vi.fn()

  const defaultProps = {
    tabs: whyItMattersData,
    activeTabId: 'tactical',
    onTabChange: mockOnTabChange,
    tabListId: 'test-tablist-id',
  }

  beforeEach(() => {
    mockOnTabChange.mockClear()
  })

  describe('Estrutura Semântica', () => {
    it('deve renderizar nav com aria-label', () => {
      render(<TabSwitcher {...defaultProps} />)

      const nav = screen.getByRole('navigation', {
        name: 'Selecionar tipo de ambiente de emergência',
      })
      expect(nav).toBeInTheDocument()
    })

    it('deve renderizar tablist com role correto', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist).toBeInTheDocument()
    })

    it('deve ter ID no tablist conforme props', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveAttribute('id', 'test-tablist-id')
    })

    it('deve ter aria-label no tablist', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveAttribute(
        'aria-label',
        'Categorias de estatísticas de emergência'
      )
    })
  })

  describe('Renderização de Tabs', () => {
    it('deve renderizar todos os tabs', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(whyItMattersData.length)
    })

    it('deve renderizar label de cada tab', () => {
      render(<TabSwitcher {...defaultProps} />)

      whyItMattersData.forEach(tab => {
        expect(screen.getByText(tab.label)).toBeInTheDocument()
      })
    })

    it('deve renderizar ícone em cada tab', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        const svg = tab.querySelector('svg')
        expect(svg).toBeInTheDocument()
      })
    })

    it('deve ter ícones com aria-hidden', () => {
      render(<TabSwitcher {...defaultProps} />)

      const icons = document.querySelectorAll('[role="tab"] svg')
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Estado Ativo', () => {
    it('deve marcar tab ativo com aria-selected true', () => {
      render(<TabSwitcher {...defaultProps} />)

      const activeTab = screen.getByRole('tab', { name: /área tática/i })
      expect(activeTab).toHaveAttribute('aria-selected', 'true')
    })

    it('deve marcar tabs inativos com aria-selected false', () => {
      render(<TabSwitcher {...defaultProps} />)

      const inactiveTab = screen.getByRole('tab', { name: /área remota/i })
      expect(inactiveTab).toHaveAttribute('aria-selected', 'false')
    })

    it('deve alterar tab ativo quando prop muda', () => {
      const { rerender } = render(<TabSwitcher {...defaultProps} />)

      rerender(<TabSwitcher {...defaultProps} activeTabId='remote' />)

      const remoteTab = screen.getByRole('tab', { name: /área remota/i })
      expect(remoteTab).toHaveAttribute('aria-selected', 'true')

      const tacticalTab = screen.getByRole('tab', { name: /área tática/i })
      expect(tacticalTab).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('Interação', () => {
    it('deve chamar onTabChange ao clicar em tab', () => {
      render(<TabSwitcher {...defaultProps} />)

      const remoteTab = screen.getByRole('tab', { name: /área remota/i })
      fireEvent.click(remoteTab)

      expect(mockOnTabChange).toHaveBeenCalledWith('remote')
    })

    it('deve chamar onTabChange com ID correto para cada tab', () => {
      render(<TabSwitcher {...defaultProps} />)

      whyItMattersData.forEach(tab => {
        const tabElement = screen.getByRole('tab', {
          name: new RegExp(tab.label, 'i'),
        })
        fireEvent.click(tabElement)

        expect(mockOnTabChange).toHaveBeenCalledWith(tab.id)
      })
    })
  })

  describe('Aria Controls', () => {
    it('deve ter aria-controls apontando para o painel de cada tab', () => {
      render(<TabSwitcher {...defaultProps} />)

      whyItMattersData.forEach(tab => {
        const tabElement = screen.getByRole('tab', {
          name: new RegExp(tab.label, 'i'),
        })
        expect(tabElement).toHaveAttribute('aria-controls', `${tab.id}-panel`)
      })
    })
  })

  describe('IDs', () => {
    it('deve ter ID único para cada tab', () => {
      render(<TabSwitcher {...defaultProps} />)

      whyItMattersData.forEach(tab => {
        const tabElement = screen.getByRole('tab', {
          name: new RegExp(tab.label, 'i'),
        })
        expect(tabElement).toHaveAttribute('id', `${tab.id}-tab`)
      })
    })
  })

  describe('Estilos', () => {
    it('deve ter nav com classe flex e centralizado', () => {
      render(<TabSwitcher {...defaultProps} />)

      const nav = screen.getByRole('navigation')
      expect(nav.className).toContain('flex')
      expect(nav.className).toContain('justify-center')
    })

    it('deve ter tablist com estilo de pílula', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist.className).toContain('rounded-full')
    })

    it('deve ter background no tablist', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist.className).toContain('bg-zinc-100')
    })

    it('deve ter estilo ativo diferente para tab tactical', () => {
      render(<TabSwitcher {...defaultProps} />)

      const activeTab = screen.getByRole('tab', { name: /área tática/i })
      expect(activeTab.className).toContain('bg-red-600')
      expect(activeTab.className).toContain('text-white')
    })

    it('deve ter estilo ativo diferente para tab remote', () => {
      render(<TabSwitcher {...defaultProps} activeTabId='remote' />)

      const activeTab = screen.getByRole('tab', { name: /área remota/i })
      expect(activeTab.className).toContain('bg-warning-600')
      expect(activeTab.className).toContain('text-white')
    })

    it('deve ter estilo inativo em tabs não selecionados', () => {
      render(<TabSwitcher {...defaultProps} />)

      const inactiveTab = screen.getByRole('tab', { name: /área remota/i })
      expect(inactiveTab.className).toContain('text-zinc-600')
    })

    it('deve ter transição nos tabs', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab.className).toContain('transition-all')
        expect(tab.className).toContain('duration-300')
      })
    })

    it('deve ter tabs com flex-1 para ocupar espaço igual', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab.className).toContain('flex-1')
      })
    })

    it('deve ter texto uppercase e tracking nos tabs', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab.className).toContain('uppercase')
        expect(tab.className).toContain('tracking-wider')
      })
    })
  })

  describe('Responsividade', () => {
    it('deve ter tamanho de fonte responsivo', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tabs = screen.getAllByRole('tab')
      tabs.forEach(tab => {
        expect(tab.className).toContain('text-xs')
        expect(tab.className).toContain('md:text-sm')
      })
    })

    it('deve ter altura fixa no tablist', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist.className).toContain('h-[50px]')
    })

    it('deve ter max-width no tablist', () => {
      render(<TabSwitcher {...defaultProps} />)

      const tablist = screen.getByRole('tablist')
      expect(tablist.className).toContain('max-w-xl')
    })
  })
})
