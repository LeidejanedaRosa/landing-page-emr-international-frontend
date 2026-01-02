export interface CourseCardProps {
  title: string
  subtitle: string
  subtitle2?: string
  date: string
  month: string
  monthNumber: string
  year: string
  imageAvif?: string
  imageWebp?: string
  imageJpg: string
  accentColor: 'red' | 'yellow'
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
  prefersReducedMotion: boolean
  onCtaClick?: () => void
}

export interface CourseData {
  id: string
  title: string
  subtitle: string
  subbtitle2?: string
  date: string
  month: string
  monthNumber: string
  year: string
  imageAvif?: string
  imageWebp?: string
  imageJpg: string
  accentColor: 'red' | 'yellow'
  ctaLabel: string
  ctaAriaLabel: string
}
