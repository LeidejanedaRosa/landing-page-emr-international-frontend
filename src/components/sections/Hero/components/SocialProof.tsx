import { memo } from 'react'

import { HERO_CONTENT } from '../constants'
import type { SocialProofProps } from '../types'

export const SocialProof = memo<SocialProofProps>(
  ({
    studentsText = HERO_CONTENT.socialProof.students,
    methodologyText = HERO_CONTENT.socialProof.methodology,
  }) => (
    <div
      className='sm:mt-10 md:mt-12 flex flex-row items-center justify-center text-center gap-3 sm:gap-6 text-gray-400 text-xs sm:text-sm font-medium border-t border-white/10 pt-4 sm:pt-6'
      role='group'
      aria-label='Indicadores de confiança'
    >
      <p>{studentsText}</p>
      <div className='w-1 h-1 bg-gray-600 rounded-full' aria-hidden='true' />
      <p>{methodologyText}</p>
    </div>
  )
)

SocialProof.displayName = 'SocialProof'
