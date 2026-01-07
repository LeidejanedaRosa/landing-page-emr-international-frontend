import React from 'react'

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

export const CourseContent: React.FC<CourseContentProps> = ({
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
                  landscape-mobile:absolute landscape-mobile:inset-x-0 landscape-mobile:bottom-0 landscape-mobile:bg-transparent landscape-mobile:py-8 landscape-mobile:px-8
                  sm:px-6 sm:py-8
                  md:py-12 md:absolute md:inset-x-0 md:bottom-0 md:block md:bg-transparent md:px-16 md:pb-16 md:pt-0'
    >
      <div className='landscape-mobile:absolute landscape-mobile:bottom-8 landscape-mobile:right-8 landscape-mobile:z-10 hidden landscape-mobile:block'>
        <CourseDateBox
          date={date}
          month={month}
          monthNumber={monthNumber}
          year={year}
          accentColor={accentColor}
        />
      </div>

      <div
        className='max-w-screen-2xl mx-4 flex flex-1 flex-col justify-evenly gap-2 
                    landscape-mobile:gap-3 landscape-mobile:mx-0 landscape-mobile:flex-none landscape-mobile:justify-normal
                    md:mx-auto md:flex-none md:justify-normal'
      >
        <div className='flex mb-4 landscape-mobile:mb-2'>
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

          <div className='landscape-mobile:hidden'>
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
    </div>
  )
}
