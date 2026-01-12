import { describe, expect, it } from 'vitest'

import { render } from '../../../../../test/test-utils'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../index'

describe('Footer Icons', () => {
  describe('InstagramIcon', () => {
    it('should render SVG element', () => {
      const { container } = render(<InstagramIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have default className', () => {
      const { container } = render(<InstagramIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-5', 'h-5')
    })

    it('should accept custom className', () => {
      const { container } = render(<InstagramIcon className='w-8 h-8' />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-8', 'h-8')
    })

    it('should have aria-hidden for accessibility', () => {
      const { container } = render(<InstagramIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have presentation role', () => {
      const { container } = render(<InstagramIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('role', 'presentation')
    })

    it('should have correct viewBox', () => {
      const { container } = render(<InstagramIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    })

    it('should have currentColor fill', () => {
      const { container } = render(<InstagramIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('fill', 'currentColor')
    })

    it('should contain path element', () => {
      const { container } = render(<InstagramIcon />)

      const path = container.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d')
    })
  })

  describe('LinkedInIcon', () => {
    it('should render SVG element', () => {
      const { container } = render(<LinkedInIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have default className', () => {
      const { container } = render(<LinkedInIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-5', 'h-5')
    })

    it('should accept custom className', () => {
      const { container } = render(<LinkedInIcon className='w-10 h-10' />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-10', 'h-10')
    })

    it('should have aria-hidden for accessibility', () => {
      const { container } = render(<LinkedInIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have presentation role', () => {
      const { container } = render(<LinkedInIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('role', 'presentation')
    })

    it('should have correct viewBox', () => {
      const { container } = render(<LinkedInIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    })

    it('should have currentColor fill', () => {
      const { container } = render(<LinkedInIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('fill', 'currentColor')
    })

    it('should contain path element', () => {
      const { container } = render(<LinkedInIcon />)

      const path = container.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d')
    })
  })

  describe('WhatsAppIcon', () => {
    it('should render SVG element', () => {
      const { container } = render(<WhatsAppIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have default className', () => {
      const { container } = render(<WhatsAppIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-5', 'h-5')
    })

    it('should accept custom className', () => {
      const { container } = render(<WhatsAppIcon className='w-6 h-6' />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-6', 'h-6')
    })

    it('should have aria-hidden for accessibility', () => {
      const { container } = render(<WhatsAppIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have presentation role', () => {
      const { container } = render(<WhatsAppIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('role', 'presentation')
    })

    it('should have correct viewBox', () => {
      const { container } = render(<WhatsAppIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    })

    it('should have currentColor fill', () => {
      const { container } = render(<WhatsAppIcon />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('fill', 'currentColor')
    })

    it('should contain path element', () => {
      const { container } = render(<WhatsAppIcon />)

      const path = container.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d')
    })
  })

  describe('Common behavior', () => {
    it('all icons should be decorative (hidden from screen readers)', () => {
      const icons = [
        <InstagramIcon key='instagram' />,
        <LinkedInIcon key='linkedin' />,
        <WhatsAppIcon key='whatsapp' />,
      ]

      icons.forEach(icon => {
        const { container } = render(icon)
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('all icons should use currentColor for theming', () => {
      const icons = [
        <InstagramIcon key='instagram' />,
        <LinkedInIcon key='linkedin' />,
        <WhatsAppIcon key='whatsapp' />,
      ]

      icons.forEach(icon => {
        const { container } = render(icon)
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('fill', 'currentColor')
      })
    })

    it('all icons should have consistent default size', () => {
      const icons = [
        <InstagramIcon key='instagram' />,
        <LinkedInIcon key='linkedin' />,
        <WhatsAppIcon key='whatsapp' />,
      ]

      icons.forEach(icon => {
        const { container } = render(icon)
        const svg = container.querySelector('svg')
        expect(svg).toHaveClass('w-5', 'h-5')
      })
    })
  })
})
