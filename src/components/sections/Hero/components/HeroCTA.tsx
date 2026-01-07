import { memo } from 'react'

import { ArrowRight } from 'lucide-react'

import { AccessibleButton } from '../../../ui/Accessibility'
import { HERO_CONTENT } from '../constants'
import type { HeroCTAProps } from '../types'

export const HeroCTA = memo<HeroCTAProps>(
  ({
    onClick,
    text = HERO_CONTENT.cta.text,
    ariaLabel = HERO_CONTENT.cta.ariaLabel,
  }) => (
    <div>
      <AccessibleButton
        onClick={onClick}
        aria-label={ariaLabel}
        className='group relative inline-flex items-center justify-center text-nowrap gap-2 rounded-lg sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] uppercase tracking-wide overflow-hidden w-full sm:w-auto'
      >
        <span className='relative z-10 font-bold'>{text}</span>
        <ArrowRight
          className='w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:translate-x-1'
          aria-hidden='true'
        />

        <div
          className='absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 skew-x-12'
          aria-hidden='true'
        />
      </AccessibleButton>
    </div>
  )
)

HeroCTA.displayName = 'HeroCTA'
