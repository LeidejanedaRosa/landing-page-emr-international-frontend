import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { SectionHeader } from '../SectionHeader'

describe('SectionHeader', () => {
  const defaultProps = {
    titleId: 'test-title-id',
    subtitleId: 'test-subtitle-id',
  }

  describe('Renderização', () => {
    it('deve renderizar o componente header', () => {
      render(<SectionHeader {...defaultProps} />)

      const header = document.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    it('deve ter classe text-center no header', () => {
      render(<SectionHeader {...defaultProps} />)

      const header = document.querySelector('header')
      expect(header).toHaveClass('text-center')
    })
  })

  describe('Subtítulo', () => {
    it('deve renderizar o subtítulo com texto correto', () => {
      render(<SectionHeader {...defaultProps} />)

      expect(screen.getByText('A Realidade dos Números')).toBeInTheDocument()
    })

    it('deve usar o ID passado via props', () => {
      render(<SectionHeader {...defaultProps} />)

      const subtitle = screen.getByText('A Realidade dos Números')
      expect(subtitle).toHaveAttribute('id', 'test-subtitle-id')
    })

    it('deve ter estilo uppercase', () => {
      render(<SectionHeader {...defaultProps} />)

      const subtitle = screen.getByText('A Realidade dos Números')
      expect(subtitle.className).toContain('uppercase')
    })

    it('deve ter cor vermelha', () => {
      render(<SectionHeader {...defaultProps} />)

      const subtitle = screen.getByText('A Realidade dos Números')
      expect(subtitle.className).toContain('text-red-600')
    })
  })

  describe('Título Principal', () => {
    it('deve renderizar título com nível h2', () => {
      render(<SectionHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
    })

    it('deve usar o ID passado via props', () => {
      render(<SectionHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveAttribute('id', 'test-title-id')
    })

    it('deve conter texto "VOCÊ ESTÁ PREPARADO PARA"', () => {
      render(<SectionHeader {...defaultProps} />)

      expect(screen.getByText(/você está preparado para/i)).toBeInTheDocument()
    })

    it('deve conter texto destacado "O PIOR CENÁRIO?"', () => {
      render(<SectionHeader {...defaultProps} />)

      expect(screen.getByText(/o pior cenário\?/i)).toBeInTheDocument()
    })

    it('deve ter gradiente no texto destacado', () => {
      render(<SectionHeader {...defaultProps} />)

      const highlightedText = screen.getByText(/o pior cenário\?/i)
      expect(highlightedText.className).toContain('bg-gradient-to-r')
      expect(highlightedText.className).toContain('bg-clip-text')
      expect(highlightedText.className).toContain('text-transparent')
    })
  })

  describe('Descrição', () => {
    it('deve renderizar parágrafo de descrição', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e emergências remotas/i
      )
      expect(description).toBeInTheDocument()
      expect(description.tagName).toBe('P')
    })

    it('deve mencionar APH Tático e Wilderness Medicine', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(/aph tático/i)
      expect(description).toBeInTheDocument()
      expect(description.textContent).toContain('Wilderness Medicine')
    })

    it('deve ter max-width para legibilidade', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e emergências remotas/i
      )
      expect(description.className).toContain('max-w-2xl')
    })

    it('deve ter cor de texto secundária', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e emergências remotas/i
      )
      expect(description.className).toContain('text-zinc-600')
    })

    it('deve ter tamanho de texto responsivo', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e emergências remotas/i
      )
      expect(description.className).toContain('text-sm')
      expect(description.className).toContain('md:text-base')
    })
  })

  describe('Estilos Gerais', () => {
    it('deve ter margem inferior no header', () => {
      render(<SectionHeader {...defaultProps} />)

      const header = document.querySelector('header')
      expect(header?.className).toContain('mb-4')
    })

    it('deve ter fonte extrabold no título', () => {
      render(<SectionHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading.className).toContain('font-extrabold')
    })

    it('deve ter fonte bold no subtítulo', () => {
      render(<SectionHeader {...defaultProps} />)

      const subtitle = screen.getByText('A Realidade dos Números')
      expect(subtitle.className).toContain('font-bold')
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter IDs únicos para aria-labelledby/describedby', () => {
      render(<SectionHeader titleId='unique-title' subtitleId='unique-sub' />)

      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByText('A Realidade dos Números')

      expect(title).toHaveAttribute('id', 'unique-title')
      expect(subtitle).toHaveAttribute('id', 'unique-sub')
    })

    it('deve ter hierarquia correta de elementos', () => {
      render(<SectionHeader {...defaultProps} />)

      const header = document.querySelector('header')
      const children = Array.from(header?.children || [])

      // Primeiro deve ser o subtítulo (p), depois h2, depois descrição (p)
      expect(children[0].tagName).toBe('P')
      expect(children[1].tagName).toBe('H2')
      expect(children[2].tagName).toBe('P')
    })
  })
})
