import type { CourseData } from '../../HeroEnrollmentOpen/types'

export const MOCK_COURSE_TMR: CourseData = {
  id: 'tmr',
  title: 'Tactical Medical Response',
  subtitle: 'Emergências para ',
  subtitle2: 'Áreas de Conflito',
  date: '07',
  month: 'DEZ',
  monthNumber: '12',
  year: '2025',
  imageAvif: 'tmr.avif',
  imageWebp: 'tmr.webp',
  imageJpg: 'tmr.jpg',
  accentColor: 'red',
  ctaLabel: 'INSCREVA-SE AGORA',
  ctaAriaLabel: 'Inscrever-se no curso Tactical Medical Response',
}

export const MOCK_COURSE_WMR: CourseData = {
  id: 'wmr',
  title: 'Wilderness Medical Response',
  subtitle: 'Emergências em ',
  subtitle2: 'Áreas Remotas',
  date: '14',
  month: 'MAR',
  monthNumber: '03',
  year: '2026',
  imageAvif: 'wmr.avif',
  imageWebp: 'wmr.webp',
  imageJpg: 'wmr.jpg',
  accentColor: 'yellow',
  ctaLabel: 'INSCREVA-SE AGORA',
  ctaAriaLabel: 'Inscrever-se no curso Wilderness Medical Response',
}

export const MOCK_COURSE_BMR: CourseData = {
  id: 'bmr',
  title: 'Basic Medical Response',
  subtitle: 'Emergências ',
  subtitle2: 'Básicas',
  date: '20',
  month: 'JUN',
  monthNumber: '06',
  year: '2026',
  imageAvif: 'bmr.avif',
  imageWebp: 'bmr.webp',
  imageJpg: 'bmr.jpg',
  accentColor: 'red',
  ctaLabel: 'INSCREVA-SE AGORA',
  ctaAriaLabel: 'Inscrever-se no curso Basic Medical Response',
}

export const MOCK_COURSES_SINGLE = [MOCK_COURSE_TMR]
export const MOCK_COURSES_DOUBLE = [MOCK_COURSE_TMR, MOCK_COURSE_WMR]
export const MOCK_COURSES_TRIPLE = [
  MOCK_COURSE_TMR,
  MOCK_COURSE_WMR,
  MOCK_COURSE_BMR,
]
export const MOCK_COURSES_EMPTY: CourseData[] = []
