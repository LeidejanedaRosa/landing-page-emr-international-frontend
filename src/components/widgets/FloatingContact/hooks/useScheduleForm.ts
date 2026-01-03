import React, { useCallback, useState } from 'react'

import { buildWhatsAppMessageUrl } from '../../../../utils/whatsapp'
import { ScheduleCallFormData } from '../types'
import {
  buildScheduleMessage,
  formatPhoneNumber,
  validateScheduleForm,
} from '../utils/formValidation'

const initialFormData: ScheduleCallFormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
}

const checkPopupBlocked = (
  popupWindow: Window | null,
  whatsappUrl: string,
  formData: ScheduleCallFormData
): boolean => {
  if (
    !popupWindow ||
    popupWindow.closed ||
    typeof popupWindow.closed === 'undefined'
  ) {
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error('[useScheduleForm] Popup blocked by browser', {
        url: whatsappUrl,
        timestamp: new Date().toISOString(),
        formData: {
          hasName: !!formData.name,
          hasPhone: !!formData.phone,
          hasDate: !!formData.date,
          hasTime: !!formData.time,
        },
      })
    }
    return true
  }
  return false
}

const clearPopupError = (
  popupBlockedError: string | null,
  setPopupBlockedError: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  if (popupBlockedError) {
    setPopupBlockedError(null)
  }
}

export const useScheduleForm = (onSuccess: () => void) => {
  const [formData, setFormData] =
    useState<ScheduleCallFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<ScheduleCallFormData>>({})
  const [popupBlockedError, setPopupBlockedError] = useState<string | null>(
    null
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      const validationErrors = validateScheduleForm(formData)
      setErrors(validationErrors)

      if (Object.keys(validationErrors).length > 0) return

      setPopupBlockedError(null)

      const message = buildScheduleMessage(formData)
      const whatsappUrl = buildWhatsAppMessageUrl(message)
      const popupWindow = window.open(
        whatsappUrl,
        '_blank',
        'noopener,noreferrer'
      )

      if (checkPopupBlocked(popupWindow, whatsappUrl, formData)) {
        const errorMessage =
          'O popup foi bloqueado pelo navegador. Por favor, permita popups para este site e tente novamente.'
        setPopupBlockedError(errorMessage)
        return
      }

      setFormData(initialFormData)
      setErrors({})
      onSuccess()
    },
    [formData, onSuccess]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))

      if (errors[name as keyof ScheduleCallFormData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }

      clearPopupError(popupBlockedError, setPopupBlockedError)
    },
    [errors, popupBlockedError]
  )

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedPhone = formatPhoneNumber(e.target.value)
      setFormData(prev => ({ ...prev, phone: formattedPhone }))

      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: undefined }))
      }

      clearPopupError(popupBlockedError, setPopupBlockedError)
    },
    [errors.phone, popupBlockedError]
  )

  return {
    formData,
    errors,
    popupBlockedError,
    handleSubmit,
    handleInputChange,
    handlePhoneChange,
  }
}
