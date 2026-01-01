import { memo, useMemo } from 'react'

import heroSideImageJpg from '../../../assets/hero_section_01.jpg'
import heroSideImageWebp from '../../../assets/hero_section_01.webp'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import {
  HeroCTA,
  HeroHeadline,
  HeroVisual,
  SocialProof,
  TrustBadge,
} from './components'
import { HERO_CONTENT, HERO_SECTION_ID } from './constants'
import { useHeroNavigation } from './hooks/useHeroNavigation'
import type { HeroImages, HeroProps } from './types'

const defaultHeroImages: HeroImages = {
  jpg: heroSideImageJpg,
  webp: heroSideImageWebp,
}

const Hero = memo<HeroProps>(({ onCtaClick, images, className = '' }) => {
  const heroImages = useMemo(() => images ?? defaultHeroImages, [images])
  const { scrollToCourses } = useHeroNavigation()

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else {
      scrollToCourses()
    }
  }

  const headingId = `${HERO_SECTION_ID}-heading`

  return (
    <div
      className={`relative w-full h-full bg-black flex flex-col ${className}`}
    >
      <ScreenReaderOnly>
        <h2 id={headingId}>{HERO_CONTENT.seo.title}</h2>
        <p>{HERO_CONTENT.seo.contextDescription}</p>
      </ScreenReaderOnly>

      <div className='flex-1 flex flex-col md:grid md:grid-cols-2 gap-0 relative w-full overflow-hidden'>
        <aside
          className='relative h-[40%] md:h-full w-full order-1 md:order-2'
          aria-label={HERO_CONTENT.visual.ariaLabel}
        >
          <HeroVisual images={heroImages} alt={HERO_CONTENT.visual.alt} />
        </aside>

        <div className='flex-1 relative z-20 flex flex-col justify-center md:justify-between px-6 sm:px-8 md:px-10 lg:pl-24 lg:pr-12 pt-4 pb-4 sm:pb-6 md:py-12 lg:py-16 order-2 md:order-1 overflow-hidden'>
          <TrustBadge />
          <HeroHeadline />
          <HeroCTA onClick={handleCtaClick} />
          <SocialProof />
        </div>
      </div>

      <ScreenReaderOnly>
        <h3>{HERO_CONTENT.about.title}</h3>
        <p>{HERO_CONTENT.about.description}</p>
      </ScreenReaderOnly>
    </div>
  )
})

Hero.displayName = 'Hero'

export default Hero
