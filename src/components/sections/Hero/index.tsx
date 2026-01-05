import heroSideImageJpg from '../../../assets/bg_hero_section.jpg'
import heroSideImageWebp from '../../../assets/bg_hero_section.webp'
import { useScrollTo } from '../../../hooks/useScrollTo'
import { ScreenReaderOnly } from '../../ui/Accessibility'
import {
  HeroCTA,
  HeroHeadline,
  HeroVisual,
  SocialProof,
  TrustBadge,
} from './components'
import { COURSES_SECTION_ID, HERO_CONTENT, HERO_SECTION_ID } from './constants'

const heroImages = {
  jpg: heroSideImageJpg,
  webp: heroSideImageWebp,
}

const Hero = () => {
  const { scrollTo } = useScrollTo()
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

      <div
        className='h-full flex flex-col gap-0 relative w-full max-w-screen-2xl mx-auto overflow-hidden
                        lg:grid lg:grid-cols-2 '
      >
        <aside
          className='relative h-[55%] min-h-[180px] flex-shrink-0 lg:h-full w-full order-1 lg:order-2'
          aria-label={HERO_CONTENT.visual.ariaLabel}
        >
          <HeroVisual images={heroImages} alt={HERO_CONTENT.visual.alt} />
        </aside>

        <div
          className='flex-1 min-h-0 relative z-20 flex flex-col justify-center md:justify-between gap-6 px-4 py-4 order-2
                        sm:px-6
                        md:gap-4 md:px-10 md:py-12 md:bg-transparent
                        lg:pl-24 lg:pr-12 lg:py-16 lg:order-1 '
        >
          <TrustBadge />
          <HeroHeadline />
          <HeroCTA onClick={() => scrollTo(COURSES_SECTION_ID)} />
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
