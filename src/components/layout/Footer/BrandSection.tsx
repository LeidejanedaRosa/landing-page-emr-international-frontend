import React from 'react'

import LogoEMR from '../../../assets/logo_emr_international.svg'

export const BrandSection: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <img
        src={LogoEMR}
        alt='EMR International'
        width='160'
        height='128'
        className='h-48 w-auto'
      />
      <p className='text-black w-full bg-white px-6 py-4 rounded-xl font-bold text-xl uppercase tracking-wider mb-2 text-center'>
        Resposta à emergência que se adapta ao cenário
      </p>
      <div
        className='my-4 h-1 w-full bg-cta-500 rounded-full'
        aria-hidden='true'
      />
      <p className='text-gray-300 text-base text-center'>
        Treinamentos e operações onde o convencional não alcança.
      </p>
    </div>
  )
}
