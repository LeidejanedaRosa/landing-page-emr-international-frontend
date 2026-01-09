import type { ReactNode } from 'react'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent, waitFor } from '../../../../test/test-utils'
import { ProductsModal } from '../index'
import type { Product } from '../types'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Desfibrilador DEA',
    description: 'Equipamento para emergências cardíacas',
    price: 'R$ 5.990,00',
    image: '/images/dea.jpg',
  },
  {
    id: '2',
    name: 'Manequim RCP',
    description: 'Manequim para treinamento de ressuscitação',
    price: 'R$ 2.500,00',
    image: '/images/manequim.jpg',
  },
]

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  products: mockProducts,
}

vi.mock('react-focus-lock', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='focus-lock'>{children}</div>
  ),
}))

describe('ProductsModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  describe('Rendering', () => {
    it('should render nothing when isOpen is false', () => {
      render(<ProductsModal {...defaultProps} isOpen={false} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should render dialog when isOpen is true', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should render default title', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(
        screen.getByRole('heading', {
          name: 'Conheça Nossos Equipamentos',
          level: 2,
        })
      ).toBeInTheDocument()
    })

    it('should render custom title when provided', () => {
      render(<ProductsModal {...defaultProps} title='Equipamentos Médicos' />)

      expect(
        screen.getByRole('heading', {
          name: 'Equipamentos Médicos',
          level: 2,
        })
      ).toBeInTheDocument()
    })

    it('should render default subtitle', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(
        screen.getByText(
          'Equipamentos profissionais para complementar seu treinamento'
        )
      ).toBeInTheDocument()
    })

    it('should render custom subtitle when provided', () => {
      render(
        <ProductsModal
          {...defaultProps}
          subtitle='Produtos de alta qualidade'
        />
      )

      expect(screen.getByText('Produtos de alta qualidade')).toBeInTheDocument()
    })

    it('should render all products', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(screen.getByText('Desfibrilador DEA')).toBeInTheDocument()
      expect(screen.getByText('Manequim RCP')).toBeInTheDocument()
    })

    it('should render WhatsApp CTA button with default text', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(
        screen.getByRole('link', {
          name: 'Falar com Especialista (abre em nova janela)',
        })
      ).toBeInTheDocument()
    })

    it('should render WhatsApp CTA button with custom text', () => {
      render(<ProductsModal {...defaultProps} ctaText='Solicitar Orçamento' />)

      expect(
        screen.getByRole('link', {
          name: 'Solicitar Orçamento (abre em nova janela)',
        })
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have role dialog', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-modal true', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby referencing title', () => {
      render(<ProductsModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby', 'products-modal-title')

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveAttribute('id', 'products-modal-title')
    })

    it('should have accessible close button with default aria-label', () => {
      render(<ProductsModal {...defaultProps} />)

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      expect(closeButton).toBeInTheDocument()
    })

    it('should have accessible close button with custom aria-label', () => {
      render(
        <ProductsModal {...defaultProps} closeButtonLabel='Fechar janela' />
      )

      const closeButton = screen.getByRole('button', { name: 'Fechar janela' })
      expect(closeButton).toBeInTheDocument()
    })

    it('should use FocusLock for focus trapping', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(screen.getByTestId('focus-lock')).toBeInTheDocument()
    })

    it('should have WhatsApp link with proper accessibility attributes', () => {
      render(<ProductsModal {...defaultProps} />)

      const whatsappLink = screen.getByRole('link', {
        name: 'Falar com Especialista (abre em nova janela)',
      })
      expect(whatsappLink).toHaveAttribute('target', '_blank')
      expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Close Interactions', () => {
    it('should call onClose when clicking close button', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<ProductsModal {...defaultProps} onClose={onClose} />)

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      await user.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when clicking overlay', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<ProductsModal {...defaultProps} onClose={onClose} />)

      const overlay = screen.getByRole('dialog').parentElement
      await user.click(overlay!)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should not call onClose when clicking inside modal content', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<ProductsModal {...defaultProps} onClose={onClose} />)

      const dialog = screen.getByRole('dialog')
      await user.click(dialog)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should call onClose when pressing Escape key', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<ProductsModal {...defaultProps} onClose={onClose} />)

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Body Scroll Lock', () => {
    it('should set body overflow to hidden when open', () => {
      render(<ProductsModal {...defaultProps} />)

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should reset body overflow when closed', () => {
      const { rerender } = render(<ProductsModal {...defaultProps} />)
      expect(document.body.style.overflow).toBe('hidden')

      rerender(<ProductsModal {...defaultProps} isOpen={false} />)

      expect(document.body.style.overflow).toBe('unset')
    })

    it('should reset body overflow on unmount', () => {
      const { unmount } = render(<ProductsModal {...defaultProps} />)
      expect(document.body.style.overflow).toBe('hidden')

      unmount()

      expect(document.body.style.overflow).toBe('unset')
    })
  })

  describe('WhatsApp Button', () => {
    it('should have correct WhatsApp URL with encoded message', () => {
      render(<ProductsModal {...defaultProps} />)

      const whatsappLink = screen.getByRole('link', {
        name: 'Falar com Especialista (abre em nova janela)',
      })

      expect(whatsappLink).toHaveAttribute(
        'href',
        expect.stringContaining('https://wa.me/')
      )
      expect(whatsappLink).toHaveAttribute(
        'href',
        expect.stringContaining('?text=')
      )
    })

    it('should have WhatsApp icon', () => {
      render(<ProductsModal {...defaultProps} />)

      const whatsappLink = screen.getByRole('link', {
        name: 'Falar com Especialista (abre em nova janela)',
      })
      const svg = whatsappLink.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Header Component', () => {
    it('should render sticky header', () => {
      render(<ProductsModal {...defaultProps} />)

      const header = screen.getByRole('dialog').querySelector('.sticky')
      expect(header).toBeInTheDocument()
    })

    it('should have close button with SVG icon', () => {
      render(<ProductsModal {...defaultProps} />)

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      const svg = closeButton.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have border on header', () => {
      render(<ProductsModal {...defaultProps} />)

      const header = screen.getByRole('dialog').querySelector('.sticky')
      expect(header).toHaveClass('border-b', 'border-gray-200')
    })
  })

  describe('Products Grid', () => {
    it('should render products in a grid layout', () => {
      render(<ProductsModal {...defaultProps} />)

      const grid = screen.getByRole('dialog').querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass(
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3'
      )
    })

    it('should render correct number of products', () => {
      render(<ProductsModal {...defaultProps} />)

      const productNames = mockProducts.map(p => screen.getByText(p.name))
      expect(productNames).toHaveLength(2)
    })

    it('should render empty grid when no products', () => {
      render(<ProductsModal {...defaultProps} products={[]} />)

      const grid = screen.getByRole('dialog').querySelector('.grid')
      expect(grid?.children).toHaveLength(0)
    })
  })

  describe('Visual Styling', () => {
    it('should have overlay with background opacity', () => {
      render(<ProductsModal {...defaultProps} />)

      const overlay = screen.getByRole('dialog').parentElement
      expect(overlay).toHaveClass('bg-black', 'bg-opacity-50')
    })

    it('should have modal with white background and rounded corners', () => {
      render(<ProductsModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('bg-white', 'rounded-lg', 'shadow-xl')
    })

    it('should have max width constraint', () => {
      render(<ProductsModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-w-3xl', 'w-full')
    })

    it('should have max height with scroll', () => {
      render(<ProductsModal {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('max-h-[90vh]', 'overflow-y-auto')
    })

    it('should have high z-index for overlay', () => {
      render(<ProductsModal {...defaultProps} />)

      const overlay = screen.getByRole('dialog').parentElement
      expect(overlay).toHaveClass('z-[9999]')
    })

    it('should be centered in viewport', () => {
      render(<ProductsModal {...defaultProps} />)

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
      render(<ProductsModal {...defaultProps} />)

      const header = screen.getByRole('dialog').querySelector('.sticky')
      expect(header).toHaveClass('p-4', 'md:p-6')
    })

    it('should have responsive text size on title', () => {
      render(<ProductsModal {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-xl', 'md:text-2xl')
    })

    it('should have responsive padding on content', () => {
      render(<ProductsModal {...defaultProps} />)

      const content = screen
        .getByRole('dialog')
        .querySelector('.grid')?.parentElement
      expect(content).toHaveClass('p-4', 'md:p-6')
    })
  })

  describe('DisplayName', () => {
    it('should have displayName set on component', () => {
      expect(ProductsModal.displayName).toBe('ProductsModal')
    })
  })
})
