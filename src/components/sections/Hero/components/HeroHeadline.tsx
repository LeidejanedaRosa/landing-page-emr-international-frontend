import { HERO_CONTENT, HERO_MAIN_TITLE_ID } from '../constants'

export const HeroHeadline = () => (
  <h1
    id={HERO_MAIN_TITLE_ID}
    className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[0.95] tracking-tight uppercase'
  >
    {HERO_CONTENT.headline.firstLine} <br />
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500'>
      {HERO_CONTENT.headline.highlightLine}
      <br />
    </span>
    <span className='block lg:inline'>{HERO_CONTENT.headline.thirdLine}</span>
    <span className='block lg:inline'>{HERO_CONTENT.headline.fourthLine}</span>
  </h1>
)
