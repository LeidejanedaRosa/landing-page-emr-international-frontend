import { describe, expect, it, vi } from 'vitest'

import { render, screen, userEvent } from '../../../../test/test-utils'
import { CourseCard } from '../components'
import { mockEmergencyCourse } from './fixtures'

vi.mock('../../../../hooks/useAccessibility', () => {
  let counter = 0
  return {
    useUniqueId: vi.fn((prefix: string) => `${prefix}-${++counter}`),
  }
})

vi.mock('../../../../data/coursesData', async importOriginal => {
  const actual =
    await importOriginal<typeof import('../../../../data/coursesData')>()
  return { ...actual }
})

vi.mock('../../../../utils/whatsapp', () => ({
  buildWhatsAppMessageUrl: vi.fn(
    (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`
  ),
}))

describe('CourseLevelTabs', () => {
  it('should render tablist for level selection', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const tablist = screen.getByRole('tablist', { name: 'Níveis do curso' })
    expect(tablist).toBeInTheDocument()
  })

  it('should render tabs for each level', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
  })

  it('should render level labels in Portuguese', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    expect(screen.getByRole('tab', { name: 'Básico' })).toBeInTheDocument()
    expect(
      screen.getByRole('tab', { name: 'Intermediário' })
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Avançado' })).toBeInTheDocument()
  })

  it('should have first tab selected by default', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const basicTab = screen.getByRole('tab', { name: 'Básico' })
    expect(basicTab).toHaveAttribute('aria-selected', 'true')
    expect(basicTab).toHaveAttribute('tabIndex', '0')
  })

  it('should have non-selected tabs with tabIndex -1', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
    const advancedTab = screen.getByRole('tab', { name: 'Avançado' })
    expect(intermediateTab).toHaveAttribute('aria-selected', 'false')
    expect(intermediateTab).toHaveAttribute('tabIndex', '-1')
    expect(advancedTab).toHaveAttribute('aria-selected', 'false')
    expect(advancedTab).toHaveAttribute('tabIndex', '-1')
  })

  it('should change level when clicking different tab', async () => {
    const user = userEvent.setup()
    render(<CourseCard course={mockEmergencyCourse} />)
    const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
    await user.click(intermediateTab)
    expect(intermediateTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('TMR:2')).toBeInTheDocument()
    expect(screen.getByText('40 horas')).toBeInTheDocument()
  })

  describe('Keyboard Navigation', () => {
    it('should navigate tabs with ArrowRight key', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const basicTab = screen.getByRole('tab', { name: 'Básico' })
      basicTab.focus()
      await user.keyboard('{ArrowRight}')
      const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
      expect(intermediateTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should navigate tabs with ArrowLeft key', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
      await user.click(intermediateTab)
      await user.keyboard('{ArrowLeft}')
      const basicTab = screen.getByRole('tab', { name: 'Básico' })
      expect(basicTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should navigate to first tab with Home key', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const advancedTab = screen.getByRole('tab', { name: 'Avançado' })
      await user.click(advancedTab)
      await user.keyboard('{Home}')
      const basicTab = screen.getByRole('tab', { name: 'Básico' })
      expect(basicTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should navigate to last tab with End key', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const basicTab = screen.getByRole('tab', { name: 'Básico' })
      basicTab.focus()
      await user.keyboard('{End}')
      const advancedTab = screen.getByRole('tab', { name: 'Avançado' })
      expect(advancedTab).toHaveAttribute('aria-selected', 'true')
    })

    it('should wrap around when pressing ArrowRight on last tab', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const advancedTab = screen.getByRole('tab', { name: 'Avançado' })
      await user.click(advancedTab)
      await user.keyboard('{ArrowRight}')
      const basicTab = screen.getByRole('tab', { name: 'Básico' })
      expect(basicTab).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('TabPanel Content', () => {
    it('should render tabpanel with correct aria attributes', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      const tabpanel = screen.getByRole('tabpanel')
      expect(tabpanel).toBeInTheDocument()
      expect(tabpanel).toHaveAttribute('aria-labelledby')
    })

    it('should render level code and name', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      expect(screen.getByText('TMR:1')).toBeInTheDocument()
      expect(screen.getByText(/First Response/)).toBeInTheDocument()
    })

    it('should render course duration', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      expect(screen.getByText('20 horas')).toBeInTheDocument()
    })

    it('should render level description', () => {
      render(<CourseCard course={mockEmergencyCourse} />)
      expect(
        screen.getByText('Descrição do nível básico TMR.')
      ).toBeInTheDocument()
    })

    it('should update content when changing level', async () => {
      const user = userEvent.setup()
      render(<CourseCard course={mockEmergencyCourse} />)
      const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
      await user.click(intermediateTab)
      expect(screen.getByText('TMR:2')).toBeInTheDocument()
      expect(screen.getByText('40 horas')).toBeInTheDocument()
      expect(
        screen.getByText('Descrição do nível intermediário TMR.')
      ).toBeInTheDocument()
    })
  })
})

describe('CourseActions', () => {
  it('should render enrollment link with accessible label', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const enrollLink = screen.getByRole('link', {
      name: /inscreva-se no curso.*via whatsapp/i,
    })
    expect(enrollLink).toBeInTheDocument()
    expect(enrollLink).toHaveAttribute('href')
  })

  it('should render "Tenho Interesse" when status is not open', async () => {
    const user = userEvent.setup()
    render(<CourseCard course={mockEmergencyCourse} />)
    const intermediateTab = screen.getByRole('tab', { name: 'Intermediário' })
    await user.click(intermediateTab)
    const interestLink = screen.getByRole('link', {
      name: /manifestar interesse.*via whatsapp/i,
    })
    expect(interestLink).toBeInTheDocument()
    expect(interestLink).toHaveTextContent('Tenho Interesse')
  })

  it('should render brochure download link', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const brochureLink = screen.getByRole('link', {
      name: /baixar brochura em pdf/i,
    })
    expect(brochureLink).toBeInTheDocument()
    expect(brochureLink).toHaveAttribute('href')
  })

  it('should have icons hidden from assistive technology in actions', () => {
    render(<CourseCard course={mockEmergencyCourse} />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      const svg = link.querySelector('svg')
      if (svg) {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      }
    })
  })
})
