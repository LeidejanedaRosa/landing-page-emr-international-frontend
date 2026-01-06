import React from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'

interface CourseDateBoxProps {
  date: string
  month: string
  monthNumber: string
  year: string
  accentColor: CourseCardProps['accentColor']
}

export const CourseDateBox: React.FC<CourseDateBoxProps> = ({
  date,
  month,
  monthNumber,
  year,
  accentColor,
}) => {
  const colors = ACCENT_COLORS[accentColor]
  const formattedDate = `${date} de ${month} de ${year}`
  const isoDate = `${year}-${monthNumber.padStart(2, '0')}-${date.padStart(2, '0')}`

  return (
    <div
      className={`flex items-center justify-center gap-2 ${colors.dateBox} backdrop-blur-md rounded-lg px-3 py-2
                    shadow-2xl border border-white/10 flex-shrink-0
                    sm:px-4 sm:py-2.5
                    md:flex-col md:items-center md:gap-0 md:px-6 md:py-4
                    lg:px-8 lg:py-6
                  `}
      role='text'
      aria-label={`Data do curso: ${formattedDate}`}
    >
      <time
        dateTime={isoDate}
        className='flex items-center gap-2 md:flex-col md:gap-0'
      >
        <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none'>
          {date}
        </span>
        <span className='text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white uppercase md:mt-1'>
          {month}
        </span>
        <span className='text-lg md:text-sm lg:text-lg font-semibold text-white/90 md:mt-0.5'>
          {year}
        </span>
      </time>
    </div>
  )
}
