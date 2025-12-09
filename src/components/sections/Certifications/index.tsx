import React, { memo, useEffect, useRef } from 'react'

import { certifications } from '../../../data/certificationsData'
import {
  useAccessibilityPreferences,
  useScreenReaderAnnouncement,
  useUniqueId,
} from '../../../hooks/useAccessibility'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import { CertificationCard } from './CertificationCard'
import { useCertificationsCarousel } from './hooks/useCertificationsCarousel'

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
          className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 lg:-translate-x-16 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors bg-transparent border-0 cursor-pointer p-0'
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
          className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 lg:translate-x-16 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors bg-transparent border-0 cursor-pointer p-0'
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

interface CertificationsSectionHeaderProps {
  sectionId: string
}

const CertificationsSectionHeader: React.FC<CertificationsSectionHeaderProps> =
  memo(({ sectionId }) => {
    return (
      <header className='text-center mb-12'>
        <div className='inline-block mb-4'>
          <span
            className='text-xs font-bold uppercase tracking-wider text-gray-500 border-t-2 border-b-2 border-black py-2 px-4'
            aria-hidden='true'
          >
            Certificações
          </span>
        </div>
        <h2
          id={`${sectionId}-heading`}
          className='text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4'
        >
          Credenciamento Internacional
        </h2>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Certificado pelas principais instituições mundiais em emergências
          médicas e resposta a traumas
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
  sectionId: string
  pauseAutoPlay: () => void
  resumeAutoPlay: () => void
  visibleCertifications: typeof certifications
  currentIndex: number
  itemsVisible: number
  isTransitioning: boolean
  showNavigation: boolean
  handlePrevious: () => void
  handleNext: () => void
  realCurrentIndex: number
  totalItems: number
  handleGoToSlide: (arg: number) => void // eslint-disable-line no-unused-vars
}

const CertificationsSectionContent: React.FC<CertificationsSectionContentProps> =
  memo(
    ({
      sectionId,
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
    }) => {
      return (
        <section
          id='certifications'
          className='w-full py-16 px-4 bg-gray-50'
          aria-labelledby={`${sectionId}-heading`}
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onFocus={pauseAutoPlay}
          onBlur={resumeAutoPlay}
        >
          <div className='max-w-7xl mx-auto'>
            <CertificationsSectionHeader sectionId={sectionId} />

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

const Certifications: React.FC = () => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  const { announce } = useScreenReaderAnnouncement()
  const sectionId = useUniqueId('certifications')
  const hasAnnouncedAutoPlayRef = useRef(false)

  const {
    currentIndex,
    itemsVisible,
    maxIndex,
    hasMultiplePages,
    isTransitioning,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useCertificationsCarousel({
    totalItems: certifications.length,
    enableAutoPlay: !prefersReducedMotion,
    autoPlayDelay: 4000,
    itemsPerView: { mobile: 1, tablet: 2, desktop: 4 },
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

  const { handlePrevious, handleNext, handleGoToSlide } =
    useCertificationsHandlers({
      announce,
      nextSlide,
      previousSlide,
      goToSlide,
      currentIndex,
      maxIndex,
    })

  const extendedCertifications = [
    ...certifications.slice(-itemsVisible),
    ...certifications,
    ...certifications.slice(0, itemsVisible),
  ]

  const showNavigation = hasMultiplePages
  const realCurrentIndex =
    currentIndex === 0
      ? certifications.length - 1
      : currentIndex === certifications.length + 1
        ? 0
        : currentIndex - 1

  return (
    <CertificationsSectionContent
      sectionId={sectionId}
      pauseAutoPlay={pauseAutoPlay}
      resumeAutoPlay={resumeAutoPlay}
      visibleCertifications={extendedCertifications}
      currentIndex={currentIndex}
      itemsVisible={itemsVisible}
      isTransitioning={isTransitioning}
      showNavigation={showNavigation}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      realCurrentIndex={realCurrentIndex}
      totalItems={certifications.length}
      handleGoToSlide={handleGoToSlide}
    />
  )
}

export default Certifications
