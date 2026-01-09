import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import Footer from '../index'

const mockAnnounce = vi.fn()

vi.mock('../../../../hooks/useAccessibility', () => ({
  useScreenReaderAnnouncement: vi.fn(() => ({
    announce: mockAnnounce,
  })),
  useUniqueId: vi.fn((prefix: string) => `${prefix}-test-id`),
}))

vi.mock('../../../../assets/logo_emr_internacional.svg', () => ({
  default: 'mocked-logo.svg',
}))

describe('Footer', () => {
  beforeEach(() => {
    mockAnnounce.mockClear()
  })

  describe('Rendering', () => {
    it('should render footer with correct semantic structure', () => {
      render(<Footer />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveAttribute('id', 'contato')
      expect(footer).toHaveAttribute('data-section', 'contato')
    })

    it('should have accessible aria-label', () => {
      render(<Footer />)

      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveAttribute(
        'aria-label',
        'Rodapé do site com informações da empresa e links úteis'
      )
    })

    it('should render company logo with alt text', () => {
      render(<Footer />)

      const logo = screen.getByAltText('EMR Internacional')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('width', '160')
      expect(logo).toHaveAttribute('height', '128')
    })

    it('should render brand slogan', () => {
      render(<Footer />)

      expect(screen.getByText('Emergência 24-7, 360°')).toBeInTheDocument()
      expect(
        screen.getByText('Resposta à emergência que se adapta ao cenário')
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Treinamentos e operações onde o convencional não alcança.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('QuickLinks', () => {
    it('should render quick links navigation', () => {
      render(<Footer />)

      const nav = screen.getByRole('navigation', {
        name: /links rápidos/i,
      })
      expect(nav).toBeInTheDocument()
    })

    it('should render all navigation links', () => {
      render(<Footer />)

      expect(screen.getByText('Links Rápidos')).toBeInTheDocument()
      expect(screen.getByText('Sobre Nós')).toBeInTheDocument()
      expect(screen.getByText('Certificações')).toBeInTheDocument()
      expect(screen.getByText('Cursos')).toBeInTheDocument()
      expect(screen.getByText('Depoimentos')).toBeInTheDocument()
    })

    it('should render disabled contact link', () => {
      render(<Footer />)

      const contatoLink = screen.getByText('Contato', { selector: 'span' })
      expect(contatoLink).toHaveAttribute('aria-disabled', 'true')
      expect(contatoLink).toHaveClass('cursor-not-allowed')
    })

    it('should announce navigation when clicking enabled link', async () => {
      const user = userEvent.setup()
      render(<Footer />)

      const sobreLink = screen.getByRole('link', {
        name: /navegar para seção sobre a empresa/i,
      })
      await user.click(sobreLink)

      expect(mockAnnounce).toHaveBeenCalledWith(
        'Navegando para Sobre Nós',
        'polite'
      )
    })
  })

  describe('ContactSection', () => {
    it('should render contact section with heading', () => {
      render(<Footer />)

      const contactHeading = screen.getByRole('heading', {
        name: 'Contato',
        level: 3,
      })
      expect(contactHeading).toBeInTheDocument()
      expect(
        screen.getByText('Fale conosco pelas redes sociais')
      ).toBeInTheDocument()
    })

    it('should render business hours', () => {
      render(<Footer />)

      expect(screen.getByText('Atendimento')).toBeInTheDocument()
      expect(screen.getByText('Segunda a Sexta')).toBeInTheDocument()
      expect(screen.getByText('8h às 18h')).toBeInTheDocument()
    })
  })

  describe('SocialLinks', () => {
    it('should render all social media links', () => {
      render(<Footer />)

      const socialList = screen.getByRole('list', {
        name: /redes sociais da emr internacional/i,
      })
      expect(socialList).toBeInTheDocument()

      expect(
        screen.getByLabelText(/seguir emr internacional no instagram/i)
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/conectar com emr internacional no linkedin/i)
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/entrar em contato via whatsapp/i)
      ).toBeInTheDocument()
    })

    it('should have correct href for social links', () => {
      render(<Footer />)

      const instagramLink = screen.getByLabelText(
        /seguir emr internacional no instagram/i
      )
      const linkedinLink = screen.getByLabelText(
        /conectar com emr internacional no linkedin/i
      )
      const whatsappLink = screen.getByLabelText(
        /entrar em contato via whatsapp/i
      )

      expect(instagramLink).toHaveAttribute(
        'href',
        'https://www.instagram.com/emr_international/'
      )
      expect(linkedinLink).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/juan-regenerati/'
      )
      expect(whatsappLink).toHaveAttribute(
        'href',
        'https://wa.me/5519971575640'
      )
    })

    it('should open social links in new tab with security attributes', () => {
      render(<Footer />)

      const instagramLink = screen.getByLabelText(
        /seguir emr internacional no instagram/i
      )

      expect(instagramLink).toHaveAttribute('target', '_blank')
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should announce when clicking social link', async () => {
      const user = userEvent.setup()
      render(<Footer />)

      const instagramLink = screen.getByLabelText(
        /seguir emr internacional no instagram/i
      )
      await user.click(instagramLink)

      expect(mockAnnounce).toHaveBeenCalledWith(
        'Abrindo Instagram da EMR Internacional',
        'polite'
      )
    })
  })

  describe('Copyright', () => {
    it('should render copyright with current year', () => {
      render(<Footer />)

      const currentYear = new Date().getFullYear()
      expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument()
    })

    it('should render company legal name', () => {
      render(<Footer />)

      expect(screen.getByText('EMR Internacional')).toBeInTheDocument()
      expect(
        screen.getByText('. Todos os direitos reservados.')
      ).toBeInTheDocument()
    })

    it('should render CNPJ and CREA information', () => {
      render(<Footer />)

      expect(screen.getByText(/cnpj:/i)).toBeInTheDocument()
      expect(screen.getByText(/registro crea:/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have decorative divider hidden from screen readers', () => {
      render(<Footer />)

      const footer = screen.getByRole('contentinfo')
      const divider = footer.querySelector('[aria-hidden="true"]')
      expect(divider).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      render(<Footer />)

      const headings = screen.getAllByRole('heading', { level: 3 })
      expect(headings.length).toBeGreaterThanOrEqual(2)
      expect(headings[0]).toHaveTextContent('Links Rápidos')
      expect(headings[1]).toHaveTextContent('Contato')
    })

    it('should have SVG icons hidden from assistive technology', () => {
      render(<Footer />)

      const footer = screen.getByRole('contentinfo')
      const svgs = footer.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('should allow keyboard navigation on links', async () => {
      const user = userEvent.setup()
      render(<Footer />)

      const sobreLink = screen.getByRole('link', {
        name: /navegar para seção sobre a empresa/i,
      })

      sobreLink.focus()
      expect(sobreLink).toHaveFocus()

      await user.tab()
      const certificacoesLink = screen.getByRole('link', {
        name: /navegar para seção de certificações/i,
      })
      expect(certificacoesLink).toHaveFocus()
    })
  })
})
