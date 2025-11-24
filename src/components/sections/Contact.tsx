import React, { memo, Suspense } from 'react'

import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../ui/Accessibility'
import { LoadingSpinner } from '../ui/Loading'
import { ContactForm, ContactInfo } from './ContactSections'

interface ContactHeaderProps {
  titleId: string
  descriptionId: string
}

interface ContactContentProps {
  titleId: string
}

const ContactHeader: React.FC<ContactHeaderProps> = memo(
  ({ titleId, descriptionId }) => {
    return (
      <header className='text-center mb-16'>
        <h2
          id={titleId}
          className='text-3xl md:text-4xl font-bold mb-8 text-white'
        >
          Entre em Contato Conosco
        </h2>
        <p
          id={descriptionId}
          className='text-xl mb-8 text-primary-100 max-w-2xl mx-auto leading-relaxed'
        >
          Pronto para se capacitar em emergências médicas e resgate tático?
          Nossa equipe especializada está aqui para ajudá-lo a alcançar a
          excelência profissional!
        </p>
      </header>
    )
  }
)

ContactHeader.displayName = 'ContactHeader'

const ContactContent: React.FC<ContactContentProps> = memo(({ titleId }) => {
  const { announce } = useScreenReaderAnnouncement()
  const [hasAnnounced, setHasAnnounced] = React.useState(false)

  const handleSectionLoad = () => {
    if (!hasAnnounced) {
      announce('Seção de contato carregada com sucesso', 'polite')
      setHasAnnounced(true)
    }
  }

  return (
    <div
      className='grid lg:grid-cols-2 gap-12 items-start'
      aria-labelledby={titleId}
    >
      <ScreenReaderOnly>
        <p>
          Seção dividida em duas partes: informações de contato e formulário de
          mensagem
        </p>
      </ScreenReaderOnly>

      <Suspense
        fallback={
          <div className='bg-white bg-opacity-10 rounded-2xl p-8 animate-pulse'>
            <div className='h-6 bg-white bg-opacity-20 rounded mb-4' />
            <div className='space-y-3'>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className='h-16 bg-white bg-opacity-20 rounded'
                  />
                ))}
            </div>
          </div>
        }
      >
        <ContactInfo />
      </Suspense>

      <Suspense
        fallback={
          <div className='bg-white bg-opacity-10 rounded-2xl p-8 animate-pulse'>
            <div className='space-y-4'>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className='h-12 bg-white bg-opacity-20 rounded'
                  />
                ))}
            </div>
          </div>
        }
      >
        <ContactForm onLoad={handleSectionLoad} />
      </Suspense>
    </div>
  )
})

ContactContent.displayName = 'ContactContent'

const Contact: React.FC = memo(() => {
  const titleId = useUniqueId('contact-title')
  const descriptionId = useUniqueId('contact-description')

  return (
    <section
      id='contato'
      className='py-24 bg-cta-600 text-white'
      aria-label='Entre em Contato Conosco'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Suspense
          fallback={
            <div className='text-center'>
              <LoadingSpinner size='lg' />
            </div>
          }
        >
          <ContactHeader titleId={titleId} descriptionId={descriptionId} />
        </Suspense>

        <div>
          <ContactContent titleId={titleId} />
        </div>
      </div>
    </section>
  )
})

export default Contact
