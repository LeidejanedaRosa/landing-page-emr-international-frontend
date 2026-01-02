import React, { memo } from 'react'

interface CourseImageProps {
  imageAvif?: string
  imageWebp?: string
  imageJpg: string
  title: string
  subtitle: string
  priority?: boolean
}

export const CourseImage: React.FC<CourseImageProps> = memo(
  ({ imageAvif, imageWebp, imageJpg, title, subtitle, priority = false }) => {
    return (
      <picture>
        {imageAvif && <source srcSet={imageAvif} type='image/avif' />}
        {imageWebp && <source srcSet={imageWebp} type='image/webp' />}
        <img
          src={imageJpg}
          alt={`${title} - ${subtitle}`}
          width={800}
          height={600}
          className='w-full h-full object-contain object-top lg:object-cover lg:object-center xl:object-[center_30%]'
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={e => {
            e.currentTarget.src = '/fallback-image.jpg'
          }}
        />
      </picture>
    )
  }
)

CourseImage.displayName = 'CourseImage'
