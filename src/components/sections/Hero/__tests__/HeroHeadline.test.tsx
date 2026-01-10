import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { HeroHeadline } from '../components/HeroHeadline'
import { HERO_CONTENT, HERO_MAIN_TITLE_ID } from '../constants'

describe('HeroHeadline', () => {
  describe('Rendering', () => {
    it('should render h1 heading element', () => {
      render(<HeroHeadline />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('should have correct id for aria-labelledby reference', () => {
      render(<HeroHeadline />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', HERO_MAIN_TITLE_ID)
    })

    it('should render first line of headline', () => {
      render(<HeroHeadline />)

      expect(
        screen.getByText(HERO_CONTENT.headline.firstLine)
      ).toBeInTheDocument()
    })

    it('should render highlighted line', () => {
      render(<HeroHeadline />)

      expect(
        screen.getByText(HERO_CONTENT.headline.highlightLine)
      ).toBeInTheDocument()
    })

    it('should render third line', () => {
      render(<HeroHeadline />)

      expect(
        screen.getByText(HERO_CONTENT.headline.thirdLine)
      ).toBeInTheDocument()
    })

    it('should render fourth line', () => {
      render(<HeroHeadline />)

      expect(
        screen.getByText(HERO_CONTENT.headline.fourthLine)
      ).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have gradient text styling on highlighted line', () => {
      render(<HeroHeadline />)

      const highlightedSpan = screen.getByText(
        HERO_CONTENT.headline.highlightLine
      )
      expect(highlightedSpan).toHaveClass(
        'text-transparent',
        'bg-clip-text',
        'bg-gradient-to-r'
      )
    })

    it('should have uppercase styling', () => {
      render(<HeroHeadline />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('uppercase')
    })

    it('should have responsive text sizing', () => {
      render(<HeroHeadline />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl')
    })

    it('should have white text color', () => {
      render(<HeroHeadline />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-white')
    })
  })

  describe('Accessibility', () => {
    it('should be the main heading of the page', () => {
      const { container } = render(<HeroHeadline />)

      const h1Elements = container.querySelectorAll('h1')
      expect(h1Elements.length).toBe(1)
    })

    it('should contain full headline text for screen readers', () => {
      render(<HeroHeadline />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading.textContent).toContain(HERO_CONTENT.headline.firstLine)
      expect(heading.textContent).toContain(HERO_CONTENT.headline.highlightLine)
      expect(heading.textContent).toContain(HERO_CONTENT.headline.thirdLine)
      expect(heading.textContent).toContain(HERO_CONTENT.headline.fourthLine)
    })
  })
})
