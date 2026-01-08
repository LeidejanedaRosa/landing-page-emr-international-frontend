import React from 'react'

import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useTouchSwipe } from '../useTouchSwipe'

describe('useTouchSwipe', () => {
  const createTouchEvent = (
    clientX: number,
    clientY: number
  ): React.TouchEvent => {
    return {
      touches: [{ clientX, clientY }],
    } as React.TouchEvent
  }

  describe('inicialização', () => {
    it('deve retornar handlers de touch', () => {
      const { result } = renderHook(() => useTouchSwipe({}))

      expect(result.current).toHaveProperty('onTouchStart')
      expect(result.current).toHaveProperty('onTouchMove')
      expect(result.current).toHaveProperty('onTouchEnd')
    })

    it('deve aceitar configurações opcionais', () => {
      const onSwipeLeft = vi.fn()
      const onSwipeRight = vi.fn()

      const { result } = renderHook(() =>
        useTouchSwipe({
          onSwipeLeft,
          onSwipeRight,
          minimumSwipeDistance: 100,
          enabled: true,
        })
      )

      expect(result.current.onTouchStart).toBeDefined()
    })
  })

  describe('detecção de swipe para esquerda', () => {
    it('deve chamar onSwipeLeft ao deslizar para esquerda', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, minimumSwipeDistance: 50 })
      )

      // Simula touch start
      result.current.onTouchStart(createTouchEvent(200, 100))

      // Simula touch move
      result.current.onTouchMove(createTouchEvent(100, 100))

      // Simula touch end
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).toHaveBeenCalledTimes(1)
    })

    it('deve respeitar minimumSwipeDistance ao deslizar para esquerda', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, minimumSwipeDistance: 100 })
      )

      result.current.onTouchStart(createTouchEvent(150, 100))
      result.current.onTouchMove(createTouchEvent(100, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      // 50px de distância, menor que o mínimo de 100px
      expect(onSwipeLeft).not.toHaveBeenCalled()
    })
  })

  describe('detecção de swipe para direita', () => {
    it('deve chamar onSwipeRight ao deslizar para direita', () => {
      const onSwipeRight = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeRight, minimumSwipeDistance: 50 })
      )

      result.current.onTouchStart(createTouchEvent(100, 100))
      result.current.onTouchMove(createTouchEvent(200, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeRight).toHaveBeenCalledTimes(1)
    })

    it('deve respeitar minimumSwipeDistance ao deslizar para direita', () => {
      const onSwipeRight = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeRight, minimumSwipeDistance: 100 })
      )

      result.current.onTouchStart(createTouchEvent(100, 100))
      result.current.onTouchMove(createTouchEvent(130, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      // 30px de distância, menor que o mínimo de 100px
      expect(onSwipeRight).not.toHaveBeenCalled()
    })
  })

  describe('filtro de movimento vertical', () => {
    it('não deve chamar onSwipeLeft se movimento vertical for maior', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, minimumSwipeDistance: 50 })
      )

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(100, 300)) // 100px horizontal, 200px vertical
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).not.toHaveBeenCalled()
    })

    it('não deve chamar onSwipeRight se movimento vertical for maior', () => {
      const onSwipeRight = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeRight, minimumSwipeDistance: 50 })
      )

      result.current.onTouchStart(createTouchEvent(100, 100))
      result.current.onTouchMove(createTouchEvent(200, 250)) // 100px horizontal, 150px vertical
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeRight).not.toHaveBeenCalled()
    })

    it('deve chamar onSwipeLeft se movimento horizontal for maior que vertical', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, minimumSwipeDistance: 50 })
      )

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 120)) // 150px horizontal, 20px vertical
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).toHaveBeenCalledTimes(1)
    })
  })

  describe('enabled flag', () => {
    it('não deve detectar swipe quando enabled é false', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, enabled: false })
      )

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).not.toHaveBeenCalled()
    })

    it('deve detectar swipe quando enabled é true', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, enabled: true })
      )

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).toHaveBeenCalledTimes(1)
    })
  })

  describe('casos extremos', () => {
    it('não deve chamar callback se touchEnd acontecer sem touchMove', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() => useTouchSwipe({ onSwipeLeft }))

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).not.toHaveBeenCalled()
    })

    it('não deve chamar callback se touchEnd acontecer sem touchStart', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() => useTouchSwipe({ onSwipeLeft }))

      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).not.toHaveBeenCalled()
    })

    it('deve resetar posições após cada swipe', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() =>
        useTouchSwipe({ onSwipeLeft, minimumSwipeDistance: 50 })
      )

      // Primeiro swipe
      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).toHaveBeenCalledTimes(1)

      // Segundo swipe - deve funcionar normalmente
      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).toHaveBeenCalledTimes(2)
    })

    it('não deve chamar callback se não houver handler definido', () => {
      const { result } = renderHook(() => useTouchSwipe({}))

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))

      // Não deve lançar erro
      expect(() => {
        result.current.onTouchEnd({} as React.TouchEvent)
      }).not.toThrow()
    })
  })

  describe('valor padrão de minimumSwipeDistance', () => {
    it('deve usar 50px como distância mínima padrão', () => {
      const onSwipeLeft = vi.fn()
      const { result } = renderHook(() => useTouchSwipe({ onSwipeLeft }))

      // 49px - abaixo do padrão
      result.current.onTouchStart(createTouchEvent(100, 100))
      result.current.onTouchMove(createTouchEvent(51, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).not.toHaveBeenCalled()

      // 51px - acima do padrão
      result.current.onTouchStart(createTouchEvent(100, 100))
      result.current.onTouchMove(createTouchEvent(49, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft).toHaveBeenCalledTimes(1)
    })
  })

  describe('atualização de dependências', () => {
    it('deve usar callbacks atualizados', () => {
      const onSwipeLeft1 = vi.fn()
      const onSwipeLeft2 = vi.fn()

      const { result, rerender } = renderHook(
        ({ callback }) => useTouchSwipe({ onSwipeLeft: callback }),
        { initialProps: { callback: onSwipeLeft1 } }
      )

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft1).toHaveBeenCalledTimes(1)
      expect(onSwipeLeft2).not.toHaveBeenCalled()

      // Atualiza callback
      rerender({ callback: onSwipeLeft2 })

      result.current.onTouchStart(createTouchEvent(200, 100))
      result.current.onTouchMove(createTouchEvent(50, 100))
      result.current.onTouchEnd({} as React.TouchEvent)

      expect(onSwipeLeft1).toHaveBeenCalledTimes(1)
      expect(onSwipeLeft2).toHaveBeenCalledTimes(1)
    })
  })
})
