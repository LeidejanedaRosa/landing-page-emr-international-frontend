import React, { memo, Suspense } from 'react'

import heroImageJpg from '../../../assets/hero_section_bg.png'
// @ts-expect-error - vite-imagetools directives
import heroImageAvif from '../../../assets/hero_section_bg.png?format=avif&w=640;768;1024;1280;1920&as=srcset'
// @ts-expect-error - vite-imagetools directives
import heroImageWebp from '../../../assets/hero_section_bg.png?format=webp&w=640;768;1024;1280;1920&as=srcset'
import {
  useAccessibilityPreferences,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import Header from '../../layout/Header'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import { LoadingSpinner } from '../../ui/Loading'
import { HeroEnrollmentOpen } from '../HeroEnrollmentOpen'
import PromoBannerCarousel from '../PromoBannerCarousel'
import DesktopLayout from './DesktopLayout'
import './HeroCarousel.css'
import MobileTabletCarousel from './MobileTabletCarousel'

interface HeroImageProps {
  className: string
  prefersReducedMotion: boolean
}

interface HeroContentProps {
  onViewCoursesClick: () => void
  carouselProps: {
    currentSlide: number
    nextSlide: () => void
    previousSlide: () => void
    // eslint-disable-next-line no-unused-vars
    goToSlide: (_index: number) => void
    setIsAutoPlaying: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const HeroImage: React.FC<HeroImageProps> = memo(
  ({ className, prefersReducedMotion }) => {
    const imageId = useUniqueId('hero-image')

    return (
      <picture>
        <source srcSet={heroImageAvif} type='image/avif' sizes='100vw' />
        <source srcSet={heroImageWebp} type='image/webp' sizes='100vw' />
        <img
          id={imageId}
          src={heroImageJpg}
          alt='Equipe de resgate tático da EMR Internacional em operação de emergência médica com equipamentos avançados'
          className={className}
          loading='eager'
          fetchPriority='high'
          width={1920}
          height={1080}
          style={{
            transform: prefersReducedMotion ? 'none' : undefined,
          }}
        />
      </picture>
    )
  }
)

HeroImage.displayName = 'HeroImage'

const HeroContent: React.FC<HeroContentProps> = memo(
  ({ onViewCoursesClick, carouselProps }) => {
    return (
      <>
        <div className='hidden lg:block' aria-hidden='true' />

        <Suspense
          fallback={
            <LoadingSpinner aria-label='Carregando conteúdo principal' />
          }
        >
          <DesktopLayout onViewCoursesClick={onViewCoursesClick} />
        </Suspense>

        <Suspense
          fallback={<LoadingSpinner aria-label='Carregando carousel' />}
        >
          <MobileTabletCarousel
            currentSlide={carouselProps.currentSlide}
            onViewCoursesClick={onViewCoursesClick}
            setIsAutoPlaying={carouselProps.setIsAutoPlaying}
            nextSlide={carouselProps.nextSlide}
            previousSlide={carouselProps.previousSlide}
            goToSlide={carouselProps.goToSlide}
          />
        </Suspense>
      </>
    )
  }
)

HeroContent.displayName = 'HeroContent'

// eslint-disable-next-line max-lines-per-function
const Hero: React.FC = memo(() => {
  // const { scrollToSection } = useScrollToSection()
  // const { announce } = useScreenReaderAnnouncement()
  const { prefersReducedMotion } = useAccessibilityPreferences()

  // const {
  //   currentSlide,
  //   nextSlide,
  //   previousSlide,
  //   goToSlide,
  //   isAutoPlaying,
  //   pauseAutoPlay,
  //   resumeAutoPlay,
  //   autoPlayDelay,
  //   totalSlides,
  // } = useHeroCarousel({
  //   autoPlayDelay: prefersReducedMotion ? 0 : 5000,
  //   enableAutoPlay: !prefersReducedMotion,
  // })

  // useCarouselAutoPlay(isAutoPlaying, nextSlide, autoPlayDelay, totalSlides)

  // const handleViewCoursesClick = () => {
  //   announce('Navegando para seção de cursos', 'polite')
  //   scrollToSection('courses')
  // }

  // const setIsAutoPlaying: React.Dispatch<
  //   React.SetStateAction<boolean>
  // > = value => {
  //   const playing = typeof value === 'function' ? value(isAutoPlaying) : value
  //   if (playing && !prefersReducedMotion) {
  //     resumeAutoPlay()
  //     announce('Reprodução automática ativada', 'polite')
  //   } else {
  //     pauseAutoPlay()
  //     announce('Reprodução automática pausada', 'polite')
  //   }
  // }

  // const carouselProps = {
  //   currentSlide,
  //   nextSlide,
  //   previousSlide,
  //   goToSlide,
  //   setIsAutoPlaying,
  // }

  return (
    <section
      id='hero'
      data-section='hero'
      className='relative min-h-screen 2xl:min-h-full text-white overflow-hidden'
      aria-labelledby='hero-heading'
    >
      <div className='absolute top-24 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8'>
        <h1 id='hero-heading' className='sr-only'>
          EMR Internacional - Formação de Operadores Médicos Táticos e
          Wilderness - Cursos de APH Tático, TCCC/TECC e Emergências Remotas
        </h1>
        <ScreenReaderOnly>
          <p>
            Seção principal com informações sobre cursos de resgate tático,
            atendimento pré-hospitalar e certificações internacionais.
          </p>
        </ScreenReaderOnly>
      </div>

      <HeroImage
        className='absolute inset-0 w-full h-full object-cover'
        prefersReducedMotion={prefersReducedMotion}
      />

      <div
        className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/60'
        aria-hidden='true'
      />

      <div className='relative z-20'>
        <Suspense fallback={<div className='h-16 bg-black/20' />}>
          <Header className='bg-transparent shadow-none' />
        </Suspense>

        <Suspense fallback={<div className='h-12 bg-black/10' />}>
          <PromoBannerCarousel />
        </Suspense>
      </div>

      <main
        id='main-content'
        className='relative max-w-screen-2xl mx-auto z-10 inset-0'
        tabIndex={-1}
      >
        <HeroEnrollmentOpen />

        {/* <HeroContent
          onViewCoursesClick={handleViewCoursesClick}
          carouselProps={carouselProps}
        /> */}
      </main>
    </section>
  )
})

export default Hero
// pt-8 pb-20 px-4 sm:px-6 lg:px-8
