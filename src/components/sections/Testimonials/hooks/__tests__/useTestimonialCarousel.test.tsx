import { type KeyboardEvent } from 'react'

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { testimonials } from '../../../../../data/testimonialsData'
import * as useAccessibilityModule from '../../../../../hooks/useAccessibility'
import * as useCarouselModule from '../../../../../hooks/useCarousel'
import * as useIndicatorKeyboardModule from '../../../../../hooks/useIndicatorKeyboard'
import * as useTouchSwipeModule from '../../../../../hooks/useTouchSwipe'
import { TESTIMONIALS_A11Y, TESTIMONIALS_CONFIG } from '../../constants'
import { useTestimonialCarousel } from '../useTestimonialCarousel'

vi.mock('../../../../../hooks/useAccessibility')
vi.mock('../../../../../hooks/useCarousel')
vi.mock('../../../../../hooks/useIndicatorKeyboard')
vi.mock('../../../../../hooks/useTouchSwipe')

describe('useTestimonialCarousel', () => {
  const mockAnnounce = vi.fn()
  const mockNextSlide = vi.fn()
  const mockPreviousSlide = vi.fn()
  const mockGoToSlide = vi.fn()
  const mockPauseAutoPlay = vi.fn()
  const mockResumeAutoPlay = vi.fn()
  const mockHandleIndicatorKeyDown = vi.fn()
  const mockButtonsRef = { current: [] }
  const mockTouchHandlers = {
    onTouchStart: vi.fn(),
    onTouchMove: vi.fn(),
    onTouchEnd: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()

    vi.spyOn(
      useAccessibilityModule,
      'useScreenReaderAnnouncement'
    ).mockReturnValue({
      announce: mockAnnounce,
    })

    vi.spyOn(useCarouselModule, 'useCarousel').mockReturnValue({
      currentIndex: 0,
      isAutoPlaying: true,
      isTransitioning: false,
      maxIndex: testimonials.length - 1,
      hasMultiplePages: true,
      nextSlide: mockNextSlide,
      previousSlide: mockPreviousSlide,
      goToSlide: mockGoToSlide,
      pauseAutoPlay: mockPauseAutoPlay,
      resumeAutoPlay: mockResumeAutoPlay,
    })

    vi.spyOn(
      useIndicatorKeyboardModule,
      'useIndicatorKeyboard'
    ).mockReturnValue({
      buttonsRef: mockButtonsRef,
      handleKeyDown: mockHandleIndicatorKeyDown,
    })

    vi.spyOn(useTouchSwipeModule, 'useTouchSwipe').mockReturnValue(
      mockTouchHandlers
    )
  })

  describe('inicialização', () => {
    it('deve inicializar com valores corretos', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      expect(result.current.currentIndex).toBe(0)
      expect(result.current.totalSlides).toBe(testimonials.length)
      expect(result.current.currentTestimonial).toBe(testimonials[0])
      expect(result.current.isAutoPlaying).toBe(true)
    })

    it('deve configurar useCarousel com os parâmetros corretos', () => {
      renderHook(() => useTestimonialCarousel())

      expect(useCarouselModule.useCarousel).toHaveBeenCalledWith({
        totalItems: testimonials.length,
        autoPlayDelay: TESTIMONIALS_CONFIG.autoPlayDelay,
        enableAutoPlay: true,
      })
    })

    it('deve configurar useIndicatorKeyboard com totalSlides correto', () => {
      renderHook(() => useTestimonialCarousel())

      expect(
        useIndicatorKeyboardModule.useIndicatorKeyboard
      ).toHaveBeenCalledWith({
        totalSlides: testimonials.length,
        goToSlide: mockGoToSlide,
      })
    })

    it('deve configurar useTouchSwipe com handlers corretos', () => {
      renderHook(() => useTestimonialCarousel())

      expect(useTouchSwipeModule.useTouchSwipe).toHaveBeenCalledWith({
        onSwipeLeft: mockNextSlide,
        onSwipeRight: mockPreviousSlide,
        enabled: testimonials.length > 1,
      })
    })
  })

  describe('navegação por teclado', () => {
    it('deve navegar para o próximo slide ao pressionar ArrowRight', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as KeyboardEvent<HTMLDivElement>

      act(() => {
        result.current.handleKeyDown(event)
      })

      expect(mockNextSlide).toHaveBeenCalledTimes(1)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('deve navegar para o slide anterior ao pressionar ArrowLeft', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      const event = {
        key: 'ArrowLeft',
        preventDefault: vi.fn(),
      } as unknown as KeyboardEvent<HTMLDivElement>

      act(() => {
        result.current.handleKeyDown(event)
      })

      expect(mockPreviousSlide).toHaveBeenCalledTimes(1)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('não deve navegar com outras teclas', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      const event = {
        key: 'Enter',
        preventDefault: vi.fn(),
      } as unknown as KeyboardEvent<HTMLDivElement>

      act(() => {
        result.current.handleKeyDown(event)
      })

      expect(mockNextSlide).not.toHaveBeenCalled()
      expect(mockPreviousSlide).not.toHaveBeenCalled()
      expect(event.preventDefault).not.toHaveBeenCalled()
    })
  })

  describe('anúncios de acessibilidade', () => {
    it('deve anunciar o depoimento atual ao montar', () => {
      renderHook(() => useTestimonialCarousel())

      const expectedName = testimonials[0].authorName!
      const expectedMessage = TESTIMONIALS_A11Y.slideAnnouncement(
        expectedName,
        1,
        testimonials.length
      )

      expect(mockAnnounce).toHaveBeenCalledWith(expectedMessage, 'polite')
    })

    it('deve anunciar ao mudar de slide', () => {
      vi.spyOn(useCarouselModule, 'useCarousel').mockReturnValue({
        currentIndex: 2,
        isAutoPlaying: true,
        isTransitioning: false,
        maxIndex: testimonials.length - 1,
        hasMultiplePages: true,
        nextSlide: mockNextSlide,
        previousSlide: mockPreviousSlide,
        goToSlide: mockGoToSlide,
        pauseAutoPlay: mockPauseAutoPlay,
        resumeAutoPlay: mockResumeAutoPlay,
      })

      renderHook(() => useTestimonialCarousel())

      const expectedName = testimonials[2].authorName!
      const expectedMessage = TESTIMONIALS_A11Y.slideAnnouncement(
        expectedName,
        3,
        testimonials.length
      )

      expect(mockAnnounce).toHaveBeenCalledWith(expectedMessage, 'polite')
    })

    it('deve usar companyName quando authorName não está disponível', () => {
      const testimonialIndex = testimonials.findIndex(
        t => !t.authorName && t.companyName
      )

      if (testimonialIndex === -1) {
        // Se não houver nenhum depoimento apenas com companyName, pula o teste
        return
      }

      vi.spyOn(useCarouselModule, 'useCarousel').mockReturnValue({
        currentIndex: testimonialIndex,
        isAutoPlaying: true,
        isTransitioning: false,
        maxIndex: testimonials.length - 1,
        hasMultiplePages: true,
        nextSlide: mockNextSlide,
        previousSlide: mockPreviousSlide,
        goToSlide: mockGoToSlide,
        pauseAutoPlay: mockPauseAutoPlay,
        resumeAutoPlay: mockResumeAutoPlay,
      })

      renderHook(() => useTestimonialCarousel())

      const expectedName = testimonials[testimonialIndex].companyName!
      const expectedMessage = TESTIMONIALS_A11Y.slideAnnouncement(
        expectedName,
        testimonialIndex + 1,
        testimonials.length
      )

      expect(mockAnnounce).toHaveBeenCalledWith(expectedMessage, 'polite')
    })

    it('deve usar número do slide quando nem authorName nem companyName estão disponíveis', () => {
      const mockTestimonialWithoutNames = {
        ...testimonials[0],
        authorName: undefined,
        companyName: undefined,
      }

      // Mock temporário para simular um depoimento sem nome
      vi.spyOn(useCarouselModule, 'useCarousel').mockReturnValue({
        currentIndex: 0,
        isAutoPlaying: true,
        isTransitioning: false,
        maxIndex: testimonials.length - 1,
        hasMultiplePages: true,
        nextSlide: mockNextSlide,
        previousSlide: mockPreviousSlide,
        goToSlide: mockGoToSlide,
        pauseAutoPlay: mockPauseAutoPlay,
        resumeAutoPlay: mockResumeAutoPlay,
      })

      // Precisamos mockar o testimonial atual
      const originalTestimonial = testimonials[0]
      Object.assign(testimonials[0], mockTestimonialWithoutNames)

      renderHook(() => useTestimonialCarousel())

      const expectedMessage = TESTIMONIALS_A11Y.slideAnnouncement(
        'Slide 1',
        1,
        testimonials.length
      )

      expect(mockAnnounce).toHaveBeenCalledWith(expectedMessage, 'polite')

      // Restaura o depoimento original
      Object.assign(testimonials[0], originalTestimonial)
    })
  })

  describe('controle de auto-play', () => {
    it('deve pausar auto-play', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      act(() => {
        result.current.pauseAutoPlay()
      })

      expect(mockPauseAutoPlay).toHaveBeenCalledTimes(1)
    })

    it('deve retomar auto-play', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      act(() => {
        result.current.resumeAutoPlay()
      })

      expect(mockResumeAutoPlay).toHaveBeenCalledTimes(1)
    })
  })

  describe('navegação manual', () => {
    it('deve ir para um slide específico', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      act(() => {
        result.current.goToSlide(3)
      })

      expect(mockGoToSlide).toHaveBeenCalledWith(3)
    })

    it('deve expor nextSlide', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      act(() => {
        result.current.nextSlide()
      })

      expect(mockNextSlide).toHaveBeenCalledTimes(1)
    })

    it('deve expor previousSlide', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      act(() => {
        result.current.previousSlide()
      })

      expect(mockPreviousSlide).toHaveBeenCalledTimes(1)
    })
  })

  describe('retorno do hook', () => {
    it('deve retornar todas as propriedades necessárias', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      expect(result.current).toHaveProperty('currentIndex')
      expect(result.current).toHaveProperty('totalSlides')
      expect(result.current).toHaveProperty('currentTestimonial')
      expect(result.current).toHaveProperty('isAutoPlaying')
      expect(result.current).toHaveProperty('nextSlide')
      expect(result.current).toHaveProperty('previousSlide')
      expect(result.current).toHaveProperty('goToSlide')
      expect(result.current).toHaveProperty('pauseAutoPlay')
      expect(result.current).toHaveProperty('resumeAutoPlay')
      expect(result.current).toHaveProperty('buttonsRef')
      expect(result.current).toHaveProperty('handleIndicatorKeyDown')
      expect(result.current).toHaveProperty('handleKeyDown')
      expect(result.current).toHaveProperty('touchHandlers')
    })

    it('deve retornar buttonsRef do useIndicatorKeyboard', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      expect(result.current.buttonsRef).toBe(mockButtonsRef)
    })

    it('deve retornar handleIndicatorKeyDown do useIndicatorKeyboard', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      expect(result.current.handleIndicatorKeyDown).toBe(
        mockHandleIndicatorKeyDown
      )
    })

    it('deve retornar touchHandlers do useTouchSwipe', () => {
      const { result } = renderHook(() => useTestimonialCarousel())

      expect(result.current.touchHandlers).toBe(mockTouchHandlers)
    })
  })

  describe('integração com currentTestimonial', () => {
    it('deve retornar o depoimento correto baseado no currentIndex', () => {
      const { result, rerender } = renderHook(() => useTestimonialCarousel())

      expect(result.current.currentTestimonial).toBe(testimonials[0])

      // Simula mudança de índice
      vi.spyOn(useCarouselModule, 'useCarousel').mockReturnValue({
        currentIndex: 3,
        isAutoPlaying: true,
        isTransitioning: false,
        maxIndex: testimonials.length - 1,
        hasMultiplePages: true,
        nextSlide: mockNextSlide,
        previousSlide: mockPreviousSlide,
        goToSlide: mockGoToSlide,
        pauseAutoPlay: mockPauseAutoPlay,
        resumeAutoPlay: mockResumeAutoPlay,
      })

      rerender()

      expect(result.current.currentTestimonial).toBe(testimonials[3])
    })
  })
})
