import { memo } from 'react'

import { ArrowRight } from 'lucide-react'

import { AccessibleButton } from '../../../ui/AccessibleButton'
import { HERO_CONTENT } from '../constants'
import type { HeroCTAProps } from '../types'

/**
 * Hero Call-to-Action Button
 *
 * High-impact CTA with visual feedback
 *
 * Clean Code principles:
 * - Single Responsibility: Only renders CTA button
 * - DRY: Reuses AccessibleButton component
 * - Accessibility: Uses existing accessible button
 *
 * Note: Replaced raw button with AccessibleButton for:
 * - Consistent keyboard navigation
 * - ARIA attributes
 * - Loading states support
 */
export const HeroCTA = memo<HeroCTAProps>(
  ({
    onClick,
    text = HERO_CONTENT.cta.text,
    ariaLabel = HERO_CONTENT.cta.ariaLabel,
  }) => (
    <div className='mt-6 sm:mt-8'>
      <AccessibleButton
        onClick={onClick}
        aria-label={ariaLabel}
        className='group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] uppercase tracking-wide overflow-hidden w-full sm:w-auto'
      >
        <span className='relative z-10'>{text}</span>
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
