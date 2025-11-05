import React from 'react'

const Contact: React.FC = () => {
  return (
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
                  <p className='text-primary-100'>
                    contato@emrinternacional.com
                  </p>
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

          <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8'>
            <form className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium mb-2'
                >
                  Nome Completo
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white text-white placeholder-primary-100'
                  placeholder='Seu nome completo'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-2'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white text-white placeholder-primary-100'
                  placeholder='seu@email.com'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium mb-2'
                >
                  Mensagem
                </label>
                <textarea
                  id='message'
                  rows={4}
                  className='w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-white text-white placeholder-primary-100 resize-none'
                  placeholder='Como podemos ajudá-lo?'
                />
              </div>

              <button
                type='submit'
                className='w-full btn-primary bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300'
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
