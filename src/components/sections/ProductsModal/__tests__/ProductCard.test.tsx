import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { ProductCard } from '../ProductCard'
import type { Product } from '../types'

const mockProduct: Product = {
  id: '1',
  name: 'Desfibrilador DEA',
  description: 'Equipamento para emergências cardíacas',
  price: 'R$ 5.990,00',
  image: '/images/dea.jpg',
}

describe('ProductCard', () => {
  describe('Rendering', () => {
    it('should render product name', () => {
      render(<ProductCard product={mockProduct} />)

      expect(
        screen.getByRole('heading', { name: mockProduct.name, level: 3 })
      ).toBeInTheDocument()
    })

    it('should render product description', () => {
      render(<ProductCard product={mockProduct} />)

      expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    })

    it('should render product price', () => {
      render(<ProductCard product={mockProduct} />)

      expect(screen.getByText(mockProduct.price)).toBeInTheDocument()
    })

    it('should render product image with correct src', () => {
      render(<ProductCard product={mockProduct} />)

      const image = screen.getByRole('img', { name: mockProduct.name })
      expect(image).toHaveAttribute('src', mockProduct.image)
    })

    it('should render product image with correct alt text', () => {
      render(<ProductCard product={mockProduct} />)

      const image = screen.getByRole('img', { name: mockProduct.name })
      expect(image).toHaveAttribute('alt', mockProduct.name)
    })
  })

  describe('Image Optimization', () => {
    it('should have lazy loading enabled', () => {
      render(<ProductCard product={mockProduct} />)

      const image = screen.getByRole('img', { name: mockProduct.name })
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('should have image with object-cover for aspect ratio', () => {
      render(<ProductCard product={mockProduct} />)

      const image = screen.getByRole('img', { name: mockProduct.name })
      expect(image).toHaveClass('object-cover')
    })
  })

  describe('Semantic HTML', () => {
    it('should render product name as h3', () => {
      render(<ProductCard product={mockProduct} />)

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        mockProduct.name
      )
    })

    it('should render description as paragraph', () => {
      render(<ProductCard product={mockProduct} />)

      const description = screen.getByText(mockProduct.description)
      expect(description.tagName).toBe('P')
    })
  })

  describe('Visual Styling', () => {
    it('should have card container with background and shadow', () => {
      const { container } = render(<ProductCard product={mockProduct} />)

      const card = container.firstChild
      expect(card).toHaveClass('bg-gray-50', 'rounded-lg', 'shadow-sm')
    })

    it('should have hover effect on card', () => {
      const { container } = render(<ProductCard product={mockProduct} />)

      const card = container.firstChild
      expect(card).toHaveClass('hover:shadow-md', 'transition-shadow')
    })

    it('should have image container with aspect ratio', () => {
      const { container } = render(<ProductCard product={mockProduct} />)

      const imageContainer = container.querySelector('.aspect-\\[4\\/3\\]')
      expect(imageContainer).toBeInTheDocument()
    })

    it('should have price with cta color', () => {
      render(<ProductCard product={mockProduct} />)

      const price = screen.getByText(mockProduct.price)
      expect(price).toHaveClass('text-cta', 'font-medium')
    })

    it('should have proper text styling for name', () => {
      render(<ProductCard product={mockProduct} />)

      const name = screen.getByRole('heading', { level: 3 })
      expect(name).toHaveClass('font-semibold', 'text-gray-900')
    })

    it('should have proper text styling for description', () => {
      render(<ProductCard product={mockProduct} />)

      const description = screen.getByText(mockProduct.description)
      expect(description).toHaveClass('text-sm', 'text-gray-600')
    })

    it('should have content padding', () => {
      render(<ProductCard product={mockProduct} />)

      const name = screen.getByRole('heading', { level: 3 })
      expect(name.parentElement).toHaveClass('p-4')
    })
  })

  describe('Different Product Data', () => {
    it('should render with different product data', () => {
      const anotherProduct: Product = {
        id: '2',
        name: 'Manequim RCP',
        description: 'Manequim para treinamento de ressuscitação',
        price: 'R$ 2.500,00',
        image: '/images/manequim.jpg',
      }

      render(<ProductCard product={anotherProduct} />)

      expect(
        screen.getByRole('heading', { name: anotherProduct.name })
      ).toBeInTheDocument()
      expect(screen.getByText(anotherProduct.description)).toBeInTheDocument()
      expect(screen.getByText(anotherProduct.price)).toBeInTheDocument()
      expect(
        screen.getByRole('img', { name: anotherProduct.name })
      ).toHaveAttribute('src', anotherProduct.image)
    })

    it('should handle long product names', () => {
      const longNameProduct: Product = {
        ...mockProduct,
        name: 'Desfibrilador Externo Automático Profissional Premium',
      }

      render(<ProductCard product={longNameProduct} />)

      expect(
        screen.getByRole('heading', { name: longNameProduct.name })
      ).toBeInTheDocument()
    })

    it('should handle long descriptions', () => {
      const longDescProduct: Product = {
        ...mockProduct,
        description:
          'Equipamento profissional para emergências cardíacas com tecnologia avançada e certificação internacional',
      }

      render(<ProductCard product={longDescProduct} />)

      expect(screen.getByText(longDescProduct.description)).toBeInTheDocument()
    })
  })
})
