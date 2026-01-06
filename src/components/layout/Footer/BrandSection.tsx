import React from 'react'

import LogoEMR from '../../../assets/logo_emr_internacional.svg'

export const BrandSection: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <img
        src={LogoEMR}
        alt='EMR Internacional'
        width='160'
        height='128'
        className='h-32 w-auto mb-4'
      />
      <p className='text-cta-500 w-full bg-white px-6 py-4 rounded-xl font-bold text-xl uppercase tracking-wider mb-2 text-center'>
        Emergência 24-7, 360°
      </p>
      <p className='text-white text-2xl my-2 font-bold text-right mx-3'>
        Resposta à emergência que se adapta ao cenário
      </p>
      <div
        className='my-4 h-1 w-full bg-cta-500 rounded-full'
        aria-hidden='true'
      />
      <p className='text-gray-400 text-base text-center'>
        Treinamentos e operações onde o convencional não alcança.
      </p>
    </div>
  )
}
