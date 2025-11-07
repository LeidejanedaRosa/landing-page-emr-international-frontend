import React from 'react'

import { servicesData } from '../../data/servicesData'
import { ServiceCard } from './ServiceCard'

const Services: React.FC = () => (
  <section id='servicos' className='py-24 bg-gray-50'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Nossos Serviços
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Oferecemos soluções completas para suas necessidades de negócios
          internacionais
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-8'>
        {servicesData.map(service => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </div>
  </section>
)

export default Services
