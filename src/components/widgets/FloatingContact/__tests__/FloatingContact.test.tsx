import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import FloatingContact from '../index'

vi.mock('../FloatingButtons', () => ({
  default: ({ onPhoneClick }: { onPhoneClick: () => void }) => (
    <button onClick={onPhoneClick} data-testid='phone-button'>
      Phone Button
    </button>
  ),
}))

vi.mock('../ScheduleCallModal', () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div>
      {isOpen && (
        <div data-testid='schedule-modal'>
          <button onClick={onClose} data-testid='close-modal'>
            Close
          </button>
        </div>
      )}
    </div>
  ),
}))

describe('FloatingContact', () => {
  it('should render FloatingButtons component', () => {
    render(<FloatingContact />)

    expect(screen.getByTestId('phone-button')).toBeInTheDocument()
  })

  it('should not show modal initially', () => {
    render(<FloatingContact />)

    expect(screen.queryByTestId('schedule-modal')).not.toBeInTheDocument()
  })

  it('should open modal when phone button is clicked', async () => {
    const user = userEvent.setup()
    render(<FloatingContact />)

    await user.click(screen.getByTestId('phone-button'))

    expect(screen.getByTestId('schedule-modal')).toBeInTheDocument()
  })

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<FloatingContact />)

    await user.click(screen.getByTestId('phone-button'))
    expect(screen.getByTestId('schedule-modal')).toBeInTheDocument()

    await user.click(screen.getByTestId('close-modal'))
    expect(screen.queryByTestId('schedule-modal')).not.toBeInTheDocument()
  })

  it('should toggle modal state correctly', async () => {
    const user = userEvent.setup()
    render(<FloatingContact />)

    expect(screen.queryByTestId('schedule-modal')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('phone-button'))
    expect(screen.getByTestId('schedule-modal')).toBeInTheDocument()

    await user.click(screen.getByTestId('close-modal'))
    expect(screen.queryByTestId('schedule-modal')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('phone-button'))
    expect(screen.getByTestId('schedule-modal')).toBeInTheDocument()
  })
})
