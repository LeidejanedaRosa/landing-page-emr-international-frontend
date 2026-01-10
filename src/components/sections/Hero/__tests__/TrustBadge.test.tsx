import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { TrustBadge } from '../components/TrustBadge'
import { HERO_CONTENT } from '../constants'

describe('TrustBadge', () => {
  describe('Rendering', () => {
    it('should render with default label', () => {
      render(<TrustBadge />)

      expect(screen.getByText(HERO_CONTENT.badge.label)).toBeInTheDocument()
    })

    it('should render with custom label', () => {
      render(<TrustBadge label='Custom Label' />)

      expect(screen.getByText('Custom Label')).toBeInTheDocument()
    })

    it('should render shield icon', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status')
      const svg = badge.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have status role with default aria-label', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status', {
        name: HERO_CONTENT.badge.ariaLabel,
      })
      expect(badge).toBeInTheDocument()
    })

    it('should have status role with custom aria-label', () => {
      render(<TrustBadge ariaLabel='Custom aria label' />)

      const badge = screen.getByRole('status', {
        name: 'Custom aria label',
      })
      expect(badge).toBeInTheDocument()
    })

    it('should have icon hidden from assistive technology', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status')
      const svg = badge.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Styling', () => {
    it('should have fade-in animation class', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('animate-fade-in-up')
    })

    it('should have backdrop blur effect', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('backdrop-blur-sm')
    })

    it('should have semi-transparent background', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('bg-white/10')
    })

    it('should have border styling', () => {
      render(<TrustBadge />)

      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('border', 'border-white/20')
    })

    it('should have uppercase text with tracking', () => {
      render(<TrustBadge />)

      const text = screen.getByText(HERO_CONTENT.badge.label)
      expect(text).toHaveClass('uppercase', 'tracking-wider')
    })
  })

  describe('Memoization', () => {
    it('should have displayName set', () => {
      expect(TrustBadge.displayName).toBe('TrustBadge')
    })
  })
})
