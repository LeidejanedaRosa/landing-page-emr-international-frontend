import React from 'react'

export interface ServiceData {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export const servicesData: ServiceData[] = [
  {
    id: 'consultoria-internacional',
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
    id: 'logistica-global',
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
    id: 'compliance-internacional',
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
