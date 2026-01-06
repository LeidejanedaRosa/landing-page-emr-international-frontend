import { Award, Clock } from 'lucide-react'

import type { CourseLevelInfoProps } from '../types'

export const CourseLevelInfo = ({
  currentLevel,
  certification,
  styles,
}: CourseLevelInfoProps) => (
  <div className='mb-3'>
    <p className='text-lg font-semibold text-white'>
      {currentLevel.code}{' '}
      <span className='text-primary-300 font-normal'>
        - {currentLevel.name}
      </span>
    </p>
    <div className='flex items-center gap-4 text-sm text-primary-300 mt-1'>
      <div className='flex items-center gap-1.5'>
        <Clock className={`w-4 h-4 ${styles.icon}`} aria-hidden='true' />
        <span>{currentLevel.duration}</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <Award className={`w-4 h-4 ${styles.icon}`} aria-hidden='true' />
        <span>{certification}</span>
      </div>
    </div>
  </div>
)
