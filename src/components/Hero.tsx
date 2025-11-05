import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className='bg-gradient-to-r from-primary-600 to-primary-700 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 animate-fade-in'>
            Bem-vindo à EMR Internacional
          </h1>
          <p className='text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed'>
            Soluções inovadoras para o mercado internacional. Conectando
            negócios ao redor do mundo com excelência e confiabilidade.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='btn-primary bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300'>
              Saiba Mais
            </button>
            <button className='btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300'>
              Entre em Contato
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
