import { memo } from 'react'

import heroSideImage from '../../../../assets/hero_section_01.jpg'
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

interface HeroContentProps {
  className?: string
}

export const HeroContent = memo<HeroContentProps>(({ className = '' }) => {
  const { scrollToCourses } = useHeroNavigation()
  const headingId = `${HERO_SECTION_ID}-heading`

  return (
    <div
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
          <HeroVisual imageSrc={heroSideImage} alt={HERO_CONTENT.visual.alt} />
        </aside>

        <div className='flex-1 lg:flex-none relative z-20 flex flex-col justify-center px-6 sm:px-12 lg:pl-24 lg:pr-12 py-6 lg:py-0 order-2 lg:order-1'>
          <TrustBadge />
          <HeroHeadline />
          <HeroCTA onClick={scrollToCourses} />
          <SocialProof />
        </div>
      </div>

      <ScreenReaderOnly>
        <h2>{HERO_CONTENT.about.title}</h2>
        <p>{HERO_CONTENT.about.description}</p>
      </ScreenReaderOnly>
    </div>
  )
})

HeroContent.displayName = 'HeroContent'
