import React from 'react'

import EmergencyCard from './EmergencyCard'

interface DesktopLayoutProps {
  onViewCoursesClick: () => void
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  onViewCoursesClick,
}) => (
  <div className='hidden lg:grid grid-cols-1 lg:grid-cols-3 w-full'>
    <div
      id='hero-text'
      className='grid col-span-1 space-y-4 backdrop-blur-sm bg-black/20 p-8 rounded-2xl'
    >
      <div
        className='text-4xl lg:text-5xl font-black leading-tight text-pretty drop-shadow-2xl'
        role='heading'
        aria-level={2}
      >
        O IMPREVISÍVEL
        <br />
        <span className='text-red-500'>ACONTECE.</span>
        <br />
        VOCÊ ESTÁ
        <br />
        REALMENTE PREPARADO?
      </div>
      <p className='text-xl text-gray-100 leading-relaxed text-pretty border-l-4 border-red-500 pl-4 drop-shadow-lg h-fit'>
        Em cenários táticos ou remotos, a diferença entre a vida e a morte está
        na primeira resposta.
      </p>
    </div>
    <div className='hidden lg:block lg:col-span-1' />
    <div
      id='hero-emergency'
      className='grid col-span-1 flex-col gap-4 justify-items-center backdrop-blur-sm bg-black/20 p-8 rounded-2xl'
    >
      <EmergencyCard />
      <button
        onClick={onViewCoursesClick}
        className='bg-red-600 hover:bg-red-700 text-white w-fit font-bold py-4 px-10 rounded-full text-xl transition shadow-2xl hover:shadow-red-600/50 transform hover:scale-105'
        type='button'
        aria-label='Ver cursos de elite da EMR Internacional'
      >
        Ver Cursos de Elite
      </button>
    </div>
  </div>
)

export default DesktopLayout
