import React, { memo, useEffect, useRef } from 'react'

import {
  type Certification,
  certifications,
} from '../../../data/certificationsData'
import {
  useAccessibilityPreferences,
  useScreenReaderAnnouncement,
} from '../../../hooks/useAccessibility'
import { useCarousel } from '../../../hooks/useCarousel'
import { useResponsiveItems } from '../../../hooks/useResponsiveItems'
import { useTouchSwipe } from '../../../hooks/useTouchSwipe'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import { CertificationCard } from './CertificationCard'

CertificationCard.displayName = 'CertificationCard'

interface CarouselNavigationProps {
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalSlides: number
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = memo(
  ({ onPrevious, onNext, currentIndex, totalSlides }) => {
    return (
      <>
        <button
          onClick={onPrevious}
          className='hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors bg-transparent border-0 cursor-pointer p-0'
          aria-label='Certificação anterior'
        >
          <svg
            className='w-12 h-12'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            role='presentation'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <ScreenReaderOnly>
          <span aria-live='polite' aria-atomic='true'>
            Mostrando certificação {currentIndex + 1} de {totalSlides}
          </span>
        </ScreenReaderOnly>

        <button
          onClick={onNext}
          className='hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors bg-transparent border-0 cursor-pointer p-0'
          aria-label='Próxima certificação'
        >
          <svg
            className='w-12 h-12'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            role='presentation'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </>
    )
  }
)

CarouselNavigation.displayName = 'CarouselNavigation'

interface CarouselIndicatorsProps {
  total: number
  current: number
  onSelect: (arg: number) => void // eslint-disable-line no-unused-vars
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = memo(
  ({ total, current, onSelect }) => {
    return (
      <div
        className='flex items-center justify-center gap-2 mt-8'
        role='group'
        aria-label='Indicadores de certificações'
      >
        {Array.from({ length: total }, (_, itemIndex) => (
          <button
            key={itemIndex}
            onClick={() => onSelect(itemIndex)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 border-0 cursor-pointer p-0 ${
              itemIndex === current
                ? 'bg-black'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            aria-label={`Ir para certificação ${itemIndex + 1}`}
            aria-current={itemIndex === current ? 'true' : 'false'}
          >
            <span className='sr-only'>Indicador {itemIndex + 1}</span>
          </button>
        ))}
      </div>
    )
  }
)

CarouselIndicators.displayName = 'CarouselIndicators'

const CertificationsSectionHeader: React.FC = memo(() => {
  return (
    <header className='text-center mb-12'>
      <span className='text-cta-500 font-semibold tracking-wider uppercase text-sm mb-2 block'>
        ACERVO DE CERTIFICAÇÕES INTERNACIONAIS
      </span>
      <h2
        id='certifications-heading'
        className='text-3xl md:text-4xl lg:text-5xl tracking-tight text-black mb-4'
      >
        <span className='font-capture-it'>Credenciamento</span> Internacional em{' '}
        <span lang='en'>Wilderness Medicine</span>
      </h2>
      <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
        Conheça nossas autorizações reconhecidas por agências mundialmente
        capazes na área de atendimento de emergência e resgate nos ambientes
        táticos e em área remota, com formação de operadores em todo o mundo.
      </p>
    </header>
  )
})

CertificationsSectionHeader.displayName = 'CertificationsSectionHeader'

interface CertificationsGridProps {
  visibleCertifications: typeof certifications
  currentIndex: number
  itemsVisible: number
  isTransitioning: boolean
}

const CertificationsGrid: React.FC<CertificationsGridProps> = memo(
  ({ visibleCertifications, currentIndex, itemsVisible, isTransitioning }) => {
    return (
      <div className='overflow-hidden'>
        <div
          className='flex'
          role='list'
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-out' : 'none',
          }}
        >
          {visibleCertifications.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className='flex-shrink-0'
              style={{ width: `${100 / itemsVisible}%` }}
              role='listitem'
            >
              <div className='px-3 h-full flex'>
                <CertificationCard {...cert} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

CertificationsGrid.displayName = 'CertificationsGrid'

interface CertificationsHandlersParams {
  announce: ReturnType<typeof useScreenReaderAnnouncement>['announce']
  nextSlide: () => void
  previousSlide: () => void
  goToSlide: (arg: number) => void // eslint-disable-line no-unused-vars
  currentIndex: number
  maxIndex: number
}

const useCertificationsHandlers = ({
  announce,
  nextSlide,
  previousSlide,
  goToSlide,
  currentIndex,
  maxIndex,
}: CertificationsHandlersParams) => {
  const previousIndexRef = useRef(currentIndex)
  const isUserInteractionRef = useRef(false)

  useEffect(() => {
    if (
      isUserInteractionRef.current &&
      previousIndexRef.current !== currentIndex
    ) {
      const realIndex =
        currentIndex === 0 || currentIndex > maxIndex + 1
          ? ((currentIndex - 1 + maxIndex + 1) % (maxIndex + 1)) + 1
          : currentIndex

      announce(`Mostrando certificação ${realIndex}`, 'polite')
      isUserInteractionRef.current = false
    }
    previousIndexRef.current = currentIndex
  }, [currentIndex, announce, maxIndex])

  const handlePrevious = () => {
    isUserInteractionRef.current = true
    previousSlide()
  }

  const handleNext = () => {
    isUserInteractionRef.current = true
    nextSlide()
  }

  const handleGoToSlide = (targetIndex: number) => {
    isUserInteractionRef.current = true
    goToSlide(targetIndex)
  }

  return { handlePrevious, handleNext, handleGoToSlide }
}

interface CertificationsSectionContentProps {
  pauseAutoPlay: () => void
  resumeAutoPlay: () => void
  visibleCertifications: Certification[]
  currentIndex: number
  itemsVisible: number
  isTransitioning: boolean
  showNavigation: boolean
  handlePrevious: () => void
  handleNext: () => void
  realCurrentIndex: number
  totalItems: number
  // eslint-disable-next-line no-unused-vars
  handleGoToSlide: (arg: number) => void
  touchHandlers: React.DOMAttributes<HTMLElement>
}

const CertificationsSectionContent: React.FC<CertificationsSectionContentProps> =
  memo(
    ({
      pauseAutoPlay,
      resumeAutoPlay,
      visibleCertifications,
      currentIndex,
      itemsVisible,
      isTransitioning,
      showNavigation,
      handlePrevious,
      handleNext,
      realCurrentIndex,
      totalItems,
      handleGoToSlide,
      touchHandlers,
    }) => {
      return (
        <section
          id='certificacoes'
          data-section='certificacoes'
          className='w-full py-16 px-4 bg-gray-50'
          aria-labelledby='certifications-heading'
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onFocus={pauseAutoPlay}
          onBlur={resumeAutoPlay}
          {...touchHandlers}
        >
          <div className='max-w-screen-2xl mx-auto'>
            <CertificationsSectionHeader />

            <div className='relative'>
              <CertificationsGrid
                visibleCertifications={visibleCertifications}
                currentIndex={currentIndex}
                itemsVisible={itemsVisible}
                isTransitioning={isTransitioning}
              />

              {showNavigation && (
                <>
                  <CarouselNavigation
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    currentIndex={realCurrentIndex}
                    totalSlides={totalItems}
                  />
                  <CarouselIndicators
                    total={totalItems}
                    current={realCurrentIndex}
                    onSelect={handleGoToSlide}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      )
    }
  )

CertificationsSectionContent.displayName = 'CertificationsSectionContent'

const getRealIndex = (
  index: number,
  maxIndex: number,
  totalSlides: number
): number => {
  if (index === 0) return maxIndex
  if (index > maxIndex + 1) return 0
  return (((index - 1) % totalSlides) + totalSlides) % totalSlides
}

const getExtendedCertifications = (itemsVisible: number) => [
  ...certifications.slice(-itemsVisible),
  ...certifications,
  ...certifications.slice(0, itemsVisible),
]

const useCertificationsLogic = () => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const { announce } = useScreenReaderAnnouncement()
  const hasAnnouncedAutoPlayRef = useRef(false)
  const itemsVisible = useResponsiveItems({ mobile: 1, tablet: 2, desktop: 4 })

  const carouselState = useCarousel({
    totalItems: certifications.length,
    enableAutoPlay: !prefersReducedMotion,
    autoPlayDelay: 4000,
    infiniteLoop: true,
    itemsVisible,
  })

  useEffect(() => {
    if (!prefersReducedMotion && !hasAnnouncedAutoPlayRef.current) {
      announce(
        'Carrossel em rotação automática. Passe o mouse sobre a seção para pausar.',
        'polite'
      )
      hasAnnouncedAutoPlayRef.current = true
    }
  }, [prefersReducedMotion, announce])

  return { ...carouselState, itemsVisible, announce }
}

const Certifications: React.FC = () => {
  const {
    currentIndex,
    maxIndex,
    hasMultiplePages,
    isTransitioning,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    itemsVisible,
    announce,
  } = useCertificationsLogic()

  const { handlePrevious, handleNext, handleGoToSlide } =
    useCertificationsHandlers({
      announce,
      nextSlide,
      previousSlide,
      goToSlide,
      currentIndex,
      maxIndex,
    })

  const touchHandlers = useTouchSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
    enabled: hasMultiplePages,
  })

  const totalSlides = maxIndex + 1
  const realCurrentIndex = getRealIndex(currentIndex, maxIndex, totalSlides)
  const extendedCertifications = getExtendedCertifications(itemsVisible)

  return (
    <CertificationsSectionContent
      pauseAutoPlay={pauseAutoPlay}
      resumeAutoPlay={resumeAutoPlay}
      visibleCertifications={extendedCertifications}
      currentIndex={currentIndex}
      itemsVisible={itemsVisible}
      isTransitioning={isTransitioning}
      showNavigation={hasMultiplePages}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      realCurrentIndex={realCurrentIndex}
      totalItems={totalSlides}
      handleGoToSlide={handleGoToSlide}
      touchHandlers={touchHandlers}
    />
  )
}

export default Certifications
