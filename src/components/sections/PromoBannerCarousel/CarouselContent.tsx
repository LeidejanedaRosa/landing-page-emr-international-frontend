import React from 'react'

import { CarouselItem } from './CarouselItem'

const REPEAT_COUNT = 10

interface CarouselContentProps {
  text: string
  speed: number
  isPaused: boolean
  prefersReducedMotion: boolean
}

export const CarouselContent: React.FC<CarouselContentProps> = ({
  text,
  speed,
  isPaused,
  prefersReducedMotion,
}) => {
  const shouldAnimate = !isPaused && !prefersReducedMotion

  return (
    <div
      className={`flex whitespace-nowrap ${shouldAnimate ? 'animate-scroll' : ''}`}
      style={{
        animationDuration: prefersReducedMotion ? '0s' : `${speed}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationPlayState: isPaused ? 'paused' : 'running',
      }}
      aria-hidden='true'
    >
      {Array.from({ length: REPEAT_COUNT }, (_, index) => (
        <CarouselItem key={index} text={text} />
      ))}
    </div>
  )
}
