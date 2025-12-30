import React, { memo } from 'react'

import LogoEMR from '../../assets/logo_emr_internacional.svg'
import { COMPANY_LEGAL_INFO } from '../../data/companyInfo'
import { QuickLinks, SocialLinks } from './FooterSections'

const BrandSection: React.FC = memo(() => {
  return (
    <div className='flex flex-col items-center'>
      <img src={LogoEMR} alt='EMR Internacional' className='h-32 w-auto mb-4' />
      <p className='text-cta-500 w-full bg-white px-6 py-4 rounded-xl font-bold text-xl uppercase tracking-wider mb-2 text-center'>
        Emergência 24-7, 360°
      </p>
      <p className='text-white text-2xl my-2 font-bold text-right mx-3'>
        Resposta à emergência que se adapta ao cenário
      </p>
      <div className='my-4 h-1 w-full bg-cta-500 rounded-full' />
      <p className='text-gray-400 text-base text-center'>
        Treinamentos e operações onde o convencional não alcança.
      </p>
    </div>
  )
})

BrandSection.displayName = 'BrandSection'

const ContactSection: React.FC = memo(() => {
  return (
    <div className='flex flex-col items-center md:items-start'>
      <h3 className='text-lg font-semibold mb-4 text-white'>Contato</h3>
      <p className='text-gray-400 text-sm mb-6'>
        Fale conosco pelas redes sociais
      </p>
      <SocialLinks />
      <div className='mt-6 pt-6 border-t border-gray-800 w-full flex flex-col items-center'>
        <p className='text-gray-400 text-sm mb-1'>Atendimento</p>
        <p className='text-white font-medium'>Segunda a Sexta</p>
        <p className='text-gray-400 text-sm'>8h às 18h</p>
      </div>
    </div>
  )
})

ContactSection.displayName = 'ContactSection'

const Copyright: React.FC = memo(() => {
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
})

Copyright.displayName = 'Copyright'

const Footer: React.FC = memo(() => {
  return (
    <footer
      id='contact'
      data-section='contact'
      className='bg-black text-white py-12 md:py-16'
      role='contentinfo'
      aria-label='Rodapé do site com informações da empresa e links úteis'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1fr] gap-8 lg:gap-12 mb-12 items-end'>
          <BrandSection />
          <div className='grid grid-cols-2 md:contents'>
            <QuickLinks />
            <ContactSection />
          </div>
        </div>

        <Copyright />
      </div>
    </footer>
  )
})

export default Footer
