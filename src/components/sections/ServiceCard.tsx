import React from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
}) => (
  <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
    {icon && <div className='text-primary-600 mb-4'>{icon}</div>}
    <h3 className='text-xl font-semibold mb-4 text-primary-600'>{title}</h3>
    <p className='text-gray-600 leading-relaxed'>{description}</p>
  </div>
)
