import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { COURSES_DATA } from '../constants'
import { HeroEnrollmentOpen } from '../index'

const hasEnrollment = COURSES_DATA.length > 0

vi.mock('../../../../hooks/useAccessibility', () => ({
  useAccessibilityPreferences: vi.fn(() => ({
    prefersReducedMotion: false,
    prefersHighContrast: false,
  })),
}))

vi.mock('../../../../hooks/useHover', () => ({
  useHover: vi.fn(() => ({
    hoveredItem: null,
    createHoverHandlers: vi.fn(() => ({
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      onFocus: vi.fn(),
      onBlur: vi.fn(),
    })),
  })),
}))

vi.mock('../../../../assets/hero/hero_section_TMR.avif', () => ({
  default: 'mocked-tmr.avif',
}))

vi.mock('../../../../assets/hero/hero_section_TMR.webp', () => ({
  default: 'mocked-tmr.webp',
}))

vi.mock('../../../../assets/hero/hero_section_TMR.jpg', () => ({
  default: 'mocked-tmr.jpg',
}))

vi.mock('../../../../assets/hero/hero_section_WMR.avif', () => ({
  default: 'mocked-wmr.avif',
}))

vi.mock('../../../../assets/hero/hero_section_WMR.webp', () => ({
  default: 'mocked-wmr.webp',
}))

vi.mock('../../../../assets/hero/hero_section_WMR.jpg', () => ({
  default: 'mocked-wmr.jpg',
}))

describe.skipIf(!hasEnrollment)('HeroEnrollmentOpen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct semantic structure', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const section = screen.getByRole('region', {
        name: /tactical medical response.*inscrições abertas/i,
      })
      expect(section).toBeInTheDocument()
    })

    it('should have correct aria-labelledby linking to heading', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const section = screen.getByRole('region', {
        name: /tactical medical response.*inscrições abertas/i,
      })
      expect(section).toHaveAttribute(
        'aria-labelledby',
        'enrollment-heading-tmr'
      )

      const heading = screen.getByRole('heading', {
        name: /tactical medical response.*inscrições abertas/i,
      })
      expect(heading).toHaveAttribute('id', 'enrollment-heading-tmr')
    })

    it('should render TMR course when courseIndex is 0', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      expect(
        screen.getByRole('heading', {
          name: /tactical medical response.*inscrições abertas/i,
        })
      ).toBeInTheDocument()
    })

    it('should render WMR course when courseIndex is 1', () => {
      render(<HeroEnrollmentOpen courseIndex={1} />)

      expect(
        screen.getByRole('heading', {
          name: /wilderness medical response.*inscrições abertas/i,
        })
      ).toBeInTheDocument()
    })

    it('should return null when courseIndex is invalid', () => {
      const { container } = render(<HeroEnrollmentOpen courseIndex={999} />)

      expect(container.firstChild).toBeNull()
    })
  })

  describe('JSON-LD Structured Data', () => {
    it('should render structured data script for TMR course', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      )
      const structuredDataScript = Array.from(scripts).find(script =>
        script.textContent?.includes('Tactical Medical Response')
      )

      expect(structuredDataScript).toBeTruthy()
      if (structuredDataScript?.textContent) {
        const data = JSON.parse(structuredDataScript.textContent)
        expect(data['@context']).toBe('https://schema.org')
        expect(data['@type']).toBe('Course')
        expect(data.name).toContain('Tactical Medical Response')
        expect(data.description).toBe('Certificação Internacional')
        expect(data.provider.name).toBe('EMR International')
        expect(data.startDate).toBe('2025-12-07')
        expect(data.courseMode).toBe('Presencial')
      }
    })

    it('should render structured data script for WMR course', () => {
      render(<HeroEnrollmentOpen courseIndex={1} />)

      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      )
      const structuredDataScript = Array.from(scripts).find(script =>
        script.textContent?.includes('Wilderness Medical Response')
      )

      expect(structuredDataScript).toBeTruthy()
      if (structuredDataScript?.textContent) {
        const data = JSON.parse(structuredDataScript.textContent)
        expect(data.name).toContain('Wilderness Medical Response')
        expect(data.startDate).toBe('2026-03-14')
      }
    })

    it('should format date correctly in ISO format', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      )
      const structuredDataScript = Array.from(scripts).find(script =>
        script.textContent?.includes('Tactical Medical Response')
      )

      if (structuredDataScript?.textContent) {
        const data = JSON.parse(structuredDataScript.textContent)
        expect(data.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      }
    })
  })

  describe('Accessibility', () => {
    it('should have screen reader only heading', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const heading = screen.getByRole('heading', {
        name: /tactical medical response.*inscrições abertas/i,
      })
      expect(heading).toHaveClass('sr-only')
    })

    it('should use unique IDs for different course instances', () => {
      const { unmount } = render(<HeroEnrollmentOpen courseIndex={0} />)
      const tmrSection = screen.getByRole('region', {
        name: /tactical medical response.*inscrições abertas/i,
      })
      expect(tmrSection).toHaveAttribute(
        'aria-labelledby',
        'enrollment-heading-tmr'
      )
      unmount()

      render(<HeroEnrollmentOpen courseIndex={1} />)
      const wmrSection = screen.getByRole('region', {
        name: /wilderness medical response.*inscrições abertas/i,
      })
      expect(wmrSection).toHaveAttribute(
        'aria-labelledby',
        'enrollment-heading-wmr'
      )
    })

    it('should call useAccessibilityPreferences hook', async () => {
      const { useAccessibilityPreferences } =
        await import('../../../../hooks/useAccessibility')

      render(<HeroEnrollmentOpen courseIndex={0} />)

      expect(useAccessibilityPreferences).toHaveBeenCalled()
    })

    it('should call useHover hook', async () => {
      const { useHover } = await import('../../../../hooks/useHover')

      render(<HeroEnrollmentOpen courseIndex={0} />)

      expect(useHover).toHaveBeenCalled()
    })
  })

  describe('Course Data Integration', () => {
    it('should pass correct TMR data to CourseCard', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      expect(screen.getByText('Tactical Medical Response')).toBeInTheDocument()
      expect(screen.getByText('Emergências para')).toBeInTheDocument()
      expect(screen.getByText('Áreas de Conflito')).toBeInTheDocument()
    })

    it('should pass correct WMR data to CourseCard', () => {
      render(<HeroEnrollmentOpen courseIndex={1} />)

      expect(
        screen.getByText('Wilderness Medical Response')
      ).toBeInTheDocument()
      expect(screen.getByText('Emergências em')).toBeInTheDocument()
      expect(screen.getByText('Áreas Remotas')).toBeInTheDocument()
    })

    it('should display correct date for TMR course', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const dates = screen.getAllByText('07')
      expect(dates.length).toBeGreaterThan(0)
      const months = screen.getAllByText('DEZ')
      expect(months.length).toBeGreaterThan(0)
    })

    it('should display correct date for WMR course', () => {
      render(<HeroEnrollmentOpen courseIndex={1} />)

      const dates = screen.getAllByText('14')
      expect(dates.length).toBeGreaterThan(0)
      const months = screen.getAllByText('MAR')
      expect(months.length).toBeGreaterThan(0)
    })
  })

  describe('Hover Handlers', () => {
    it('should create hover handlers with correct course ID for TMR', async () => {
      const mockCreateHoverHandlers = vi.fn(() => ({
        onMouseEnter: vi.fn(),
        onMouseLeave: vi.fn(),
        onFocus: vi.fn(),
        onBlur: vi.fn(),
      }))

      const { useHover } = await import('../../../../hooks/useHover')
      vi.mocked(useHover).mockReturnValue({
        hoveredItem: null,
        createHoverHandlers: mockCreateHoverHandlers,
      })

      render(<HeroEnrollmentOpen courseIndex={0} />)

      expect(mockCreateHoverHandlers).toHaveBeenCalledWith('tmr')
    })

    it('should create hover handlers with correct course ID for WMR', async () => {
      const mockCreateHoverHandlers = vi.fn(() => ({
        onMouseEnter: vi.fn(),
        onMouseLeave: vi.fn(),
        onFocus: vi.fn(),
        onBlur: vi.fn(),
      }))

      const { useHover } = await import('../../../../hooks/useHover')
      vi.mocked(useHover).mockReturnValue({
        hoveredItem: null,
        createHoverHandlers: mockCreateHoverHandlers,
      })

      render(<HeroEnrollmentOpen courseIndex={1} />)

      expect(mockCreateHoverHandlers).toHaveBeenCalledWith('wmr')
    })
  })

  describe('Reduced Motion Support', () => {
    it('should not apply transition classes when prefersReducedMotion is true', async () => {
      const { useAccessibilityPreferences } =
        await import('../../../../hooks/useAccessibility')
      vi.mocked(useAccessibilityPreferences).mockReturnValueOnce({
        prefersReducedMotion: true,
        prefersHighContrast: false,
      })

      render(<HeroEnrollmentOpen courseIndex={0} />)

      const article = screen.getByRole('article')
      expect(article).not.toHaveClass('transition-transform')
      expect(article).not.toHaveClass('duration-500')
    })

    it('should apply transition classes when prefersReducedMotion is false', async () => {
      const { useAccessibilityPreferences } =
        await import('../../../../hooks/useAccessibility')
      vi.mocked(useAccessibilityPreferences).mockReturnValueOnce({
        prefersReducedMotion: false,
        prefersHighContrast: false,
      })

      render(<HeroEnrollmentOpen courseIndex={0} />)

      const article = screen.getByRole('article')
      expect(article).toHaveClass('transition-transform')
      expect(article).toHaveClass('duration-500')
      expect(article).toHaveClass('ease-out')
    })
  })

  describe('CSS Classes', () => {
    it('should have correct layout classes for section', () => {
      render(<HeroEnrollmentOpen courseIndex={0} />)

      const section = screen.getByRole('region', {
        name: /tactical medical response.*inscrições abertas/i,
      })
      expect(section).toHaveClass('relative', 'w-full', 'h-full', 'bg-black')
      expect(section).toHaveClass('flex', 'flex-col', 'overflow-hidden')
    })
  })
})
