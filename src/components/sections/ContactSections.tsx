import React, { memo, useEffect } from 'react'

import { useContactForm } from '../../hooks/form/useContactForm'
import {
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../ui/Accessibility'
import { AccessibleButton } from '../ui/AccessibleButton'

interface ContactInfoProps {
  onLoad?: () => void
}

interface ContactFormProps {
  onLoad?: () => void
}

interface ContactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  ariaLabel: string
}

const ContactItem: React.FC<ContactItemProps> = memo(
  ({ icon, label, value, href, ariaLabel }) => {
    const itemId = useUniqueId(`contact-${label.toLowerCase()}`)

    const content = (
      <div className='flex items-center space-x-4'>
        <div
          className='w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center'
          aria-hidden='true'
        >
          {icon}
        </div>
        <div>
          <p className='font-medium text-white' id={`${itemId}-label`}>
            {label}
          </p>
          <p
            className='text-primary-100'
            id={`${itemId}-value`}
            aria-describedby={`${itemId}-label`}
          >
            {value}
          </p>
        </div>
      </div>
    )

    if (href) {
      return (
        <a
          href={href}
          className='block hover:bg-white hover:bg-opacity-5 rounded-lg p-2 -m-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
          aria-label={ariaLabel}
          aria-describedby={`${itemId}-label ${itemId}-value`}
        >
          {content}
        </a>
      )
    }

    return (
      <div aria-describedby={`${itemId}-label ${itemId}-value`}>{content}</div>
    )
  }
)

ContactItem.displayName = 'ContactItem'

// eslint-disable-next-line max-lines-per-function
export const ContactInfo: React.FC<ContactInfoProps> = memo(({ onLoad }) => {
  const sectionId = useUniqueId('contact-info')

  useEffect(() => {
    if (onLoad) {
      onLoad()
    }
  }, [onLoad])

  const contactItems = [
    {
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          role='presentation'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
      label: 'Email',
      value: 'contato@emrinternacional.com',
      href: 'mailto:contato@emrinternacional.com',
      ariaLabel: 'Enviar email para contato@emrinternacional.com',
    },
    {
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          role='presentation'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
          />
        </svg>
      ),
      label: 'Telefone',
      value: '+55 (11) 1234-5678',
      href: 'tel:+551112345678',
      ariaLabel: 'Ligar para +55 11 1234-5678',
    },
    {
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          role='presentation'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
      ),
      label: 'Endereço',
      value: 'São Paulo, SP - Brasil',
      ariaLabel: 'Endereço: São Paulo, SP - Brasil',
    },
  ]

  return (
    <aside id={sectionId} aria-labelledby={`${sectionId}-heading`}>
      <header>
        <h3
          id={`${sectionId}-heading`}
          className='text-2xl font-semibold mb-6 text-white'
        >
          Fale Conosco
        </h3>
      </header>

      <ScreenReaderOnly>
        <p>
          Informações de contato da EMR Internacional - {contactItems.length}{' '}
          opções disponíveis
        </p>
      </ScreenReaderOnly>

      <address className='not-italic'>
        <ul className='space-y-4' role='list'>
          {contactItems.map(item => (
            <li key={item.label} role='listitem'>
              <ContactItem {...item} />
            </li>
          ))}
        </ul>
      </address>
    </aside>
  )
})

ContactInfo.displayName = 'ContactInfo'

const SuccessMessage: React.FC = memo(() => {
  const messageId = useUniqueId('success-message')

  return (
    <div
      className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8'
      role='alert'
      aria-live='assertive'
      aria-labelledby={`${messageId}-title`}
    >
      <div className='text-center'>
        <div
          className='w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4'
          aria-hidden='true'
        >
          <svg
            className='w-8 h-8 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            role='presentation'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        <h3
          id={`${messageId}-title`}
          className='text-xl font-semibold text-white mb-2'
        >
          Mensagem Enviada com Sucesso!
        </h3>
        <p className='text-primary-100'>
          Obrigado pelo seu contato. Nossa equipe responderá em até 24 horas!
        </p>
      </div>
    </div>
  )
})

SuccessMessage.displayName = 'SuccessMessage'

const FormLoadingSpinner: React.FC = memo(() => (
  <svg
    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    role='img'
    aria-label='Carregando'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
))

FormLoadingSpinner.displayName = 'FormLoadingSpinner'

// eslint-disable-next-line max-lines-per-function
export const ContactForm: React.FC<ContactFormProps> = memo(({ onLoad }) => {
  const { formData, isLoading, isSuccess, error, updateField, handleSubmit } =
    useContactForm()
  const { announce } = useScreenReaderAnnouncement()
  const formId = useUniqueId('contact-form')
  const errorId = useUniqueId('form-error')
  const statusId = useUniqueId('form-status')

  useEffect(() => {
    if (onLoad) {
      onLoad()
    }
  }, [onLoad])

  useEffect(() => {
    if (error) {
      announce(`Erro no formulário: ${error}`, 'assertive')
    }
  }, [error, announce])

  if (isSuccess) {
    return <SuccessMessage />
  }

  return (
    <section
      className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8'
      aria-labelledby={`${formId}-heading`}
    >
      <header>
        <h3
          id={`${formId}-heading`}
          className='text-xl font-semibold text-white mb-6'
        >
          Envie sua Mensagem
        </h3>
      </header>

      <form
        className='space-y-6'
        onSubmit={handleSubmit}
        aria-describedby={error ? errorId : statusId}
        noValidate
      >
        <div id={statusId} className='sr-only' aria-live='polite'>
          {isLoading
            ? 'Enviando mensagem...'
            : 'Formulário pronto para preenchimento'}
        </div>

        {error && (
          <div
            id={errorId}
            className='bg-error-500 bg-opacity-20 border border-error-400 rounded-lg p-4'
            role='alert'
            aria-live='assertive'
          >
            <p className='text-error-100 text-sm font-medium'>
              <span className='sr-only'>Erro: </span>
              {error}
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor={`${formId}-name`}
            className='block text-sm font-bold mb-2 text-white'
          >
            Nome Completo *
          </label>
          <input
            type='text'
            id={`${formId}-name`}
            name='name'
            value={formData.name}
            onChange={e => updateField('name', e.target.value)}
            disabled={isLoading}
            required
            aria-required='true'
            aria-describedby={error ? errorId : undefined}
            className={
              'w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white'
            }
            placeholder='Digite seu nome completo'
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className='block text-sm font-bold mb-2 text-white'
          >
            Email *
          </label>
          <input
            type='email'
            id={`${formId}-email`}
            name='email'
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            disabled={isLoading}
            required
            aria-required='true'
            aria-describedby={error ? errorId : `${formId}-email-help`}
            className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white'
            placeholder='seu@email.com'
          />
          <div id={`${formId}-email-help`} className='sr-only'>
            Digite um endereço de email válido para que possamos responder
          </div>
        </div>

        <div>
          <label
            htmlFor={`${formId}-message`}
            className='block text-sm font-bold mb-2 text-white'
          >
            Mensagem *
          </label>
          <textarea
            id={`${formId}-message`}
            name='message'
            rows={4}
            value={formData.message}
            onChange={e => updateField('message', e.target.value)}
            disabled={isLoading}
            required
            aria-required='true'
            aria-describedby={`${formId}-message-help`}
            className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-primary-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white'
            placeholder='Conte-nos sobre seu interesse em nossos cursos...'
          />
          <div id={`${formId}-message-help`} className='sr-only'>
            Descreva seu interesse em nossos cursos de emergência médica ou
            resgate tático
          </div>
        </div>

        <AccessibleButton
          type='submit'
          disabled={isLoading}
          className={
            'w-full bg-white text-cta-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
          }
          aria-describedby={statusId}
        >
          {isLoading ? (
            <>
              <FormLoadingSpinner />
              <span>Enviando mensagem...</span>
              <span className='sr-only'>Por favor aguarde</span>
            </>
          ) : (
            <span>Enviar Mensagem</span>
          )}
        </AccessibleButton>

        <ScreenReaderOnly>
          <p>Campos marcados com * são obrigatórios</p>
        </ScreenReaderOnly>
      </form>
    </section>
  )
})

ContactForm.displayName = 'ContactForm'
