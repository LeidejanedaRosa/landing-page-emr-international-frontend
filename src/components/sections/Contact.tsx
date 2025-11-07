import React from 'react'

import { ContactForm, ContactInfo } from './ContactSections'

const Contact: React.FC = () => (
  <section id='contato' className='py-24 bg-primary-600 text-white'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8'>
          Entre em Contato
        </h2>
        <p className='text-xl mb-8 text-primary-100 max-w-2xl mx-auto'>
          Pronto para expandir seus negócios internacionalmente? Nossa equipe
          especializada está aqui para ajudá-lo!
        </p>
      </div>

      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  </section>
)

export default Contact
