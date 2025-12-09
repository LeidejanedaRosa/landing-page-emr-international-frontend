import React, { memo } from 'react'

import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../ui/Accessibility'
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

      <ContactInfo />

      <ContactForm onLoad={handleSectionLoad} />
    </div>
  )
})

ContactContent.displayName = 'ContactContent'

const Contact: React.FC = memo(() => {
  const sectionId = useUniqueId('contact')
  const titleId = useUniqueId('contact-title')
  const descriptionId = useUniqueId('contact-description')

  return (
    <section
      id={sectionId}
      data-section='contact'
      className='py-24 bg-cta-600 text-white'
      aria-label='Entre em Contato Conosco'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ContactHeader titleId={titleId} descriptionId={descriptionId} />

        <div>
          <ContactContent titleId={titleId} />
        </div>
      </div>
    </section>
  )
})

export default Contact
