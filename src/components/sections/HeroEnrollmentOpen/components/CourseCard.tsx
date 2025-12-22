import React, { memo } from 'react'

import type { CourseCardProps } from '../types'
import { CourseContent } from './CourseContent'
import { CourseImage } from './CourseImage'
import { EnrollmentBadge } from './EnrollmentBadge'

export const CourseCard: React.FC<CourseCardProps> = memo(
  ({
    title,
    subtitle,
    date,
    month,
    monthNumber,
    year,
    imageAvif,
    imageWebp,
    imageJpg,
    accentColor,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    prefersReducedMotion,
  }) => {
    const scaleClass = prefersReducedMotion
      ? ''
      : 'transition-transform duration-500 ease-out'
    const scale = isHovered ? 'lg:scale-105' : 'lg:scale-100'

    return (
      <article
        className={`relative group overflow-hidden h-[85vh] ${scaleClass} ${scale}`}
        tabIndex={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={`Curso ${title}: ${subtitle}`}
      >
        <CourseImage
          imageAvif={imageAvif}
          imageWebp={imageWebp}
          imageJpg={imageJpg}
          title={title}
          subtitle={subtitle}
        />

        <div
          className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30
                     group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500'
          aria-hidden='true'
        />

        <EnrollmentBadge
          accentColor={accentColor}
          prefersReducedMotion={prefersReducedMotion}
        />

        <CourseContent
          title={title}
          subtitle={subtitle}
          date={date}
          month={month}
          monthNumber={monthNumber}
          year={year}
          accentColor={accentColor}
          ctaLabel='INSCREVA-SE AGORA'
          ctaAriaLabel={`Inscrever-se no curso ${title}`}
        />
      </article>
    )
  }
)

CourseCard.displayName = 'CourseCard'
