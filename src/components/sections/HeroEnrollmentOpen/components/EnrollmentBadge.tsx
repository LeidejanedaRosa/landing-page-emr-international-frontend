import React from 'react'

import type { CourseCardProps } from '../types'

interface EnrollmentBadgeProps {
  accentColor: CourseCardProps['accentColor']
  prefersReducedMotion: boolean
}

export const EnrollmentBadge: React.FC<EnrollmentBadgeProps> = ({
  accentColor,
  prefersReducedMotion,
}) => {
  const colorClass = accentColor === 'red' ? 'bg-red-500' : 'bg-yellow-500'
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-5 py-2.5 landscape-mobile:px-3 landscape-mobile:py-1.5 landscape-mobile:gap-1.5 md:px-6 md:py-3 rounded-full
                   bg-white/95 backdrop-blur-md shadow-xl border border-white/20 ${
                     prefersReducedMotion
                       ? ''
                       : 'animate-[pulse_2s_ease-in-out_infinite]'
                   }`}
      role='status'
      aria-label='Inscrições abertas'
    >
      <span className='relative flex h-3 w-3 landscape-mobile:h-2 landscape-mobile:w-2 md:h-3.5 md:w-3.5'>
        <span
          className={`${prefersReducedMotion ? '' : 'animate-ping'} absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`}
          aria-hidden='true'
        />
        <span
          className={`relative inline-flex rounded-full h-3 w-3 landscape-mobile:h-2 landscape-mobile:w-2 md:h-3.5 md:w-3.5 ${colorClass}`}
          aria-hidden='true'
        />
      </span>
      <span className='text-sm landscape-mobile:text-xs md:text-base font-bold text-gray-900 uppercase tracking-wide'>
        Inscrições Abertas
      </span>
    </div>
  )
}
