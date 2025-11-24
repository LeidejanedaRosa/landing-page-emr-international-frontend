import React, { memo } from 'react'

import FundoAbout from '../../assets/fundo_about.png'
import JuanDesktop from '../../assets/juan-desktop.webp'
import JuanMobile from '../../assets/juan-mobile.webp'
import JuanTablet from '../../assets/juan-tablet.webp'
import Juan from '../../assets/Juan.png'
import { spacing } from '../../styles/theme'
import { AccessibleButton } from '../ui/AccessibleButton'

interface ExpertiseItem {
  id: string
  text: React.ReactNode
  ariaLabel: string
}

interface AboutData {
  overline: string
  title: string
  subtitle: string
  description: string
  expertise: ExpertiseItem[]
}

const CheckIcon: React.FC<{ ariaLabel?: string }> = memo(({ ariaLabel }) => (
  <svg
    className='flex-shrink-0 w-6 h-6 text-cta-600 mt-1 mr-3'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    strokeWidth={2.5}
    role='img'
    aria-label={ariaLabel}
    aria-hidden={!ariaLabel}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
  </svg>
))

CheckIcon.displayName = 'CheckIcon'

const useAboutData = (): { data: AboutData } => {
  const data: AboutData = {
    overline: 'Quem está por trás da',
    title: 'EMR INTERNACIONAL',
    subtitle: 'Juan Regenerati',
    description:
      'Formado em Saúde e Segurança do Trabalho e Paramédico, é instrutor certificado em emergências médicas com vasta experiência e especialização em:',
    expertise: [
      {
        id: 'tactical-rescue',
        text: (
          <>
            <strong>Resgate Tático</strong> em zonas de conflito e atendimento
            pré-hospitalar em <strong>ambientes remotos e de alto risco</strong>
            .
          </>
        ),
        ariaLabel:
          'Especialização em resgate tático em zonas de conflito e atendimento pré-hospitalar em ambientes de alto risco',
      },
      {
        id: 'operational-training',
        text: (
          <>
            <strong>Capacitação de forças operacionais</strong> — incluindo{' '}
            <strong>Corpo de Bombeiros</strong>,{' '}
            <strong>Exército Brasileiro</strong> e{' '}
            <strong>Força Nacional</strong> — com foco em protocolos de
            emergência real.
          </>
        ),
        ariaLabel:
          'Capacitação de forças operacionais incluindo Corpo de Bombeiros, Exército Brasileiro e Força Nacional',
      },
      {
        id: 'international-certifications',
        text: (
          <>
            <strong>Certificações internacionais</strong> reconhecidas por{' '}
            <strong>HSI</strong>, <strong>American College of Surgeons</strong>{' '}
            e <strong>American Red Cross</strong>.
          </>
        ),
        ariaLabel:
          'Certificações internacionais reconhecidas por HSI, American College of Surgeons e American Red Cross',
      },
    ],
  }

  return { data }
}

const ExpertiseList: React.FC = memo(() => {
  const { data } = useAboutData()

  return (
    <aside
      className='col-span-full lg:col-span-4'
      aria-labelledby='expertise-heading'
    >
      <h3 id='expertise-heading' className='sr-only'>
        Especializações e Certificações Profissionais
      </h3>
      <ul
        className='space-y-5 lg:space-y-3 text-base md:text-lg lg:text-base leading-relaxed'
        role='list'
        aria-label='Lista das principais áreas de especialização do instrutor Juan Regenerati'
      >
        {data.expertise.map(({ id, text, ariaLabel }) => (
          <li key={id} className='flex items-start group'>
            <CheckIcon ariaLabel={ariaLabel} />
            <span
              className='drop-shadow-[0_2px_10px_rgba(255,255,255,1)]'
              aria-describedby={`expertise-${id}`}
            >
              <span id={`expertise-${id}`} className='sr-only'>
                {ariaLabel}
              </span>
              {text}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
})

ExpertiseList.displayName = 'ExpertiseList'

const AboutContent: React.FC = memo(() => {
  const { data } = useAboutData()

  return (
    <article className='grid grid-cols-5 transition-all duration-1000 delay-300 lg:h-full'>
      <header className='col-span-full lg:col-span-4'>
        <p className='text-sm sm:text-base font-semibold text-cta-600 uppercase tracking-wider'>
          {data.overline}
        </p>

        <h2
          id='about-heading'
          className='text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold text-primary-900 mb-4 lg:mb-3 leading-tight'
        >
          {data.title}
        </h2>

        <h3 className='text-3xl lg:text-2xl text-black border-l-4 border-cta-500 pl-4 drop-shadow-[0_4px_3px_rgba(255,255,255,0.7)] mb-4 lg:mb-3'>
          {data.subtitle}
        </h3>

        <p className='text-lg lg:text-base mb-6 lg:mb-4 text-primary-700'>
          {data.description}
        </p>

        <hr
          className='border-primary-300 mb-6 lg:mb-4'
          role='separator'
          aria-hidden='true'
        />
      </header>

      <ExpertiseList />
    </article>
  )
})

AboutContent.displayName = 'AboutContent'

interface ResponsivePictureProps {
  mobileWebp: string
  tabletWebp: string
  desktopWebp: string
  fallbackSrc: string
  alt: string
  className: string
  priority?: boolean
  loading?: 'eager' | 'lazy'
}

const ResponsivePicture: React.FC<ResponsivePictureProps> = memo(
  ({
    mobileWebp,
    tabletWebp,
    desktopWebp,
    fallbackSrc,
    alt,
    className,
    priority = false,
    loading = 'lazy',
  }) => (
    <picture>
      {/* Desktop: >= 1024px */}
      <source
        media='(min-width: 1024px)'
        srcSet={desktopWebp}
        type='image/webp'
      />

      {/* Tablet: >= 768px */}
      <source
        media='(min-width: 768px)'
        srcSet={tabletWebp}
        type='image/webp'
      />

      {/* Mobile: < 768px */}
      <source srcSet={mobileWebp} type='image/webp' />

      {/* Fallback para navegadores sem suporte a WebP */}
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding='async'
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
)

ResponsivePicture.displayName = 'ResponsivePicture'

const InstructorMedia: React.FC = memo(() => {
  const backgroundImageAlt =
    'Ambiente de treinamento médico de emergência com equipamentos especializados'
  const instructorImageAlt =
    'Juan Regenerati, instrutor certificado em emergências médicas, paramédico e especialista em resgate tático'

  return (
    <figure className='relative'>
      <div
        className='w-full h-[60vh] lg:h-[100vh] lg:w-1/2 relative transition-transform duration-1000 ease-out overflow-hidden flex items-center justify-center'
        style={{
          backgroundImage: `linear-gradient(to left, rgba(156, 163, 175, 0) 20%, rgba(156, 163, 175, 1) 100%), url(${FundoAbout})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
        role='img'
        aria-label={backgroundImageAlt}
      />

      <ResponsivePicture
        mobileWebp={JuanMobile}
        tabletWebp={JuanTablet}
        desktopWebp={JuanDesktop}
        fallbackSrc={Juan}
        alt={instructorImageAlt}
        className='absolute h-full w-full lg:w-auto object-cover object-top lg:object-cover left-1/2 -translate-x-1/2 lg:z-10'
        priority
        loading='eager'
      />

      <figcaption className='sr-only'>
        Fotografia profissional de Juan Regenerati, instrutor principal da EMR
        Internacional, especializado em emergências médicas e resgate tático
      </figcaption>
    </figure>
  )
})

InstructorMedia.displayName = 'InstructorMedia'

const MainContent: React.FC = memo(() => {
  return (
    <div
      className='relative w-full lg:w-1/2 lg:h-full lg:max-h-screen lg:overflow-hidden
                 bg-gradient-to-b from-primary-400/50 via-white/70 to-white
                 lg:bg-gradient-to-r lg:from-white lg:via-primary-200/80 lg:to-primary-400/80'
    >
      <div
        className='h-full mx-auto relative z-10 lg:flex lg:items-center'
        style={{
          paddingTop: spacing.section.sm,
          paddingBottom: spacing.section.sm,
          paddingLeft: spacing.container.padding.sm,
          paddingRight: spacing.container.padding.sm,
        }}
      >
        <AboutContent />
      </div>
    </div>
  )
})

MainContent.displayName = 'MainContent'

const About: React.FC = memo(() => {
  return (
    <section
      id='sobre'
      className='min-h-screen lg:h-screen bg-primary-400 relative flex flex-col lg:flex-row-reverse lg:items-center'
      aria-labelledby='about-heading'
      aria-describedby='about-description'
    >
      <AccessibleButton
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white px-4 py-2 rounded border-2 border-cta-500'
        onClick={() => {
          const nextSection = document.getElementById('contato')
          if (nextSection) {
            nextSection.setAttribute('tabindex', '-1')
            nextSection.focus()
            nextSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        Pular para próxima seção
      </AccessibleButton>

      <p id='about-description' className='sr-only'>
        Seção sobre Juan Regenerati, fundador da EMR Internacional, especialista
        em emergências médicas e resgate tático
      </p>

      <InstructorMedia />

      <MainContent />
    </section>
  )
})

About.displayName = 'About'

export default About
