import React, { Suspense } from 'react'

import ErrorBoundary from './components/error/ErrorBoundary'
import HeroCarousel from './components/sections/HeroCarousel'
import { ProductsModal } from './components/sections/ProductsModal'
import { JsonLdScript } from './components/seo/JsonLdScript'
import { ORGANIZATION_STRUCTURED_DATA } from './components/seo/organizationSchema'
import { LoadingSpinner, SectionSkeleton } from './components/ui/Loading'
import { PRODUCTS_MODAL_CONFIG, productsData } from './data/productsData'
import { useScrollTrigger } from './hooks/useScrollTrigger'
import SEO from './utils/SEO'

const WhyItMattersSection = React.lazy(
  () => import('./components/sections/WhyItMatters')
)
const About = React.lazy(() => import('./components/sections/About'))
const Certifications = React.lazy(
  () => import('./components/sections/Certifications')
)
const Courses = React.lazy(() => import('./components/sections/Courses'))
const Testimonials = React.lazy(
  () => import('./components/sections/Testimonials')
)
const CallToAction = React.lazy(
  () => import('./components/sections/CallToAction')
)
const Footer = React.lazy(() => import('./components/layout/Footer/index'))

function App() {
  const { hasTriggered: showProductsModal, resetTrigger: closeProductsModal } =
    useScrollTrigger({
      targetSectionId: 'courses',
      storageKey: 'productsModalShown',
    })

  return (
    <ErrorBoundary>
      <SEO />
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <div className='min-h-screen bg-gray-50 overflow-x-hidden'>
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
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CallToAction />
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
      <ProductsModal
        isOpen={showProductsModal}
        onClose={closeProductsModal}
        products={productsData}
        title={PRODUCTS_MODAL_CONFIG.title}
        subtitle={PRODUCTS_MODAL_CONFIG.subtitle}
        ctaText={PRODUCTS_MODAL_CONFIG.ctaText}
      />
    </ErrorBoundary>
  )
}

export default App
