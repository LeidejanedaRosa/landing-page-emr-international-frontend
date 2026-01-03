import React from 'react'

import { Clock } from 'lucide-react'

import { BUSINESS_HOURS } from '../types'

const BusinessHoursInfo: React.FC = () => {
  return (
    <div className='border-b border-gray-100 bg-gray-50 px-6 py-3'>
      <div className='flex items-center gap-2 text-sm text-gray-600'>
        <Clock className='h-4 w-4 text-cta' />
        <span className='font-medium'>Horários de atendimento:</span>
      </div>
      <div className='mt-1 flex flex-wrap gap-x-4 gap-y-1 pl-6 text-sm text-gray-500'>
        <span>
          {BUSINESS_HOURS.weekdays.days}: {BUSINESS_HOURS.weekdays.hours}
        </span>
        <span>
          {BUSINESS_HOURS.saturday.days}: {BUSINESS_HOURS.saturday.hours}
        </span>
      </div>
    </div>
  )
}

BusinessHoursInfo.displayName = 'BusinessHoursInfo'

export default React.memo(BusinessHoursInfo)
