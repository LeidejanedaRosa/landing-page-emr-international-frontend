import React from 'react'

import { QuickLinks, ServicesLinks, SocialLinks } from './FooterSections'

const Footer: React.FC = () => (
  <footer className='bg-gray-900 text-white py-12'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='grid md:grid-cols-4 gap-8 mb-8'>
        <div className='col-span-2'>
          <h3 className='text-2xl font-bold text-primary-400 mb-4'>
            EMR Internacional
          </h3>
          <p className='text-gray-300 mb-4 max-w-md'>
            Conectando negócios ao redor do mundo com soluções inovadoras e
            serviços de excelência no mercado internacional.
          </p>
          <SocialLinks />
        </div>

        <QuickLinks />
        <ServicesLinks />
      </div>

      <div className='border-t border-gray-800 pt-8 text-center'>
        <p className='text-gray-300'>
          &copy; {new Date().getFullYear()} EMR Internacional. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
