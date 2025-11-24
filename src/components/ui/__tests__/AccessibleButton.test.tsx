import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../test/test-utils'
import { AccessibleButton } from '../AccessibleButton'

// eslint-disable-next-line max-lines-per-function
describe('AccessibleButton', () => {
  it('should render button with correct text', () => {
    render(<AccessibleButton>Click me</AccessibleButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should handle keyboard navigation (Enter)', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>)

    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should handle keyboard navigation (Space)', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>)

    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard(' ')

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<AccessibleButton disabled>Disabled button</AccessibleButton>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('should have proper ARIA attributes', () => {
    render(
      <AccessibleButton
        aria-label='Custom label'
        aria-describedby='description'
      >
        Button
      </AccessibleButton>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Custom label')
    expect(button).toHaveAttribute('aria-describedby', 'description')
  })

  it('should apply different variants correctly', () => {
    const { rerender } = render(
      <AccessibleButton variant='primary'>Primary</AccessibleButton>
    )

    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')

    rerender(<AccessibleButton variant='secondary'>Secondary</AccessibleButton>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary')

    rerender(<AccessibleButton variant='ghost'>Ghost</AccessibleButton>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-transparent')
  })

  it('should apply different sizes correctly', () => {
    const { rerender } = render(
      <AccessibleButton size='sm'>Small</AccessibleButton>
    )

    let button = screen.getByRole('button')
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')

    rerender(<AccessibleButton size='lg'>Large</AccessibleButton>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-8', 'py-4', 'text-lg')
  })

  it('should show loading state correctly', () => {
    render(<AccessibleButton loading>Loading button</AccessibleButton>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
})
