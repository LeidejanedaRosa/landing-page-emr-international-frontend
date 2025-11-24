import React, { memo } from 'react'

import { useUniqueId } from '../../hooks/useAccessibility'
import { QuickLinks, ServicesLinks, SocialLinks } from './FooterSections'

const CompanyInfo: React.FC<{ sectionId: string }> = memo(({ sectionId }) => {
  return (
    <section className='col-span-2' aria-labelledby={`${sectionId}-heading`}>
      <header>
        <h2
          id={`${sectionId}-heading`}
          className='text-2xl font-bold text-cta-400 mb-4'
        >
          EMR Internacional
        </h2>
      </header>

      <p className='text-gray-300 mb-6 max-w-md leading-relaxed'>
        Especialistas em emergências médicas, resgate tático e capacitação
        profissional com certificações internacionais reconhecidas mundialmente.
      </p>

      <div className='mt-6'>
        <h3 className='text-lg font-semibold text-white mb-3 sr-only'>
          Redes Sociais
        </h3>
        <SocialLinks />
      </div>
    </section>
  )
})

CompanyInfo.displayName = 'CompanyInfo'

const Copyright: React.FC = memo(() => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='border-t border-gray-800 pt-8'>
      <div className='text-center'>
        <p className='text-gray-300'>
          <span>&copy; {currentYear} </span>
          <strong>EMR Internacional</strong>
          <span>. Todos os direitos reservados.</span>
        </p>
        <p className='text-gray-400 text-sm mt-2'>
          CNPJ: 00.000.000/0000-00 | Registro CREA: 000000
        </p>
      </div>
    </div>
  )
})

Copyright.displayName = 'Copyright'

const Footer: React.FC = memo(() => {
  const footerId = useUniqueId('main-footer')
  const companyInfoId = useUniqueId('company-info')

  return (
    <footer
      id={footerId}
      className='bg-gray-900 text-white py-12'
      role='contentinfo'
      aria-label='Rodapé do site com informações da empresa e links úteis'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-4 gap-8 mb-8'>
          <CompanyInfo sectionId={companyInfoId} />
          <QuickLinks />
          <ServicesLinks />
        </div>

        <Copyright />
      </div>
    </footer>
  )
})

export default Footer
