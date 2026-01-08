import React from 'react'

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as whatsappUtils from '../../../../../utils/whatsapp'
import * as formValidation from '../../utils/formValidation'
import { useScheduleForm } from '../useScheduleForm'

vi.mock('../../../../../utils/whatsapp')
vi.mock('../../utils/formValidation')

describe('useScheduleForm', () => {
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

  describe('initialization', () => {
    it('should initialize with empty form data', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      expect(result.current.formData).toEqual({
        name: '',
        phone: '',
        date: '',
        time: '',
      })
    })

    it('should initialize with no errors', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      expect(result.current.errors).toEqual({})
    })

    it('should initialize with no popup blocked error', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      expect(result.current.popupBlockedError).toBeNull()
    })
  })

  describe('handleInputChange', () => {
    it('should update form data when input changes', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'John Doe' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.formData.name).toBe('John Doe')
    })

    it('should clear field error when input changes', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: '' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      vi.mocked(formValidation.validateScheduleForm).mockReturnValue({
        name: 'Campo obrigatório',
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.errors.name).toBe('Campo obrigatório')

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.errors.name).toBeUndefined()
    })

    it('should clear popup blocked error when input changes', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue(null)

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBeTruthy()

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'Test' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.popupBlockedError).toBeNull()
    })
  })

  describe('handlePhoneChange', () => {
    it('should format phone number when input changes', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      vi.mocked(formValidation.formatPhoneNumber).mockReturnValue(
        '(11) 98765-4321'
      )

      act(() => {
        result.current.handlePhoneChange({
          target: { value: '11987654321' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(formValidation.formatPhoneNumber).toHaveBeenCalledWith(
        '11987654321'
      )
      expect(result.current.formData.phone).toBe('(11) 98765-4321')
    })

    it('should clear phone error when input changes', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      vi.mocked(formValidation.validateScheduleForm).mockReturnValue({
        phone: 'Telefone inválido',
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.errors.phone).toBe('Telefone inválido')

      vi.mocked(formValidation.formatPhoneNumber).mockReturnValue('1234567890')

      act(() => {
        result.current.handlePhoneChange({
          target: { value: '1234567890' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.errors.phone).toBeUndefined()
    })

    it('should clear popup blocked error when phone changes', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      mockWindowOpen.mockReturnValue(null)

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.popupBlockedError).toBeTruthy()

      vi.mocked(formValidation.formatPhoneNumber).mockReturnValue('123')

      act(() => {
        result.current.handlePhoneChange({
          target: { value: '123' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.popupBlockedError).toBeNull()
    })
  })

  describe('handleSubmit', () => {
    it('should prevent default form submission', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))
      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should validate form data on submit', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'Test' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(formValidation.validateScheduleForm).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Test' })
      )
    })

    it('should set validation errors and not submit if form is invalid', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))

      vi.mocked(formValidation.validateScheduleForm).mockReturnValue({
        name: 'Nome obrigatório',
        phone: 'Telefone obrigatório',
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.errors).toEqual({
        name: 'Nome obrigatório',
        phone: 'Telefone obrigatório',
      })
      expect(mockWindowOpen).not.toHaveBeenCalled()
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })

    it('should build WhatsApp message and open popup on valid form', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))
      const mockPopup = { closed: false }

      mockWindowOpen.mockReturnValue(mockPopup as Window)

      act(() => {
        result.current.handleInputChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(formValidation.buildScheduleMessage).toHaveBeenCalled()
      expect(whatsappUtils.buildWhatsAppMessageUrl).toHaveBeenCalledWith(
        'Test message'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://wa.me/test',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should reset form data and call onSuccess after successful submit', () => {
      const { result } = renderHook(() => useScheduleForm(mockOnSuccess))
      const mockPopup = { closed: false }

      mockWindowOpen.mockReturnValue(mockPopup as Window)

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

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent

      act(() => {
        result.current.handleSubmit(mockEvent)
      })

      expect(result.current.formData).toEqual({
        name: '',
        phone: '',
        date: '',
        time: '',
      })
      expect(result.current.errors).toEqual({})
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })
})
