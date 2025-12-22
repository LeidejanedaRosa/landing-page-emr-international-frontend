import { memo } from 'react'

import { HERO_CONTENT, HERO_MAIN_TITLE_ID } from '../constants'

/**
 * Hero Headline Component
 *
 * Main heading for the hero section
 *
 * Clean Code principles:
 * - Single Responsibility: Only displays the headline
 * - Semantic HTML: Uses h1 as main page title
 * - SEO: Proper heading hierarchy
 */
export const HeroHeadline = memo(() => (
  <h1
    id={HERO_MAIN_TITLE_ID}
    className='text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight uppercase'
  >
    {HERO_CONTENT.headline.firstLine} <br />
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500'>
      {HERO_CONTENT.headline.highlightLine}
      <br />
    </span>
    {HERO_CONTENT.headline.thirdLine}
  </h1>
))

HeroHeadline.displayName = 'HeroHeadline'
