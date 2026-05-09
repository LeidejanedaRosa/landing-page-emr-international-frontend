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

    it('deve ter font-capture-it no texto destacado', () => {
      render(<SectionHeader {...defaultProps} />)

      const highlightedText = screen.getByText(/o pior cenário\?/i)
      expect(highlightedText.className).toContain('font-capture-it')
    })
  })

  describe('Descrição', () => {
    it('deve renderizar parágrafo de descrição', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e em áreas remotas/i
      )
      expect(description).toBeInTheDocument()
      expect(description.tagName).toBe('P')
    })

    it('deve mencionar necessidade de sobrevivência', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e em áreas remotas/i
      )
      expect(description).toBeInTheDocument()
      expect(description.textContent).toContain('necessidade de sobrevivência')
    })

    it('deve ter max-width para legibilidade', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e em áreas remotas/i
      )
      expect(description.className).toContain('max-w-4xl')
    })

    it('deve ter cor de texto secundária', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e em áreas remotas/i
      )
      expect(description.className).toContain('text-zinc-600')
    })

    it('deve ter tamanho de texto responsivo', () => {
      render(<SectionHeader {...defaultProps} />)

      const description = screen.getByText(
        /em operações táticas e em áreas remotas/i
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

    it('deve ter tamanho de fonte responsivo e tracking-tight no título', () => {
      render(<SectionHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading.className).toContain('text-3xl')
      expect(heading.className).toContain('md:text-4xl')
      expect(heading.className).toContain('lg:text-5xl')
      expect(heading.className).toContain('tracking-tight')
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter IDs únicos para aria-labelledby/describedby', () => {
      render(<SectionHeader titleId='unique-title' subtitleId='unique-sub' />)

      const title = screen.getByRole('heading', { level: 2 })
      const description = screen.getByText(
        /em operações táticas e em áreas remotas/i
      )

      expect(title).toHaveAttribute('id', 'unique-title')
      expect(description).toHaveAttribute('id', 'unique-sub')
    })

    it('deve ter hierarquia correta de elementos', () => {
      render(<SectionHeader {...defaultProps} />)

      const header = document.querySelector('header')
      const children = Array.from(header?.children || [])

      // eyebrow span → h2 → parágrafo de descrição
      expect(children[0].tagName).toBe('SPAN')
      expect(children[1].tagName).toBe('H2')
      expect(children[2].tagName).toBe('P')
    })
  })
})
