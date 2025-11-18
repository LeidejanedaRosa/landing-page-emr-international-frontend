import React from 'react'

import EmergencyCard from './EmergencyCard'

interface HeroSlidesProps {
  onViewCoursesClick: () => void
}

const HeroTextSlide: React.FC = () => (
  <div className='hero-carousel-slide'>
    <div className='space-y-4 text-center max-w-lg px-4'>
      <h1 className='text-3xl md:text-4xl font-black leading-tight drop-shadow-2xl'>
        O IMPREVISÍVEL
        <br />
        <span className='text-red-500'>ACONTECE.</span>
        <br />
        VOCÊ ESTÁ
        <br />
        REALMENTE PREPARADO?
      </h1>
      <p className='text-lg text-left text-gray-100 leading-relaxed border-l-4 border-red-500 pl-4 drop-shadow-lg'>
        Em cenários táticos ou remotos, a diferença entre a vida e a morte está
        na primeira resposta.
      </p>
    </div>
  </div>
)

const HeroEmergencySlide: React.FC<HeroSlidesProps> = ({
  onViewCoursesClick,
}) => (
  <div className='hero-carousel-slide'>
    <div className='space-y-6 flex flex-col items-center px-4'>
      <EmergencyCard />
      <button
        onClick={onViewCoursesClick}
        className='bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition shadow-2xl hover:shadow-red-600/50 transform hover:scale-105'
        type='button'
        aria-label='Ver cursos de elite da EMR Internacional'
      >
        Ver Cursos de Elite
      </button>
    </div>
  </div>
)

export { HeroEmergencySlide, HeroTextSlide }
