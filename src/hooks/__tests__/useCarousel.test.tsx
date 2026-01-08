import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useCarousel } from '../useCarousel'

describe('useCarousel', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  describe('inicialização', () => {
    it('deve inicializar com valores padrão', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      expect(result.current.currentIndex).toBe(0)
      expect(result.current.isAutoPlaying).toBe(false)
      expect(result.current.isTransitioning).toBe(false)
      expect(result.current.maxIndex).toBe(4)
      expect(result.current.hasMultiplePages).toBe(true)
    })

    it('deve inicializar com infiniteLoop ativo', () => {
      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          infiniteLoop: true,
          enableAutoPlay: false,
        })
      )

      expect(result.current.currentIndex).toBe(1)
    })

    it('deve calcular maxIndex corretamente com itemsVisible', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 10, itemsVisible: 3, enableAutoPlay: false })
      )

      expect(result.current.maxIndex).toBe(7) // 10 - 3 = 7
    })

    it('deve definir hasMultiplePages como false quando totalItems <= itemsVisible', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 3, itemsVisible: 3, enableAutoPlay: false })
      )

      expect(result.current.hasMultiplePages).toBe(false)
    })
  })

  describe('navegação básica', () => {
    it('deve avançar para o próximo slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentIndex).toBe(1)
    })

    it('deve voltar para o slide anterior', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      act(() => {
        result.current.nextSlide()
        result.current.nextSlide()
      })

      expect(result.current.currentIndex).toBe(2)

      act(() => {
        result.current.previousSlide()
      })

      expect(result.current.currentIndex).toBe(1)
    })

    it('deve ir para um slide específico', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      act(() => {
        result.current.goToSlide(3)
      })

      expect(result.current.currentIndex).toBe(3)
    })

    it('deve fazer loop ao avançar no último slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      act(() => {
        result.current.goToSlide(4)
        result.current.nextSlide()
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it('deve fazer loop ao voltar no primeiro slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      act(() => {
        result.current.previousSlide()
      })

      expect(result.current.currentIndex).toBe(4)
    })
  })

  describe('navegação com infiniteLoop', () => {
    it('deve incrementar índice além do limite com infiniteLoop', () => {
      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          infiniteLoop: true,
          enableAutoPlay: false,
        })
      )

      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentIndex).toBe(2)
      expect(result.current.isTransitioning).toBe(true)
    })

    it('deve resetar índice após transição no infiniteLoop', async () => {
      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          infiniteLoop: true,
          enableAutoPlay: false,
        })
      )

      act(() => {
        // Vai para o último clone (totalItems + 1)
        result.current.goToSlide(4)
        result.current.nextSlide()
      })

      expect(result.current.currentIndex).toBe(6) // 5 + 1

      await act(async () => {
        vi.advanceTimersByTime(500)
        await vi.runAllTimersAsync()
      })

      expect(result.current.currentIndex).toBe(1)
      expect(result.current.isTransitioning).toBe(false)
    })
  })

  describe('auto-play', () => {
    it('deve iniciar auto-play quando enableAutoPlay é true', () => {
      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          enableAutoPlay: true,
          autoPlayDelay: 1000,
        })
      )

      expect(result.current.isAutoPlaying).toBe(true)
      expect(result.current.currentIndex).toBe(0)

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(result.current.currentIndex).toBe(1)
    })

    it('deve pausar auto-play', () => {
      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          enableAutoPlay: true,
          autoPlayDelay: 1000,
        })
      )

      act(() => {
        result.current.pauseAutoPlay()
      })

      expect(result.current.isAutoPlaying).toBe(false)

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it('deve retomar auto-play', () => {
      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          enableAutoPlay: true,
          autoPlayDelay: 1000,
        })
      )

      act(() => {
        result.current.pauseAutoPlay()
      })

      expect(result.current.isAutoPlaying).toBe(false)

      act(() => {
        result.current.resumeAutoPlay()
      })

      expect(result.current.isAutoPlaying).toBe(true)
    })

    it('não deve iniciar auto-play quando enableAutoPlay é false', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      expect(result.current.isAutoPlaying).toBe(false)

      act(() => {
        vi.advanceTimersByTime(10000)
      })

      expect(result.current.currentIndex).toBe(0)
    })
  })

  describe('acessibilidade - prefers-reduced-motion', () => {
    it('deve pausar auto-play quando prefersReducedMotion é true', () => {
      const matchMediaMock = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      vi.stubGlobal('matchMedia', matchMediaMock)

      const { result } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          enableAutoPlay: true,
          autoPlayDelay: 1000,
        })
      )

      expect(result.current.isAutoPlaying).toBe(false)

      vi.unstubAllGlobals()
    })

    it('não deve retomar auto-play se prefersReducedMotion está ativo', () => {
      const matchMediaMock = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      vi.stubGlobal('matchMedia', matchMediaMock)

      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: true })
      )

      act(() => {
        result.current.resumeAutoPlay()
      })

      expect(result.current.isAutoPlaying).toBe(false)

      vi.unstubAllGlobals()
    })
  })

  describe('validações de limites', () => {
    it('não deve permitir goToSlide com índice negativo', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      const initialIndex = result.current.currentIndex

      act(() => {
        result.current.goToSlide(-1)
      })

      expect(result.current.currentIndex).toBe(initialIndex)
    })

    it('não deve permitir goToSlide além do maxIndex', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 5, enableAutoPlay: false })
      )

      act(() => {
        result.current.goToSlide(10)
      })

      expect(result.current.currentIndex).toBe(0)
    })

    it('não deve navegar quando hasMultiplePages é false', () => {
      const { result } = renderHook(() =>
        useCarousel({ totalItems: 1, enableAutoPlay: false })
      )

      expect(result.current.hasMultiplePages).toBe(false)

      act(() => {
        result.current.nextSlide()
      })

      expect(result.current.currentIndex).toBe(0)
    })
  })

  describe('limpeza', () => {
    it('deve limpar timers ao desmontar', () => {
      const { unmount } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          enableAutoPlay: true,
          autoPlayDelay: 1000,
        })
      )

      unmount()

      expect(vi.getTimerCount()).toBe(0)
    })

    it('deve limpar timeout de transição ao desmontar', () => {
      const { unmount } = renderHook(() =>
        useCarousel({
          totalItems: 5,
          infiniteLoop: true,
          enableAutoPlay: false,
        })
      )

      unmount()

      expect(vi.getTimerCount()).toBe(0)
    })
  })
})
