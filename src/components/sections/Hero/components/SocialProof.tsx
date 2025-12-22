import { memo } from 'react'

import { HERO_CONTENT } from '../constants'
import type { SocialProofProps } from '../types'

/**
 * Social Proof Component
 *
 * Displays trust indicators and statistics
 *
 * Clean Code principles:
 * - Single Responsibility: Only displays social proof
 * - Semantic HTML: Uses proper list structure
 * - Accessibility: Screen reader friendly
 */
export const SocialProof = memo<SocialProofProps>(
  ({
    studentsText = HERO_CONTENT.socialProof.students,
    methodologyText = HERO_CONTENT.socialProof.methodology,
  }) => (
    <div
      className='mt-12 flex items-center gap-6 text-gray-500 text-sm font-medium border-t border-white/10 pt-6'
      role='group'
      aria-label='Indicadores de confiança'
    >
      <p>{studentsText}</p>
      <div
        className='w-1 h-1 bg-gray-600 rounded-full'
        aria-hidden='true'
        role='separator'
      />
      <p>{methodologyText}</p>
    </div>
  )
)

SocialProof.displayName = 'SocialProof'
