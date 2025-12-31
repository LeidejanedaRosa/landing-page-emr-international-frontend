import Header from '../../../layout/Header'
import PromoBannerCarousel from '../../PromoBannerCarousel'

export const CarouselHeader = () => {
  return (
    <div className='flex-none z-40'>
      <Header className='bg-transparent shadow-none' />
      <PromoBannerCarousel />
    </div>
  )
}
