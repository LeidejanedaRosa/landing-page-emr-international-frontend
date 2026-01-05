import { CheckCircle, Star } from 'lucide-react'

import type { CredentialsListProps } from '../types'

const ICONS = {
  check: CheckCircle,
  star: Star,
} as const

export function CredentialsList({
  headingId,
  title,
  description,
  items,
  icon,
  ariaLabel,
}: CredentialsListProps) {
  const IconComponent = ICONS[icon]

  return (
    <section aria-labelledby={headingId} className='mb-5'>
      <h3
        id={headingId}
        className='text-lg sm:text-xl font-bold text-white mb-3'
      >
        {title}
      </h3>
      {description && (
        <p className='text-sm sm:text-base text-gray-200 mb-3 leading-snug'>
          {description}
        </p>
      )}
      <ul
        className='space-y-2 text-gray-200'
        role='list'
        aria-label={ariaLabel}
      >
        {items.map(item => (
          <li
            key={item.id}
            className='flex items-start gap-2 text-sm sm:text-base'
          >
            <IconComponent
              className='w-5 h-5 text-cta-600 flex-shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <span className='font-medium'>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
