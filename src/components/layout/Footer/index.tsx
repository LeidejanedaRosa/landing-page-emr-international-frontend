import React from 'react'

import { BrandSection } from './BrandSection'
import { NAVIGATION_LINKS } from './constants'
import { ContactSection } from './ContactSection'
import { Copyright } from './Copyright'
import { QuickLinks } from './QuickLinks'

const Footer: React.FC = () => (
  <footer
    id='contato'
    data-section='contato'
    className='bg-black text-white py-12 md:py-16'
    role='contentinfo'
    aria-label='Rodapé do site com informações da empresa e links úteis'
  >
    <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1fr] gap-8 lg:gap-12 mb-12 items-end'>
        <BrandSection />
        <div className='grid grid-cols-2 md:contents'>
          <QuickLinks navigationLinks={NAVIGATION_LINKS} />
          <ContactSection />
        </div>
      </div>

      <Copyright />
    </div>
  </footer>
)

export default Footer
