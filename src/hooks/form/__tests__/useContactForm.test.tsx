import React from 'react'

import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useContactForm } from '../useContactForm'

const TEST_USER_NAME = 'João Silva'
const TEST_EMAIL = 'joao@example.com'
const TEST_MESSAGE = 'Test message'
const ERROR_REQUIRED_NAME = 'Nome é obrigatório'
const ERROR_INVALID_EMAIL = 'Email inválido'
const ERROR_SUBMISSION_FAILED = 'Falha no envio. Tente novamente.'

vi.mock('../useContactForm', async () => {
  const actual = await vi.importActual('../useContactForm')
  return {
    ...actual,
  }
})

// eslint-disable-next-line max-lines-per-function
describe('useContactForm', () => {
  it('should initialize with empty form data', () => {
    const { result } = renderHook(() => useContactForm())

    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should update field values correctly', () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', TEST_USER_NAME)
    })

    expect(result.current.formData.name).toBe(TEST_USER_NAME)

    act(() => {
      result.current.updateField('email', TEST_EMAIL)
    })

    expect(result.current.formData.email).toBe(TEST_EMAIL)
  })

  it('should validate required fields', async () => {
    const { result } = renderHook(() => useContactForm())

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(result.current.error).toBe(ERROR_REQUIRED_NAME)
    expect(result.current.isSuccess).toBe(false)
  })

  it('should validate email format', async () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', TEST_USER_NAME)
      result.current.updateField('email', 'invalid-email')
      result.current.updateField('message', TEST_MESSAGE)
    })

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(result.current.error).toBe(ERROR_INVALID_EMAIL)
  })

  it('should handle successful form submission', async () => {
    // Mock Math.random to always return success
    vi.spyOn(Math, 'random').mockReturnValue(0.5) // Value that causes success

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', 'João Silva')
      result.current.updateField('email', 'joao@example.com')
      result.current.updateField('message', 'Test message')
    })

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.error).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    vi.restoreAllMocks()
  })

  it('should handle form submission error', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9) // Value that causes error

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', TEST_USER_NAME)
      result.current.updateField('email', TEST_EMAIL)
      result.current.updateField('message', TEST_MESSAGE)
    })

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    await waitFor(() => {
      expect(result.current.error).toBe(ERROR_SUBMISSION_FAILED)
      expect(result.current.isSuccess).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })

    vi.restoreAllMocks()
  })

  it('should reset form correctly', () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', TEST_USER_NAME)
      result.current.updateField('email', TEST_EMAIL)
      result.current.updateField('message', TEST_MESSAGE)
    })

    expect(result.current.formData.name).toBe(TEST_USER_NAME)

    act(() => {
      result.current.reset()
    })

    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
    })
    expect(result.current.error).toBeNull()
    expect(result.current.isSuccess).toBe(false)
  })

  it('should show loading state during submission', async () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', TEST_USER_NAME)
      result.current.updateField('email', TEST_EMAIL)
      result.current.updateField('message', TEST_MESSAGE)
    })

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>

    act(() => {
      result.current.handleSubmit(mockEvent)
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })
})
