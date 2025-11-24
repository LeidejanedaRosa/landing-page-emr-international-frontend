import React from 'react'

import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useContactForm } from '../useContactForm'

// Test constants
const TEST_USER_NAME = 'João Silva'
const TEST_EMAIL = 'joao@example.com'
const TEST_MESSAGE = 'Test message'
const ERROR_REQUIRED_NAME = 'Nome é obrigatório'
const ERROR_INVALID_EMAIL = 'Email inválido'

// eslint-disable-next-line max-lines-per-function
describe('useContactForm', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  it('should reset form correctly', () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField('name', TEST_USER_NAME)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.formData.name).toBe('')
    expect(result.current.error).toBeNull()
    expect(result.current.isSuccess).toBe(false)
  })

  it('should handle successful submission', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

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

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true)
        expect(result.current.isLoading).toBe(false)
      },
      { timeout: 3000 }
    )
  })
})
