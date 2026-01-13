import { describe, expect, it } from 'vitest'

import {
  type Breakpoint,
  breakpoints,
  type FontSize,
  type FontWeight,
  type Shadow,
  shadows,
  spacing,
  type TransitionDuration,
  transitions,
  type TransitionTiming,
  typography,
  zIndex,
  type ZIndex,
} from '../theme'

describe('theme', () => {
  describe('breakpoints', () => {
    it('should have all required breakpoints', () => {
      expect(breakpoints).toHaveProperty('xs')
      expect(breakpoints).toHaveProperty('sm')
      expect(breakpoints).toHaveProperty('md')
      expect(breakpoints).toHaveProperty('lg')
      expect(breakpoints).toHaveProperty('xl')
      expect(breakpoints).toHaveProperty('2xl')
    })

    it('should have valid pixel values', () => {
      Object.values(breakpoints).forEach(value => {
        expect(value).toMatch(/^\d+px$/)
      })
    })

    it('should have breakpoints in ascending order', () => {
      const values = [
        parseInt(breakpoints.xs),
        parseInt(breakpoints.sm),
        parseInt(breakpoints.md),
        parseInt(breakpoints.lg),
        parseInt(breakpoints.xl),
        parseInt(breakpoints['2xl']),
      ]

      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1])
      }
    })

    it('should have mobile-first breakpoint as xs', () => {
      expect(parseInt(breakpoints.xs)).toBe(320)
    })

    it('should export Breakpoint type', () => {
      const bp: Breakpoint = 'md'
      expect(breakpoints[bp]).toBeDefined()
    })
  })

  describe('typography', () => {
    describe('fontFamily', () => {
      it('should have Arial as primary font', () => {
        expect(typography.fontFamily.sans).toContain('Arial')
        expect(typography.fontFamily.display).toContain('Arial')
        expect(typography.fontFamily.body).toContain('Arial')
      })

      it('should include sans-serif fallback', () => {
        expect(typography.fontFamily.sans).toContain('sans-serif')
      })
    })

    describe('fontSize', () => {
      it('should have all standard sizes', () => {
        const expectedSizes = [
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
        ]
        expectedSizes.forEach(size => {
          expect(typography.fontSize).toHaveProperty(size)
        })
      })

      it('should have size and lineHeight for each fontSize', () => {
        Object.values(typography.fontSize).forEach(config => {
          expect(config).toHaveLength(2)
          expect(config[0]).toMatch(/^\d+(\.\d+)?rem$/)
          expect(config[1]).toHaveProperty('lineHeight')
        })
      })

      it('should have sizes in ascending order', () => {
        const sizes = [
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
        ] as const
        const values = sizes.map(size =>
          parseFloat(typography.fontSize[size][0])
        )

        for (let i = 1; i < values.length; i++) {
          expect(values[i]).toBeGreaterThan(values[i - 1])
        }
      })

      it('should export FontSize type', () => {
        const size: FontSize = 'base'
        expect(typography.fontSize[size]).toBeDefined()
      })
    })

    describe('fontWeight', () => {
      it('should have all weight variants', () => {
        const expectedWeights = [
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ]
        expectedWeights.forEach(weight => {
          expect(typography.fontWeight).toHaveProperty(weight)
        })
      })

      it('should have valid numeric string values', () => {
        Object.values(typography.fontWeight).forEach(value => {
          const numValue = parseInt(value)
          expect(numValue).toBeGreaterThanOrEqual(100)
          expect(numValue).toBeLessThanOrEqual(900)
        })
      })

      it('should have weights in ascending order', () => {
        const weights = [
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ] as const
        const values = weights.map(weight =>
          parseInt(typography.fontWeight[weight])
        )

        for (let i = 1; i < values.length; i++) {
          expect(values[i]).toBeGreaterThan(values[i - 1])
        }
      })

      it('should export FontWeight type', () => {
        const weight: FontWeight = 'bold'
        expect(typography.fontWeight[weight]).toBeDefined()
      })
    })
  })

  describe('spacing', () => {
    describe('section', () => {
      it('should have all section spacing sizes', () => {
        expect(spacing.section).toHaveProperty('xs')
        expect(spacing.section).toHaveProperty('sm')
        expect(spacing.section).toHaveProperty('md')
        expect(spacing.section).toHaveProperty('lg')
        expect(spacing.section).toHaveProperty('xl')
      })

      it('should have valid rem values', () => {
        Object.values(spacing.section).forEach(value => {
          expect(value).toMatch(/^\d+rem$/)
        })
      })

      it('should have section spacing in ascending order', () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
        const values = sizes.map(size => parseFloat(spacing.section[size]))

        for (let i = 1; i < values.length; i++) {
          expect(values[i]).toBeGreaterThan(values[i - 1])
        }
      })
    })

    describe('container.padding', () => {
      it('should have all container padding sizes', () => {
        expect(spacing.container.padding).toHaveProperty('xs')
        expect(spacing.container.padding).toHaveProperty('sm')
        expect(spacing.container.padding).toHaveProperty('md')
        expect(spacing.container.padding).toHaveProperty('lg')
        expect(spacing.container.padding).toHaveProperty('xl')
      })

      it('should have valid rem values', () => {
        Object.values(spacing.container.padding).forEach(value => {
          expect(value).toMatch(/^\d+(\.\d+)?rem$/)
        })
      })
    })
  })

  describe('shadows', () => {
    it('should have all shadow variants', () => {
      const expectedShadows = ['sm', 'base', 'md', 'lg', 'xl', '2xl']
      expectedShadows.forEach(shadow => {
        expect(shadows).toHaveProperty(shadow)
      })
    })

    it('should have valid CSS box-shadow syntax', () => {
      Object.values(shadows).forEach(value => {
        expect(value).toMatch(/^0\s/)
        expect(value).toContain('rgb(')
      })
    })

    it('should export Shadow type', () => {
      const shadow: Shadow = 'lg'
      expect(shadows[shadow]).toBeDefined()
    })
  })

  describe('transitions', () => {
    describe('duration', () => {
      it('should have all duration variants', () => {
        expect(transitions.duration).toHaveProperty('fast')
        expect(transitions.duration).toHaveProperty('base')
        expect(transitions.duration).toHaveProperty('slow')
        expect(transitions.duration).toHaveProperty('slower')
      })

      it('should have valid ms values', () => {
        Object.values(transitions.duration).forEach(value => {
          expect(value).toMatch(/^\d+ms$/)
        })
      })

      it('should have durations in ascending order', () => {
        const durations = ['fast', 'base', 'slow', 'slower'] as const
        const values = durations.map(d => parseInt(transitions.duration[d]))

        for (let i = 1; i < values.length; i++) {
          expect(values[i]).toBeGreaterThan(values[i - 1])
        }
      })

      it('should export TransitionDuration type', () => {
        const duration: TransitionDuration = 'fast'
        expect(transitions.duration[duration]).toBeDefined()
      })
    })

    describe('timing', () => {
      it('should have all timing functions', () => {
        expect(transitions.timing).toHaveProperty('ease')
        expect(transitions.timing).toHaveProperty('ease-in')
        expect(transitions.timing).toHaveProperty('ease-out')
        expect(transitions.timing).toHaveProperty('ease-in-out')
      })

      it('should have valid CSS timing function values', () => {
        const validTimings = [
          'ease',
          'ease-in',
          'ease-out',
          'ease-in-out',
          'linear',
        ]
        Object.values(transitions.timing).forEach(value => {
          expect(validTimings).toContain(value)
        })
      })

      it('should export TransitionTiming type', () => {
        const timing: TransitionTiming = 'ease-in-out'
        expect(transitions.timing[timing]).toBeDefined()
      })
    })
  })

  describe('zIndex', () => {
    it('should have all z-index levels', () => {
      const expectedLevels = [
        'hide',
        'auto',
        'base',
        'docked',
        'dropdown',
        'sticky',
        'banner',
        'overlay',
        'modal',
        'popover',
        'skipLink',
        'toast',
        'tooltip',
      ]
      expectedLevels.forEach(level => {
        expect(zIndex).toHaveProperty(level)
      })
    })

    it('should have negative value for hide', () => {
      expect(zIndex.hide).toBe(-1)
    })

    it('should have auto as string', () => {
      expect(zIndex.auto).toBe('auto')
    })

    it('should have base as 0', () => {
      expect(zIndex.base).toBe(0)
    })

    it('should have overlay elements with higher z-index than content', () => {
      expect(zIndex.modal).toBeGreaterThan(zIndex.overlay)
      expect(zIndex.overlay).toBeGreaterThan(zIndex.sticky)
      expect(zIndex.tooltip).toBeGreaterThan(zIndex.modal)
    })

    it('should have toast below tooltip', () => {
      expect(zIndex.toast).toBeLessThan(zIndex.tooltip)
    })

    it('should export ZIndex type', () => {
      const z: ZIndex = 'modal'
      expect(zIndex[z]).toBeDefined()
    })
  })
})
