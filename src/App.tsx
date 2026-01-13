import React, { Suspense } from 'react'

import ErrorBoundary from './components/error/ErrorBoundary'
import { SectionErrorFallback } from './components/error/SectionErrorFallback'
import Header from './components/layout/Header'
import { LazySection } from './components/layout/LazySection'
import HeroCarousel from './components/sections/HeroCarousel'
import { ProductsModal } from './components/sections/ProductsModal'
import PromoBannerCarousel from './components/sections/PromoBannerCarousel/index'
import { JsonLdScript } from './components/seo/JsonLdScript'
import { ORGANIZATION_STRUCTURED_DATA } from './components/seo/organizationSchema'
import { HOMEPAGE_BREADCRUMB } from './components/seo/schemas/breadcrumbConstants'
import { BreadcrumbSchema } from './components/seo/schemas/BreadcrumbSchema'
import { LoadingSpinner } from './components/ui/Loading'
import FloatingContact from './components/widgets/FloatingContact'
import { PRODUCTS_MODAL_CONFIG, productsData } from './data/productsData'
import { useScrollTrigger } from './hooks/useScrollTrigger'

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
      <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
      <BreadcrumbSchema items={HOMEPAGE_BREADCRUMB} />
      <div className='min-h-screen bg-gray-50'>
        <Header />
        <main role='main' aria-label='Conteúdo principal'>
          <PromoBannerCarousel />
          <HeroCarousel />
          <LazySection
            sectionName='Por que importa'
            component={WhyItMattersSection}
          />
          <LazySection sectionName='Sobre' component={About} />
          <LazySection sectionName='Certificações' component={Certifications} />
          <LazySection sectionName='Cursos' component={Courses} />
          <LazySection sectionName='Depoimentos' component={Testimonials} />
          <LazySection
            sectionName='Chamada para ação'
            component={CallToAction}
          />
        </main>
        <ErrorBoundary
          fallback={({ resetError }) => (
            <SectionErrorFallback sectionName='Rodapé' onRetry={resetError} />
          )}
        >
          <Suspense
            fallback={
              <div className='py-8'>
                <LoadingSpinner size='lg' />
              </div>
            }
          >
            <Footer />
          </Suspense>
        </ErrorBoundary>
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
