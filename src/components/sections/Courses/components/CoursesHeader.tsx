import { memo } from 'react'

import type { CoursesHeaderProps } from '../types'

export const CoursesHeader = memo(
  ({ titleId, descriptionId }: CoursesHeaderProps) => (
    <header className='text-center mb-12 md:mb-16'>
      <span className='text-cta-500 font-semibold tracking-wider uppercase text-sm mb-2 block'>
        Formação de Operadores de Emergência Tática e de Áreas Remotas
      </span>
      <h2
        id={titleId}
        className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight'
      >
        <span className='font-capture-it'>Cursos</span> de APH Tático e{' '}
        <span lang='en' className='font-capture-it'>
          Wilderness Medicine
        </span>
      </h2>
      <p
        id={descriptionId}
        className='text-lg md:text-xl text-primary-300 max-w-2xl mx-auto leading-relaxed'
      >
        Capacitação profissional de excelência em resgate e emergências,
        projetada para quem atua na linha de frente.
      </p>
    </header>
  )
)

CoursesHeader.displayName = 'CoursesHeader'
