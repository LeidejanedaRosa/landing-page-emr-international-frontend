import React, { memo } from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'
import { CourseCTAButton } from './CourseCTAButton'
import { CourseDateBox } from './CourseDateBox'
import { CourseInfoBlock } from './CourseInfoBlock'

interface CourseContentProps {
  title: string
  subtitle: string
  subtitle2?: string
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
    subtitle2,
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
      <div
        className='absolute inset-x-0 bottom-0 px-4 pb-6 mb-5
                        sm:px-6 sm:pb-8 
                        md:px-10 md:pb-12 
                        lg:px-16 lg:pb-16'
      >
        <div className='max-w-screen-2xl mx-auto'>
          <CourseInfoBlock
            title={title}
            subtitle={subtitle}
            subtitle2={subtitle2}
            colors={colors}
          />

          <div
            className='flex flex-col gap-3 
                            sm:flex-row sm:items-center sm:gap-4 
                            md:items-end md:justify-between'
          >
            <CourseCTAButton
              courseTitle={title}
              ctaLabel={ctaLabel}
              ctaAriaLabel={ctaAriaLabel}
              colors={colors}
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
