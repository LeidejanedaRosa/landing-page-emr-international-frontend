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
          className={`flex md:hidden w-full items-center justify-center gap-2 sm:gap-2.5 ${colors.dateBox} backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xl border border-white/10`}
          role='text'
          aria-label={`Data do curso: ${formattedDate}`}
        >
          <time
            dateTime={isoDate}
            className='flex items-center gap-2 sm:gap-2.5 justify-center'
          >
            <span className='text-xl sm:text-2xl font-black text-white'>
              {date}
            </span>
            <div className='flex items-center justify-center gap-1.5 sm:gap-2'>
              <span className='text-xl sm:text-2xl font-bold text-white uppercase leading-none'>
                {month}
              </span>
              <span className='text-xl sm:text-2xl font-semibold text-white/90'>
                {year}
              </span>
            </div>
          </time>
        </div>
      )
    }

    return (
      <div
        className={`hidden md:flex flex-col items-center justify-center flex-shrink-0 ${colors.dateBox} backdrop-blur-md rounded-lg md:rounded-xl px-6 py-4 md:px-8 md:py-6 lg:px-10 lg:py-8 shadow-2xl min-w-[100px] md:min-w-[120px] lg:min-w-[140px] border border-white/10`}
        role='text'
        aria-label={`Data do curso: ${formattedDate}`}
      >
        <time dateTime={isoDate} className='flex flex-col items-center'>
          <span className='text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black text-white leading-none'>
            {date}
          </span>
          <span className='text-base md:text-lg lg:text-2xl font-bold text-white uppercase mt-1 lg:mt-2'>
            {month}
          </span>
          <span className='text-xs md:text-sm lg:text-lg font-semibold text-white/90 mt-0.5 lg:mt-1'>
            {year}
          </span>
        </time>
      </div>
    )
  }
)

CourseDateBox.displayName = 'CourseDateBox'
