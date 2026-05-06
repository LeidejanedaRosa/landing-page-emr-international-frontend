import React from 'react'

import type { CourseCardProps } from '../types'
import { CourseContent } from './CourseContent'
import { CourseImage } from './CourseImage'

export const CourseCard: React.FC<CourseCardProps> = ({
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
      className={`relative group overflow-hidden flex-1 flex flex-col md:block md:max-h-[85vh] ${scaleClass} ${scale}`}
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={subtitle ? `Curso ${title}: ${subtitle}` : `Curso ${title}`}
    >
      <div className='relative min-h-[160px] sm:min-h-[200px] landscape-mobile:absolute landscape-mobile:inset-0 landscape-mobile:h-full md:absolute md:inset-0 md:h-full'>
        <CourseImage
          imageAvif={imageAvif}
          imageWebp={imageWebp}
          imageJpg={imageJpg}
          title={title}
          subtitle={subtitle}
        />
      </div>

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
