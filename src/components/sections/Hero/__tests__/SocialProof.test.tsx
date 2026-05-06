import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { SocialProof } from '../components/SocialProof'
import { HERO_CONTENT } from '../constants'

describe('SocialProof', () => {
  describe('Rendering', () => {
    it('should render with default students text', () => {
      render(<SocialProof />)

      expect(
        screen.getByText(HERO_CONTENT.socialProof.students)
      ).toBeInTheDocument()
    })

    it('should render with default methodology text', () => {
      render(<SocialProof />)

      expect(
        screen.getByText(HERO_CONTENT.socialProof.methodology)
      ).toBeInTheDocument()
    })

    it('should render with custom students text', () => {
      render(<SocialProof studentsText='Custom Students Text' />)

      expect(screen.getByText('Custom Students Text')).toBeInTheDocument()
    })

    it('should render with custom methodology text', () => {
      render(<SocialProof methodologyText='Custom Methodology' />)

      expect(screen.getByText('Custom Methodology')).toBeInTheDocument()
    })

    it('should render separator dot between texts', () => {
      render(<SocialProof />)

      const separatorDot = document.querySelector('.bg-gray-600.rounded-full')
      expect(separatorDot).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have group role with aria-label', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group', {
        name: 'Indicadores de confiança',
      })
      expect(group).toBeInTheDocument()
    })

    it('should have separator dot hidden from assistive technology', () => {
      render(<SocialProof />)

      const separatorDot = document.querySelector('.bg-gray-600.rounded-full')
      expect(separatorDot).toHaveAttribute('aria-hidden', 'true')
    })

    it('should render students and methodology as paragraphs', () => {
      render(<SocialProof />)

      const paragraphs = document.querySelectorAll('p')
      expect(paragraphs.length).toBe(2)
    })
  })

  describe('Styling', () => {
    it('should have border-top styling', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group')
      expect(group).toHaveClass('border-t', 'border-white/10')
    })

    it('should have flex layout for alignment', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group')
      expect(group).toHaveClass('flex', 'flex-row', 'items-center')
    })

    it('should have responsive padding', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group')
      expect(group).toHaveClass('pt-3', 'sm:pt-4')
    })

    it('should have responsive gap between items', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group')
      expect(group).toHaveClass('gap-3', 'sm:gap-6')
    })

    it('should have gray text color', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group')
      expect(group).toHaveClass('text-gray-400')
    })

    it('should have responsive text sizing', () => {
      render(<SocialProof />)

      const group = screen.getByRole('group')
      expect(group).toHaveClass('text-xs', 'sm:text-sm')
    })
  })

  describe('Memoization', () => {
    it('should have displayName set', () => {
      expect(SocialProof.displayName).toBe('SocialProof')
    })
  })
})
