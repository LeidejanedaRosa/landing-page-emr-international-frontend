import React from 'react'

const About: React.FC = () => {
  return (
    <section id='sobre' className='py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
              Sobre a EMR Internacional
            </h2>
            <p className='text-lg text-gray-600 mb-6 leading-relaxed'>
              A EMR Internacional é uma empresa líder em soluções para o mercado
              global, oferecendo serviços de alta qualidade e inovação para
              empresas que desejam expandir suas operações internacionalmente.
            </p>
            <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
              Com anos de experiência no mercado, nossa equipe especializada
              oferece suporte completo desde a consultoria estratégica até a
              implementação de soluções logísticas e de compliance
              internacional.
            </p>
            <div className='grid grid-cols-2 gap-6'>
              <div className='text-center p-4'>
                <div className='text-3xl font-bold text-primary-600 mb-2'>
                  50+
                </div>
                <div className='text-sm text-gray-600'>Países Atendidos</div>
              </div>
              <div className='text-center p-4'>
                <div className='text-3xl font-bold text-primary-600 mb-2'>
                  1000+
                </div>
                <div className='text-sm text-gray-600'>
                  Clientes Satisfeitos
                </div>
              </div>
              <div className='text-center p-4'>
                <div className='text-3xl font-bold text-primary-600 mb-2'>
                  15+
                </div>
                <div className='text-sm text-gray-600'>Anos de Experiência</div>
              </div>
              <div className='text-center p-4'>
                <div className='text-3xl font-bold text-primary-600 mb-2'>
                  24/7
                </div>
                <div className='text-sm text-gray-600'>Suporte Disponível</div>
              </div>
            </div>
          </div>
          <div className='relative'>
            <div className='aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center'>
              <svg
                className='w-32 h-32 text-primary-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='absolute -top-4 -right-4 w-24 h-24 bg-secondary-500 rounded-full opacity-20' />
            <div className='absolute -bottom-4 -left-4 w-16 h-16 bg-primary-600 rounded-full opacity-20' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
