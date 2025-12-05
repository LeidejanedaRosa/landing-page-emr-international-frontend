import React, { memo, useState } from 'react'

import { OptimizedImage } from '../../ui/OptimizedImage'
import { CertificationModal } from './CertificationModal'

interface CertificationCardProps {
  name: string
  organization: string
  description: string
  year: string
  logo: string
  index: number
}

export const CertificationCard: React.FC<CertificationCardProps> = memo(
  ({ name, organization, description, year, logo, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isCTECC = organization.includes('Tactical Emergency Casualty Care')

    return (
      <>
        <article
          className='flex flex-col items-center bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full'
          aria-label={`Certificação ${name}`}
        >
          <figure className='w-full h-40 flex items-center justify-center mb-4 flex-shrink-0'>
            <OptimizedImage
              src={logo}
              alt={`Logo ${organization}`}
              className={`object-contain mx-auto ${isCTECC ? 'max-w-[60%] max-h-[70%]' : 'max-w-[80%] max-h-full'}`}
              loading={index < 4 ? 'eager' : 'lazy'}
            />
          </figure>
          <div className='text-center flex-1 flex flex-col justify-between w-full'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-black mb-2 line-clamp-2'>
                {name}
              </h3>
              <p className='text-sm text-gray-600 mb-3 line-clamp-3'>
                {description}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className='text-sm text-black font-semibold hover:text-gray-700 underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded bg-transparent border-0 cursor-pointer'
                aria-label={`Ler mais sobre ${name}`}
              >
                Ler mais
              </button>
            </div>
            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4'>
              Credenciado {year}
            </p>
          </div>
        </article>

        {isModalOpen && (
          <CertificationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            name={name}
            organization={organization}
            description={description}
            year={year}
            logo={logo}
          />
        )}
      </>
    )
  }
)

CertificationCard.displayName = 'CertificationCard'
