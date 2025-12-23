import { memo } from 'react'

import { useAccessibilityPreferences } from '../../../../hooks/useAccessibility'
import { COURSES_DATA } from '../../HeroEnrollmentOpen/constants'
import { getSlideLabels, HERO_CAROUSEL_CONFIG } from '../constants'
import { CourseSlide } from './CourseSlide'
import { HeroContent } from './HeroContent'

interface SlidesTrackProps {
  currentSlide: number
}

export const SlidesTrack = memo<SlidesTrackProps>(({ currentSlide }) => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const slideLabels = getSlideLabels()

  return (
    <div
      className='flex h-full transition-transform ease-out'
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
        transitionDuration: prefersReducedMotion
          ? '0ms'
          : `${HERO_CAROUSEL_CONFIG.transitionDuration}ms`,
      }}
    >
      <div
        className='w-full flex-shrink-0 h-full'
        role='tabpanel'
        aria-label={slideLabels[0]}
        id='hero-slide-0'
      >
        <HeroContent />
      </div>

      {COURSES_DATA.map((course, courseIndex) => (
        <div
          key={course.id}
          className='w-full flex-shrink-0 h-full'
          role='tabpanel'
          aria-label={slideLabels[courseIndex + 1]}
          id={`hero-slide-${courseIndex + 1}`}
        >
          <CourseSlide course={course} />
        </div>
      ))}
    </div>
  )
})

SlidesTrack.displayName = 'SlidesTrack'
