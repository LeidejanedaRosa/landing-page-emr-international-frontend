import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import CallToAction from '../../CallToAction'

vi.mock('../../../../utils/whatsapp', () => ({
  buildWhatsAppMessageUrl: vi.fn(
    (message: string) =>
      `https://wa.me/5519971575640?text=${encodeURIComponent(message)}`
  ),
}))

describe('CallToAction', () => {
  describe('Rendering', () => {
    it('should render section with correct semantic structure', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /prepare-se para salvar vidas/i,
      })
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'call-to-action')
    })

    it('should render main heading with correct level', () => {
      render(<CallToAction />)

      const heading = screen.getByRole('heading', {
        name: 'Prepare-se para salvar vidas',
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render description paragraph', () => {
      render(<CallToAction />)

      expect(
        screen.getByText(
          'Garanta sua vaga nos próximos treinamentos da EMR Internacional'
        )
      ).toBeInTheDocument()
    })

    it('should render WhatsApp link with correct text', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link', {
        name: /entrar em contato via whatsapp/i,
      })
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('Quero me inscrever agora')
    })
  })

  describe('Accessibility', () => {
    it('should have aria-labelledby linking section to heading', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /prepare-se para salvar vidas/i,
      })
      const labelledById = section.getAttribute('aria-labelledby')

      expect(labelledById).toBeTruthy()

      const heading = document.getElementById(labelledById!)
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Prepare-se para salvar vidas')
    })

    it('should have unique ID for title', () => {
      render(<CallToAction />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading.id).toBeTruthy()
      expect(heading.id).toContain('cta-title')
    })

    it('should have descriptive aria-label on WhatsApp link', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute(
        'aria-label',
        'Entrar em contato via WhatsApp para se inscrever nos treinamentos (abre em nova janela)'
      )
    })

    it('should have visible focus indicator classes on link', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      expect(link.className).toContain('focus:outline-none')
      expect(link.className).toContain('focus:ring-2')
    })
  })

  describe('WhatsApp Link', () => {
    it('should have correct href with encoded message', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      const expectedMessage = encodeURIComponent(
        'Olá! Gostaria de saber mais sobre os treinamentos da EMR Internacional.'
      )

      expect(link).toHaveAttribute(
        'href',
        `https://wa.me/5519971575640?text=${expectedMessage}`
      )
    })

    it('should open in new tab with security attributes', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Styling', () => {
    it('should have correct background color class', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /prepare-se para salvar vidas/i,
      })
      expect(section.className).toContain('bg-cta-600')
    })

    it('should have centered text alignment', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /prepare-se para salvar vidas/i,
      })
      const container = section.querySelector('.text-center')
      expect(container).toBeInTheDocument()
    })

    it('should have responsive padding classes', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /prepare-se para salvar vidas/i,
      })
      expect(section.className).toContain('py-20')
      expect(section.className).toContain('md:py-24')
    })

    it('should have transition classes on link for hover effects', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      expect(link.className).toContain('transition-all')
      expect(link.className).toContain('duration-300')
    })
  })

  describe('Content', () => {
    it('should render uppercase button text', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      expect(link.className).toContain('uppercase')
    })

    it('should have proper heading and description hierarchy', () => {
      render(<CallToAction />)

      const heading = screen.getByRole('heading', { level: 2 })
      const description = screen.getByText(/garanta sua vaga/i)

      expect(heading.tagName).toBe('H2')
      expect(description.tagName).toBe('P')
    })
  })
})
