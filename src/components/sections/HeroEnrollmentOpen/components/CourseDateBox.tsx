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
          className={`flex lg:hidden w-full md:w-auto items-center justify-center gap-3 ${colors.dateBox} backdrop-blur-md rounded-xl px-5 py-3 shadow-2xl border border-white/10`}
          role='text'
          aria-label={`Data do curso: ${formattedDate}`}
        >
          <time
            dateTime={isoDate}
            className='flex items-center gap-3 justify-center'
          >
            <span className='text-3xl font-black text-white'>{date}</span>
            <div className='flex items-center justify-center gap-3'>
              <span className='text-3xl font-bold text-white uppercase leading-none'>
                {month}
              </span>
              <span className='text-3xl font-semibold text-white/90'>
                {year}
              </span>
            </div>
          </time>
        </div>
      )
    }

    return (
      <div
        className={`hidden lg:flex flex-col items-center justify-center flex-shrink-0 ${colors.dateBox} backdrop-blur-md rounded-xl px-10 py-8 shadow-2xl min-w-[140px] border border-white/10`}
        role='text'
        aria-label={`Data do curso: ${formattedDate}`}
      >
        <time dateTime={isoDate} className='flex flex-col items-center'>
          <span className='text-3xl lg:text-5xl xl:text-6xl font-black text-white leading-none'>
            {date}
          </span>
          <span className='text-lg lg:text-2xl font-bold text-white uppercase mt-1 lg:mt-2'>
            {month}
          </span>
          <span className='text-sm lg:text-lg font-semibold text-white/90 mt-0.5 lg:mt-1'>
            {year}
          </span>
        </time>
      </div>
    )
  }
)

CourseDateBox.displayName = 'CourseDateBox'
