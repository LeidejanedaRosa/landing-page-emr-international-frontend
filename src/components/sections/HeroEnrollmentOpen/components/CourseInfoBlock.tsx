import React from 'react'

import { ACCENT_COLORS } from '../constants'

type AccentColorStyles = (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]

interface CourseInfoBlockProps {
  title: string
  subtitle: string
  subtitle2?: string
  colors: AccentColorStyles
}

export const CourseInfoBlock: React.FC<CourseInfoBlockProps> = ({
  title,
  subtitle,
  subtitle2,
  colors,
}) => (
  <>
    <span
      className={`inline-block w-fit px-3 py-1.5 mb-3 rounded-md backdrop-blur-sm text-sm font-bold
                  uppercase tracking-wide text-white shadow-lg ${colors.badgeAlpha}
                  landscape-mobile:px-2.5 landscape-mobile:py-1 landscape-mobile:text-xs landscape-mobile:mb-2
                  md:px-3 md:py-1.5 md:mb-2 md:text-sm
                  lg:mb-3
                  `}
    >
      {title}
    </span>
    <div>
      <h3
        className='text-2xl landscape-mobile:text-2xl sm:text-3xl md:text-2xl lg:text-4xl
                 font-bold text-white mb-2 landscape-mobile:mb-1 md:mb-2 leading-tight tracking-tight'
      >
        <div>{subtitle}</div>
        {subtitle2 && <div>{subtitle2}</div>}
      </h3>
      <p className='text-xs landscape-mobile:text-xs sm:text-sm md:text-sm text-white/90 mb-2 landscape-mobile:mb-2 md:mb-2 lg:mb-3 font-medium'>
        Certificação Internacional
      </p>
    </div>
  </>
)
