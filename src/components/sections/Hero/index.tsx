import React from 'react'

import heroImage from '../../../assets/hero_section.png'
import Header from '../../layout/Header'
import PromoBannerCarousel from '../PromoBannerCarousel'
import DesktopLayout from './DesktopLayout'
import './HeroCarousel.css'
import { useCarouselAutoPlay, useHeroCarousel } from './hooks/useHeroCarousel'
import { useScrollToSection } from './hooks/useScrollToSection'
import MobileTabletCarousel from './MobileTabletCarousel'

const Hero: React.FC = () => {
  const { scrollToSection } = useScrollToSection()

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
    autoPlayDelay: 5000,
    enableAutoPlay: true,
  })

  useCarouselAutoPlay(isAutoPlaying, nextSlide, autoPlayDelay, totalSlides)

  const handleViewCoursesClick = () => {
    scrollToSection('cursos')
  }

  const setIsAutoPlaying = (action: React.SetStateAction<boolean>): void => {
    const playing =
      typeof action === 'function' ? action(isAutoPlaying) : action
    if (playing) {
      resumeAutoPlay()
    } else {
      pauseAutoPlay()
    }
  }

  return (
    <section
      id='hero'
      className='relative min-h-screen text-white overflow-hidden'
    >
      <img
        src={heroImage}
        alt='Equipe de resgate tático da EMR Internacional em operação de emergência em condições extremas, demonstrando atendimento pré-hospitalar especializado'
        className='absolute w-[100%] -top-[550px] h-[250%] object-cover object-center'
        loading='eager'
        fetchPriority='high'
        width={1920}
        height={1080}
      />

      <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/60' />

      <div className='relative z-10'>
        <Header className='bg-transparent shadow-none' />
        <PromoBannerCarousel />
      </div>

      <div className='relative z-10 flex items-end pt-8 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='hidden lg:block' />

        <DesktopLayout onViewCoursesClick={handleViewCoursesClick} />

        <MobileTabletCarousel
          currentSlide={currentSlide}
          onViewCoursesClick={handleViewCoursesClick}
          setIsAutoPlaying={setIsAutoPlaying}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          goToSlide={goToSlide}
        />
      </div>
    </section>
  )
}

export default Hero
