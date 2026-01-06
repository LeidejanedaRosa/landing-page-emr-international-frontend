import { Bell } from 'lucide-react'

import { getBadgeColorClass } from '../constants'
import type { CourseStatusBadgeProps } from '../types'

export const CourseStatusBadge = ({
  status,
  variant,
}: CourseStatusBadgeProps) => {
  if (status === 'closed') return null

  const isOpen = status === 'open'
  const colorClass = getBadgeColorClass(variant)

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-white/20 mb-3 ${
        isOpen ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''
      }`}
      role='status'
      aria-live='polite'
    >
      {isOpen ? (
        <>
          <span className='relative flex h-2.5 w-2.5'>
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`}
              aria-hidden='true'
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colorClass}`}
              aria-hidden='true'
            />
          </span>
          <span className='text-xs font-bold text-gray-900 uppercase tracking-wide'>
            Inscrições Abertas
          </span>
        </>
      ) : (
        <>
          <Bell className='w-3.5 h-3.5 text-gray-600' aria-hidden='true' />
          <span className='text-xs font-bold text-gray-700 uppercase tracking-wide'>
            Avise-me
          </span>
        </>
      )}
    </div>
  )
}
