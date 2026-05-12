import type { CourseCardImageProps } from '../types'

export const CourseCardImage = ({ images }: CourseCardImageProps) => (
  <picture className='w-full h-full'>
    {images.avif && (
      <source
        srcSet={images.avif}
        type='image/avif'
        sizes='(max-width: 768px) 100vw, 50vw'
      />
    )}
    {images.webp && (
      <source
        srcSet={images.webp}
        type='image/webp'
        sizes='(max-width: 768px) 100vw, 50vw'
      />
    )}
    <img
      src={images.jpg}
      alt={images.alt}
      className='w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105'
      loading='lazy'
      decoding='async'
      width={800}
      height={600}
    />
  </picture>
)
