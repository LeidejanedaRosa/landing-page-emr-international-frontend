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

export const useScheduleForm = (onSuccess: () => void) => {
  const [formData, setFormData] =
    useState<ScheduleCallFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<ScheduleCallFormData>>({})

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      const validationErrors = validateScheduleForm(formData)
      setErrors(validationErrors)

      if (Object.keys(validationErrors).length > 0) return

      const message = buildScheduleMessage(formData)
      const whatsappUrl = buildWhatsAppMessageUrl(message)
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

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
    },
    [errors]
  )

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedPhone = formatPhoneNumber(e.target.value)
      setFormData(prev => ({ ...prev, phone: formattedPhone }))

      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: undefined }))
      }
    },
    [errors.phone]
  )

  return {
    formData,
    errors,
    handleSubmit,
    handleInputChange,
    handlePhoneChange,
  }
}
