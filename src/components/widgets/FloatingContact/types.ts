export interface ScheduleCallFormData {
  name: string
  phone: string
  date: string
  time: string
}

export interface FloatingContactProps {
  className?: string
}

export interface ScheduleCallModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BUSINESS_HOURS = {
  weekdays: {
    days: 'Segunda a Sexta',
    hours: '8h às 18h',
  },
  saturday: {
    days: 'Sábado',
    hours: '8h às 12h',
  },
} as const
