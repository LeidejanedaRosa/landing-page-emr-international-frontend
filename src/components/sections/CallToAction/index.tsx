import { Crosshair } from 'lucide-react'

import ctaImage from '../../../assets/call_to_action/call_to_action.png'
import { useUniqueId } from '../../../hooks/useAccessibility'
import { buildWhatsAppMessageUrl } from '../../../utils/whatsapp'
import { AccessibleLink } from '../../ui/Accessibility'
import { WHATSAPP_MESSAGE } from './constants'
import { FeaturePillars } from './FeaturePillars'
import { PrincipleBox } from './PrincipleBox'
import { SideAnnotations } from './SideAnnotations'

const CallToAction = () => {
  const titleId = useUniqueId('cta-title')
  const whatsappUrl = buildWhatsAppMessageUrl(WHATSAPP_MESSAGE)

  return (
    <section
      id='call-to-action'
      data-testid='call-to-action'
      className='relative bg-black text-white overflow-hidden'
      aria-labelledby={titleId}
    >
      <img
        src={ctaImage}
        alt=''
        aria-hidden='true'
        className='absolute inset-0 w-full h-full object-cover object-right lg:object-center'
      />
      <div
        className='absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:via-black/60 to-black/20'
        aria-hidden='true'
      />

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16'>
        <div className='flex flex-col justify-center'>
          <h2 id={titleId} className='mb-4'>
            <span className='block text-xs sm:text-sm font-medium tracking-[0.25em] text-white/60 uppercase mb-4'>
              CONHEÇA NOSSO MÉTODO DE TREINAMENTO
            </span>
            <span className='flex items-start gap-3'>
              <span className='block font-capture-it text-6xl sm:text-7xl lg:text-8xl tracking-wide text-white leading-none'>
                REAPER
              </span>
              <Crosshair
                className='mt-3 w-7 h-7 sm:w-9 sm:h-9 text-cta-700 flex-shrink-0'
                aria-hidden='true'
              />
            </span>
            <span className='block font-capture-it text-6xl sm:text-7xl lg:text-8xl tracking-wide text-cta-700 leading-none'>
              PROTOCOL
            </span>
          </h2>

          <div className='w-14 h-0.5 bg-cta-700 mb-5' aria-hidden='true' />

          <p className='text-sm sm:text-base text-white/75 leading-relaxed mb-6 max-w-md'>
            É um sistema realístico voltado à atuação em cenários críticos, com
            ênfase em imersão, pressão operacional e desenvolvimento prático.
          </p>

          <PrincipleBox />
          <FeaturePillars />

          <div>
            <AccessibleLink
              href={whatsappUrl}
              external
              aria-label='Entrar em contato via WhatsApp para se inscrever nos treinamentos (abre em nova janela)'
              className='inline-flex items-center gap-2 bg-cta-700 hover:bg-cta-600 text-white font-bold py-3 px-8 uppercase tracking-widest text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cta-500 focus:ring-offset-2 focus:ring-offset-black'
            >
              QUERO ME INSCREVER AGORA
            </AccessibleLink>
          </div>
        </div>

        <SideAnnotations />
      </div>
    </section>
  )
}

export default CallToAction
