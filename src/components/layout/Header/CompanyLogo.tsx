import React from 'react'

import CompanyLogoImage from '../../../assets/logo_emr_internacional.svg'

interface CompanyLogoProps {
  logoId: string
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ logoId }) => {
  return (
    <a
      href='#inicio'
      className='flex items-center rounded-lg p-2 -m-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      aria-label='EMR Internacional - Voltar ao início'
    >
      <img
        id={logoId}
        src={CompanyLogoImage}
        alt='EMR Internacional - Especialistas em Emergências Médicas e Resgate Tático'
        style={{
          filter:
            'drop-shadow(0 0 12px rgb(255 255 255 / 1)) drop-shadow(0 0 16px rgb(255 255 255 / 0.4)) brightness(1.1)',
        }}
        width={120}
        height={128}
      />
    </a>
  )
}

CompanyLogo.displayName = 'CompanyLogo'

export default CompanyLogo
