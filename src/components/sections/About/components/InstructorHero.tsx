import { INSTRUCTOR_INFO } from '../constants'

export function InstructorHero() {
  return (
    <header className='w-full space-y-4 mb-6'>
      <div className='space-y-1'>
        <p className='text-xs sm:text-sm font-bold text-cta-500 uppercase tracking-wider'>
          Quem está por trás da {INSTRUCTOR_INFO.subtitle}
        </p>
        {/* <p className='text-xl sm:text-2xl font-extrabold text-white leading-tight'>
          {INSTRUCTOR_INFO.subtitle}
        </p> */}
      </div>

      <h2
        id='sobre-heading'
        className='font-capture-it text-4xl sm:text-5xl md:text-6xl text-white leading-tight'
      >
        {INSTRUCTOR_INFO.name}
      </h2>

      <p className='text-base sm:text-lg text-gray-200 font-semibold leading-snug'>
        {INSTRUCTOR_INFO.title}
      </p>

      <div className='bg-black/40 border-l-4 border-cta-600 pl-4 py-3'>
        <p className='text-sm sm:text-base text-gray-100 leading-snug font-medium'>
          Com formação técnica em Enfermagem e Segurança do Trabalho, possui
          qualificação ainda como Paramédico com extensão em resgate técnico e
          em áreas remotas. É graduando em segurança pública e pós-graduando em
          atendimento pré-hopitalar, resgate em locais de difícil e ambientes
          inóspitos e gestão de emergência em desastres.{' '}
          <strong className='text-white font-bold'>
            {INSTRUCTOR_INFO.highlight}
          </strong>
          {INSTRUCTOR_INFO.description}
        </p>
      </div>
    </header>
  )
}
