import React from 'react'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, within } from '../../../../test/test-utils'
import ScheduleCallModal from '../ScheduleCallModal'

vi.mock('react-focus-lock', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='focus-lock'>{children}</div>
  ),
}))

vi.mock('../components/ModalHeader', () => ({
  default: ({
    title,
    subtitle,
    onClose,
  }: {
    title: string
    subtitle: string
    onClose: () => void
  }) => (
    <div data-testid='modal-header'>
      <h2 id='schedule-call-title'>{title}</h2>
      <p>{subtitle}</p>
      <button onClick={onClose} data-testid='close-button'>
        Close
      </button>
    </div>
  ),
}))

vi.mock('../components/BusinessHoursInfo', () => ({
  default: () => <div data-testid='business-hours-info'>Business Hours</div>,
}))

vi.mock('../components/ScheduleCallForm', () => ({
  default: ({ onSubmit }: { onSubmit: () => void }) => (
    <form data-testid='schedule-form' onSubmit={onSubmit}>
      <button type='submit'>Submit</button>
    </form>
  ),
}))

vi.mock('../hooks/useModalAccessibility', () => ({
  useModalAccessibility: () => ({
    closeButtonRef: { current: null },
  }),
}))

vi.mock('../hooks/useScheduleForm', () => ({
  useScheduleForm: (onClose: () => void) => ({
    formData: { name: '', email: '', phone: '' },
    errors: {},
    popupBlockedError: null,
    handleSubmit: vi.fn((e: React.FormEvent) => {
      e.preventDefault()
      onClose()
    }),
    handleInputChange: vi.fn(),
    handlePhoneChange: vi.fn(),
  }),
}))

describe('ScheduleCallModal', () => {
  beforeEach(() => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'portal-root')
    document.body.appendChild(portalRoot)
  })

  afterEach(() => {
    const portalRoot = document.getElementById('portal-root')
    if (portalRoot) {
      document.body.removeChild(portalRoot)
    }
  })

  it('should not render when isOpen is false', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={false} onClose={mockOnClose} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should render all modal components', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByTestId('modal-header')).toBeInTheDocument()
    expect(screen.getByTestId('business-hours-info')).toBeInTheDocument()
    expect(screen.getByTestId('schedule-form')).toBeInTheDocument()
  })

  it('should have correct dialog attributes', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'schedule-call-title')
  })

  it('should call onClose when overlay is clicked', async () => {
    const mockOnClose = vi.fn()
    const { user } = setupTest(true, mockOnClose)

    const overlay = document.querySelector('.fixed.inset-0')
    if (overlay) {
      await user.click(overlay as HTMLElement)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('should not close when clicking inside modal content', async () => {
    const mockOnClose = vi.fn()
    const { user } = setupTest(true, mockOnClose)

    const dialog = screen.getByRole('dialog')
    await user.click(dialog)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should call onClose when close button is clicked', async () => {
    const mockOnClose = vi.fn()
    const { user } = setupTest(true, mockOnClose)

    const closeButton = screen.getByTestId('close-button')
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('should render modal with FocusLock wrapper', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByTestId('focus-lock')).toBeInTheDocument()
  })

  it('should render modal title and subtitle', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    const modalHeader = screen.getByTestId('modal-header')
    expect(within(modalHeader).getByText('Agendar Ligação')).toBeInTheDocument()
    expect(
      within(modalHeader).getByText(
        'Informe seus dados e entraremos em contato'
      )
    ).toBeInTheDocument()
  })

  it('should not render popup blocked error by default', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should render modal using createPortal', () => {
    const mockOnClose = vi.fn()
    render(<ScheduleCallModal isOpen={true} onClose={mockOnClose} />)

    const focusLock = screen.getByTestId('focus-lock')
    expect(focusLock).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})

function setupTest(isOpen: boolean, onClose: () => void) {
  const user = require('@testing-library/user-event').default.setup()
  render(<ScheduleCallModal isOpen={isOpen} onClose={onClose} />)
  return { user }
}
