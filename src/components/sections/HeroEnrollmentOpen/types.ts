export interface CourseCardProps {
  title: string
  subtitle: string
  date: string
  month: string
  year: string
  imageAvif: string
  imageWebp: string
  imageJpg: string
  accentColor: 'red' | 'yellow'
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
  prefersReducedMotion: boolean
}

export interface CourseData {
  id: string
  title: string
  subtitle: string
  date: string
  month: string
  year: string
  imageAvif: string
  imageWebp: string
  imageJpg: string
  accentColor: 'red' | 'yellow'
  ctaLabel: string
  ctaAriaLabel: string
}
