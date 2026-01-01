import React from 'react'

import { buildCourseWhatsAppUrl } from '../../../../utils/whatsapp'
import { ACCENT_COLORS } from '../constants'

type AccentColorStyles = (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]

interface CourseCTAButtonProps {
  courseTitle: string
  ctaLabel: string
  ctaAriaLabel: string
  colors: AccentColorStyles
  variant?: 'mobile' | 'desktop' | 'card'
}

const VARIANT_STYLES = {
  mobile:
    'w-full sm:w-auto px-8 py-4 text-base rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
  desktop:
    'inline-block px-8 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 text-base md:text-lg lg:text-xl rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
  card: 'inline-block w-full md:w-auto px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98]',
} as const

export const CourseCTAButton: React.FC<CourseCTAButtonProps> = ({
  courseTitle,
  ctaLabel,
  ctaAriaLabel,
  colors,
  variant = 'card',
}) => {
  const whatsappUrl = buildCourseWhatsAppUrl(courseTitle)

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={`${VARIANT_STYLES[variant]} ${colors.button} text-white font-bold focus:outline-none focus:ring-4 ${colors.focusRing} text-center`}
      aria-label={ctaAriaLabel}
    >
      {ctaLabel} →
    </a>
  )
}

CourseCTAButton.displayName = 'CourseCTAButton'
