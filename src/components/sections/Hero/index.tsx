import heroSideImageAvif from '../../../assets/hero/bg_hero_section.avif'
import heroSideImageJpg from '../../../assets/hero/bg_hero_section.jpg'
import heroSideImageWebp from '../../../assets/hero/bg_hero_section.webp'
import { useScrollTo } from '../../../hooks/useScrollTo'
import {
  HeroCTA,
  HeroHeadline,
  HeroVisual,
  SocialProof,
  TrustBadge,
} from './components'
import { COURSES_SECTION_ID, HERO_CONTENT } from './constants'

const heroImages = {
  avif: heroSideImageAvif,
  jpg: heroSideImageJpg,
  webp: heroSideImageWebp,
}

const Hero = () => {
  const { scrollTo } = useScrollTo()

  return (
    <section
      aria-labelledby='hero-main-title'
      className='relative w-full h-full bg-black'
    >
      <div
        className='h-full flex flex-col gap-0 relative w-full max-w-screen-2xl mx-auto overflow-hidden
                        landscape-mobile:flex-row
                        md:grid md:grid-cols-2'
      >
        <aside
          className='relative min-h-[45vh] flex-shrink-0 w-full order-1
                        landscape-mobile:min-h-full landscape-mobile:w-1/2 landscape-mobile:order-2
                        md:h-full md:order-2'
          aria-label={HERO_CONTENT.visual.ariaLabel}
        >
          <HeroVisual images={heroImages} alt={HERO_CONTENT.visual.alt} />
        </aside>
        <div
          className='flex-1 min-h-0 relative z-20 flex flex-col justify-around gap-2 px-4 py-3 order-2
                        landscape-mobile:w-1/2 landscape-mobile:gap-3 landscape-mobile:py-8 landscape-mobile:px-8 landscape-mobile:order-1
                        sm:gap-3 sm:px-6 sm:py-4
                        md:py-6 md:gap-4 md:order-1 md:justify-between'
        >
          <TrustBadge />
          <HeroHeadline />
          <HeroCTA onClick={() => scrollTo(COURSES_SECTION_ID)} />
          <SocialProof />
        </div>
      </div>
    </section>
  )
}

export default Hero
