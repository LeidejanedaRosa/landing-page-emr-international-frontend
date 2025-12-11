import React, { memo } from 'react'

// @ts-expect-error - vite-imagetools directives
import FundoAboutAvif from '../../assets/fundo_about.jpg?format=avif&w=640;768;1024;1280;1920&as=srcset'
// @ts-expect-error - vite-imagetools directives
import FundoAboutJpg from '../../assets/fundo_about.jpg?format=jpg&w=1920&quality=85'
// @ts-expect-error - vite-imagetools directives
import FundoAboutWebp from '../../assets/fundo_about.jpg?format=webp&w=640;768;1024;1280;1920&as=srcset'
import { AccessibleButton } from '../ui/AccessibleButton'

const InstructorMedia: React.FC = memo(() => {
  const instructorImageAlt =
    'Juan Regenerati, paramédico e instrutor tático, fardado com equipamento de segurança em ambiente operacional'

  return (
    <figure className='relative w-full h-full overflow-hidden'>
      <div className='absolute inset-0'>
        <picture className='w-full h-full'>
          <source srcSet={FundoAboutAvif} type='image/avif' sizes='100vw' />
          <source srcSet={FundoAboutWebp} type='image/webp' sizes='100vw' />
          <img
            src={FundoAboutJpg}
            alt={instructorImageAlt}
            className='w-full h-full object-cover grayscale'
            style={{ objectPosition: '40% center' }}
            loading='eager'
            decoding='async'
            fetchPriority='high'
          />
        </picture>
        <div className='absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-black lg:from-transparent lg:via-black/80 lg:to-black' />
      </div>
      <figcaption className='sr-only'>
        Fotografia profissional de Juan Regenerati, instrutor principal da EMR
        Internacional, especializado em emergências médicas e resgate tático em
        ambientes de alto risco
      </figcaption>
    </figure>
  )
})

InstructorMedia.displayName = 'InstructorMedia'

const InstructorHero: React.FC = memo(() => {
  return (
    <header className='w-full space-y-4 mb-6'>
      <div className='space-y-1'>
        <p className='text-xs sm:text-sm font-bold text-cta-600 uppercase tracking-wider'>
          Quem está por trás da
        </p>
        <p className='text-xl sm:text-2xl font-extrabold text-white leading-tight'>
          EMR INTERNACIONAL
        </p>
      </div>

      <h2
        id='about-heading'
        className='font-capture-it text-4xl sm:text-5xl md:text-6xl text-white leading-tight'
      >
        Juan Regenerati
      </h2>

      <p className='text-base sm:text-lg text-gray-200 font-semibold leading-snug'>
        Paramédico | Operador Médico Tático | Instrutor Certificado
        Internacional
      </p>

      <div className='bg-black/40 border-l-4 border-cta-600 pl-4 py-3'>
        <p className='text-sm sm:text-base text-gray-100 leading-snug font-medium'>
          Com formação em Saúde e Segurança do Trabalho,{' '}
          <strong className='text-white font-bold'>
            especialista em APH Tático, medicina tática (TCCC/TECC),{' '}
            <span lang='en'>wilderness medicine</span> (medicina em ambientes
            remotos) e formação de primeiros respondentes táticos e operadores
            de campo em áreas remotas
          </strong>
          . Treinamento de elite para socorristas táticos e profissionais que
          salvam vidas em zonas de conflito e ambientes austeros.
        </p>
      </div>
    </header>
  )
})

InstructorHero.displayName = 'InstructorHero'

const OperationalForces: React.FC = memo(() => {
  const forces = [
    'Corpo de Bombeiros Militar',
    'Exército Brasileiro',
    'Força Nacional de Segurança Pública',
  ]

  return (
    <section aria-labelledby='operational-forces-heading' className='mb-5'>
      <h4
        id='operational-forces-heading'
        className='text-lg sm:text-xl font-bold text-white mb-3'
      >
        Capacitação para Forças de Referência
      </h4>
      <ul
        className='space-y-2 text-gray-200'
        role='list'
        aria-label='Lista de forças operacionais treinadas'
      >
        {forces.map(force => (
          <li
            key={force}
            className='flex items-start gap-2 text-sm sm:text-base'
          >
            <svg
              className='w-5 h-5 text-cta-600 flex-shrink-0 mt-0.5'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-medium'>{force}</span>
          </li>
        ))}
      </ul>
    </section>
  )
})

OperationalForces.displayName = 'OperationalForces'

const InternationalCredentials: React.FC = memo(() => {
  const credentials = [
    'Health & Safety Institute (HSI)',
    'American College of Surgeons',
    'American Red Cross',
  ]

  return (
    <section aria-labelledby='credentials-heading' className='mb-5'>
      <h4
        id='credentials-heading'
        className='text-lg sm:text-xl font-bold text-white mb-3'
      >
        Credenciais Internacionais
      </h4>
      <p className='text-sm sm:text-base text-gray-200 mb-3 leading-snug'>
        Instrutor credenciado por instituições de referência mundial em educação
        e resposta a traumas:
      </p>
      <ul
        className='space-y-2 text-gray-200'
        role='list'
        aria-label='Lista de credenciais internacionais'
      >
        {credentials.map(credential => (
          <li
            key={credential}
            className='flex items-start gap-2 text-sm sm:text-base'
          >
            <svg
              className='w-5 h-5 text-cta-600 flex-shrink-0 mt-0.5'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <span className='font-medium'>{credential}</span>
          </li>
        ))}
      </ul>
    </section>
  )
})

InternationalCredentials.displayName = 'InternationalCredentials'

interface MetricCardProps {
  value: string
  label: string
  ariaLabel: string
  highlight?: boolean
}

const MetricCard: React.FC<MetricCardProps> = memo(
  ({ value, label, ariaLabel, highlight = false }) => {
    return (
      <div
        className={`flex-1 backdrop-blur-sm px-2 py-3 sm:px-4 sm:py-4 flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${highlight ? 'bg-cta-600' : 'bg-gray-100/95'}`}
        role='group'
        aria-label={ariaLabel}
      >
        <strong
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${highlight ? 'text-white' : 'text-cta-600'}`}
        >
          {value}
        </strong>
        <p
          className={`text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wide text-center leading-tight ${highlight ? 'text-white' : 'text-black'}`}
        >
          {label}
        </p>
      </div>
    )
  }
)

MetricCard.displayName = 'MetricCard'

const AboutMetrics: React.FC = memo(() => {
  const scrollToCourses = () => {
    const coursesSection = document.querySelector(
      `[data-section="${CSS.escape('courses')}"]`
    )
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const metrics = [
    {
      id: 'experience',
      value: '15+',
      label: 'Anos de Experiência',
      ariaLabel: 'Mais de 15 anos de experiência em emergências médicas',
      highlight: false,
    },
    {
      id: 'trained',
      value: '1000+',
      label: 'Profissionais Treinados',
      ariaLabel: 'Mais de 1000 profissionais capacitados',
      highlight: false,
    },
  ]

  return (
    <section
      aria-labelledby='metrics-heading'
      className='w-full space-y-4 pt-4'
    >
      <h4 id='metrics-heading' className='sr-only'>
        Estatísticas de experiência profissional
      </h4>
      <div className='flex flex-row gap-2 sm:gap-3'>
        {metrics.map(({ id, value, label, ariaLabel, highlight }) => (
          <MetricCard
            key={id}
            value={value}
            label={label}
            ariaLabel={ariaLabel}
            highlight={highlight}
          />
        ))}
        <div className='flex-1 backdrop-blur-sm bg-cta-600 hover:bg-cta-700 px-2 py-3 sm:px-4 sm:py-4 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group'>
          <AccessibleButton
            onClick={scrollToCourses}
            variant='ghost'
            className='w-full h-full text-white hover:text-white hover:bg-transparent font-bold text-center flex flex-col items-center justify-center gap-2 focus:text-white focus:bg-transparent'
            aria-label='Conheça os cursos de emergências médicas da EMR Internacional'
          >
            <svg
              className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white group-hover:text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
              />
            </svg>
            <span className='text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wide text-white group-hover:text-white leading-tight'>
              Conheça Nossos Cursos
            </span>
          </AccessibleButton>
        </div>
      </div>
    </section>
  )
})

AboutMetrics.displayName = 'AboutMetrics'

const AboutContent: React.FC = memo(() => {
  return (
    <article
      className='w-full px-6 py-6 sm:px-8 lg:px-10 space-y-4'
      aria-labelledby='about-heading'
    >
      <InstructorHero />

      <div className='space-y-4'>
        <OperationalForces />
        <InternationalCredentials />
      </div>
    </article>
  )
})

AboutContent.displayName = 'AboutContent'

const About: React.FC = memo(() => {
  return (
    <section
      id='about'
      data-section='about'
      className='relative min-h-screen bg-black'
      aria-labelledby='about-heading'
    >
      <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:h-screen'>
        <div className='relative w-full lg:w-1/2 h-[45vh] lg:h-full'>
          <InstructorMedia />
          <div className='hidden lg:block absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10'>
            <AboutMetrics />
          </div>
        </div>
        <div className='w-full lg:w-1/2 flex flex-col lg:items-center lg:justify-center bg-black lg:bg-transparent'>
          <AboutContent />
          <div className='block lg:hidden px-4 pb-6'>
            <AboutMetrics />
          </div>
        </div>
      </div>
    </section>
  )
})
About.displayName = 'About'

export default About
