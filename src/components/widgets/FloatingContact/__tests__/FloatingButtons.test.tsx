import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import FloatingButtons from '../FloatingButtons'

vi.mock('../../../../utils/whatsapp', () => ({
  getWhatsAppUrl: () => 'https://wa.me/5519971575640',
}))

describe('FloatingButtons', () => {
  it('should render both floating buttons', () => {
    const mockOnPhoneClick = vi.fn()
    render(<FloatingButtons onPhoneClick={mockOnPhoneClick} />)

    expect(
      screen.getByRole('button', { name: 'Agendar ligação' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: 'Conversar no WhatsApp (abre em nova janela)',
      })
    ).toBeInTheDocument()
  })

  it('should call onPhoneClick when phone button is clicked', async () => {
    const mockOnPhoneClick = vi.fn()
    const { user } = setupTest(mockOnPhoneClick)

    const phoneButton = screen.getByRole('button', { name: 'Agendar ligação' })
    await user.click(phoneButton)

    expect(mockOnPhoneClick).toHaveBeenCalledTimes(1)
  })

  it('should have correct WhatsApp link with proper attributes', () => {
    const mockOnPhoneClick = vi.fn()
    render(<FloatingButtons onPhoneClick={mockOnPhoneClick} />)

    const whatsappLink = screen.getByRole('link', {
      name: 'Conversar no WhatsApp (abre em nova janela)',
    })

    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5519971575640')
    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should have proper accessibility attributes on phone button', () => {
    const mockOnPhoneClick = vi.fn()
    render(<FloatingButtons onPhoneClick={mockOnPhoneClick} />)

    const phoneButton = screen.getByRole('button', { name: 'Agendar ligação' })

    expect(phoneButton).toHaveAttribute('aria-label', 'Agendar ligação')
    expect(phoneButton).toHaveAttribute('title', 'Agendar ligação')
  })

  it('should have proper accessibility attributes on WhatsApp link', () => {
    const mockOnPhoneClick = vi.fn()
    render(<FloatingButtons onPhoneClick={mockOnPhoneClick} />)

    const whatsappLink = screen.getByRole('link', {
      name: 'Conversar no WhatsApp (abre em nova janela)',
    })

    expect(whatsappLink).toHaveAttribute(
      'aria-label',
      'Conversar no WhatsApp (abre em nova janela)'
    )
    expect(whatsappLink).toHaveAttribute(
      'title',
      'Conversar no WhatsApp (abre em nova janela)'
    )
  })

  it('should be focusable via keyboard', () => {
    const mockOnPhoneClick = vi.fn()
    render(<FloatingButtons onPhoneClick={mockOnPhoneClick} />)

    const phoneButton = screen.getByRole('button', { name: 'Agendar ligação' })
    const whatsappLink = screen.getByRole('link', {
      name: 'Conversar no WhatsApp (abre em nova janela)',
    })

    phoneButton.focus()
    expect(phoneButton).toHaveFocus()

    whatsappLink.focus()
    expect(whatsappLink).toHaveFocus()
  })

  it('should render with proper CSS classes for positioning', () => {
    const mockOnPhoneClick = vi.fn()
    const { container } = render(
      <FloatingButtons onPhoneClick={mockOnPhoneClick} />
    )

    const floatingContainer = container.querySelector('.fixed.bottom-6')
    expect(floatingContainer).toBeInTheDocument()
    expect(floatingContainer).toHaveClass('flex', 'flex-col', 'gap-3')
  })
})

function setupTest(onPhoneClick: () => void) {
  const user = require('@testing-library/user-event').default.setup()
  render(<FloatingButtons onPhoneClick={onPhoneClick} />)
  return { user }
}
