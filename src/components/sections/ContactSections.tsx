import React from 'react'

import { useContactForm } from '../../hooks/form/useContactForm'

// Componente para informações de contato
export const ContactInfo: React.FC = () => (
  <div>
    <h3 className='text-2xl font-semibold mb-6'>Fale Conosco</h3>
    <div className='space-y-4'>
      <div className='flex items-center space-x-4'>
        <div className='w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
          </svg>
        </div>
        <div>
          <p className='font-medium'>Email</p>
          <p className='text-primary-100'>contato@emrinternacional.com</p>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
            />
          </svg>
        </div>
        <div>
          <p className='font-medium'>Telefone</p>
          <p className='text-primary-100'>+55 (11) 1234-5678</p>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
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
        </div>
        <div>
          <p className='font-medium'>Endereço</p>
          <p className='text-primary-100'>São Paulo, SP - Brasil</p>
        </div>
      </div>
    </div>
  </div>
)

const SuccessMessage: React.FC = () => (
  <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8'>
    <div className='text-center'>
      <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
        <svg
          className='w-8 h-8 text-white'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 13l4 4L19 7'
          />
        </svg>
      </div>
      <h3 className='text-xl font-semibold text-white mb-2'>
        Mensagem Enviada!
      </h3>
      <p className='text-primary-100'>
        Obrigado pelo seu contato. Responderemos em breve!
      </p>
    </div>
  </div>
)

const LoadingSpinner: React.FC = () => (
  <svg
    className='animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
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
)

// Componente para formulário de contato
export const ContactForm: React.FC = () => {
  const { formData, isLoading, isSuccess, error, updateField, handleSubmit } =
    useContactForm()

  if (isSuccess) {
    return <SuccessMessage />
  }

  return (
    <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8'>
      <form className='space-y-6' onSubmit={handleSubmit}>
        {error && (
          <div className='bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-4'>
            <p className='text-red-100 text-sm'>{error}</p>
          </div>
        )}

        <div>
          <label htmlFor='name' className='block text-sm font-medium mb-2'>
            Nome Completo
          </label>
          <input
            type='text'
            id='name'
            value={formData.name}
            onChange={e => updateField('name', e.target.value)}
            disabled={isLoading}
            className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white text-white placeholder-primary-100 disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='Seu nome completo'
          />
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            disabled={isLoading}
            className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white text-white placeholder-primary-100 disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='seu@email.com'
          />
        </div>

        <div>
          <label htmlFor='message' className='block text-sm font-medium mb-2'>
            Mensagem
          </label>
          <textarea
            id='message'
            rows={4}
            value={formData.message}
            onChange={e => updateField('message', e.target.value)}
            disabled={isLoading}
            className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white text-white placeholder-primary-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed'
            placeholder='Como podemos ajudá-lo?'
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full btn-primary bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center'
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Enviando...
            </>
          ) : (
            'Enviar Mensagem'
          )}
        </button>
      </form>
    </div>
  )
}
