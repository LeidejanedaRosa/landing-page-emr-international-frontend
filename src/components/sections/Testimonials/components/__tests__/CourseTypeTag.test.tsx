import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../../test/test-utils'
import { CourseTypeTag } from '../CourseTypeTag'

describe('CourseTypeTag', () => {
  describe('Renderização', () => {
    it('deve renderizar tag para curso tático', () => {
      render(<CourseTypeTag courseType='tatico' />)

      expect(screen.getByText('Tático')).toBeInTheDocument()
    })

    it('deve renderizar tag para curso remoto', () => {
      render(<CourseTypeTag courseType='remoto' />)

      expect(screen.getByText('Remoto')).toBeInTheDocument()
    })

    it('deve usar elemento span', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.tagName).toBe('SPAN')
    })
  })

  describe('Estilos por Tipo', () => {
    describe('Tático', () => {
      it('deve ter fundo vermelho', () => {
        render(<CourseTypeTag courseType='tatico' />)

        const tag = screen.getByText('Tático')
        expect(tag.className).toContain('bg-red-600')
      })

      it('deve ter texto branco', () => {
        render(<CourseTypeTag courseType='tatico' />)

        const tag = screen.getByText('Tático')
        expect(tag.className).toContain('text-white')
      })
    })

    describe('Remoto', () => {
      it('deve ter fundo amarelo', () => {
        render(<CourseTypeTag courseType='remoto' />)

        const tag = screen.getByText('Remoto')
        expect(tag.className).toContain('bg-yellow-500')
      })

      it('deve ter texto preto', () => {
        render(<CourseTypeTag courseType='remoto' />)

        const tag = screen.getByText('Remoto')
        expect(tag.className).toContain('text-black')
      })
    })
  })

  describe('Estilos Comuns', () => {
    it('deve ter display inline-block', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('inline-block')
    })

    it('deve ter padding horizontal e vertical', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('px-3')
      expect(tag.className).toContain('py-1')
    })

    it('deve ter texto em uppercase', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('uppercase')
    })

    it('deve ter texto pequeno (xs)', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('text-xs')
    })

    it('deve ter font-weight bold', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('font-bold')
    })

    it('deve ter tracking wider para espaçamento de letras', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('tracking-wider')
    })

    it('deve ter bordas arredondadas', () => {
      render(<CourseTypeTag courseType='tatico' />)

      const tag = screen.getByText('Tático')
      expect(tag.className).toContain('rounded')
    })
  })

  describe('Memoização', () => {
    it('deve ter displayName definido', () => {
      expect(CourseTypeTag.displayName).toBe('CourseTypeTag')
    })
  })
})
