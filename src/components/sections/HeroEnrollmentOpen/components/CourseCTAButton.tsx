import React from 'react'

import { buildCourseWhatsAppUrl } from '../../../../utils/whatsapp'
import { ACCENT_COLORS } from '../constants'

type AccentColorStyles = (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]

interface CourseCTAButtonProps {
  courseTitle: string
  ctaLabel: string
  ctaAriaLabel: string
  colors: AccentColorStyles
}

export const CourseCTAButton: React.FC<CourseCTAButtonProps> = ({
  courseTitle,
  ctaLabel,
  ctaAriaLabel,
  colors,
}) => {
  const whatsappUrl = buildCourseWhatsAppUrl(courseTitle)

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={`inline-block w-full sm:w-auto px-6 py-3 landscape-mobile:px-4 landscape-mobile:py-2 sm:px-8 sm:py-3.5 md:px-10 md:py-4
                  text-sm landscape-mobile:text-xs sm:text-base md:text-lg rounded-lg shadow-2xl
                  transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                  ${colors.button} text-white font-bold text-center
                  focus:outline-none focus:ring-4 ${colors.focusRing}`}
      aria-label={ctaAriaLabel}
    >
      {ctaLabel} →
    </a>
  )
}

CourseCTAButton.displayName = 'CourseCTAButton'
