import React from 'react'

import { useAccessibilityPreferences } from '../../../hooks/useAccessibility'
import { useHover } from '../../../hooks/useHover'
import { JsonLdScript } from '../../seo/JsonLdScript'
import { CourseCard } from './components'
import { COURSES_DATA } from './constants'

interface HeroEnrollmentOpenProps {
  courseIndex: number
}

export const HeroEnrollmentOpen: React.FC<HeroEnrollmentOpenProps> = ({
  courseIndex,
}) => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const { createHoverHandlers, hoveredItem: hoveredCard } = useHover()

  const course = COURSES_DATA[courseIndex]

  if (!course) return null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.title} - ${course.subtitle} ${course.subtitle2}`,
    description: 'Certificação Internacional',
    provider: {
      '@type': 'Organization',
      name: 'EMR International',
    },
    startDate: `${course.year}-${String(course.monthNumber).padStart(2, '0')}-${String(course.date).padStart(2, '0')}`,
    courseMode: 'Presencial',
    educationalCredentialAwarded: 'Certificação Internacional',
  }

  const handlers = createHoverHandlers(course.id)

  return (
    <>
      <JsonLdScript data={structuredData} />

      <section
        className='relative w-full h-full bg-black flex flex-col overflow-hidden'
        aria-labelledby={`enrollment-heading-${course.id}`}
      >
        <h2 id={`enrollment-heading-${course.id}`} className='sr-only'>
          {course.title} - Inscrições abertas
        </h2>

        <CourseCard
          title={course.title}
          subtitle={course.subtitle}
          subtitle2={course.subtitle2}
          date={course.date}
          month={course.month}
          monthNumber={course.monthNumber}
          year={course.year}
          imageAvif={course.imageAvif}
          imageWebp={course.imageWebp}
          imageJpg={course.imageJpg}
          accentColor={course.accentColor}
          isHovered={hoveredCard === course.id}
          onMouseEnter={handlers.onMouseEnter}
          onMouseLeave={handlers.onMouseLeave}
          onFocus={handlers.onFocus}
          onBlur={handlers.onBlur}
          prefersReducedMotion={prefersReducedMotion}
        />
      </section>
    </>
  )
}
