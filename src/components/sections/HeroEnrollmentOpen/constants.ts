import tmrImageJpg from '../../../assets/hero_section_TMR.jpg'
import tmrImageWebp from '../../../assets/hero_section_TMR.webp'
import wmrImageJpg from '../../../assets/hero_section_WMR.jpg'
import type { CourseData } from './types'

export const COURSES_DATA: CourseData[] = [
  {
    id: 'tmr',
    title: 'Tactical Medical Response',
    subtitle: 'Emergências para ',
    subtitle2: 'Áreas de Conflito',
    date: '07',
    month: 'DEZ',
    monthNumber: '12',
    year: '2025',
    imageJpg: tmrImageJpg,
    imageWebp: tmrImageWebp,
    accentColor: 'red',
    ctaLabel: 'INSCREVA-SE AGORA',
    ctaAriaLabel: 'Inscrever-se no curso Tactical Medical Response',
  },
  {
    id: 'wmr',
    title: 'Wilderness Medical Response',
    subtitle: 'Emergências em ',
    subtitle2: 'Áreas Remotas',
    date: '14',
    month: 'MAR',
    monthNumber: '03',
    year: '2026',
    imageJpg: wmrImageJpg,
    accentColor: 'yellow',
    ctaLabel: 'INSCREVA-SE AGORA',
    ctaAriaLabel: 'Inscrever-se no curso Wilderness Medical Response',
  },
]

export const ACCENT_COLORS = {
  red: {
    badge: 'bg-red-500',
    badgeAlpha: 'bg-red-500/90',
    button: 'bg-red-600 hover:bg-red-700',
    focusRing: 'focus:ring-red-500/50',
    dateBox: 'bg-red-600/95',
  },
  yellow: {
    badge: 'bg-yellow-500',
    badgeAlpha: 'bg-yellow-500/90',
    button: 'bg-yellow-500 hover:bg-yellow-600',
    focusRing: 'focus:ring-yellow-500/50',
    dateBox: 'bg-yellow-500/95',
  },
} as const
