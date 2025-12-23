import { COURSES_DATA } from '../HeroEnrollmentOpen/constants'

export const HERO_CAROUSEL_CONFIG = {
  autoPlayDelay: 5000,
  transitionDuration: 500,
} as const

export const HERO_CAROUSEL_A11Y = {
  roleDescription: 'carrossel',
  ariaLabel: 'Seção principal com navegação entre páginas',
} as const

export const getSlideLabels = (): Record<number, string> => {
  const labels: Record<number, string> = {
    0: 'Página principal EMR Internacional',
  }

  COURSES_DATA.forEach((course, index) => {
    labels[index + 1] = `Curso ${course.title}`
  })

  return labels
}

export const getTotalSlides = (): number => {
  return 1 + COURSES_DATA.length
}
