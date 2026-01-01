import React from 'react'

import { ACCENT_COLORS } from '../constants'

type AccentColorStyles = (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]

interface CourseInfoBlockProps {
  title: string
  subtitle: string
  colors: AccentColorStyles
  variant?: 'mobile' | 'desktop' | 'card'
}

const BADGE_STYLES = {
  mobile:
    'inline-block w-fit px-4 py-2 mb-4 rounded-md backdrop-blur-sm text-sm font-bold uppercase tracking-wide text-white shadow-lg',
  desktop:
    'inline-block px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 rounded-md backdrop-blur-sm text-sm md:text-base font-bold uppercase tracking-wide text-white shadow-lg',
  card: 'inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-2 sm:mb-3 md:mb-4 rounded-md backdrop-blur-sm text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide text-white shadow-lg',
} as const

const HEADING_STYLES = {
  mobile:
    'text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight tracking-tight',
  desktop:
    'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight tracking-tight',
  card: 'text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 leading-tight tracking-tight',
} as const

const DESCRIPTION_STYLES = {
  mobile: 'text-base text-white/90 mb-6 font-medium',
  desktop:
    'text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 lg:mb-10 font-medium',
  card: 'text-xs sm:text-sm md:text-base lg:text-xl text-white/90 mb-3 sm:mb-4 md:mb-6 font-medium',
} as const

export const CourseInfoBlock: React.FC<CourseInfoBlockProps> = ({
  title,
  subtitle,
  colors,
  variant = 'card',
}) => (
  <>
    <span className={`${BADGE_STYLES[variant]} ${colors.badgeAlpha}`}>
      {title}
    </span>

    <h3 className={HEADING_STYLES[variant]}>{subtitle}</h3>

    <p className={DESCRIPTION_STYLES[variant]}>Certificação Internacional</p>
  </>
)
