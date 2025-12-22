import React from 'react'

import { useUniqueId } from '../../hooks/useAccessibility'

interface HeroImageProps {
  className: string
  prefersReducedMotion: boolean
  imageAvif: string
  imageWebp: string
  imageJpg: string
}
export const Image: React.FC<HeroImageProps> = ({
  className,
  prefersReducedMotion,
  imageAvif,
  imageWebp,
  imageJpg,
}) => {
  const imageId = useUniqueId('hero-image')

  return (
    <picture>
      <source srcSet={imageAvif} type='image/avif' sizes='100vw' />
      <source srcSet={imageWebp} type='image/webp' sizes='100vw' />
      <img
        id={imageId}
        src={imageJpg}
        alt='Equipe de resgate tático da EMR Internacional em operação de emergência médica com equipamentos avançados'
        className={className}
        loading='eager'
        fetchPriority='high'
        width={1920}
        height={1080}
        style={{
          transform: prefersReducedMotion ? 'none' : undefined,
        }}
      />
    </picture>
  )
}

Image.displayName = 'Image'
