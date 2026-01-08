import React from 'react'

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as whatsappUtils from '../../../../../utils/whatsapp'
import * as formValidation from '../../utils/formValidation'
import { useScheduleForm } from '../useScheduleForm'

vi.mock('../../../../../utils/whatsapp')
vi.mock('../../utils/formValidation')

describe('useScheduleForm - popup blocking', () => {
  const mockOnSuccess = vi.fn()
  const mockWindowOpen = vi.fn()
  const mockConsoleError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockWindowOpen.mockReturnValue({ closed: false } as Window)
    vi.spyOn(window, 'open').mockImplementation(mockWindowOpen)
    vi.spyOn(console, 'error').mockImplementation(mockConsoleError)

    vi.mocked(formValidation.validateScheduleForm).mockReturnValue({})
    vi.mocked(formValidation.buildScheduleMessage).mockReturnValue(
      'Test message'
    )
    vi.mocked(formValidation.formatPhoneNumber).mockImplementation(
      value => value
    )
    vi.mocked(whatsappUtils.buildWhatsAppMessageUrl).mockReturnValue(
      'https://wa.me/test'
    )
  })

  describe('popup blocking detection', () => {
    it('should set error when popup is null', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue(null)

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBe(
        'O popup foi bloqueado pelo navegador. Por favor, permita popups para este site e tente novamente.'
      )
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })

    it('should set error when popup is closed', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue({ closed: true })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBe(
        'O popup foi bloqueado pelo navegador. Por favor, permita popups para este site e tente novamente.'
      )
    })

    it('should set error when popup.closed is undefined', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue({ closed: undefined })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBe(
        'O popup foi bloqueado pelo navegador. Por favor, permita popups para este site e tente novamente.'
      )
    })

    it('should log error when popup is blocked', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue(null)

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>)
        result.current.handleInputChange({
          target: { name: 'date', value: '2024-01-15' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(mockConsoleError).toHaveBeenCalledWith(
        '[useScheduleForm] Popup blocked by browser',
        expect.objectContaining({
          url: 'https://wa.me/test',
          timestamp: expect.any(String),
          formData: {
            hasName: true,
            hasPhone: false,
            hasDate: true,
            hasTime: false,
          },
        })
      )
    })

    it('should not reset form when popup is blocked', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue(null)

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'John Doe' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.formData.name).toBe('John Doe')
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })

    it('should clear popup blocked error on successful submit', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>)
        result.current.handleInputChange({
          target: { name: 'phone', value: '11987654321' },
        } as React.ChangeEvent<HTMLInputElement>)
        result.current.handleInputChange({
          target: { name: 'date', value: '2024-01-15' },
        } as React.ChangeEvent<HTMLInputElement>)
        result.current.handleInputChange({
          target: { name: 'time', value: '10:00' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      mockWindowOpen.mockReturnValueOnce(null)

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBeTruthy()

      const mockPopup = { closed: false }
      mockWindowOpen.mockReturnValueOnce(mockPopup as Window)

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBeNull()
    })
  })

  describe('callback stability', () => {
    it('should maintain stable handleInputChange reference', () => {
      const { result, rerender } = renderHook(() =>
        useScheduleForm(mockOnSuccess)
      )

      const firstHandleInputChange = result.current.handleInputChange

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'Test' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      rerender()

      expect(result.current.handleInputChange).toBe(firstHandleInputChange)
    })

    it('should maintain stable handlePhoneChange reference', () => {
      const { result, rerender } = renderHook(() =>
        useScheduleForm(mockOnSuccess)
      )

      const firstHandlePhoneChange = result.current.handlePhoneChange

      vi.mocked(formValidation.formatPhoneNumber).mockReturnValue('123')

      act(() => {
        result.current.handlePhoneChange({
          target: { value: '123' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      rerender()

      expect(result.current.handlePhoneChange).toBe(firstHandlePhoneChange)
    })

    it('should update handleSubmit when onSuccess changes', () => {
      const { result, rerender } = renderHook(
        ({ callback }) => useScheduleForm(callback),
        { initialProps: { callback: mockOnSuccess } }
      )

      const firstHandleSubmit = result.current.handleSubmit
      const newCallback = vi.fn()

      rerender({ callback: newCallback })

      expect(result.current.handleSubmit).not.toBe(firstHandleSubmit)
    })
  })
})
