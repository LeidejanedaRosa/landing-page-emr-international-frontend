import React, { memo, Suspense } from 'react'

import heroImage from '../../../assets/hero_section.png'
import {
  useAccessibilityPreferences,
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import Header from '../../layout/Header'
import { MainContent, ScreenReaderOnly } from '../../ui/Accessibility'
import { LoadingSpinner } from '../../ui/Loading'
import PromoBannerCarousel from '../PromoBannerCarousel'
import DesktopLayout from './DesktopLayout'
import './HeroCarousel.css'
import { useCarouselAutoPlay, useHeroCarousel } from './hooks/useHeroCarousel'
import { useScrollToSection } from './hooks/useScrollToSection'
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
      <img
        id={imageId}
        src={heroImage}
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
  const { scrollToSection } = useScrollToSection()
  const { announce } = useScreenReaderAnnouncement()
  const { prefersReducedMotion } = useAccessibilityPreferences()

  const {
    currentSlide,
    nextSlide,
    previousSlide,
    goToSlide,
    isAutoPlaying,
    pauseAutoPlay,
    resumeAutoPlay,
    autoPlayDelay,
    totalSlides,
  } = useHeroCarousel({
    autoPlayDelay: prefersReducedMotion ? 0 : 5000,
    enableAutoPlay: !prefersReducedMotion,
  })

  useCarouselAutoPlay(isAutoPlaying, nextSlide, autoPlayDelay, totalSlides)

  const handleViewCoursesClick = () => {
    announce('Navegando para seção de cursos', 'polite')
    scrollToSection('courses')
  }

  const setIsAutoPlaying: React.Dispatch<
    React.SetStateAction<boolean>
  > = value => {
    const playing = typeof value === 'function' ? value(isAutoPlaying) : value
    if (playing && !prefersReducedMotion) {
      resumeAutoPlay()
      announce('Reprodução automática ativada', 'polite')
    } else {
      pauseAutoPlay()
      announce('Reprodução automática pausada', 'polite')
    }
  }

  const carouselProps = {
    currentSlide,
    nextSlide,
    previousSlide,
    goToSlide,
    setIsAutoPlaying,
  }

  return (
    <section
      id='hero'
      data-section='hero'
      className='relative min-h-screen 2xl:min-h-full text-white overflow-hidden'
      aria-labelledby='hero-heading'
    >
      <div className='absolute top-24 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8'>
        <h1
          id='hero-heading'
          className='hidden text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl max-w-4xl'
          style={{
            textShadow:
              '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)',
          }}
        >
          EMR Internacional - Treinamentos em Emergências Médicas
        </h1>
        <ScreenReaderOnly>
          <p>
            Seção principal com informações sobre cursos de resgate tático,
            atendimento pré-hospitalar e certificações internacionais.
          </p>
        </ScreenReaderOnly>
      </div>

      <HeroImage
        className='absolute w-[100%] -top-[550px] h-[250%] object-cover object-center 2xl:translate-y-32'
        prefersReducedMotion={prefersReducedMotion}
      />

      <div
        className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/60'
        aria-hidden='true'
      />

      <div className='relative z-10'>
        <Suspense fallback={<div className='h-16 bg-black/20' />}>
          <Header className='bg-transparent shadow-none' />
        </Suspense>

        <Suspense fallback={<div className='h-12 bg-black/10' />}>
          <PromoBannerCarousel />
        </Suspense>
      </div>

      <MainContent className='relative max-w-screen-2xl mx-auto z-10 flex items-end pt-8 pb-20 px-4 sm:px-6 lg:px-8'>
        <HeroContent
          onViewCoursesClick={handleViewCoursesClick}
          carouselProps={carouselProps}
        />
      </MainContent>
    </section>
  )
})

export default Hero
