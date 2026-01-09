import React from 'react'

import { useUniqueId } from '../../hooks/useAccessibility'
import { buildWhatsAppMessageUrl } from '../../utils/whatsapp'

const CallToAction: React.FC = () => {
  const titleId = useUniqueId('cta-title')

  const whatsappUrl = buildWhatsAppMessageUrl(
    'Olá! Gostaria de saber mais sobre os treinamentos da EMR Internacional.'
  )

  return (
    <section
      id='call-to-action'
      className='py-20 md:py-24 bg-cta-600 text-white'
      aria-labelledby={titleId}
    >
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2
          id={titleId}
          className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white'
        >
          Prepare-se para salvar vidas
        </h2>
        <p className='text-base md:text-lg mb-8 text-white/80'>
          Garanta sua vaga nos próximos treinamentos da EMR Internacional
        </p>
        <a
          href={whatsappUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block bg-white text-cta-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg uppercase tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cta-600'
          aria-label='Entrar em contato via WhatsApp para se inscrever nos treinamentos (abre em nova janela)'
        >
          Quero me inscrever agora
        </a>
      </div>
    </section>
  )
}

export default CallToAction
