import React from 'react'

import { MessageCircle, Phone } from 'lucide-react'

import { getWhatsAppUrl } from '../../../utils/whatsapp'

interface FloatingButtonsProps {
  onPhoneClick: () => void
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onPhoneClick }) => {
  return (
    <aside
      aria-label='Contato rápido'
      className='fixed bottom-6 z-[9998] flex flex-col gap-3 right-[clamp(8px,2vw,24px)]'
    >
      <button
        onClick={onPhoneClick}
        className='group flex h-14 w-14 items-center justify-center rounded-full bg-cta text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-cta-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2'
        aria-label='Agendar ligação'
        title='Agendar ligação'
      >
        <Phone className='h-6 w-6 transition-transform duration-300 group-hover:rotate-12' />
      </button>

      <a
        href={getWhatsAppUrl()}
        target='_blank'
        rel='noopener noreferrer'
        className='group flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-success-600 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2'
        aria-label='Conversar no WhatsApp (abre em nova janela)'
        title='Conversar no WhatsApp (abre em nova janela)'
      >
        <MessageCircle className='h-6 w-6 transition-transform duration-300 group-hover:scale-110' />
      </a>
    </aside>
  )
}

FloatingButtons.displayName = 'FloatingButtons'

export default React.memo(FloatingButtons)
