import React, { memo } from 'react'

import { ACCENT_COLORS } from '../constants'
import type { CourseCardProps } from '../types'
import { CourseDateBox } from './CourseDateBox'

const WHATSAPP_NUMBER = '5519971575640'
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

interface CourseContentProps {
  title: string
  subtitle: string
  date: string
  month: string
  monthNumber: string
  year: string
  accentColor: CourseCardProps['accentColor']
  ctaLabel: string
  ctaAriaLabel: string
}

export const CourseContent: React.FC<CourseContentProps> = memo(
  ({
    title,
    subtitle,
    date,
    month,
    monthNumber,
    year,
    accentColor,
    ctaLabel,
    ctaAriaLabel,
  }) => {
    const colors = ACCENT_COLORS[accentColor]
    const whatsappMessage = encodeURIComponent(
      `Olá! Tenho interesse no curso ${title}. Gostaria de mais informações.`
    )
    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${whatsappMessage}`

    return (
      <div className='absolute inset-x-0 bottom-0 px-6 pb-8 md:px-10 md:pb-12 lg:px-16 lg:pb-16 xl:px-20 xl:pb-20'>
        <div className='max-w-screen-2xl mx-auto'>
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8'>
            <div className='flex-1 min-w-0 lg:max-w-[calc(100%-160px)] xl:max-w-3xl'>
              <span
                className={`inline-block px-4 py-2 mb-5 md:mb-6 rounded-md ${colors.badgeAlpha} backdrop-blur-sm text-sm md:text-base font-bold uppercase tracking-wide text-white shadow-lg`}
              >
                {title}
              </span>

              <h3 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight tracking-tight'>
                {subtitle}
              </h3>

              <p className='text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 font-medium'>
                Certificação Internacional
              </p>

              <a
                href={whatsappUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-block w-full md:w-auto px-10 py-4 md:px-12 md:py-5 ${colors.button} text-white font-bold text-base md:text-lg lg:text-xl rounded-lg shadow-2xl
                           transition-all duration-300 transform hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98]
                           focus:outline-none focus:ring-4 ${colors.focusRing} text-center`}
                aria-label={ctaAriaLabel}
              >
                {ctaLabel} →
              </a>
            </div>

            <CourseDateBox
              date={date}
              month={month}
              monthNumber={monthNumber}
              year={year}
              accentColor={accentColor}
              isMobile
            />

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
    )
  }
)

CourseContent.displayName = 'CourseContent'
