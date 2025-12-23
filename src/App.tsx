import React, { Suspense } from 'react'

import ErrorBoundary from './components/error/ErrorBoundary'
import HeroCarousel from './components/sections/HeroCarousel'
import { JsonLdScript } from './components/seo/JsonLdScript'
import { ORGANIZATION_STRUCTURED_DATA } from './components/seo/organizationSchema'
import { LoadingSpinner, SectionSkeleton } from './components/ui/Loading'
import SEO from './utils/SEO'

const WhyItMattersSection = React.lazy(
  () => import('./components/sections/WhyItMatters')
)
const About = React.lazy(() => import('./components/sections/About'))
const Certifications = React.lazy(
  () => import('./components/sections/Certifications')
)
const Courses = React.lazy(() => import('./components/sections/Courses'))
const Contact = React.lazy(() => import('./components/sections/Contact'))
const Footer = React.lazy(() => import('./components/layout/Footer'))

function App() {
  return (
    <ErrorBoundary>
      <SEO />
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <div className='min-h-screen bg-gray-50'>
        <HeroCarousel />
        <Suspense fallback={<SectionSkeleton />}>
          <WhyItMattersSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Courses />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
        <Suspense
          fallback={
            <div className='py-8'>
              <LoadingSpinner size='lg' />
            </div>
          }
        >
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
