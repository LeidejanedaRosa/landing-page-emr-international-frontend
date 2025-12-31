import { memo } from 'react'

import heroSideImageJpg from '../../../../assets/hero_section_01.jpg'
import { ScreenReaderOnly } from '../../../ui/Accessibility'
import {
  HeroCTA,
  HeroHeadline,
  HeroVisual,
  SocialProof,
  TrustBadge,
} from '../../Hero/components'
import { HERO_CONTENT, HERO_SECTION_ID } from '../../Hero/constants'
import { useHeroNavigation } from '../../Hero/hooks/useHeroNavigation'
import type { HeroImages } from '../../Hero/types'

const heroImages: HeroImages = {
  jpg: heroSideImageJpg,
}

interface HeroContentProps {
  className?: string
}

export const HeroContent = memo<HeroContentProps>(({ className = '' }) => {
  const { scrollToCourses } = useHeroNavigation()
  const headingId = `${HERO_SECTION_ID}-heading`

  return (
    <section
      className={`relative w-full h-full bg-black flex flex-col ${className}`}
      aria-labelledby={headingId}
    >
      <ScreenReaderOnly>
        <h2 id={headingId}>{HERO_CONTENT.seo.title}</h2>
        <p>{HERO_CONTENT.seo.contextDescription}</p>
      </ScreenReaderOnly>

      <div className='flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-0 relative'>
        <aside
          className='relative h-[45%] lg:h-full w-full order-1 lg:order-2'
          aria-label={HERO_CONTENT.visual.ariaLabel}
        >
          <HeroVisual images={heroImages} alt={HERO_CONTENT.visual.alt} />
        </aside>

        <div className='flex-1 relative z-20 flex flex-col justify-center lg:justify-between px-6 sm:px-12 lg:pl-24 lg:pr-12 pt-6 pb-14 sm:pb-16 lg:py-16 order-2 lg:order-1'>
          <TrustBadge />
          <HeroHeadline />
          <HeroCTA onClick={scrollToCourses} />
          <SocialProof />
        </div>
      </div>

      <ScreenReaderOnly>
        <h3>{HERO_CONTENT.about.title}</h3>
        <p>{HERO_CONTENT.about.description}</p>
      </ScreenReaderOnly>
    </section>
  )
})

HeroContent.displayName = 'HeroContent'
