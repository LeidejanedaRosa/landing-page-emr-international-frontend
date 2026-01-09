import type { ReactNode } from 'react'

import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent, waitFor } from '../../../../test/test-utils'
import { CertificationCard } from '../CertificationCard'

const defaultProps = {
  name: 'Health & Safety Institute',
  organization: 'Health & Safety Institute',
  description: 'Descrição do HSI para testes.',
  year: '2025',
  logo: {
    avif: 'mocked-logo.avif',
    webp: 'mocked-logo.webp',
    jpg: 'mocked-logo.jpg',
  },
  index: 0,
}

vi.mock('react-focus-lock', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='focus-lock'>{children}</div>
  ),
}))

describe('CertificationCard', () => {
  describe('Rendering', () => {
    it('should render article with correct aria-label', () => {
      render(<CertificationCard {...defaultProps} />)

      const article = screen.getByRole('article', {
        name: `Certificação ${defaultProps.name}`,
      })
      expect(article).toBeInTheDocument()
    })

    it('should render certification name as heading', () => {
      render(<CertificationCard {...defaultProps} />)

      const heading = screen.getByRole('heading', {
        name: defaultProps.name,
        level: 3,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render certification description', () => {
      render(<CertificationCard {...defaultProps} />)

      expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
    })

    it('should render certification year with default label', () => {
      render(<CertificationCard {...defaultProps} />)

      expect(
        screen.getByText(`Credenciado ${defaultProps.year}`)
      ).toBeInTheDocument()
    })

    it('should render certification year with custom label', () => {
      render(<CertificationCard {...defaultProps} certifiedLabel='Certified' />)

      expect(
        screen.getByText(`Certified ${defaultProps.year}`)
      ).toBeInTheDocument()
    })
  })

  describe('Image', () => {
    it('should render figure element', () => {
      render(<CertificationCard {...defaultProps} />)

      const figure = screen.getByRole('figure')
      expect(figure).toBeInTheDocument()
    })

    it('should render image with correct alt text', () => {
      render(<CertificationCard {...defaultProps} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toBeInTheDocument()
    })

    it('should render image with correct src', () => {
      render(<CertificationCard {...defaultProps} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveAttribute('src', defaultProps.logo.jpg)
    })

    it('should render picture element with multiple sources', () => {
      render(<CertificationCard {...defaultProps} />)

      const figure = screen.getByRole('figure')
      const picture = figure.querySelector('picture')
      expect(picture).toBeInTheDocument()

      const sources = picture?.querySelectorAll('source')
      expect(sources?.length).toBe(2)
    })

    it('should render AVIF source first', () => {
      render(<CertificationCard {...defaultProps} />)

      const figure = screen.getByRole('figure')
      const sources = figure.querySelectorAll('source')
      expect(sources[0]).toHaveAttribute('type', 'image/avif')
      expect(sources[0]).toHaveAttribute('srcSet', defaultProps.logo.avif)
    })

    it('should render WebP source second', () => {
      render(<CertificationCard {...defaultProps} />)

      const figure = screen.getByRole('figure')
      const sources = figure.querySelectorAll('source')
      expect(sources[1]).toHaveAttribute('type', 'image/webp')
      expect(sources[1]).toHaveAttribute('srcSet', defaultProps.logo.webp)
    })

    it('should have eager loading for first 4 images', () => {
      render(<CertificationCard {...defaultProps} index={0} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveAttribute('loading', 'eager')
    })

    it('should have lazy loading for images after index 3', () => {
      render(<CertificationCard {...defaultProps} index={4} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('should have async decoding', () => {
      render(<CertificationCard {...defaultProps} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveAttribute('decoding', 'async')
    })

    it('should have width and height attributes', () => {
      render(<CertificationCard {...defaultProps} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveAttribute('width', '300')
      expect(image).toHaveAttribute('height', '160')
    })

    it('should have responsive sizes attribute', () => {
      render(<CertificationCard {...defaultProps} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveAttribute(
        'sizes',
        '(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px'
      )
    })

    it('should apply smaller max-width for CTECC organization', () => {
      const cTeccProps = {
        ...defaultProps,
        organization: 'Committee for Tactical Emergency Casualty Care',
      }
      render(<CertificationCard {...cTeccProps} />)

      const image = screen.getByAltText(`Logo ${cTeccProps.organization}`)
      expect(image).toHaveClass('max-w-[60%]', 'max-h-[70%]')
    })

    it('should apply standard max-width for non-CTECC organization', () => {
      render(<CertificationCard {...defaultProps} />)

      const image = screen.getByAltText(`Logo ${defaultProps.organization}`)
      expect(image).toHaveClass('max-w-[80%]', 'max-h-full')
    })
  })

  describe('Read More Button', () => {
    it('should render read more button with default label', () => {
      render(<CertificationCard {...defaultProps} />)

      const button = screen.getByRole('button', {
        name: `Ler mais sobre ${defaultProps.name}`,
      })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Ler mais')
    })

    it('should render read more button with custom label', () => {
      render(
        <CertificationCard {...defaultProps} readMoreLabel='Ver detalhes' />
      )

      const button = screen.getByRole('button', {
        name: `Ver detalhes sobre ${defaultProps.name}`,
      })
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Ver detalhes')
    })

    it('should have accessible aria-label', () => {
      render(<CertificationCard {...defaultProps} />)

      const button = screen.getByRole('button', {
        name: `Ler mais sobre ${defaultProps.name}`,
      })
      expect(button).toHaveAttribute(
        'aria-label',
        `Ler mais sobre ${defaultProps.name}`
      )
    })

    it('should have focus styles', () => {
      render(<CertificationCard {...defaultProps} />)

      const button = screen.getByRole('button', {
        name: `Ler mais sobre ${defaultProps.name}`,
      })
      expect(button).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-black'
      )
    })
  })

  describe('Modal Interaction', () => {
    it('should not render modal initially', () => {
      render(<CertificationCard {...defaultProps} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should open modal when clicking read more button', async () => {
      const user = userEvent.setup()
      render(<CertificationCard {...defaultProps} />)

      const button = screen.getByRole('button', {
        name: `Ler mais sobre ${defaultProps.name}`,
      })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('should pass correct props to modal', async () => {
      const user = userEvent.setup()
      render(<CertificationCard {...defaultProps} />)

      const button = screen.getByRole('button', {
        name: `Ler mais sobre ${defaultProps.name}`,
      })
      await user.click(button)

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument()
        expect(
          screen.getByRole('heading', { name: defaultProps.name, level: 2 })
        ).toBeInTheDocument()
      })
    })

    it('should close modal when close callback is called', async () => {
      const user = userEvent.setup()
      render(<CertificationCard {...defaultProps} />)

      const readMoreButton = screen.getByRole('button', {
        name: `Ler mais sobre ${defaultProps.name}`,
      })
      await user.click(readMoreButton)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
      await user.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure with article', () => {
      render(<CertificationCard {...defaultProps} />)

      const article = screen.getByRole('article')
      expect(article).toBeInTheDocument()
    })

    it('should have proper heading level', () => {
      render(<CertificationCard {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent(defaultProps.name)
    })

    it('should have line-clamp classes for text truncation', () => {
      render(<CertificationCard {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveClass('line-clamp-2')

      const description = screen.getByText(defaultProps.description)
      expect(description).toHaveClass('line-clamp-3')
    })
  })

  describe('Visual Styling', () => {
    it('should have card styling classes', () => {
      render(<CertificationCard {...defaultProps} />)

      const article = screen.getByRole('article')
      expect(article).toHaveClass(
        'bg-white',
        'p-6',
        'rounded-lg',
        'border',
        'shadow-sm'
      )
    })

    it('should have hover shadow transition', () => {
      render(<CertificationCard {...defaultProps} />)

      const article = screen.getByRole('article')
      expect(article).toHaveClass('hover:shadow-md', 'transition-shadow')
    })

    it('should have full height for equal card heights', () => {
      render(<CertificationCard {...defaultProps} />)

      const article = screen.getByRole('article')
      expect(article).toHaveClass('h-full')
    })
  })
})
