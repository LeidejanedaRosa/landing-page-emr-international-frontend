import React, { memo } from 'react'

import type { CourseCardProps } from '../types'
import { CourseContent } from './CourseContent'
import { CourseImage } from './CourseImage'

export const CourseCard: React.FC<CourseCardProps> = memo(
  ({
    title,
    subtitle,
    subtitle2,
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
        className={`relative group overflow-hidden flex-1 flex flex-col lg:block lg:max-h-[85vh] ${scaleClass} ${scale}`}
        tabIndex={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={`Curso ${title}: ${subtitle}`}
      >
        <div className='relative h-[55%] min-h-[180px] lg:absolute lg:inset-0 lg:h-full'>
          <CourseImage
            imageAvif={imageAvif}
            imageWebp={imageWebp}
            imageJpg={imageJpg}
            title={title}
            subtitle={subtitle}
          />
        </div>

        <div
          className='hidden lg:block absolute inset-0 bg-gradient-to-t from-black via-black/60 via-35% to-transparent
                     group-hover:from-black/95 group-hover:via-black/70 transition-all duration-700 ease-out'
          aria-hidden='true'
        />

        <CourseContent
          accentColor={accentColor}
          ctaLabel='INSCREVA-SE AGORA'
          ctaAriaLabel={`Inscrever-se no curso ${title}`}
          date={date}
          month={month}
          monthNumber={monthNumber}
          prefersReducedMotion={prefersReducedMotion}
          subtitle={subtitle}
          subtitle2={subtitle2}
          title={title}
          year={year}
        />
      </article>
    )
  }
)

CourseCard.displayName = 'CourseCard'
