import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../../test/test-utils'
import { CoursesHeader } from '../components'

describe('CoursesHeader', () => {
  const defaultProps = {
    titleId: 'test-title-id',
    descriptionId: 'test-description-id',
  }

  describe('Rendering', () => {
    it('should render header element', () => {
      render(<CoursesHeader {...defaultProps} />)

      const header = document.querySelector('header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('text-center')
    })

    it('should render subtitle badge', () => {
      render(<CoursesHeader {...defaultProps} />)

      expect(
        screen.getByText(
          'Formação de Operadores de Emergência Tática e de Áreas Remotas'
        )
      ).toBeInTheDocument()
    })

    it('should render main heading with correct id', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveAttribute('id', 'test-title-id')
    })

    it('should render heading with "Cursos" text', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Cursos')
    })

    it('should render "APH Tático" in heading', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('APH Tático')
    })

    it('should render description paragraph with correct id', () => {
      render(<CoursesHeader {...defaultProps} />)

      const description = screen.getByText(
        /capacitação profissional de excelência/i
      )
      expect(description).toBeInTheDocument()
      expect(description).toHaveAttribute('id', 'test-description-id')
    })
  })

  describe('English Language Tag', () => {
    it('should render "Wilderness Medicine" with lang="en" attribute', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      const englishSpan = heading.querySelector('span[lang="en"]')

      expect(englishSpan).toBeInTheDocument()
      expect(englishSpan).toHaveTextContent('Wilderness Medicine')
    })
  })

  describe('Styling', () => {
    it('should have responsive text sizes on heading', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl')
    })

    it('should have white text color on heading', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('text-white')
    })

    it('should have CTA color on subtitle', () => {
      render(<CoursesHeader {...defaultProps} />)

      const subtitle = screen.getByText(
        'Formação de Operadores de Emergência Tática e de Áreas Remotas'
      )
      expect(subtitle).toHaveClass('text-cta-500')
    })

    it('should have uppercase styling on subtitle', () => {
      render(<CoursesHeader {...defaultProps} />)

      const subtitle = screen.getByText(
        'Formação de Operadores de Emergência Tática e de Áreas Remotas'
      )
      expect(subtitle).toHaveClass('uppercase')
    })

    it('should have description with primary-300 color', () => {
      render(<CoursesHeader {...defaultProps} />)

      const description = screen.getByText(
        /capacitação profissional de excelência/i
      )
      expect(description).toHaveClass('text-primary-300')
    })

    it('should have max-width and centered description', () => {
      render(<CoursesHeader {...defaultProps} />)

      const description = screen.getByText(
        /capacitação profissional de excelência/i
      )
      expect(description).toHaveClass('max-w-2xl', 'mx-auto')
    })

    it('should have font-capture-it on "Cursos" span', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      const cursosSpan = heading.querySelector('.font-capture-it')
      expect(cursosSpan).toBeInTheDocument()
      expect(cursosSpan).toHaveTextContent('Cursos')
    })
  })

  describe('Responsive Margins', () => {
    it('should have responsive bottom margin on header', () => {
      render(<CoursesHeader {...defaultProps} />)

      const header = document.querySelector('header')
      expect(header).toHaveClass('mb-12', 'md:mb-16')
    })

    it('should have margin-bottom on heading', () => {
      render(<CoursesHeader {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('mb-6')
    })
  })
})
