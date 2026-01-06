import React from 'react'

import { COMPANY_LEGAL_INFO } from '../../../data/companyInfo'

export const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='border-t border-gray-800 pt-8'>
      <div className='text-center'>
        <p className='text-gray-300'>
          <span>&copy; {currentYear} </span>
          <strong className='text-white'>{COMPANY_LEGAL_INFO.legalName}</strong>
          <span>. Todos os direitos reservados.</span>
        </p>
        <p className='text-gray-500 text-sm mt-2'>
          CNPJ: {COMPANY_LEGAL_INFO.cnpj} | Registro CREA:{' '}
          {COMPANY_LEGAL_INFO.creaRegistration}
        </p>
      </div>
    </div>
  )
}
