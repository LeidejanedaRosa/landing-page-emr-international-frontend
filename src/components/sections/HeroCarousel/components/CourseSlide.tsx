import { memo, useCallback } from 'react'

import { useAccessibilityPreferences } from '../../../../hooks/useAccessibility'
import {
  CourseDateBox,
  CourseImage,
  EnrollmentBadge,
} from '../../HeroEnrollmentOpen/components'
import { ACCENT_COLORS } from '../../HeroEnrollmentOpen/constants'
import type { CourseData } from '../../HeroEnrollmentOpen/types'

interface CourseSlideProps {
  course: CourseData
  onCtaClick?: () => void
}

interface SlideContentProps {
  course: CourseData
  colors: (typeof ACCENT_COLORS)[keyof typeof ACCENT_COLORS]
  prefersReducedMotion: boolean
  onCtaClick: () => void
}

const MobileSlideContent = memo<SlideContentProps>(
  ({ course, colors, prefersReducedMotion, onCtaClick }) => (
    <>
      <div className='relative h-[45%] lg:hidden'>
        <CourseImage
          imageAvif={course.imageAvif}
          imageWebp={course.imageWebp}
          imageJpg={course.imageJpg}
          title={course.title}
          subtitle={course.subtitle}
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

      <div className='flex-1 flex flex-col justify-center px-6 py-6 lg:hidden'>
        <span
          className={`inline-block w-fit px-4 py-2 mb-4 rounded-md ${colors.badgeAlpha} backdrop-blur-sm text-sm font-bold uppercase tracking-wide text-white shadow-lg`}
        >
          {course.title}
        </span>

        <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight tracking-tight'>
          {course.subtitle}
        </h3>

        <p className='text-base text-white/90 mb-6 font-medium'>
          Certificação Internacional
        </p>

        <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'>
          <button
            className={`w-full sm:w-auto px-8 py-4 ${colors.button} text-white font-bold text-base rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 ${colors.focusRing}`}
            aria-label={course.ctaAriaLabel}
            type='button'
            onClick={onCtaClick}
          >
            {course.ctaLabel} →
          </button>

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
)

MobileSlideContent.displayName = 'MobileSlideContent'

const DesktopSlideContent = memo<SlideContentProps>(
  ({ course, colors, prefersReducedMotion, onCtaClick }) => (
    <div className='hidden lg:block absolute inset-0'>
      <CourseImage
        imageAvif={course.imageAvif}
        imageWebp={course.imageWebp}
        imageJpg={course.imageJpg}
        title={course.title}
        subtitle={course.subtitle}
      />
      <div
        className='absolute inset-0 bg-gradient-to-t from-black via-black/60 via-35% to-transparent'
        aria-hidden='true'
      />
      <EnrollmentBadge
        accentColor={course.accentColor}
        prefersReducedMotion={prefersReducedMotion}
      />

      <div className='absolute inset-x-0 bottom-0 px-16 pb-16 xl:px-20 xl:pb-20'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-row items-end justify-between gap-8'>
            <div className='flex-1 min-w-0 max-w-3xl'>
              <span
                className={`inline-block px-4 py-2 mb-6 rounded-md ${colors.badgeAlpha} backdrop-blur-sm text-base font-bold uppercase tracking-wide text-white shadow-lg`}
              >
                {course.title}
              </span>

              <h3 className='text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight tracking-tight'>
                {course.subtitle}
              </h3>

              <p className='text-xl text-white/90 mb-10 font-medium'>
                Certificação Internacional
              </p>

              <button
                className={`px-12 py-5 ${colors.button} text-white font-bold text-xl rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 ${colors.focusRing}`}
                aria-label={course.ctaAriaLabel}
                type='button'
                onClick={onCtaClick}
              >
                {course.ctaLabel} →
              </button>
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
)

DesktopSlideContent.displayName = 'DesktopSlideContent'

export const CourseSlide = memo<CourseSlideProps>(({ course, onCtaClick }) => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const colors = ACCENT_COLORS[course.accentColor]

  const handleCtaClick = useCallback(() => {
    if (onCtaClick) {
      onCtaClick()
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [onCtaClick])

  return (
    <article
      className='relative w-full h-full bg-black overflow-hidden flex flex-col lg:block'
      aria-label={`Curso ${course.title}: ${course.subtitle}`}
    >
      <MobileSlideContent
        course={course}
        colors={colors}
        prefersReducedMotion={prefersReducedMotion}
        onCtaClick={handleCtaClick}
      />
      <DesktopSlideContent
        course={course}
        colors={colors}
        prefersReducedMotion={prefersReducedMotion}
        onCtaClick={handleCtaClick}
      />
    </article>
  )
})

CourseSlide.displayName = 'CourseSlide'
