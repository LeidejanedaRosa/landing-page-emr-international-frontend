import React from 'react'

import heroImage from '../../assets/rescue-team-tactical-operation-in-extreme-conditio.jpg'
import Header from '../layout/Header'
import PromoBannerCarousel from './PromoBannerCarousel'

const EmergencyCard: React.FC = () => (
  <div className=''>
    <div className='space-y-6 text-center'>
      <p className='text-2xl text-gray-100 font-semibold'>
        A EMR INTERNACIONAL
        <br />
        te treina para
      </p>

      <div className='bg-white rounded-lg p-4'>
        <h3 className='text-xl lg:text-2xl font-black text-red-600 tracking-wide drop-shadow-md'>
          EMERGÊNCIA 24-7, 360°!
        </h3>
      </div>

      <div className='space-y-3'>
        <p className='text-2xl text-white text-right font-semibold'>
          Resposta à emergência que se adapta ao cenário
        </p>
        <p className='text-lg text-gray-400 italic border-t-4 border-red-500/50 pt-3'>
          Treinamentos e operações onde o convencional não alcança.
        </p>
      </div>
    </div>
  </div>
)

const Hero: React.FC = () => {
  return (
    <section
      id='hero'
      className='relative min-h-screen text-white overflow-hidden'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='relative z-10'>
        <Header className='bg-transparent shadow-none' />
        <PromoBannerCarousel />
      </div>

      <div className='relative z-10 flex items-end pt-8 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='hidden lg:block' />

        <div className='grid grid-cols-1 lg:grid-cols-3 w-full  '>
          <div className='grid col-span-1 space-y-4 backdrop-blur-sm bg-black/20 p-8 rounded-2xl'>
            <h1 className='text-4xl lg:text-5xl font-black leading-tight text-pretty drop-shadow-2xl'>
              O IMPREVISÍVEL
              <br />
              <span className='text-red-500'>ACONTECE.</span>
              <br />
              VOCÊ ESTÁ
              <br />
              REALMENTE PREPARADO?
            </h1>
            <p className='text-xl text-gray-100 leading-relaxed text-pretty border-l-4 border-red-500 pl-4 drop-shadow-lg h-fit'>
              Em cenários táticos ou remotos, a diferença entre a vida e a morte
              está na primeira resposta.
            </p>
          </div>
          <div className='hidden lg:block lg:col-span-1' />
          <div className='grid col-span-1 flex-col gap-4 justify-items-center backdrop-blur-sm bg-black/20 p-8 rounded-2xl'>
            <EmergencyCard />

            <button
              onClick={() => {
                document
                  .getElementById('cursos')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className='bg-red-600 hover:bg-red-700 text-white w-fit font-bold py-4 px-10 rounded-full text-xl transition shadow-2xl hover:shadow-red-600/50 transform hover:scale-105'
            >
              Ver Cursos de Elite
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
