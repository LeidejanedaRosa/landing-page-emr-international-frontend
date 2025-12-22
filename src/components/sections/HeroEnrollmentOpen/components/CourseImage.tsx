import React, { memo } from 'react'

interface CourseImageProps {
  imageAvif: string
  imageWebp: string
  imageJpg: string
  title: string
  subtitle: string
}

export const CourseImage: React.FC<CourseImageProps> = memo(
  ({ imageAvif, imageWebp, imageJpg, title, subtitle }) => {
    return (
      <picture>
        <source srcSet={imageAvif} type='image/avif' />
        <source srcSet={imageWebp} type='image/webp' />
        <img
          src={imageJpg}
          alt={`${title} - ${subtitle}`}
          className='w-full h-full object-cover'
          loading='eager'
        />
      </picture>
    )
  }
)

CourseImage.displayName = 'CourseImage'
