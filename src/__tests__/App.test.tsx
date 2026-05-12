import { type ReactNode } from 'react'

import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'

import App from '../App'
import { render, screen } from '../test/test-utils'

// Mock lazy-loaded components to speed up tests
vi.mock('../components/sections/WhyItMatters/index', () => ({
  default: () => <div data-testid='why-it-matters'>WhyItMatters</div>,
}))

vi.mock('../components/sections/About/index', () => ({
  default: () => <div data-testid='about'>About</div>,
}))

vi.mock('../components/sections/Certifications', () => ({
  default: () => <div data-testid='certifications'>Certifications</div>,
}))

vi.mock('../components/sections/Courses', () => ({
  default: () => <div data-testid='courses'>Courses</div>,
}))

vi.mock('../components/sections/Testimonials', () => ({
  default: () => <div data-testid='testimonials'>Testimonials</div>,
}))

vi.mock('../components/sections/ReaperProtocol', () => ({
  default: () => <div data-testid='reaper-protocol'>ReaperProtocol</div>,
}))

vi.mock('../components/layout/Footer/index', () => ({
  default: () => <footer data-testid='footer'>Footer</footer>,
}))

// Mock non-lazy components
vi.mock('../components/layout/Header', () => ({
  default: () => <header data-testid='header'>Header</header>,
}))

vi.mock('../components/sections/HeroCarousel', () => ({
  default: () => <div data-testid='hero-carousel'>HeroCarousel</div>,
}))

vi.mock('../components/sections/PromoBannerCarousel/index', () => ({
  default: () => <div data-testid='promo-banner'>PromoBanner</div>,
}))

vi.mock('../components/sections/ProductsModal', () => ({
  ProductsModal: () => <div data-testid='products-modal'>ProductsModal</div>,
}))

vi.mock('../components/widgets/FloatingContact', () => ({
  default: () => <div data-testid='floating-contact'>FloatingContact</div>,
}))

vi.mock('../components/error/ErrorBoundary', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='error-boundary'>{children}</div>
  ),
}))

vi.mock('../components/layout/LazySection', async () => {
  const { Suspense } = await import('react')
  return {
    LazySection: ({ component: Component }: { component: () => null }) => (
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    ),
  }
})

vi.mock('../hooks/useScrollTrigger', () => ({
  useScrollTrigger: () => ({
    hasTriggered: false,
    resetTrigger: vi.fn(),
  }),
}))

describe('App', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      render(<App />)
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should render Header', () => {
      render(<App />)
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should render HeroCarousel', () => {
      render(<App />)
      expect(screen.getByTestId('hero-carousel')).toBeInTheDocument()
    })

    it('should render PromoBannerCarousel', () => {
      render(<App />)
      expect(screen.getByTestId('promo-banner')).toBeInTheDocument()
    })

    it('should render FloatingContact', () => {
      render(<App />)
      expect(screen.getByTestId('floating-contact')).toBeInTheDocument()
    })

    it('should render ProductsModal', () => {
      render(<App />)
      expect(screen.getByTestId('products-modal')).toBeInTheDocument()
    })
  })

  describe('lazy-loaded sections', () => {
    it('should render WhyItMatters section', async () => {
      render(<App />)
      expect(await screen.findByTestId('why-it-matters')).toBeInTheDocument()
    })

    it('should render About section', async () => {
      render(<App />)
      expect(await screen.findByTestId('about')).toBeInTheDocument()
    })

    it('should render Certifications section', async () => {
      render(<App />)
      expect(await screen.findByTestId('certifications')).toBeInTheDocument()
    })

    it('should render Courses section', async () => {
      render(<App />)
      expect(await screen.findByTestId('courses')).toBeInTheDocument()
    })

    it('should render Testimonials section', async () => {
      render(<App />)
      expect(await screen.findByTestId('testimonials')).toBeInTheDocument()
    })

    it('should render ReaperProtocol section', async () => {
      render(<App />)
      expect(await screen.findByTestId('reaper-protocol')).toBeInTheDocument()
    })

    it('should render Footer', async () => {
      render(<App />)
      expect(await screen.findByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('structure', () => {
    it('should have main content area', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should have accessible main element with aria-label', () => {
      render(<App />)
      const main = screen.getByRole('main')
      expect(main).toHaveAttribute('aria-label', 'Conteúdo principal')
    })

    it('should have min-h-screen container', () => {
      render(<App />)
      const container = document.querySelector('.min-h-screen')
      expect(container).toBeInTheDocument()
    })

    it('should have gray background', () => {
      render(<App />)
      const container = document.querySelector('.bg-gray-50')
      expect(container).toBeInTheDocument()
    })
  })

  describe('SEO', () => {
    it('should render JsonLdScript component', () => {
      render(<App />)
      // JsonLdScript renders a script tag with type application/ld+json
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      )
      expect(scripts.length).toBeGreaterThanOrEqual(1)
    })
  })
})
