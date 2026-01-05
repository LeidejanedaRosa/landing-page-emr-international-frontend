import type { Course } from '../../../data/coursesData'
import type { CourseStyleConfig } from './types'

export const INDICATOR_SEGMENTS = 10

export const getVariantStyles = (
  variant: Course['variant']
): CourseStyleConfig => {
  const isEmergency = variant === 'emergency'

  return {
    border: isEmergency ? 'hover:border-cta-500' : 'hover:border-warning-400',
    icon: isEmergency ? 'text-cta-400' : 'text-warning-400',
    primary: isEmergency ? 'bg-cta-600' : 'bg-warning-400',
    primaryHover: isEmergency ? 'hover:bg-cta-700' : 'hover:bg-warning-500',
    primaryText: isEmergency ? 'text-white' : 'text-primary-950',
    ring: isEmergency ? 'focus:ring-cta-500' : 'focus:ring-warning-400',
    secondary: 'text-primary-400',
    secondaryHover: 'hover:text-white',
    tabActive: isEmergency ? 'bg-cta-600' : 'bg-warning-500',
    tabActiveText: isEmergency ? 'text-white' : 'text-primary-950',
    barFilled: isEmergency ? 'bg-cta-500' : 'bg-warning-400',
  }
}

export const getBadgeColorClass = (variant: Course['variant']): string =>
  variant === 'emergency' ? 'bg-red-500' : 'bg-yellow-500'
