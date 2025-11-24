import React, { memo, Suspense } from 'react'

import { type ServiceData, servicesData } from '../../data/servicesData'
import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../ui/Accessibility'
import { LoadingSpinner } from '../ui/Loading'
import { ServiceCard } from './ServiceCard'

interface ServicesHeaderProps {
  titleId: string
  descriptionId: string
}

interface ServicesGridProps {
  services: ServiceData[]
  titleId: string
}

const ServicesHeader: React.FC<ServicesHeaderProps> = memo(
  ({ titleId, descriptionId }) => {
    return (
      <header className='text-center mb-16'>
        <h2
          id={titleId}
          className='text-3xl md:text-4xl font-bold text-primary-900 mb-4'
        >
          Nossos Serviços Especializados
        </h2>
        <p
          id={descriptionId}
          className='text-lg text-primary-700 max-w-2xl mx-auto leading-relaxed'
        >
          Oferecemos soluções completas em emergências médicas, resgate tático e
          capacitação profissional com padrões internacionais
        </p>
      </header>
    )
  }
)

ServicesHeader.displayName = 'ServicesHeader'

const ServicesGrid: React.FC<ServicesGridProps> = memo(
  ({ services, titleId }) => {
    const { announce } = useScreenReaderAnnouncement()

    const handleServiceFocus = (serviceName: string) => {
      announce(`Focado no serviço: ${serviceName}`, 'polite')
    }

    return (
      <div
        className='grid md:grid-cols-3 gap-8'
        role='list'
        aria-labelledby={titleId}
        aria-describedby='services-description'
      >
        <ScreenReaderOnly>
          <p id='services-description'>
            Lista de {services.length} serviços especializados oferecidos pela
            EMR Internacional
          </p>
        </ScreenReaderOnly>

        {services.map((service, index) => (
          <div
            key={service.id}
            role='listitem'
            aria-posinset={index + 1}
            aria-setsize={services.length}
          >
            <Suspense fallback={<LoadingSpinner size='md' />}>
              <ServiceCard
                {...service}
                onFocus={() => handleServiceFocus(service.title)}
              />
            </Suspense>
          </div>
        ))}
      </div>
    )
  }
)

ServicesGrid.displayName = 'ServicesGrid'

const Services: React.FC = memo(() => {
  const titleId = useUniqueId('services-title')
  const descriptionId = useUniqueId('services-description')

  return (
    <section
      id='servicos'
      className='py-24 bg-gray-50'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Suspense
          fallback={
            <div className='h-32 flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          }
        >
          <ServicesHeader titleId={titleId} descriptionId={descriptionId} />
        </Suspense>

        <main>
          <Suspense
            fallback={
              <div className='grid md:grid-cols-3 gap-8'>
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className='h-64 bg-gray-200 animate-pulse rounded-xl'
                    />
                  ))}
              </div>
            }
          >
            <ServicesGrid services={servicesData} titleId={titleId} />
          </Suspense>
        </main>
      </div>
    </section>
  )
})

export default Services
