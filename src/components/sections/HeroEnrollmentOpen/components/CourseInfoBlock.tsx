import React from 'react'

import { ACCENT_COLORS } from '../constants'

type AccentColorStyles = (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]

interface CourseInfoBlockProps {
  title: string
  subtitle: string
  colors: AccentColorStyles
}

export const CourseInfoBlock: React.FC<CourseInfoBlockProps> = ({
  title,
  subtitle,
  colors,
}) => (
  <>
    <span
      className={`inline-block px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4 lg:mb-6
                  rounded-md backdrop-blur-sm text-sm md:text-base font-bold
                  uppercase tracking-wide text-white shadow-lg ${colors.badgeAlpha}`}
    >
      {title}
    </span>

    <h3
      className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                 font-bold text-white mb-2 md:mb-3 leading-tight tracking-tight'
    >
      {subtitle}
    </h3>

    <p className='text-sm sm:text-base md:text-lg text-white/90 mb-4 md:mb-6 lg:mb-8 font-medium'>
      Certificação Internacional
    </p>
  </>
)
