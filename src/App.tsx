import React, { Suspense } from 'react'

import ErrorBoundary from './components/error/ErrorBoundary'
import Hero from './components/sections/Hero'
import StructuredData from './components/seo/StructuredData'
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
      <div className='min-h-screen bg-gray-50'>
        <SEO />
        <StructuredData />
        <main>
          <Hero />
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
        </main>
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
