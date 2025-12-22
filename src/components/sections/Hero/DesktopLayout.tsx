import React from 'react'

import heroImageJpg from '../../../assets/hero_section.jpg'
// @ts-expect-error - vite-imagetools directives
import heroImageAvif from '../../../assets/hero_section.jpg?format=avif&w=640;768;1024;1280;1920&as=srcset'
// @ts-expect-error - vite-imagetools directives
import heroImageWebp from '../../../assets/hero_section.jpg?format=webp&w=640;768;1024;1280;1920&as=srcset'

interface DesktopLayoutProps {
  onViewCoursesClick: () => void
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  onViewCoursesClick,
}) => (
  <div className='hidden lg:grid grid-cols-2 w-full h-full gap-8'>
    <div
      id='hero-text'
      className='col-span-1 h-[70vh] flex flex-col gap-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl'
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

      <button
        onClick={onViewCoursesClick}
        className='bg-red-600 hover:bg-red-700 text-white w-fit font-bold py-4 px-10 rounded-full text-xl transition shadow-2xl hover:shadow-red-600/50 transform hover:scale-105'
        type='button'
        aria-label='Ver cursos de elite da EMR Internacional'
      >
        Ver Cursos de Elite
      </button>
    </div>
    <div className='col-span-1'>
      <picture>
        <source type='image/avif' srcSet={heroImageAvif} />
        <source type='image/webp' srcSet={heroImageWebp} />
        <img
          src={heroImageJpg}
          alt='Imagem ilustrativa de um operador médico tático em ação, simbolizando os cursos oferecidos pela EMR Internacional.'
          className='w-full h-full object-cover rounded-2xl'
          loading='eager'
          fetchPriority='high'
        />
      </picture>
    </div>
  </div>
)

export default DesktopLayout
