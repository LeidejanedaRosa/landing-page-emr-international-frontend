import React, { memo } from 'react'

import { useAccessibilityPreferences } from '../../../hooks/useAccessibility'
import { CourseCard } from './components'
import { COURSES_DATA } from './constants'
import { useCourseHover } from './hooks/useCourseHover'

/**
 * HeroEnrollmentOpen Component
 *
 * Displays promotional course cards for courses with open enrollment.
 * Follows SOLID principles with separated concerns and single responsibility.
 *
 * @component
 * @example
 * ```tsx
 * <HeroEnrollmentOpen />
 * ```
 */
export const HeroEnrollmentOpen: React.FC = memo(() => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const { createHoverHandlers } = useCourseHover()

  // Structured data for SEO (Schema.org Course markup)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: COURSES_DATA.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: `${course.title} - ${course.subtitle}`,
        description: 'Certificação Internacional',
        provider: {
          '@type': 'Organization',
          name: 'EMR Internacional',
        },
        startDate: `${course.year}-${course.month}-${course.date}`,
        courseMode: 'Presencial',
        educationalCredentialAwarded: 'Certificação Internacional',
      },
    })),
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className='relative w-full max-w-full min-h-[500px] md:min-h-[650px] lg:h-[70vh] m-0 p-0'
        aria-labelledby='enrollment-heading'
      >
        <h2 id='enrollment-heading' className='sr-only'>
          Cursos com inscrições abertas
        </h2>

        <div className='w-full h-full' role='list'>
          {COURSES_DATA.map(course => {
            const handlers = createHoverHandlers(course.id)

            return (
              <div key={course.id} role='listitem'>
                <CourseCard
                  title={course.title}
                  subtitle={course.subtitle}
                  date={course.date}
                  month={course.month}
                  year={course.year}
                  imageAvif={course.imageAvif}
                  imageWebp={course.imageWebp}
                  imageJpg={course.imageJpg}
                  accentColor={course.accentColor}
                  isHovered={handlers.isHovered}
                  onMouseEnter={handlers.onMouseEnter}
                  onMouseLeave={handlers.onMouseLeave}
                  onFocus={handlers.onFocus}
                  onBlur={handlers.onBlur}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
})

HeroEnrollmentOpen.displayName = 'HeroEnrollmentOpen'
