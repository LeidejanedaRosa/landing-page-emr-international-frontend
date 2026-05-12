import React from 'react'

interface EnrollmentCourseImageProps {
  imageAvif?: string
  imageWebp?: string
  imageJpg: string
  title: string
  subtitle: string
  priority?: boolean
}

export const EnrollmentCourseImage: React.FC<EnrollmentCourseImageProps> = ({
  imageAvif,
  imageWebp,
  imageJpg,
  title,
  subtitle,
  priority = false,
}) => (
  <>
    <picture>
      {imageAvif && (
        <source
          srcSet={imageAvif}
          type='image/avif'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      )}
      {imageWebp && (
        <source
          srcSet={imageWebp}
          type='image/webp'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      )}
      <img
        src={imageJpg}
        alt={`${title} - ${subtitle}`}
        width={800}
        height={600}
        sizes='(max-width: 768px) 100vw, 50vw'
        className='w-full h-full object-cover object-[70%_top] lg:object-cover lg:object-center xl:object-[center_40%]'
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding='async'
        onError={e => {
          e.currentTarget.src = '/fallback-image.jpg'
        }}
      />
    </picture>
    <div
      className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black opacity-90 md:bg-gradient-to-l pointer-events-none'
      aria-hidden='true'
    />
  </>
)
