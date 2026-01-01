import React from 'react'

import { useAccessibilityPreferences } from '../../../../hooks/useAccessibility'
import {
  CourseCTAButton,
  CourseDateBox,
  CourseImage,
  CourseInfoBlock,
  EnrollmentBadge,
} from '../../HeroEnrollmentOpen/components'
import { ACCENT_COLORS } from '../../HeroEnrollmentOpen/constants'
import type { CourseData } from '../../HeroEnrollmentOpen/types'

interface CourseSlideProps {
  course: CourseData
  isActive?: boolean
}

interface SlideContentProps {
  course: CourseData
  colors: (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]
  prefersReducedMotion: boolean
  priority?: boolean
}

const MobileSlideContent: React.FC<SlideContentProps> = ({
  course,
  colors,
  prefersReducedMotion,
  priority,
}) => (
  <>
    <div className='relative h-[40%] '>
      <CourseImage
        imageAvif={course.imageAvif}
        imageWebp={course.imageWebp}
        imageJpg={course.imageJpg}
        title={course.title}
        subtitle={course.subtitle}
        priority={priority}
      />
      <div
        className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent'
        aria-hidden='true'
      />
      <EnrollmentBadge
        accentColor={course.accentColor}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>

    <div className='flex-1 flex flex-col justify-center px-6 pt-4 pb-4 sm:pb-6 md:hidden'>
      <CourseInfoBlock
        title={course.title}
        subtitle={course.subtitle}
        colors={colors}
        variant='mobile'
      />

      <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'>
        <CourseCTAButton
          courseTitle={course.title}
          ctaLabel={course.ctaLabel}
          ctaAriaLabel={course.ctaAriaLabel}
          colors={colors}
          variant='mobile'
        />

        <CourseDateBox
          date={course.date}
          month={course.month}
          monthNumber={course.monthNumber}
          year={course.year}
          accentColor={course.accentColor}
          isMobile
        />
      </div>
    </div>
  </>
)

const TabletDesktopSlideContent: React.FC<SlideContentProps> = ({
  course,
  colors,
  prefersReducedMotion,
  priority,
}) => (
  <div className='hidden md:block absolute inset-0'>
    <div className='absolute inset-0'>
      <CourseImage
        imageAvif={course.imageAvif}
        imageWebp={course.imageWebp}
        imageJpg={course.imageJpg}
        title={course.title}
        subtitle={course.subtitle}
        priority={priority}
      />
    </div>
    <div
      className='absolute inset-0 bg-gradient-to-t from-black via-black/60 via-35% to-transparent'
      aria-hidden='true'
    />
    <EnrollmentBadge
      accentColor={course.accentColor}
      prefersReducedMotion={prefersReducedMotion}
    />

    <div className='absolute inset-x-0 bottom-0 px-8 pb-8 md:px-10 md:pb-10 lg:px-16 lg:pb-16 xl:px-20 xl:pb-20'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='flex flex-row items-end justify-between gap-6 lg:gap-8'>
          <div className='flex-1 min-w-0 max-w-3xl'>
            <CourseInfoBlock
              title={course.title}
              subtitle={course.subtitle}
              colors={colors}
              variant='desktop'
            />

            <CourseCTAButton
              courseTitle={course.title}
              ctaLabel={course.ctaLabel}
              ctaAriaLabel={course.ctaAriaLabel}
              colors={colors}
              variant='desktop'
            />
          </div>

          <CourseDateBox
            date={course.date}
            month={course.month}
            monthNumber={course.monthNumber}
            year={course.year}
            accentColor={course.accentColor}
          />
        </div>
      </div>
    </div>
  </div>
)

export const CourseSlide: React.FC<CourseSlideProps> = ({
  course,
  isActive = false,
}) => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const colors = ACCENT_COLORS[course.accentColor]

  return (
    <article
      className='relative w-full h-full bg-black overflow-hidden flex flex-col md:block'
      aria-label={`Curso ${course.title}: ${course.subtitle}`}
    >
      <MobileSlideContent
        course={course}
        colors={colors}
        prefersReducedMotion={prefersReducedMotion}
        priority={isActive}
      />
      <TabletDesktopSlideContent
        course={course}
        colors={colors}
        prefersReducedMotion={prefersReducedMotion}
        priority={isActive}
      />
    </article>
  )
}
