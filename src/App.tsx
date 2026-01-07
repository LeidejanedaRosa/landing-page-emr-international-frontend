import React, { Suspense } from 'react'

import ErrorBoundary from './components/error/ErrorBoundary'
import Header from './components/layout/Header'
import HeroCarousel from './components/sections/HeroCarousel'
import { ProductsModal } from './components/sections/ProductsModal'
import PromoBannerCarousel from './components/sections/PromoBannerCarousel/index'
import { JsonLdScript } from './components/seo/JsonLdScript'
import { ORGANIZATION_STRUCTURED_DATA } from './components/seo/organizationSchema'
import {
  BreadcrumbSchema,
  DEFAULT_BREADCRUMBS,
} from './components/seo/schemas/BreadcrumbSchema'
import { LoadingSpinner, SectionSkeleton } from './components/ui/Loading'
import FloatingContact from './components/widgets/FloatingContact'
import { PRODUCTS_MODAL_CONFIG, productsData } from './data/productsData'
import { useScrollTrigger } from './hooks/useScrollTrigger'
import SEO from './utils/SEO'

const WhyItMattersSection = React.lazy(
  () => import('./components/sections/WhyItMatters/index')
)
const About = React.lazy(() => import('./components/sections/About/index'))
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
      targetSectionId: 'call-to-action',
      storageKey: 'productsModalShown',
    })

  return (
    <ErrorBoundary>
      <SEO />
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <BreadcrumbSchema items={DEFAULT_BREADCRUMBS} />
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <PromoBannerCarousel />
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
      <FloatingContact />
    </ErrorBoundary>
  )
}

export default App
