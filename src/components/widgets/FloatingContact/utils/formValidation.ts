import { ScheduleCallFormData } from '../types'

export const validateScheduleForm = (
  formData: ScheduleCallFormData
): Partial<ScheduleCallFormData> => {
  const errors: Partial<ScheduleCallFormData> = {}

  if (!formData.name.trim()) {
    errors.name = 'Por favor, informe seu nome'
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Por favor, informe seu telefone'
  } else if (formData.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Telefone inválido'
  }

  if (!formData.date) {
    errors.date = 'Por favor, selecione uma data'
  }

  if (!formData.time.trim()) {
    errors.time = 'Por favor, informe um horário'
  }

  return errors
}

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  if (!year || !month || !day) return ''
  return `${day}/${month}/${year}`
}

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export const buildScheduleMessage = (
  formData: ScheduleCallFormData
): string => {
  return `Olá! Sou *${formData.name.trim()}* e gostaria de agendar uma ligação.

📞 Meu telefone: ${formData.phone}
📅 Data: ${formatDateForDisplay(formData.date)}
🕐 Horário: ${formData.time}

Aguardo o contato da equipe EMR!`
}
