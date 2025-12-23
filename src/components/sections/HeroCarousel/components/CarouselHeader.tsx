import { memo, Suspense } from 'react'

import Header from '../../../layout/Header'
import PromoBannerCarousel from '../../PromoBannerCarousel'

export const CarouselHeader = memo(() => {
  return (
    <div className='flex-none z-40'>
      <Suspense
        fallback={<div className='h-16 bg-black/20' aria-hidden='true' />}
      >
        <Header className='bg-transparent shadow-none' />
      </Suspense>

      <Suspense
        fallback={<div className='h-12 bg-black/10' aria-hidden='true' />}
      >
        <PromoBannerCarousel />
      </Suspense>
    </div>
  )
})

CarouselHeader.displayName = 'CarouselHeader'
