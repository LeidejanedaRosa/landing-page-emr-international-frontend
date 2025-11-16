import React from 'react'

const EmergencyCard: React.FC = () => (
  <div className=''>
    <div className='space-y-6 text-center'>
      <p className='text-2xl text-gray-100 font-semibold'>
        A EMR INTERNACIONAL
        <br />
        te treina para
      </p>

      <div className='bg-white rounded-lg p-4'>
        <h3 className='text-xl lg:text-2xl font-black text-red-600 tracking-wide drop-shadow-md'>
          EMERGÊNCIA 24-7, 360°!
        </h3>
      </div>

      <div className='space-y-3'>
        <p className='text-2xl text-white text-right font-semibold'>
          Resposta à emergência que se adapta ao cenário
        </p>
        <p className='text-lg text-gray-400 italic border-t-4 border-red-500/50 pt-3'>
          Treinamentos e operações onde o convencional não alcança.
        </p>
      </div>
    </div>
  </div>
)

export default EmergencyCard
