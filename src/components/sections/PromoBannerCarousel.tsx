import React from 'react'

interface PromoBannerCarouselProps {
  text?: string
  speed?: number
  className?: string
}

const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
  text = 'NESSA SEMANA COM 20% OFF',
  speed = 15,
  className = '',
}) => {
  return (
    <div
      className={`w-full max-h-10 bg-white border-t border-b border-gray-200 overflow-hidden relative ${className}`}
      role='banner'
      aria-label='Banner promocional'
    >
      <div
        className='flex whitespace-nowrap animate-scroll'
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {Array.from({ length: 8 }, (_, index) => (
          <React.Fragment key={index}>
            <div className='flex items-center justify-center px-8'>
              <span className='text-black font-bold text-sm md:text-base lg:text-xs uppercase tracking-wider'>
                {text}
              </span>
            </div>
            <div className='flex h-fit items-center justify-center px-4'>
              <span className='text-black text-lg font-bold'>•</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className='absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none' />
      <div className='absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none' />
    </div>
  )
}

export default PromoBannerCarousel
