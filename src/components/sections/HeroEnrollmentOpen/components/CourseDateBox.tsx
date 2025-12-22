import React, { memo } from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'

interface CourseDateBoxProps {
  date: string
  month: string
  monthNumber: string
  year: string
  accentColor: CourseCardProps['accentColor']
  isMobile?: boolean
}

export const CourseDateBox: React.FC<CourseDateBoxProps> = memo(
  ({ date, month, monthNumber, year, accentColor, isMobile = false }) => {
    const colors = ACCENT_COLORS[accentColor]
    const formattedDate = `${date} de ${month} de ${year}`
    const isoDate = `${year}-${monthNumber.padStart(2, '0')}-${date.padStart(2, '0')}`

    if (isMobile) {
      return (
        <div
          className={`md:hidden flex items-center gap-2 ${colors.dateBox} backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl`}
          role='text'
          aria-label={`Data do curso: ${formattedDate}`}
        >
          <time dateTime={isoDate} className='flex items-center gap-2'>
            <span className='text-2xl font-black text-white'>{date}</span>
            <div className='flex flex-col'>
              <span className='text-sm font-bold text-white uppercase leading-none'>
                {month}
              </span>
              <span className='text-xs font-semibold text-white/90'>
                {year}
              </span>
            </div>
          </time>
        </div>
      )
    }

    return (
      <div
        className={`hidden md:flex flex-col items-center justify-center ${colors.dateBox} backdrop-blur-sm rounded-lg px-6 py-4 shadow-2xl min-w-[100px]`}
        role='text'
        aria-label={`Data do curso: ${formattedDate}`}
      >
        <time dateTime={isoDate} className='flex flex-col items-center'>
          <span className='text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-none'>
            {date}
          </span>
          <span className='text-lg lg:text-xl font-bold text-white uppercase mt-1'>
            {month}
          </span>
          <span className='text-sm lg:text-base font-semibold text-white/90 mt-1'>
            {year}
          </span>
        </time>
      </div>
    )
  }
)

CourseDateBox.displayName = 'CourseDateBox'
