import heroSideImageJpg from '../../../assets/bg_hero_section.jpg'
import heroSideImageWebp from '../../../assets/bg_hero_section.webp'
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

const heroImages = {
  jpg: heroSideImageJpg,
  webp: heroSideImageWebp,
}

const Hero = () => {
  const { scrollToCourses } = useHeroNavigation()
  const headingId = `${HERO_SECTION_ID}-heading`

  return (
    <section
      aria-labelledby={headingId}
      className='relative w-full h-full bg-black'
    >
      <ScreenReaderOnly>
        <h2 id={headingId}>{HERO_CONTENT.seo.title}</h2>
        <p>{HERO_CONTENT.seo.contextDescription}</p>
      </ScreenReaderOnly>

      <div className='h-full flex flex-col md:grid md:grid-cols-2 gap-0 relative w-full max-w-screen-2xl mx-auto overflow-hidden'>
        <aside
          className='relative h-[55%] min-h-[180px] flex-shrink-0 md:h-full w-full order-1 md:order-2'
          aria-label={HERO_CONTENT.visual.ariaLabel}
        >
          <HeroVisual images={heroImages} alt={HERO_CONTENT.visual.alt} />
        </aside>

        <div className='flex-1 min-h-0 relative z-20 flex flex-col justify-center gap-3 md:gap-4 px-4 sm:px-6 md:px-10 lg:pl-24 lg:pr-12 py-4 md:py-12 lg:py-16 order-2 md:order-1 bg-black md:bg-transparent'>
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
}

export default Hero
