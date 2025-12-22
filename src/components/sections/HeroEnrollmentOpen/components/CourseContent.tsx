import React, { memo } from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'
import { CourseDateBox } from './CourseDateBox'

interface CourseContentProps {
  title: string
  subtitle: string
  date: string
  month: string
  year: string
  accentColor: CourseCardProps['accentColor']
  ctaLabel: string
  ctaAriaLabel: string
}

export const CourseContent: React.FC<CourseContentProps> = memo(
  ({
    title,
    subtitle,
    date,
    month,
    year,
    accentColor,
    ctaLabel,
    ctaAriaLabel,
  }) => {
    const colors = ACCENT_COLORS[accentColor]

    return (
      <div className='absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10'>
        <div className='flex items-end justify-between gap-4'>
          <div className='flex-1 min-w-0'>
            <span
              className={`inline-block px-3 py-1 mb-4 rounded ${colors.badgeAlpha} backdrop-blur-sm text-xs md:text-sm font-bold uppercase tracking-wider text-white`}
            >
              {title}
            </span>

            <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight'>
              {subtitle}
            </h3>

            <p className='text-sm md:text-base text-white/90 mb-6 font-medium'>
              Certificação Internacional
            </p>

            <button
              className={`w-full md:w-auto px-8 py-4 ${colors.button} text-white font-bold text-base md:text-lg rounded-lg shadow-xl
                         transition-all duration-300 transform hover:scale-105
                         focus:outline-none focus:ring-4 ${colors.focusRing}`}
              aria-label={ctaAriaLabel}
              type='button'
            >
              {ctaLabel} →
            </button>
          </div>

          <CourseDateBox
            date={date}
            month={month}
            year={year}
            accentColor={accentColor}
          />

          <CourseDateBox
            date={date}
            month={month}
            year={year}
            accentColor={accentColor}
            isMobile
          />
        </div>
      </div>
    )
  }
)

CourseContent.displayName = 'CourseContent'
