import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCertificationsCarouselProps {
  totalItems: number
  autoPlayDelay?: number
  enableAutoPlay?: boolean
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

const getItemsForViewport = (
  width: number,
  itemsPerView: UseCertificationsCarouselProps['itemsPerView']
) => {
  if (!itemsPerView) return 4
  if (width < 768) return itemsPerView.mobile
  if (width < 1024) return itemsPerView.tablet
  return itemsPerView.desktop
}

const useResponsiveItems = (
  itemsPerView: UseCertificationsCarouselProps['itemsPerView']
) => {
  const [itemsVisible, setItemsVisible] = useState(itemsPerView?.desktop ?? 4)

  useEffect(() => {
    const updateItemsVisible = () => {
      setItemsVisible(getItemsForViewport(window.innerWidth, itemsPerView))
    }
    updateItemsVisible()
    window.addEventListener('resize', updateItemsVisible)
    return () => window.removeEventListener('resize', updateItemsVisible)
  }, [itemsPerView])

  return itemsVisible
}

export const useCertificationsCarousel = ({
  totalItems,
  autoPlayDelay = 3000,
  enableAutoPlay = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
}: UseCertificationsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay)
  const itemsVisible = useResponsiveItems(itemsPerView)
  const timeoutRef = useRef<number | null>(null)

  const maxIndex = Math.max(0, totalItems - itemsVisible)
  const hasMultiplePages = totalItems > itemsVisible

  useEffect(() => {
    if (currentIndex === totalItems + 1 || currentIndex === 0) {
      timeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex === totalItems + 1 ? 1 : totalItems)
      }, 500)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, totalItems])

  const nextSlide = useCallback(() => {
    if (hasMultiplePages) {
      setIsTransitioning(true)
      setCurrentIndex(prev => prev + 1)
    }
  }, [hasMultiplePages])

  const previousSlide = useCallback(() => {
    if (hasMultiplePages) {
      setIsTransitioning(true)
      setCurrentIndex(prev => prev - 1)
    }
  }, [hasMultiplePages])

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index <= maxIndex) {
        setIsTransitioning(true)
        setCurrentIndex(index + 1)
      }
    },
    [maxIndex]
  )

  const pauseAutoPlay = useCallback(() => setIsAutoPlaying(false), [])
  const resumeAutoPlay = useCallback(() => setIsAutoPlaying(true), [])

  useEffect(() => {
    if (!isAutoPlaying || !enableAutoPlay) return
    const interval = setInterval(nextSlide, autoPlayDelay)
    return () => clearInterval(interval)
  }, [isAutoPlaying, enableAutoPlay, nextSlide, autoPlayDelay])

  return {
    currentIndex,
    totalItems,
    itemsVisible,
    maxIndex,
    hasMultiplePages,
    isTransitioning,
    nextSlide,
    previousSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    isAutoPlaying,
  }
}
