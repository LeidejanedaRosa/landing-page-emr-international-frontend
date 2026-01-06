import React from 'react'

import { BUSINESS_HOURS, SOCIAL_LINKS } from './constants'
import { SocialLinks } from './SocialLinks'

export const ContactSection: React.FC = () => {
  return (
    <address className='flex flex-col items-start not-italic'>
      <h3 className='text-lg font-semibold mb-4 text-white'>Contato</h3>
      <p className='text-gray-300 text-sm mb-6'>
        Fale conosco pelas redes sociais
      </p>
      <SocialLinks socialLinks={SOCIAL_LINKS} />
      <div className='mt-6 pt-6 border-t border-gray-800 w-full flex flex-col items-start'>
        <p className='text-gray-300 text-sm mb-1'>Atendimento</p>
        <p className='text-white font-medium'>{BUSINESS_HOURS.days}</p>
        <p className='text-gray-300 text-sm'>{BUSINESS_HOURS.hours}</p>
      </div>
    </address>
  )
}
