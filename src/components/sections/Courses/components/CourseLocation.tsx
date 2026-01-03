import { memo } from 'react'

import { MapPin } from 'lucide-react'

import type { CourseLocationProps } from '../types'

export const CourseLocation = memo(
  ({ location, icon }: CourseLocationProps) => (
    <div className='flex items-start gap-2 text-sm text-primary-300'>
      <MapPin
        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${icon}`}
        aria-hidden='true'
      />
      <span>{location}</span>
    </div>
  )
)

CourseLocation.displayName = 'CourseLocation'
