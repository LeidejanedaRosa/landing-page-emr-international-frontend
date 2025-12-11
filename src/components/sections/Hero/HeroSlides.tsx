import React from 'react'

import EmergencyCard from './EmergencyCard'

interface HeroSlidesProps {
  onViewCoursesClick: () => void
}

const HeroTextSlide: React.FC = () => (
  <div className='hero-carousel-slide'>
    <div className='space-y-4 text-center max-w-lg px-4'>
      <h1 className='text-3xl md:text-4xl font-black leading-tight drop-shadow-2xl'>
        EM CENÁRIOS TÁTICOS E
        <br />
        <span className='text-red-500'>ÁREAS REMOTAS</span>
        <br />
        CADA SEGUNDO
        <br />
        DEFINE QUEM SOBREVIVE
      </h1>
      <p className='text-lg text-left text-gray-100 leading-relaxed border-l-4 border-red-500 pl-4 drop-shadow-lg'>
        Torne-se um primeiro respondente tático ou operador de emergências
        remotas. A diferença entre a vida e a morte está no treinamento de APH
        Tático e medicina wilderness.
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
        aria-label='Ver cursos de Operação Tática e Remota da EMR Internacional'
      >
        Ver Cursos de Operação Tática e Remota
      </button>
    </div>
  </div>
)

export { HeroEmergencySlide, HeroTextSlide }
