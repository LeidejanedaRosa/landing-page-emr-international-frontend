import { describe, expect, it } from 'vitest'

import {
  getBadgeColorClass,
  getVariantStyles,
  INDICATOR_SEGMENTS,
} from '../constants'

describe('Courses constants', () => {
  describe('INDICATOR_SEGMENTS', () => {
    it('should be a number', () => {
      expect(typeof INDICATOR_SEGMENTS).toBe('number')
    })

    it('should have value of 10', () => {
      expect(INDICATOR_SEGMENTS).toBe(10)
    })

    it('should be positive', () => {
      expect(INDICATOR_SEGMENTS).toBeGreaterThan(0)
    })
  })

  describe('getVariantStyles', () => {
    describe('emergency variant', () => {
      const styles = getVariantStyles('emergency')

      it('should return an object with all required properties', () => {
        expect(styles).toHaveProperty('border')
        expect(styles).toHaveProperty('icon')
        expect(styles).toHaveProperty('primary')
        expect(styles).toHaveProperty('primaryHover')
        expect(styles).toHaveProperty('primaryText')
        expect(styles).toHaveProperty('ring')
        expect(styles).toHaveProperty('secondary')
        expect(styles).toHaveProperty('secondaryHover')
        expect(styles).toHaveProperty('tabActive')
        expect(styles).toHaveProperty('tabActiveText')
        expect(styles).toHaveProperty('barFilled')
      })

      it('should return cta-based border style', () => {
        expect(styles.border).toBe('hover:border-cta-500')
      })

      it('should return cta-based icon style', () => {
        expect(styles.icon).toBe('text-cta-400')
      })

      it('should return cta-based primary style', () => {
        expect(styles.primary).toBe('bg-cta-600')
      })

      it('should return cta-based primaryHover style', () => {
        expect(styles.primaryHover).toBe('hover:bg-cta-700')
      })

      it('should return white text for primary', () => {
        expect(styles.primaryText).toBe('text-white')
      })

      it('should return cta-based ring style', () => {
        expect(styles.ring).toBe('focus:ring-cta-500')
      })

      it('should return cta-based tabActive style', () => {
        expect(styles.tabActive).toBe('bg-cta-600')
      })

      it('should return white tabActiveText', () => {
        expect(styles.tabActiveText).toBe('text-white')
      })

      it('should return cta-based barFilled style', () => {
        expect(styles.barFilled).toBe('bg-cta-500')
      })
    })

    describe('wilderness variant', () => {
      const styles = getVariantStyles('wilderness')

      it('should return an object with all required properties', () => {
        expect(styles).toHaveProperty('border')
        expect(styles).toHaveProperty('icon')
        expect(styles).toHaveProperty('primary')
        expect(styles).toHaveProperty('primaryHover')
        expect(styles).toHaveProperty('primaryText')
        expect(styles).toHaveProperty('ring')
        expect(styles).toHaveProperty('secondary')
        expect(styles).toHaveProperty('secondaryHover')
        expect(styles).toHaveProperty('tabActive')
        expect(styles).toHaveProperty('tabActiveText')
        expect(styles).toHaveProperty('barFilled')
      })

      it('should return warning-based border style', () => {
        expect(styles.border).toBe('hover:border-warning-400')
      })

      it('should return warning-based icon style', () => {
        expect(styles.icon).toBe('text-warning-400')
      })

      it('should return warning-based primary style', () => {
        expect(styles.primary).toBe('bg-warning-400')
      })

      it('should return warning-based primaryHover style', () => {
        expect(styles.primaryHover).toBe('hover:bg-warning-500')
      })

      it('should return dark text for primary', () => {
        expect(styles.primaryText).toBe('text-primary-950')
      })

      it('should return warning-based ring style', () => {
        expect(styles.ring).toBe('focus:ring-warning-400')
      })

      it('should return warning-based tabActive style', () => {
        expect(styles.tabActive).toBe('bg-warning-500')
      })

      it('should return dark tabActiveText', () => {
        expect(styles.tabActiveText).toBe('text-primary-950')
      })

      it('should return warning-based barFilled style', () => {
        expect(styles.barFilled).toBe('bg-warning-400')
      })
    })

    describe('common styles', () => {
      it('should have same secondary style for both variants', () => {
        const emergencyStyles = getVariantStyles('emergency')
        const wildernessStyles = getVariantStyles('wilderness')

        expect(emergencyStyles.secondary).toBe('text-primary-400')
        expect(wildernessStyles.secondary).toBe('text-primary-400')
      })

      it('should have same secondaryHover style for both variants', () => {
        const emergencyStyles = getVariantStyles('emergency')
        const wildernessStyles = getVariantStyles('wilderness')

        expect(emergencyStyles.secondaryHover).toBe('hover:text-white')
        expect(wildernessStyles.secondaryHover).toBe('hover:text-white')
      })
    })
  })

  describe('getBadgeColorClass', () => {
    it('should return red badge for emergency variant', () => {
      const result = getBadgeColorClass('emergency')
      expect(result).toBe('bg-red-500')
    })

    it('should return yellow badge for wilderness variant', () => {
      const result = getBadgeColorClass('wilderness')
      expect(result).toBe('bg-yellow-500')
    })

    it('should return string type', () => {
      expect(typeof getBadgeColorClass('emergency')).toBe('string')
      expect(typeof getBadgeColorClass('wilderness')).toBe('string')
    })

    it('should return valid Tailwind class', () => {
      const emergencyClass = getBadgeColorClass('emergency')
      const wildernessClass = getBadgeColorClass('wilderness')

      expect(emergencyClass).toMatch(/^bg-/)
      expect(wildernessClass).toMatch(/^bg-/)
    })
  })
})
