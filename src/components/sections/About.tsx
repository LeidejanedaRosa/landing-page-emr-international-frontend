import React, { memo } from 'react'

// @ts-expect-error - vite-imagetools directives
import FundoAboutAvif from '../../assets/fundo_about.jpg?format=avif&w=640;768;1024;1280;1920&as=srcset'
// @ts-expect-error - vite-imagetools directives
import FundoAboutJpg from '../../assets/fundo_about.jpg?format=jpg&w=1920&quality=85'
// @ts-expect-error - vite-imagetools directives
import FundoAboutWebp from '../../assets/fundo_about.jpg?format=webp&w=640;768;1024;1280;1920&as=srcset'

const InstructorMedia: React.FC = memo(() => {
  const instructorImageAlt =
    'Juan Regenerati, instrutor certificado em emergências médicas, paramédico e especialista em resgate tático'

  return (
    <figure className='w-full h-full'>
      <picture>
        <source
          srcSet={FundoAboutAvif}
          type='image/avif'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
        <source
          srcSet={FundoAboutWebp}
          type='image/webp'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
        <img
          src={FundoAboutJpg}
          alt={instructorImageAlt}
          className='w-full h-[100vh] 2xl:h-[60vh] object-cover object-left'
          loading='eager'
          decoding='async'
          fetchPriority='high'
        />
      </picture>
      <figcaption className='sr-only'>
        Fotografia profissional de Juan Regenerati, instrutor principal da EMR
        Internacional, especializado em emergências médicas e resgate tático
      </figcaption>
    </figure>
  )
})

InstructorMedia.displayName = 'InstructorMedia'

interface ExpertiseItem {
  id: string
  text: React.ReactNode
  style: string
  ariaLabel: string
}

interface AboutData {
  overline: string
  title: string
  subtitle: string
  expertise: ExpertiseItem[]
}
const useAboutData = (): { data: AboutData } => {
  const data: AboutData = {
    overline: 'Quem está por trás da',
    title: 'EMR INTERNACIONAL',
    subtitle: 'Juan Regenerati',
    expertise: [
      {
        id: 'medical-emergencies',
        text: (
          <>
            <strong>
              Formado em Saúde e Segurança do Trabalho e Paramédico
            </strong>{' '}
            é instrutor certificado em emergências médicas, com especialização
            em resgate tático em zonas de conflito de baixa intensidade e em
            atendimento pré-hospitalar em áreas remotas.
          </>
        ),
        style: 'border-l-4 border-black pl-4',
        ariaLabel:
          'Especialização em emergências médicas em ambientes urbanos e rurais',
      },
      {
        id: 'tactical-rescue',
        text: (
          <>
            Possui{' '}
            <span className='text-gray-400'>certificações internacionais </span>{' '}
            em protocolos de resposta a traumas e atua na capacitação de
            profissionais e equipes operacionais, incluindo Corpo de Bombeiros
            Militar, Exército Brasileiro e Força Nacional de Segurança Pública.
          </>
        ),
        style: 'bg-black text-white p-3 text-center lg:text-xs xl:text-base',
        ariaLabel:
          'Especialização em resgate tático em zonas de conflito e atendimento pré-hospitalar em ambientes de alto risco',
      },
      {
        id: 'operational-training',
        text: (
          <>
            Instrutor credenciado por{' '}
            <strong> instituições de referência mundial </strong> em educação e
            resposta a emergências, como o Health & Safety Institute (HSI),
            American College of Surgeons e American Red Cross, entre outras.
          </>
        ),
        style: 'border-l-4 border-black pl-4',
        ariaLabel:
          'Capacitação de forças operacionais incluindo Corpo de Bombeiros, Exército Brasileiro e Força Nacional',
      },
    ],
  }

  return { data }
}

const AboutContent: React.FC = memo(() => {
  const { data } = useAboutData()

  return (
    <article className='w-full h-full flex items-center justify-center space-y-6 p-10'>
      <header className='w-full max-w-screen-2xl'>
        <p className='text-sm sm:text-base font-semibold text-cta-600  uppercase tracking-wider'>
          {data.overline}
        </p>

        <h2
          id='about-heading'
          className='text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold text-black mb-4 lg:mb-3 leading-tight'
        >
          {data.title}
        </h2>

        <h3 className='text-3xl lg:text-2xl text-white text-center mb-4 lg:mb-3'>
          {data.subtitle}
        </h3>
        <hr
          className='border-primary-300 mb-6 lg:my-8'
          role='separator'
          aria-hidden='true'
        />
        <p className='text-lg lg:text-xs xl:text-base mb-6 lg:mb-4'>
          {data.expertise.map(({ id, text, style, ariaLabel }) => (
            <span
              key={id}
              className={`block mb-5 ${style}`}
              aria-label={ariaLabel}
            >
              {text}
            </span>
          ))}
        </p>

        <hr
          className='border-primary-300 mb-6 lg:mb-4'
          role='separator'
          aria-hidden='true'
        />
        <ExpertiseStats />
      </header>
    </article>
  )
})

AboutContent.displayName = 'AboutContent'

interface StatCardProps {
  value: string
  label: string
  ariaLabel: string
}

const StatCard: React.FC<StatCardProps> = memo(
  ({ value, label, ariaLabel }) => {
    return (
      <div
        className='col-span-1 bg-white border-2 border-black px-4 py-3 flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105'
        role='group'
        aria-label={ariaLabel}
      >
        <strong className='text-3xl lg:text-4xl font-extrabold text-cta-600 whitespace-nowrap'>
          {value}
        </strong>
        <p className='text-xs lg:text-sm font-bold text-black uppercase tracking-wide leading-tight text-center'>
          {label}
        </p>
      </div>
    )
  }
)

StatCard.displayName = 'StatCard'

const ExpertiseStats: React.FC = memo(() => {
  const stats = [
    {
      id: 'experience',
      value: '15+',
      label: 'Anos de Experiência',
      ariaLabel: 'Mais de 15 anos de experiência em emergências médicas',
    },
    {
      id: 'trained',
      value: '1000+',
      label: 'Profissionais Treinados',
      ariaLabel: 'Mais de 1000 profissionais capacitados',
    },
  ]

  return (
    <section
      className='w-full h-full '
      aria-label='Estatísticas de competência profissional'
    >
      <div className='grid grid-cols-2 gap-4'>
        {stats.map(({ id, value, label, ariaLabel }) => (
          <StatCard
            key={id}
            value={value}
            label={label}
            ariaLabel={ariaLabel}
          />
        ))}
      </div>
    </section>
  )
})

ExpertiseStats.displayName = 'ExpertiseStats'

const About: React.FC = memo(() => {
  return (
    <section
      id='sobre'
      className='relative min-h-[60vh] lg:min-h-full bg-gradient-to-b lg:bg-gradient-to-l from-gray-600 from-0% to-gray-200 to-100%'
      aria-labelledby='about-heading'
      aria-describedby='about-description'
    >
      <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row-reverse'>
        <div className='w-full lg:w-1/2 h-full'>
          <InstructorMedia />
        </div>
        <div className='w-full lg:w-1/2 h-full'>
          <AboutContent />
        </div>
      </div>
    </section>
  )
})
About.displayName = 'About'

export default About
