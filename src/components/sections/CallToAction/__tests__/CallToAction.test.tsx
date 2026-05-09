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
        name: /conheça nosso método de treinamento/i,
      })
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'call-to-action')
    })

    it('should render main heading with correct level', () => {
      render(<CallToAction />)

      const heading = screen.getByRole('heading', {
        name: /conheça nosso método de treinamento/i,
        level: 2,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render description paragraph', () => {
      render(<CallToAction />)

      expect(
        screen.getByText(/É um sistema realístico voltado/i)
      ).toBeInTheDocument()
    })

    it('should render principle paragraph', () => {
      render(<CallToAction />)

      expect(screen.getByText(/BASEIA-SE NO PRINCÍPIO/i)).toBeInTheDocument()
      expect(screen.getByText('ERROS CEIFAM VIDAS')).toBeInTheDocument()
    })

    it('should render WhatsApp link with correct text', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link', {
        name: /entrar em contato via whatsapp/i,
      })
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('QUERO ME INSCREVER AGORA')
    })

    it('should render all four feature pillars', () => {
      render(<CallToAction />)

      expect(screen.getByText('REALÍSTICO')).toBeInTheDocument()
      expect(screen.getByText('IMERSIVO')).toBeInTheDocument()
      // OPERACIONAL appears in both pillars and side annotations
      expect(screen.getAllByText('OPERACIONAL').length).toBeGreaterThan(0)
      expect(screen.getByText('PRÁTICO')).toBeInTheDocument()
    })

    it('should render REAPER PROTOCOL heading text', () => {
      render(<CallToAction />)

      expect(screen.getByText('REAPER')).toBeInTheDocument()
      expect(screen.getByText('PROTOCOL')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have aria-labelledby linking section to heading', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /conheça nosso método de treinamento/i,
      })
      const labelledById = section.getAttribute('aria-labelledby')

      expect(labelledById).toBeTruthy()

      const heading = document.getElementById(labelledById!)
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(/CONHEÇA NOSSO MÉTODO DE TREINAMENTO/i)
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

    it('should have background image marked as decorative', () => {
      render(<CallToAction />)

      const img = document.querySelector('img')
      expect(img).toHaveAttribute('aria-hidden', 'true')
      expect(img).toHaveAttribute('alt', '')
    })
  })

  describe('WhatsApp Link', () => {
    it('should have correct href with encoded message', () => {
      render(<CallToAction />)

      const link = screen.getByRole('link')
      const expectedMessage = encodeURIComponent(
        'Olá! Gostaria de saber mais sobre os treinamentos da EMR International.'
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
    it('should have dark background class', () => {
      render(<CallToAction />)

      const section = screen.getByRole('region', {
        name: /conheça nosso método de treinamento/i,
      })
      expect(section.className).toContain('bg-black')
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
      const description = screen.getByText(/É um sistema realístico voltado/i)

      expect(heading.tagName).toBe('H2')
      expect(description.tagName).toBe('P')
    })
  })
})
