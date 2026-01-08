import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSlideTransition } from '../useSlideTransition'

describe('useSlideTransition', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  describe('inicialização', () => {
    it('deve inicializar com valores padrão', () => {
      const { result } = renderHook(() => useSlideTransition(0))

      expect(result.current.previousSlide).toBeNull()
      expect(result.current.isTransitioning).toBe(true)
      expect(result.current.shouldRenderSlide(0)).toBe(true)
    })

    it('deve definir isTransitioning como true na montagem', () => {
      const { result } = renderHook(() => useSlideTransition(0))

      expect(result.current.isTransitioning).toBe(true)
    })
  })

  describe('mudança de slide', () => {
    it('deve atualizar previousSlide quando currentSlide muda', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      expect(result.current.previousSlide).toBeNull()

      rerender({ slide: 1 })

      expect(result.current.previousSlide).toBe(0)
    })

    it('deve definir isTransitioning como true durante transição', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })

      expect(result.current.isTransitioning).toBe(true)
    })

    it('deve limpar previousSlide após duração da transição', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.previousSlide).toBe(0)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.previousSlide).toBeNull()
      expect(result.current.isTransitioning).toBe(false)
    })

    it('deve resetar isTransitioning após duração da transição', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 2 })
      expect(result.current.isTransitioning).toBe(true)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.isTransitioning).toBe(false)
    })
  })

  describe('múltiplas transições rápidas', () => {
    it('deve cancelar timeout anterior ao iniciar nova transição', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.previousSlide).toBe(0)

      await act(async () => {
        vi.advanceTimersByTime(200)
      })

      rerender({ slide: 2 })
      expect(result.current.previousSlide).toBe(1)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.previousSlide).toBeNull()
      expect(result.current.isTransitioning).toBe(false)
    })

    it('deve manter isTransitioning true durante múltiplas mudanças', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.isTransitioning).toBe(true)

      act(() => {
        vi.advanceTimersByTime(200)
      })

      rerender({ slide: 2 })
      expect(result.current.isTransitioning).toBe(true)
    })
  })

  describe('shouldRenderSlide', () => {
    it('deve retornar true para o slide atual', () => {
      const { result } = renderHook(() => useSlideTransition(2))

      expect(result.current.shouldRenderSlide(2)).toBe(true)
    })

    it('deve retornar true para o slide anterior durante transição', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })

      expect(result.current.shouldRenderSlide(0)).toBe(true)
      expect(result.current.shouldRenderSlide(1)).toBe(true)
    })

    it('deve retornar false para slides não relacionados', () => {
      const { result } = renderHook(() => useSlideTransition(2))

      expect(result.current.shouldRenderSlide(0)).toBe(false)
      expect(result.current.shouldRenderSlide(1)).toBe(false)
      expect(result.current.shouldRenderSlide(3)).toBe(false)
    })

    it('deve retornar false para slide anterior após transição', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.shouldRenderSlide(0)).toBe(true)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.shouldRenderSlide(0)).toBe(false)
    })
  })

  describe('getSlideClassName', () => {
    const baseClass = 'absolute inset-0 transition-opacity duration-500'

    it('deve retornar classe de slide ativo para o slide atual', () => {
      const { result } = renderHook(() => useSlideTransition(1))

      const className = result.current.getSlideClassName(1)

      expect(className).toBe(`${baseClass} opacity-100 z-10`)
    })

    it('deve retornar classe de slide inativo para o slide anterior durante transição', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })

      const className = result.current.getSlideClassName(0)

      expect(className).toBe(`${baseClass} opacity-0 z-0`)
    })

    it('deve retornar classe de slide inativo para slides não relacionados', () => {
      const { result } = renderHook(() => useSlideTransition(2))

      const className = result.current.getSlideClassName(5)

      expect(className).toBe(`${baseClass} opacity-0 z-0`)
    })

    it('deve retornar classe de slide inativo para slide anterior após transição', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      const className = result.current.getSlideClassName(0)

      expect(className).toBe(`${baseClass} opacity-0 z-0`)
    })

    it('deve manter z-index correto durante toda a transição', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })

      expect(result.current.getSlideClassName(1)).toContain('z-10')
      expect(result.current.getSlideClassName(0)).toContain('z-0')
    })
  })

  describe('limpeza', () => {
    it('deve limpar timeout ao desmontar', () => {
      const { unmount } = renderHook(() => useSlideTransition(0))

      unmount()

      expect(vi.getTimerCount()).toBe(0)
    })

    it('deve limpar timeout ao mudar de slide e depois desmontar', () => {
      const { result, rerender, unmount } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.isTransitioning).toBe(true)

      unmount()

      expect(vi.getTimerCount()).toBe(0)
    })

    it('deve limpar timeout anterior ao iniciar nova transição', () => {
      const { rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      const timerCount1 = vi.getTimerCount()

      rerender({ slide: 2 })
      const timerCount2 = vi.getTimerCount()

      expect(timerCount1).toBe(timerCount2)
    })
  })

  describe('cenários de uso real', () => {
    it('deve gerenciar transição completa de slide 0 para slide 1', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      expect(result.current.shouldRenderSlide(0)).toBe(true)
      expect(result.current.getSlideClassName(0)).toContain('opacity-100')

      rerender({ slide: 1 })

      expect(result.current.shouldRenderSlide(0)).toBe(true)
      expect(result.current.shouldRenderSlide(1)).toBe(true)
      expect(result.current.getSlideClassName(0)).toContain('opacity-0')
      expect(result.current.getSlideClassName(1)).toContain('opacity-100')

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.shouldRenderSlide(0)).toBe(false)
      expect(result.current.shouldRenderSlide(1)).toBe(true)
      expect(result.current.isTransitioning).toBe(false)
    })

    it('deve gerenciar transições encadeadas (0 -> 1 -> 2)', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.previousSlide).toBe(0)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.previousSlide).toBeNull()

      rerender({ slide: 2 })
      expect(result.current.previousSlide).toBe(1)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.previousSlide).toBeNull()
      expect(result.current.shouldRenderSlide(2)).toBe(true)
      expect(result.current.shouldRenderSlide(1)).toBe(false)
      expect(result.current.shouldRenderSlide(0)).toBe(false)
    })

    it('deve gerenciar transição para frente e para trás rapidamente', async () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 0 } }
      )

      rerender({ slide: 1 })
      expect(result.current.previousSlide).toBe(0)

      act(() => {
        vi.advanceTimersByTime(200)
      })

      rerender({ slide: 0 })
      expect(result.current.previousSlide).toBe(1)

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(result.current.previousSlide).toBeNull()
      expect(result.current.isTransitioning).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('deve lidar com currentSlide como 0', () => {
      const { result } = renderHook(() => useSlideTransition(0))

      expect(result.current.shouldRenderSlide(0)).toBe(true)
      expect(result.current.getSlideClassName(0)).toContain('opacity-100')
    })

    it('deve lidar com valores altos de slide', () => {
      const { result } = renderHook(() => useSlideTransition(999))

      expect(result.current.shouldRenderSlide(999)).toBe(true)
      expect(result.current.getSlideClassName(999)).toContain('opacity-100')
    })

    it('não deve mudar previousSlide quando currentSlide permanece o mesmo', () => {
      const { result, rerender } = renderHook(
        ({ slide }) => useSlideTransition(slide),
        { initialProps: { slide: 2 } }
      )

      const initialPreviousSlide = result.current.previousSlide

      rerender({ slide: 2 })
      rerender({ slide: 2 })

      expect(result.current.previousSlide).toBe(initialPreviousSlide)
    })
  })
})
