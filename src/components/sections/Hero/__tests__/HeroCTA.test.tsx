import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import { HeroCTA } from '../components/HeroCTA'
import { HERO_CONTENT } from '../constants'

describe('HeroCTA', () => {
  describe('Rendering', () => {
    it('should render button with default text', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText(HERO_CONTENT.cta.text)).toBeInTheDocument()
    })

    it('should render button with custom text', () => {
      render(<HeroCTA text='Custom Button Text' />)

      expect(screen.getByText('Custom Button Text')).toBeInTheDocument()
    })

    it('should render arrow icon', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      const svg = button.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have default aria-label', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button', {
        name: HERO_CONTENT.cta.ariaLabel,
      })
      expect(button).toBeInTheDocument()
    })

    it('should accept custom aria-label', () => {
      render(<HeroCTA ariaLabel='Custom accessibility label' />)

      const button = screen.getByRole('button', {
        name: 'Custom accessibility label',
      })
      expect(button).toBeInTheDocument()
    })

    it('should have arrow icon hidden from assistive technology', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      const svg = button.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have decorative shine effect hidden from assistive technology', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      const decorativeElements = button.querySelectorAll('[aria-hidden="true"]')
      expect(decorativeElements.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Interaction', () => {
    it('should call onClick handler when clicked', async () => {
      const mockOnClick = vi.fn()
      const user = userEvent.setup()
      render(<HeroCTA onClick={mockOnClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('should not throw when clicked without onClick handler', async () => {
      const user = userEvent.setup()
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Styling', () => {
    it('should have hover transition classes', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('transition-all', 'duration-300')
    })

    it('should have red background color', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-red-600')
    })

    it('should have uppercase text styling', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('uppercase')
    })

    it('should have responsive padding', () => {
      render(<HeroCTA />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-6', 'py-3', 'sm:px-8', 'sm:py-4')
    })
  })

  describe('Memoization', () => {
    it('should have displayName set', () => {
      expect(HeroCTA.displayName).toBe('HeroCTA')
    })
  })
})
