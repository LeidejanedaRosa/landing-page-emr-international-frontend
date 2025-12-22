import { memo } from 'react'

import { ShieldCheck } from 'lucide-react'

import { HERO_CONTENT } from '../constants'
import type { TrustBadgeProps } from '../types'

/**
 * Trust Badge Component
 *
 * Displays certification badge with proper accessibility
 *
 * Clean Code principles:
 * - Single Responsibility: Only displays trust badge
 * - Semantic HTML: Uses div with proper ARIA attributes
 * - Accessibility: Icon marked as decorative, text is readable
 */
export const TrustBadge = memo<TrustBadgeProps>(
  ({
    label = HERO_CONTENT.badge.label,
    ariaLabel = HERO_CONTENT.badge.ariaLabel,
  }) => (
    <div
      className='inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm mb-6 animate-fade-in-up'
      role='status'
      aria-label={ariaLabel}
    >
      <ShieldCheck className='w-4 h-4 text-red-600' aria-hidden='true' />
      <span className='text-xs font-bold tracking-wider text-gray-200 uppercase'>
        {label}
      </span>
    </div>
  )
)

TrustBadge.displayName = 'TrustBadge'
