import React from 'react'

interface CarouselItemProps {
  text: string
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ text }) => {
  return (
    <>
      <div className='flex items-center justify-center px-8'>
        <span className='text-black font-bold text-sm md:text-base lg:text-xs uppercase tracking-wider'>
          {text}
        </span>
      </div>
      <div className='flex h-fit items-center justify-center px-4'>
        <span className='text-black text-lg font-bold' role='presentation'>
          •
        </span>
      </div>
    </>
  )
}
