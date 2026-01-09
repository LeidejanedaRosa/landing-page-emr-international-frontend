import type { ReactNode } from 'react'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent, waitFor } from '../../../../test/test-utils'
import { CertificationModal } from '../CertificationModal'

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  name: 'Health & Safety Institute',
  description: 'Descrição detalhada do HSI para testes.',
  year: '2025',
}

vi.mock('react-focus-lock', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='focus-lock'>{children}</div>
  ),
}))

describe('CertificationModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  describe('Rendering', () => {
    it('should render nothing when isOpen is false', () => {
      render(<CertificationModal {...defaultProps} isOpen={false} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should render dialog when isOpen is true', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should render modal title with certification name', () => {
      render(<CertificationModal {...defaultProps} />)

      const heading = screen.getByRole('heading', {
        name: defaultProps.name,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render certification description', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
    })

    it('should render year with default certified label', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(
        screen.getByText(`Credenciado ${defaultProps.year}`)
      ).toBeInTheDocument()
    })

    it('should render year with custom certified label', () => {
      render(
        <CertificationModal {...defaultProps} certifiedLabel='Certified in' />
      )

      expect(
        screen.getByText(`Certified in ${defaultProps.year}`)
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have role dialog', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-modal true', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby referencing title', () => {
      render(<CertificationModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveAttribute('id', 'modal-title')
    })

    it('should have accessible close button with aria-label', () => {
      render(<CertificationModal {...defaultProps} />)

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      expect(closeButton).toBeInTheDocument()
    })

    it('should have custom close button label when provided', () => {
      render(
        <CertificationModal {...defaultProps} closeButtonLabel='Close dialog' />
      )

      const closeButton = screen.getByRole('button', { name: 'Close dialog' })
      expect(closeButton).toBeInTheDocument()
    })

    it('should use FocusLock for focus trapping', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(screen.getByTestId('focus-lock')).toBeInTheDocument()
    })
  })

  describe('Close Interactions', () => {
    it('should call onClose when clicking close button', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<CertificationModal {...defaultProps} onClose={onClose} />)

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      await user.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when clicking overlay', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<CertificationModal {...defaultProps} onClose={onClose} />)

      const overlay = screen.getByRole('dialog').parentElement
      await user.click(overlay!)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should not call onClose when clicking inside modal content', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<CertificationModal {...defaultProps} onClose={onClose} />)

      const dialog = screen.getByRole('dialog')
      await user.click(dialog)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should call onClose when pressing Escape key', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<CertificationModal {...defaultProps} onClose={onClose} />)

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Body Scroll Lock', () => {
    it('should set body overflow to hidden when open', () => {
      render(<CertificationModal {...defaultProps} />)

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should reset body overflow when closed', () => {
      const { rerender } = render(<CertificationModal {...defaultProps} />)
      expect(document.body.style.overflow).toBe('hidden')

      rerender(<CertificationModal {...defaultProps} isOpen={false} />)

      expect(document.body.style.overflow).toBe('unset')
    })

    it('should reset body overflow on unmount', () => {
      const { unmount } = render(<CertificationModal {...defaultProps} />)
      expect(document.body.style.overflow).toBe('hidden')

      unmount()

      expect(document.body.style.overflow).toBe('unset')
    })
  })

  describe('Header Component', () => {
    it('should render sticky header', () => {
      render(<CertificationModal {...defaultProps} />)

      const header = screen.getByRole('dialog').querySelector('.sticky')
      expect(header).toBeInTheDocument()
    })

    it('should have close button with SVG icon', () => {
      render(<CertificationModal {...defaultProps} />)

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      const svg = closeButton.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have border on header', () => {
      render(<CertificationModal {...defaultProps} />)

      const header = screen.getByRole('dialog').querySelector('.sticky')
      expect(header).toHaveClass('border-b', 'border-gray-200')
    })
  })

  describe('Content', () => {
    it('should render description with proper text styling', () => {
      render(<CertificationModal {...defaultProps} />)

      const description = screen.getByText(defaultProps.description)
      expect(description).toHaveClass(
        'text-gray-700',
        'leading-relaxed',
        'whitespace-pre-line'
      )
    })

    it('should render content section with padding', () => {
      render(<CertificationModal {...defaultProps} />)

      const content = screen.getByText(defaultProps.description).parentElement
      expect(content).toHaveClass('p-4', 'md:p-6')
    })
  })

  describe('Visual Styling', () => {
    it('should have overlay with background opacity', () => {
      render(<CertificationModal {...defaultProps} />)

      const overlay = screen.getByRole('dialog').parentElement
      expect(overlay).toHaveClass('bg-black', 'bg-opacity-50')
    })

    it('should have modal with white background and rounded corners', () => {
      render(<CertificationModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('bg-white', 'rounded-lg', 'shadow-xl')
    })

    it('should have max width constraint', () => {
      render(<CertificationModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-w-2xl', 'w-full')
    })

    it('should have max height with scroll', () => {
      render(<CertificationModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-h-[90vh]', 'overflow-y-auto')
    })

    it('should have high z-index for overlay', () => {
      render(<CertificationModal {...defaultProps} />)

      const overlay = screen.getByRole('dialog').parentElement
      expect(overlay).toHaveClass('z-[9999]')
    })

    it('should be centered in viewport', () => {
      render(<CertificationModal {...defaultProps} />)

      const overlay = screen.getByRole('dialog').parentElement
      expect(overlay).toHaveClass(
        'flex',
        'items-center',
        'justify-center',
        'fixed',
        'inset-0'
      )
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive padding on header', () => {
      render(<CertificationModal {...defaultProps} />)

      const header = screen.getByRole('dialog').querySelector('.sticky')
      expect(header).toHaveClass('p-4', 'md:p-6')
    })

    it('should have responsive text size on title', () => {
      render(<CertificationModal {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-xl', 'md:text-2xl')
    })
  })

  describe('DisplayName', () => {
    it('should have displayName set on component', () => {
      expect(CertificationModal.displayName).toBe('CertificationModal')
    })
  })
})
