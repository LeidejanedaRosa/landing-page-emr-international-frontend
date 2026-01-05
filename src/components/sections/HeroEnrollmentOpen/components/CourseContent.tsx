import React, { memo } from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'
import { CourseCTAButton } from './CourseCTAButton'
import { CourseDateBox } from './CourseDateBox'
import { CourseInfoBlock } from './CourseInfoBlock'
import { EnrollmentBadge } from './EnrollmentBadge'

interface CourseContentProps {
  accentColor: CourseCardProps['accentColor']
  ctaLabel: string
  ctaAriaLabel: string
  date: string
  month: string
  monthNumber: string
  prefersReducedMotion: boolean
  subtitle: string
  subtitle2?: string
  title: string
  year: string
}

export const CourseContent: React.FC<CourseContentProps> = memo(
  ({
    accentColor,
    ctaLabel,
    ctaAriaLabel,
    date,
    month,
    monthNumber,
    prefersReducedMotion,
    subtitle,
    subtitle2,
    title,
    year,
  }) => {
    const colors = ACCENT_COLORS[accentColor]

    return (
      <div
        className='relative flex flex-1 flex-col bg-black py-6
                        sm:px-6 sm:py-8
                        md:px-10 md:py-12
                        lg:absolute lg:inset-x-0 lg:bottom-0 lg:block lg:bg-transparent lg:px-16 lg:pb-16 lg:pt-0'
      >
        <div className='max-w-screen-2xl lg:mx-auto mx-4 flex flex-1 flex-col justify-evenly gap-2 lg:flex-none lg:justify-normal'>
          <div className='flex mb-4'>
            <EnrollmentBadge
              accentColor={accentColor}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
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
