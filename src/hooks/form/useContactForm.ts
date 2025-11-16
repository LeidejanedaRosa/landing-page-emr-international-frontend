import React, { useCallback, useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface UseContactFormReturn {
  formData: ContactFormData
  isLoading: boolean
  isSuccess: boolean
  error: string | null
  // eslint-disable-next-line no-unused-vars
  updateField: (field: keyof ContactFormData, value: string) => void
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  reset: () => void
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  message: '',
}

/**
 * Hook para gerenciar o estado e envio do formulário de contato
 */
const validateForm = (data: ContactFormData): string | null => {
  if (!data.name.trim()) {
    return 'Nome é obrigatório'
  }
  if (!data.email.trim()) {
    return 'Email é obrigatório'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Email inválido'
  }
  if (!data.message.trim()) {
    return 'Mensagem é obrigatória'
  }
  return null
}

const simulateApiCall = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(() => resolve(resolve), 2000))

  // Simula sucesso/erro aleatório para demonstração
  if (Math.random() > 0.8) {
    throw new Error('Falha no envio. Tente novamente.')
  }
}

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
      if (error) {
        setError(null)
      }
    },
    [error]
  )

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setIsLoading(false)
    setIsSuccess(false)
    setError(null)
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError(null)
      setIsSuccess(false)

      const validationError = validateForm(formData)
      if (validationError) {
        setError(validationError)
        return
      }

      setIsLoading(true)

      try {
        await simulateApiCall()
        setIsSuccess(true)
        setFormData(INITIAL_FORM_DATA)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro inesperado. Tente novamente.'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [formData]
  )

  return {
    formData,
    isLoading,
    isSuccess,
    error,
    updateField,
    handleSubmit,
    reset,
  }
}
