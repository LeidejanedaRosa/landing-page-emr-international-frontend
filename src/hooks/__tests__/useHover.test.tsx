import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useHover } from '../useHover'

describe('useHover', () => {
  describe('inicialização', () => {
    it('deve retornar hoveredItem e createHoverHandlers', () => {
      const { result } = renderHook(() => useHover())

      expect(result.current).toHaveProperty('hoveredItem')
      expect(result.current).toHaveProperty('createHoverHandlers')
      expect(typeof result.current.createHoverHandlers).toBe('function')
    })

    it('deve inicializar hoveredItem como null', () => {
      const { result } = renderHook(() => useHover())

      expect(result.current.hoveredItem).toBe(null)
    })

    it('deve funcionar com tipos genéricos', () => {
      const { result } = renderHook(() =>
        useHover<'item1' | 'item2' | 'item3'>()
      )

      expect(result.current.hoveredItem).toBe(null)
    })
  })

  describe('createHoverHandlers', () => {
    it('deve criar handlers com onMouseEnter e onMouseLeave', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('item-1')

      expect(handlers).toHaveProperty('onMouseEnter')
      expect(handlers).toHaveProperty('onMouseLeave')
      expect(handlers).toHaveProperty('onFocus')
      expect(handlers).toHaveProperty('onBlur')
    })

    it('deve definir hoveredItem ao chamar onMouseEnter', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('item-1')

      act(() => {
        handlers.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('item-1')
    })

    it('deve limpar hoveredItem ao chamar onMouseLeave', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('item-1')

      act(() => {
        handlers.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('item-1')

      act(() => {
        handlers.onMouseLeave()
      })

      expect(result.current.hoveredItem).toBe(null)
    })

    it('deve definir hoveredItem ao chamar onFocus', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('item-2')

      act(() => {
        handlers.onFocus()
      })

      expect(result.current.hoveredItem).toBe('item-2')
    })

    it('deve limpar hoveredItem ao chamar onBlur', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('item-2')

      act(() => {
        handlers.onFocus()
      })

      expect(result.current.hoveredItem).toBe('item-2')

      act(() => {
        handlers.onBlur()
      })

      expect(result.current.hoveredItem).toBe(null)
    })
  })

  describe('múltiplos itens', () => {
    it('deve alternar entre diferentes itens', () => {
      const { result } = renderHook(() => useHover())

      const handlers1 = result.current.createHoverHandlers('item-1')
      const handlers2 = result.current.createHoverHandlers('item-2')

      act(() => {
        handlers1.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('item-1')

      act(() => {
        handlers2.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('item-2')
    })

    it('deve manter estabilidade dos handlers', () => {
      const { result } = renderHook(() => useHover())

      const handlers1 = result.current.createHoverHandlers('item-1')
      const handlers1Again = result.current.createHoverHandlers('item-1')

      expect(handlers1).not.toBe(handlers1Again)
    })
  })

  describe('acessibilidade - foco e hover', () => {
    it('deve suportar hover e foco simultaneamente', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('item-1')

      act(() => {
        handlers.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('item-1')

      act(() => {
        handlers.onFocus()
      })

      expect(result.current.hoveredItem).toBe('item-1')

      act(() => {
        handlers.onBlur()
      })

      expect(result.current.hoveredItem).toBe(null)
    })

    it('deve permitir transição de mouse para teclado', () => {
      const { result } = renderHook(() => useHover())

      const handlers1 = result.current.createHoverHandlers('item-1')
      const handlers2 = result.current.createHoverHandlers('item-2')

      act(() => {
        handlers1.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('item-1')

      act(() => {
        handlers1.onMouseLeave()
      })

      expect(result.current.hoveredItem).toBe(null)

      act(() => {
        handlers2.onFocus()
      })

      expect(result.current.hoveredItem).toBe('item-2')
    })
  })

  describe('tipos customizados', () => {
    it('deve funcionar com strings customizadas', () => {
      type CardId = 'card-a' | 'card-b' | 'card-c'
      const { result } = renderHook(() => useHover<CardId>())

      const handlers = result.current.createHoverHandlers('card-a')

      act(() => {
        handlers.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('card-a')
    })

    it('deve funcionar com IDs numéricos como strings', () => {
      const { result } = renderHook(() => useHover())

      const handlers = result.current.createHoverHandlers('123')

      act(() => {
        handlers.onMouseEnter()
      })

      expect(result.current.hoveredItem).toBe('123')
    })
  })
})
