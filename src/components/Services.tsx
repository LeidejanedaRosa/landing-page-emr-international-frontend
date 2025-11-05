import React from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1'>
      {icon && <div className='text-primary-600 mb-4'>{icon}</div>}
      <h3 className='text-xl font-semibold mb-4 text-primary-600'>{title}</h3>
      <p className='text-gray-600 leading-relaxed'>{description}</p>
    </div>
  )
}

const Services: React.FC = () => {
  const services = [
    {
      title: 'Consultoria Internacional',
      description:
        'Assessoria especializada para expansão de negócios no mercado internacional com estratégias personalizadas.',
      icon: (
        <svg
          className='w-12 h-12'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
    {
      title: 'Logística Global',
      description:
        'Soluções completas de logística para importação e exportação com eficiência e segurança.',
      icon: (
        <svg
          className='w-12 h-12'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
          />
        </svg>
      ),
    },
    {
      title: 'Compliance Internacional',
      description:
        'Garantia de conformidade com regulamentações internacionais e normas de qualidade.',
      icon: (
        <svg
          className='w-12 h-12'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
          />
        </svg>
      ),
    },
  ]

  return (
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
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
