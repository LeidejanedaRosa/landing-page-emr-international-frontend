import { describe, expect, it, vi } from 'vitest'

import { whyItMattersData } from '../../../../data/whyItMattersData'
import { fireEvent, render, screen } from '../../../../test/test-utils'
import WhyItMattersSection from '../index'

vi.mock('../../../../hooks/useScrollTo', () => ({
  useScrollTo: () => ({
    scrollTo: vi.fn(),
  }),
}))

describe('WhyItMattersSection', () => {
  describe('Estrutura Semântica', () => {
    it('deve renderizar a seção com data-section correto', () => {
      render(<WhyItMattersSection />)

      const section = document.querySelector('[data-section="why-it-matters"]')
      expect(section).toBeInTheDocument()
    })

    it('deve ter aria-labelledby apontando para o título', () => {
      render(<WhyItMattersSection />)

      const section = document.querySelector('section')
      const labelledById = section?.getAttribute('aria-labelledby')

      expect(labelledById).toBeTruthy()
      expect(labelledById).toContain('why-title')
    })

    it('deve ter aria-describedby apontando para o subtítulo', () => {
      render(<WhyItMattersSection />)

      const section = document.querySelector('section')
      const describedById = section?.getAttribute('aria-describedby')

      expect(describedById).toBeTruthy()
      expect(describedById).toContain('why-subtitle')
    })

    it('deve ter ID único na seção', () => {
      render(<WhyItMattersSection />)

      const section = document.querySelector('section')
      expect(section?.id).toContain('why-it-matters')
    })
  })

  describe('Cabeçalho', () => {
    it('deve renderizar o subtítulo com texto correto', () => {
      render(<WhyItMattersSection />)

      expect(screen.getByText('A Realidade dos Números')).toBeInTheDocument()
    })

    it('deve renderizar o título principal', () => {
      render(<WhyItMattersSection />)

      expect(screen.getByText(/você está preparado para/i)).toBeInTheDocument()
      expect(screen.getByText(/o pior cenário\?/i)).toBeInTheDocument()
    })

    it('deve renderizar a descrição explicativa', () => {
      render(<WhyItMattersSection />)

      expect(
        screen.getByText(/em operações táticas e emergências remotas/i)
      ).toBeInTheDocument()
    })

    it('deve ter header com estrutura correta', () => {
      render(<WhyItMattersSection />)

      const header = document.querySelector('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('text-center')
    })
  })

  describe('TabSwitcher', () => {
    it('deve renderizar navegação com aria-label', () => {
      render(<WhyItMattersSection />)

      const nav = screen.getByRole('navigation', {
        name: 'Selecionar tipo de ambiente de emergência',
      })
      expect(nav).toBeInTheDocument()
    })

    it('deve renderizar tablist com aria-label', () => {
      render(<WhyItMattersSection />)

      const tablist = screen.getByRole('tablist', {
        name: 'Categorias de estatísticas de emergência',
      })
      expect(tablist).toBeInTheDocument()
    })

    it('deve renderizar todos os tabs', () => {
      render(<WhyItMattersSection />)

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(whyItMattersData.length)
    })

    it('deve ter o primeiro tab selecionado por padrão', () => {
      render(<WhyItMattersSection />)

      const tacticalTab = screen.getByRole('tab', { name: /área tática/i })
      expect(tacticalTab).toHaveAttribute('aria-selected', 'true')
    })

    it('deve alternar tabs ao clicar', () => {
      render(<WhyItMattersSection />)

      const remoteTab = screen.getByRole('tab', { name: /área remota/i })
      fireEvent.click(remoteTab)

      expect(remoteTab).toHaveAttribute('aria-selected', 'true')

      const tacticalTab = screen.getByRole('tab', { name: /área tática/i })
      expect(tacticalTab).toHaveAttribute('aria-selected', 'false')
    })

    it('deve ter aria-controls apontando para o painel correto', () => {
      render(<WhyItMattersSection />)

      const tacticalTab = screen.getByRole('tab', { name: /área tática/i })
      expect(tacticalTab).toHaveAttribute('aria-controls', 'tactical-panel')
    })
  })

  describe('TabPanel', () => {
    it('deve renderizar tabpanel com role correto', () => {
      render(<WhyItMattersSection />)

      const panel = document.querySelector('[role="tabpanel"]')
      expect(panel).toBeInTheDocument()
    })

    it('deve ter id do painel correspondente ao tab ativo', () => {
      render(<WhyItMattersSection />)

      const panel = document.querySelector('[role="tabpanel"]')
      expect(panel).toHaveAttribute('id', 'tactical-panel')
    })

    it('deve ter aria-labelledby apontando para o tab', () => {
      render(<WhyItMattersSection />)

      const panel = document.querySelector('[role="tabpanel"]')
      expect(panel).toHaveAttribute('aria-labelledby', 'tactical-tab')
    })

    it('deve atualizar painel ao trocar de tab', () => {
      render(<WhyItMattersSection />)

      const remoteTab = screen.getByRole('tab', { name: /área remota/i })
      fireEvent.click(remoteTab)

      const panel = document.querySelector('[role="tabpanel"]')
      expect(panel).toHaveAttribute('id', 'remote-panel')
      expect(panel).toHaveAttribute('aria-labelledby', 'remote-tab')
    })
  })

  describe('StatisticsGrid', () => {
    it('deve renderizar lista de estatísticas', () => {
      render(<WhyItMattersSection />)

      const list = document.querySelector('[role="list"]')
      expect(list).toBeInTheDocument()
    })

    it('deve renderizar todos os itens da lista', () => {
      render(<WhyItMattersSection />)

      const items = document.querySelectorAll('[role="listitem"]')
      expect(items.length).toBe(whyItMattersData[0].statistics.length)
    })

    it('deve ter descrição acessível para o grid', () => {
      render(<WhyItMattersSection />)

      const description = screen.getByText(
        /lista de \d+ estatísticas críticas/i
      )
      expect(description).toBeInTheDocument()
    })

    it('deve ter aria-describedby no grid apontando para descrição', () => {
      render(<WhyItMattersSection />)

      const list = document.querySelector('[role="list"]')
      const describedById = list?.getAttribute('aria-describedby')

      expect(describedById).toBeTruthy()
      expect(describedById).toContain('grid-description')
    })

    it('deve ter aria-posinset e aria-setsize corretos', () => {
      render(<WhyItMattersSection />)

      const items = document.querySelectorAll('[role="listitem"]')
      const totalItems = whyItMattersData[0].statistics.length

      items.forEach((item, index) => {
        expect(item).toHaveAttribute('aria-posinset', String(index + 1))
        expect(item).toHaveAttribute('aria-setsize', String(totalItems))
      })
    })
  })

  describe('StatisticCards', () => {
    it('deve renderizar cards como article', () => {
      render(<WhyItMattersSection />)

      const articles = document.querySelectorAll('article')
      expect(articles.length).toBeGreaterThan(0)
    })

    it('deve exibir o valor da estatística destacada', () => {
      render(<WhyItMattersSection />)

      const highlightStat = whyItMattersData[0].statistics[0]
      expect(screen.getByText(highlightStat.value)).toBeInTheDocument()
    })

    it('deve exibir o label da estatística destacada', () => {
      render(<WhyItMattersSection />)

      const highlightStat = whyItMattersData[0].statistics[0]
      expect(screen.getByText(highlightStat.label)).toBeInTheDocument()
    })

    it('deve exibir subtext quando presente', () => {
      render(<WhyItMattersSection />)

      const statWithSubtext = whyItMattersData[0].statistics.find(
        s => s.subtext
      )
      if (statWithSubtext?.subtext) {
        expect(screen.getByText(statWithSubtext.subtext)).toBeInTheDocument()
      }
    })

    it('deve exibir badge "Fator Crítico" no card destacado', () => {
      render(<WhyItMattersSection />)

      expect(screen.getByText('Fator Crítico')).toBeInTheDocument()
    })

    it('deve ter ícones com aria-hidden', () => {
      render(<WhyItMattersSection />)

      const icons = document.querySelectorAll(
        'article [aria-hidden="true"] svg, article svg[aria-hidden="true"]'
      )
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe('CallToAction', () => {
    it('deve renderizar footer com CTA', () => {
      render(<WhyItMattersSection />)

      const footer = document.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('deve renderizar mensagem motivacional', () => {
      render(<WhyItMattersSection />)

      expect(
        screen.getByText(/não faça parte das estatísticas/i)
      ).toBeInTheDocument()
    })

    it('deve renderizar botão de ação', () => {
      render(<WhyItMattersSection />)

      const button = screen.getByRole('button', {
        name: /navegar para seção de treinamentos/i,
      })
      expect(button).toBeInTheDocument()
    })

    it('deve ter texto correto no botão', () => {
      render(<WhyItMattersSection />)

      expect(screen.getByText('Conhecer Treinamentos')).toBeInTheDocument()
    })
  })

  describe('Alternância de Conteúdo', () => {
    it('deve exibir estatísticas táticas por padrão', () => {
      render(<WhyItMattersSection />)

      const tacticalStat = whyItMattersData[0].statistics[0]
      expect(screen.getByText(tacticalStat.value)).toBeInTheDocument()
    })

    it('deve exibir estatísticas remotas ao trocar tab', () => {
      render(<WhyItMattersSection />)

      const remoteTab = screen.getByRole('tab', { name: /área remota/i })
      fireEvent.click(remoteTab)

      const remoteStat = whyItMattersData[1].statistics[0]
      expect(screen.getByText(remoteStat.value)).toBeInTheDocument()
    })

    it('deve ocultar estatísticas táticas ao trocar para remota', () => {
      render(<WhyItMattersSection />)

      const tacticalStat = whyItMattersData[0].statistics[0]
      const tacticalValue = tacticalStat.value

      const remoteTab = screen.getByRole('tab', { name: /área remota/i })
      fireEvent.click(remoteTab)

      // Se o valor for diferente entre as tabs
      const remoteStat = whyItMattersData[1].statistics[0]
      if (tacticalValue !== remoteStat.value) {
        expect(screen.queryByText(tacticalValue)).not.toBeInTheDocument()
      }
    })
  })

  describe('Estilos e Layout', () => {
    it('deve ter gradiente de fundo na seção', () => {
      render(<WhyItMattersSection />)

      const section = document.querySelector('section')
      expect(section?.className).toContain('bg-gradient-to-b')
    })

    it('deve ter padding responsivo', () => {
      render(<WhyItMattersSection />)

      const section = document.querySelector('section')
      expect(section?.className).toContain('py-8')
      expect(section?.className).toContain('md:py-6')
    })

    it('deve ter elementos decorativos com aria-hidden', () => {
      render(<WhyItMattersSection />)

      const decorativeElements = document.querySelectorAll(
        '.blur-\\[150px\\][aria-hidden="true"]'
      )
      expect(decorativeElements.length).toBe(2)
    })

    it('deve ter container centralizado com max-width', () => {
      render(<WhyItMattersSection />)

      const container = document.querySelector('.max-w-screen-2xl')
      expect(container).toBeInTheDocument()
      expect(container?.className).toContain('mx-auto')
    })
  })

  describe('Acessibilidade Geral', () => {
    it('não deve ter elementos focáveis com outline desabilitado sem alternativa', () => {
      render(<WhyItMattersSection />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Verifica se tem classe de focus ring
        if (button.className.includes('focus:outline-none')) {
          expect(button.className).toMatch(/focus:ring|focus-visible:ring/)
        }
      })
    })

    it('deve ter hierarquia de headings correta', () => {
      render(<WhyItMattersSection />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()
    })

    it('deve ter todos os IDs únicos', () => {
      render(<WhyItMattersSection />)

      const elementsWithId = document.querySelectorAll('[id]')
      const ids = Array.from(elementsWithId).map(el => el.id)
      const uniqueIds = new Set(ids)

      expect(uniqueIds.size).toBe(ids.length)
    })
  })
})
