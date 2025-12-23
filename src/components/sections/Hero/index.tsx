import { memo, Suspense } from 'react'

import heroSideImage from '../../../assets/hero_section_01.jpg'
import Header from '../../layout/Header'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import PromoBannerCarousel from '../PromoBannerCarousel'
import {
  HeroCTA,
  HeroHeadline,
  HeroVisual,
  SocialProof,
  TrustBadge,
} from './components'
import { HERO_CONTENT, HERO_SECTION_ID } from './constants'
import { useHeroNavigation } from './hooks/useHeroNavigation'
import type { HeroProps } from './types'

const Hero = memo<HeroProps>(
  ({ onCtaClick, imageSrc = heroSideImage, className = '' }) => {
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
      <section
        id={HERO_SECTION_ID}
        className={`relative w-full min-h-screen bg-black overflow-hidden flex flex-col ${className}`}
        aria-labelledby={headingId}
      >
        <ScreenReaderOnly>
          <h2 id={headingId}>{HERO_CONTENT.seo.title}</h2>
          <p>{HERO_CONTENT.seo.contextDescription}</p>
        </ScreenReaderOnly>

        <div className='flex-none'>
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

        <div className='flex-1 grid lg:grid-cols-2 gap-0 relative'>
          <div className='relative z-20 flex flex-col justify-center px-6 sm:px-12 lg:pl-24 lg:pr-12 py-12 lg:py-0 order-2 lg:order-1'>
            <TrustBadge />
            <HeroHeadline />
            <HeroCTA onClick={handleCtaClick} />
            <SocialProof />
          </div>

          <aside
            className='relative h-[50vh] lg:h-auto w-full order-1 lg:order-2'
            aria-label={HERO_CONTENT.visual.ariaLabel}
          >
            <HeroVisual imageSrc={imageSrc} alt={HERO_CONTENT.visual.alt} />
          </aside>
        </div>

        <ScreenReaderOnly>
          <h3>{HERO_CONTENT.about.title}</h3>
          <p>{HERO_CONTENT.about.description}</p>
        </ScreenReaderOnly>
      </section>
    )
  }
)

Hero.displayName = 'Hero'

export default Hero
