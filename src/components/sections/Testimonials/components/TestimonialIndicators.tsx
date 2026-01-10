import { type KeyboardEvent, memo, type MutableRefObject, useMemo } from 'react'

import { PROGRESS_KEYFRAMES, TESTIMONIALS_A11Y } from '../constants'
import type { TestimonialIndicatorsProps } from '../types'

const MAX_VISIBLE_DOTS = 7

/* eslint-disable no-unused-vars */
interface IndicatorButtonProps {
  slideIndex: number
  isActive: boolean
  isAutoPlaying: boolean
  autoPlayDelay: number
  buttonsRef: MutableRefObject<(HTMLButtonElement | null)[]>
  onSelect: (n: number) => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>, n: number) => void
  size?: 'small' | 'normal'
}
/* eslint-enable no-unused-vars */

function getDotSize(isSmall: boolean, isActive: boolean): string {
  if (isSmall) return 'w-2 h-2'
  return isActive ? 'w-10 h-3' : 'w-3 h-3'
}

function getDotClasses(isSmall: boolean, isActive: boolean): string {
  const baseClasses = 'block rounded-full transition-all duration-300'
  const sizeClasses = getDotSize(isSmall, isActive)

  if (isActive) return `${baseClasses} ${sizeClasses} bg-white overflow-hidden`
  const opacityClass = isSmall ? 'opacity-50' : ''
  return `${baseClasses} ${sizeClasses} bg-primary-400 group-hover:bg-primary-300 ${opacityClass}`
}

const IndicatorButton = memo<IndicatorButtonProps>(
  ({
    slideIndex,
    isActive,
    isAutoPlaying,
    autoPlayDelay,
    buttonsRef,
    onSelect,
    onKeyDown,
    size = 'normal',
  }) => {
    const isSmall = size === 'small'
    const showProgress = isActive && isAutoPlaying && !isSmall
    const buttonSize = isSmall
      ? 'min-w-[28px] min-h-[44px]'
      : 'min-w-[44px] min-h-[44px]'

    return (
      <button
        ref={el => {
          buttonsRef.current[slideIndex] = el
        }}
        type='button'
        role='tab'
        aria-selected={isActive}
        aria-controls={`testimonial-slide-${slideIndex}`}
        tabIndex={isActive ? 0 : -1}
        aria-label={TESTIMONIALS_A11Y.goToSlide(slideIndex + 1)}
        onClick={() => onSelect(slideIndex)}
        onKeyDown={event => onKeyDown(event, slideIndex)}
        className={`relative flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-900 group ${buttonSize}`}
      >
        <span className={getDotClasses(isSmall, isActive)}>
          {showProgress && (
            <span
              data-testid='progress-bar'
              className='block h-full bg-cta-500 rounded-full'
              style={{ animation: `progress ${autoPlayDelay}ms linear` }}
            />
          )}
        </span>
      </button>
    )
  }
)

IndicatorButton.displayName = 'IndicatorButton'

export type { IndicatorButtonProps }

type DotInfo = { index: number; size: 'small' | 'normal' }

function calculateDotRange(
  currentIndex: number,
  totalSlides: number,
  sideCount: number
): { start: number; end: number } {
  let start = currentIndex - sideCount
  let end = currentIndex + sideCount

  if (start < 0) {
    end -= start
    start = 0
  }
  if (end >= totalSlides) {
    start -= end - totalSlides + 1
    end = totalSlides - 1
  }

  return { start: Math.max(0, start), end: Math.min(totalSlides - 1, end) }
}

function buildDotsList(
  start: number,
  end: number,
  totalSlides: number
): DotInfo[] {
  const dots: DotInfo[] = []
  const hasStartEllipsis = start > 0
  const hasEndEllipsis = end < totalSlides - 1

  if (hasStartEllipsis) dots.push({ index: 0, size: 'small' })

  const rangeStart = hasStartEllipsis ? Math.max(1, start) : start
  const rangeEnd = hasEndEllipsis ? Math.min(totalSlides - 2, end) : end

  for (let i = rangeStart; i <= rangeEnd; i++) {
    dots.push({ index: i, size: 'normal' })
  }

  if (hasEndEllipsis) dots.push({ index: totalSlides - 1, size: 'small' })

  return dots
}

function getVisibleDots(currentIndex: number, totalSlides: number): DotInfo[] {
  if (totalSlides <= MAX_VISIBLE_DOTS) {
    return Array.from({ length: totalSlides }, (_, i) => ({
      index: i,
      size: 'normal' as const,
    }))
  }

  const mainDotsCount = MAX_VISIBLE_DOTS - 2
  const sideCount = Math.floor((mainDotsCount - 1) / 2)
  let { start, end } = calculateDotRange(currentIndex, totalSlides, sideCount)

  const hasStartEllipsis = start > 0
  const hasEndEllipsis = end < totalSlides - 1

  if (!hasStartEllipsis && hasEndEllipsis) {
    end = Math.min(totalSlides - 2, MAX_VISIBLE_DOTS - 2)
  } else if (hasStartEllipsis && !hasEndEllipsis) {
    start = Math.max(1, totalSlides - (MAX_VISIBLE_DOTS - 1))
  }

  return buildDotsList(start, end, totalSlides)
}

export const TestimonialIndicators = memo<TestimonialIndicatorsProps>(
  ({
    currentIndex,
    totalSlides,
    onSelect,
    buttonsRef,
    handleKeyDown,
    isAutoPlaying = false,
    autoPlayDelay = 5000,
  }) => {
    const visibleDots = useMemo(
      () => getVisibleDots(currentIndex, totalSlides),
      [currentIndex, totalSlides]
    )

    return (
      <nav aria-label='Navegação dos depoimentos'>
        <div
          className='flex justify-center items-center gap-1 mt-8 max-w-full overflow-hidden px-4'
          role='tablist'
          aria-label='Selecionar depoimento'
        >
          {visibleDots.map(({ index, size }) => (
            <IndicatorButton
              key={index}
              slideIndex={index}
              isActive={index === currentIndex}
              isAutoPlaying={isAutoPlaying}
              autoPlayDelay={autoPlayDelay}
              buttonsRef={buttonsRef}
              onSelect={onSelect}
              onKeyDown={handleKeyDown}
              size={size}
            />
          ))}
        </div>
        <p
          className='text-center mt-4 text-primary-300 text-sm font-medium'
          aria-live='polite'
          aria-atomic='true'
        >
          {TESTIMONIALS_A11Y.counter(currentIndex + 1, totalSlides)}
        </p>
        <style>{PROGRESS_KEYFRAMES}</style>
      </nav>
    )
  }
)

TestimonialIndicators.displayName = 'TestimonialIndicators'
