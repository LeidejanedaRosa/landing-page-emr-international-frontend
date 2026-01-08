import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useBannerPauseState } from '../useBannerPauseState'

describe('useBannerPauseState', () => {
  const mockAnnounce = vi.fn()

  describe('inicialização', () => {
    it('deve inicializar pausado quando prefersReducedMotion é true', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(true, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('auto')
    })

    it('deve inicializar não pausado quando prefersReducedMotion é false', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(false)
      expect(result.current.pauseSource).toBe('auto')
    })

    it('deve retornar todas as propriedades necessárias', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      expect(result.current).toHaveProperty('isPaused')
      expect(result.current).toHaveProperty('pauseSource')
      expect(result.current).toHaveProperty('handleTogglePause')
      expect(result.current).toHaveProperty('handleMouseEnter')
      expect(result.current).toHaveProperty('handleMouseLeave')
    })
  })

  describe('handleTogglePause', () => {
    it('deve alternar isPaused de false para true', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(false)

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.isPaused).toBe(true)
    })

    it('deve alternar isPaused de true para false', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(true, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(true)

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.isPaused).toBe(false)
    })

    it('deve definir pauseSource como manual', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.pauseSource).toBe('manual')
    })

    it('deve anunciar "Banner pausado" quando pausar', () => {
      mockAnnounce.mockClear()
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      act(() => {
        result.current.handleTogglePause()
      })

      expect(mockAnnounce).toHaveBeenCalledWith('Banner pausado', 'polite')
    })

    it('deve anunciar "Banner retomado" quando retomar', () => {
      mockAnnounce.mockClear()
      const { result } = renderHook(() =>
        useBannerPauseState(true, mockAnnounce)
      )

      act(() => {
        result.current.handleTogglePause()
      })

      expect(mockAnnounce).toHaveBeenCalledWith('Banner retomado', 'polite')
    })
  })

  describe('handleMouseEnter', () => {
    it('deve pausar quando não está pausado', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(false)

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('hover')
    })

    it('não deve pausar se já está pausado', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(true, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(true)
      const initialSource = result.current.pauseSource

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe(initialSource)
    })

    it('não deve pausar se pauseSource é manual', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.pauseSource).toBe('manual')

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.isPaused).toBe(false)

      const pauseSourceBeforeHover = result.current.pauseSource

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.pauseSource).toBe(pauseSourceBeforeHover)
    })
  })

  describe('handleMouseLeave', () => {
    it('deve retomar quando pauseSource é hover', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('hover')

      act(() => {
        result.current.handleMouseLeave()
      })

      expect(result.current.isPaused).toBe(false)
    })

    it('não deve retomar se pauseSource não é hover', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('manual')

      act(() => {
        result.current.handleMouseLeave()
      })

      expect(result.current.isPaused).toBe(true)
    })

    it('não deve retomar se prefersReducedMotion é true', () => {
      const { result, rerender } = renderHook(
        ({ prefersReducedMotion }) =>
          useBannerPauseState(prefersReducedMotion, mockAnnounce),
        { initialProps: { prefersReducedMotion: false } }
      )

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('hover')

      rerender({ prefersReducedMotion: true })

      act(() => {
        result.current.handleMouseLeave()
      })

      expect(result.current.isPaused).toBe(true)
    })
  })

  describe('efeito de prefersReducedMotion', () => {
    it('deve pausar automaticamente quando prefersReducedMotion muda para true', () => {
      mockAnnounce.mockClear()
      const { result, rerender } = renderHook(
        ({ prefersReducedMotion }) =>
          useBannerPauseState(prefersReducedMotion, mockAnnounce),
        { initialProps: { prefersReducedMotion: false } }
      )

      expect(result.current.isPaused).toBe(false)

      rerender({ prefersReducedMotion: true })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('auto')
      expect(mockAnnounce).toHaveBeenCalledWith(
        'Animação do banner pausada automaticamente',
        'polite'
      )
    })

    it('não deve pausar novamente se já está pausado', () => {
      mockAnnounce.mockClear()
      const { result, rerender } = renderHook(
        ({ prefersReducedMotion }) =>
          useBannerPauseState(prefersReducedMotion, mockAnnounce),
        { initialProps: { prefersReducedMotion: false } }
      )

      act(() => {
        result.current.handleTogglePause()
      })

      mockAnnounce.mockClear()

      rerender({ prefersReducedMotion: true })

      expect(mockAnnounce).not.toHaveBeenCalled()
    })

    it('não deve afetar quando prefersReducedMotion muda de true para false', () => {
      const { result, rerender } = renderHook(
        ({ prefersReducedMotion }) =>
          useBannerPauseState(prefersReducedMotion, mockAnnounce),
        { initialProps: { prefersReducedMotion: true } }
      )

      expect(result.current.isPaused).toBe(true)

      rerender({ prefersReducedMotion: false })

      expect(result.current.isPaused).toBe(true)
    })
  })

  describe('integração de comportamentos', () => {
    it('deve permitir ciclo completo: hover -> manual -> hover', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      expect(result.current.isPaused).toBe(false)

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.isPaused).toBe(true)
      expect(result.current.pauseSource).toBe('hover')

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.isPaused).toBe(false)
      expect(result.current.pauseSource).toBe('manual')

      act(() => {
        result.current.handleMouseEnter()
      })

      expect(result.current.isPaused).toBe(false)
    })

    it('deve respeitar pause manual sobre hover', () => {
      const { result } = renderHook(() =>
        useBannerPauseState(false, mockAnnounce)
      )

      act(() => {
        result.current.handleTogglePause()
      })

      expect(result.current.pauseSource).toBe('manual')

      act(() => {
        result.current.handleMouseLeave()
      })

      expect(result.current.isPaused).toBe(true)
    })
  })
})
