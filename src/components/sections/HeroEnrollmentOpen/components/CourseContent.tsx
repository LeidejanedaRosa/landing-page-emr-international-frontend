import React, { memo } from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'
import { CourseCTAButton } from './CourseCTAButton'
import { CourseDateBox } from './CourseDateBox'
import { CourseInfoBlock } from './CourseInfoBlock'

interface CourseContentProps {
  title: string
  subtitle: string
  date: string
  month: string
  monthNumber: string
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
    monthNumber,
    year,
    accentColor,
    ctaLabel,
    ctaAriaLabel,
  }) => {
    const colors = ACCENT_COLORS[accentColor]

    return (
      <div className='absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 sm:pb-10 md:px-10 md:pb-12 lg:px-16 lg:pb-16 xl:px-20 xl:pb-20'>
        <div className='max-w-screen-2xl mx-auto'>
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-5 lg:gap-8'>
            <div className='flex-1 min-w-0 lg:max-w-[calc(100%-160px)] xl:max-w-3xl'>
              <CourseInfoBlock
                title={title}
                subtitle={subtitle}
                colors={colors}
                variant='card'
              />

              <CourseCTAButton
                courseTitle={title}
                ctaLabel={ctaLabel}
                ctaAriaLabel={ctaAriaLabel}
                colors={colors}
                variant='card'
              />
            </div>

            <CourseDateBox
              date={date}
              month={month}
              monthNumber={monthNumber}
              year={year}
              accentColor={accentColor}
              isMobile
            />

            <CourseDateBox
              date={date}
              month={month}
              monthNumber={monthNumber}
              year={year}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    )
  }
)

CourseContent.displayName = 'CourseContent'
