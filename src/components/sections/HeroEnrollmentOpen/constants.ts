import tmrImageJpg from '../../../assets/hero_section_TMR.jpg'
// @ts-expect-error - vite-imagetools directives
import tmrImageAvif from '../../../assets/hero_section_TMR.jpg?format=avif&w=640;768;1024;1280&quality=75&as=srcset'
// @ts-expect-error - vite-imagetools directives
import tmrImageWebp from '../../../assets/hero_section_TMR.jpg?format=webp&w=640;768;1024;1280&quality=80&as=srcset'
import wmrImageJpg from '../../../assets/hero_section_WMR.jpg'
// @ts-expect-error - vite-imagetools directives
import wmrImageAvif from '../../../assets/hero_section_WMR.jpg?format=avif&w=640;768;1024;1280&quality=75&as=srcset'
// @ts-expect-error - vite-imagetools directives
import wmrImageWebp from '../../../assets/hero_section_WMR.jpg?format=webp&w=640;768;1024;1280&quality=80&as=srcset'
import type { CourseData } from './types'

export const COURSES_DATA: CourseData[] = [
  {
    id: 'tmr',
    title: 'Tactical Medical Response',
    subtitle: 'Emergências para Áreas de Conflito',
    date: '07',
    month: 'DEZ',
    monthNumber: '12',
    year: '2025',
    imageAvif: tmrImageAvif,
    imageWebp: tmrImageWebp,
    imageJpg: tmrImageJpg,
    accentColor: 'red',
    ctaLabel: 'INSCREVA-SE AGORA',
    ctaAriaLabel: 'Inscrever-se no curso Tactical Medical Response',
  },
  {
    id: 'wmr',
    title: 'Wilderness Medical Response',
    subtitle: 'Emergências em Áreas Remotas',
    date: '14',
    month: 'MAR',
    monthNumber: '03',
    year: '2026',
    imageAvif: wmrImageAvif,
    imageWebp: wmrImageWebp,
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
