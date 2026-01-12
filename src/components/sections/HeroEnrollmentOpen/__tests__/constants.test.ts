import { describe, expect, it } from 'vitest'

import { ACCENT_COLORS, COURSES_DATA } from '../constants'

describe('HeroEnrollmentOpen constants', () => {
  describe('COURSES_DATA', () => {
    it('should be an array', () => {
      expect(Array.isArray(COURSES_DATA)).toBe(true)
    })

    it('should have 2 courses', () => {
      expect(COURSES_DATA).toHaveLength(2)
    })

    it('should have correct structure for each course', () => {
      COURSES_DATA.forEach(course => {
        expect(course).toHaveProperty('id')
        expect(course).toHaveProperty('title')
        expect(course).toHaveProperty('subtitle')
        expect(course).toHaveProperty('subtitle2')
        expect(course).toHaveProperty('date')
        expect(course).toHaveProperty('month')
        expect(course).toHaveProperty('monthNumber')
        expect(course).toHaveProperty('year')
        expect(course).toHaveProperty('imageAvif')
        expect(course).toHaveProperty('imageWebp')
        expect(course).toHaveProperty('imageJpg')
        expect(course).toHaveProperty('accentColor')
        expect(course).toHaveProperty('ctaLabel')
        expect(course).toHaveProperty('ctaAriaLabel')
      })
    })

    it('should have unique ids', () => {
      const ids = COURSES_DATA.map(c => c.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    describe('TMR course', () => {
      const tmrCourse = COURSES_DATA.find(c => c.id === 'tmr')

      it('should exist', () => {
        expect(tmrCourse).toBeDefined()
      })

      it('should have correct title', () => {
        expect(tmrCourse?.title).toBe('Tactical Medical Response')
      })

      it('should have correct subtitles', () => {
        expect(tmrCourse?.subtitle).toBe('Emergências para ')
        expect(tmrCourse?.subtitle2).toBe('Áreas de Conflito')
      })

      it('should have correct date', () => {
        expect(tmrCourse?.date).toBe('07')
        expect(tmrCourse?.month).toBe('DEZ')
        expect(tmrCourse?.monthNumber).toBe('12')
        expect(tmrCourse?.year).toBe('2025')
      })

      it('should have red accent color', () => {
        expect(tmrCourse?.accentColor).toBe('red')
      })

      it('should have CTA label', () => {
        expect(tmrCourse?.ctaLabel).toBe('INSCREVA-SE AGORA')
      })

      it('should have accessible CTA aria label', () => {
        expect(tmrCourse?.ctaAriaLabel).toContain('Tactical Medical Response')
      })

      it('should have image sources defined', () => {
        expect(tmrCourse?.imageAvif).toBeDefined()
        expect(tmrCourse?.imageWebp).toBeDefined()
        expect(tmrCourse?.imageJpg).toBeDefined()
      })
    })

    describe('WMR course', () => {
      const wmrCourse = COURSES_DATA.find(c => c.id === 'wmr')

      it('should exist', () => {
        expect(wmrCourse).toBeDefined()
      })

      it('should have correct title', () => {
        expect(wmrCourse?.title).toBe('Wilderness Medical Response')
      })

      it('should have correct subtitles', () => {
        expect(wmrCourse?.subtitle).toBe('Emergências em ')
        expect(wmrCourse?.subtitle2).toBe('Áreas Remotas')
      })

      it('should have correct date', () => {
        expect(wmrCourse?.date).toBe('14')
        expect(wmrCourse?.month).toBe('MAR')
        expect(wmrCourse?.monthNumber).toBe('03')
        expect(wmrCourse?.year).toBe('2026')
      })

      it('should have yellow accent color', () => {
        expect(wmrCourse?.accentColor).toBe('yellow')
      })

      it('should have CTA label', () => {
        expect(wmrCourse?.ctaLabel).toBe('INSCREVA-SE AGORA')
      })

      it('should have accessible CTA aria label', () => {
        expect(wmrCourse?.ctaAriaLabel).toContain('Wilderness Medical Response')
      })

      it('should have image sources defined', () => {
        expect(wmrCourse?.imageAvif).toBeDefined()
        expect(wmrCourse?.imageWebp).toBeDefined()
        expect(wmrCourse?.imageJpg).toBeDefined()
      })
    })
  })

  describe('ACCENT_COLORS', () => {
    it('should have red and yellow color schemes', () => {
      expect(ACCENT_COLORS).toHaveProperty('red')
      expect(ACCENT_COLORS).toHaveProperty('yellow')
    })

    describe('red color scheme', () => {
      const red = ACCENT_COLORS.red

      it('should have badge class', () => {
        expect(red.badge).toBe('bg-red-500')
      })

      it('should have badgeAlpha class', () => {
        expect(red.badgeAlpha).toBe('bg-red-500/90')
      })

      it('should have button classes with hover', () => {
        expect(red.button).toContain('bg-red-600')
        expect(red.button).toContain('hover:bg-red-700')
      })

      it('should have focusRing class', () => {
        expect(red.focusRing).toContain('focus:ring-red-500')
      })

      it('should have dateBox class', () => {
        expect(red.dateBox).toContain('bg-red-600')
      })
    })

    describe('yellow color scheme', () => {
      const yellow = ACCENT_COLORS.yellow

      it('should have badge class', () => {
        expect(yellow.badge).toBe('bg-yellow-500')
      })

      it('should have badgeAlpha class', () => {
        expect(yellow.badgeAlpha).toBe('bg-yellow-500/90')
      })

      it('should have button classes with hover', () => {
        expect(yellow.button).toContain('bg-yellow-500')
        expect(yellow.button).toContain('hover:bg-yellow-600')
      })

      it('should have focusRing class', () => {
        expect(yellow.focusRing).toContain('focus:ring-yellow-500')
      })

      it('should have dateBox class', () => {
        expect(yellow.dateBox).toContain('bg-yellow-500')
      })
    })

    describe('consistency', () => {
      it('should have same properties for both color schemes', () => {
        const redKeys = Object.keys(ACCENT_COLORS.red)
        const yellowKeys = Object.keys(ACCENT_COLORS.yellow)

        expect(redKeys).toEqual(yellowKeys)
      })

      it('should have valid Tailwind classes', () => {
        Object.values(ACCENT_COLORS.red).forEach(value => {
          expect(value).toMatch(/^(bg-|hover:|focus:)/)
        })

        Object.values(ACCENT_COLORS.yellow).forEach(value => {
          expect(value).toMatch(/^(bg-|hover:|focus:)/)
        })
      })
    })
  })
})
