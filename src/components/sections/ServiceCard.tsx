import React, { memo } from 'react'

import {
  useAccessibilityPreferences,
  useUniqueId,
} from '../../hooks/useAccessibility'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface ServiceIconProps {
  icon: React.ReactNode
  title: string
  iconId: string
}

const ServiceIcon: React.FC<ServiceIconProps> = memo(
  ({ icon, title, iconId }) => {
    return (
      <div className='text-cta-600 mb-4' role='img' aria-labelledby={iconId}>
        <span id={iconId} className='sr-only'>
          Ícone representando o serviço: {title}
        </span>
        {icon}
      </div>
    )
  }
)

ServiceIcon.displayName = 'ServiceIcon'

export const ServiceCard: React.FC<ServiceCardProps> = memo(
  ({ id, title, description, icon }) => {
    const cardId = useUniqueId(`service-card-${id}`)
    const titleId = useUniqueId(`service-title-${id}`)
    const iconId = useUniqueId(`service-icon-${id}`)
    const { prefersReducedMotion } = useAccessibilityPreferences()

    return (
      <article
        id={cardId}
        className={`
        bg-white p-8 rounded-xl shadow-lg transition-all duration-300
        hover:shadow-xl
        ${!prefersReducedMotion ? 'hover:-translate-y-1' : ''}
      `}
        aria-labelledby={titleId}
      >
        {icon && <ServiceIcon icon={icon} title={title} iconId={iconId} />}

        <header>
          <h3 id={titleId} className='text-xl font-semibold mb-4 text-cta-600'>
            {title}
          </h3>
        </header>

        <p className='text-primary-700 leading-relaxed'>{description}</p>
      </article>
    )
  }
)
