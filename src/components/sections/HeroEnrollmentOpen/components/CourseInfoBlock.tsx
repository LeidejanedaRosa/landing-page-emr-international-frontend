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
                  md:px-4 md:py-2 md:mb-4 md:text-base
                  lg:mb-6
                  `}
    >
      {title}
    </span>
    <div>
      <h3
        className='text-4xl lg:text-5xl
                 font-bold text-white mb-2 md:mb-3 leading-tight tracking-tight'
      >
        <div>{subtitle}</div>
        {subtitle2 && <div>{subtitle2}</div>}
      </h3>
      <p className='text-sm sm:text-base md:text-lg text-white/90 mb-4 md:mb-6 lg:mb-8 font-medium'>
        Certificação Internacional
      </p>
    </div>
  </>
)
