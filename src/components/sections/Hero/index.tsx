import React from 'react'

import heroImage from '../../../assets/rescue-team-tactical-operation-in-extreme-conditio.jpg'
import Header from '../../layout/Header'
import PromoBannerCarousel from '../PromoBannerCarousel'
import EmergencyCard from './EmergencyCard'
import { useScrollToSection } from './hooks/useScrollToSection'

const Hero: React.FC = () => {
  const { scrollToSection } = useScrollToSection()

  const handleViewCoursesClick = () => {
    scrollToSection('cursos')
  }

  return (
    <section
      id='hero'
      className='relative min-h-screen text-white overflow-hidden'
    >
      <img
        src={heroImage}
        alt='Equipe de resgate tático da EMR Internacional em operação de emergência em condições extremas, demonstrando atendimento pré-hospitalar especializado'
        className='absolute inset-0 w-full h-full object-cover'
        loading='eager'
        fetchPriority='high'
        width={1920}
        height={1080}
      />

      <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/60' />

      <div className='relative z-10'>
        <Header className='bg-transparent shadow-none' />
        <PromoBannerCarousel />
      </div>

      <div className='relative z-10 flex items-end pt-8 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='hidden lg:block' />

        <div className='grid grid-cols-1 lg:grid-cols-3 w-full'>
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
              onClick={handleViewCoursesClick}
              className='bg-red-600 hover:bg-red-700 text-white w-fit font-bold py-4 px-10 rounded-full text-xl transition shadow-2xl hover:shadow-red-600/50 transform hover:scale-105'
              type='button'
              aria-label='Ver cursos de elite da EMR Internacional'
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
