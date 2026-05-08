import { beforeAll, describe, expect, it } from 'vitest'

import {
  type Course,
  type CourseLevel,
  getCourseById,
  getCourses,
  getCoursesByVariant,
  LEVEL_LABELS,
} from '../coursesData'

describe('coursesData', () => {
  describe('LEVEL_LABELS', () => {
    it('should have labels for all levels', () => {
      expect(LEVEL_LABELS).toHaveProperty('basic')
      expect(LEVEL_LABELS).toHaveProperty('intermediate')
      expect(LEVEL_LABELS).toHaveProperty('advanced')
    })

    it('should have correct Portuguese labels', () => {
      expect(LEVEL_LABELS.basic).toBe('Básico')
      expect(LEVEL_LABELS.intermediate).toBe('Intermediário')
      expect(LEVEL_LABELS.advanced).toBe('Avançado')
    })
  })

  describe('getCourses', () => {
    it('should return an array', () => {
      const courses = getCourses()
      expect(Array.isArray(courses)).toBe(true)
    })

    it('should return 2 courses', () => {
      const courses = getCourses()
      expect(courses).toHaveLength(2)
    })

    it('should return a new array each time (immutability)', () => {
      const courses1 = getCourses()
      const courses2 = getCourses()
      expect(courses1).not.toBe(courses2)
      expect(courses1).toEqual(courses2)
    })

    it('should have correct structure for each course', () => {
      const courses = getCourses()

      courses.forEach((course: Course) => {
        expect(course).toHaveProperty('id')
        expect(course).toHaveProperty('abbreviation')
        expect(course).toHaveProperty('title')
        expect(course).toHaveProperty('levels')
        expect(course).toHaveProperty('metadata')
        expect(course).toHaveProperty('links')
        expect(course).toHaveProperty('images')
        expect(course).toHaveProperty('variant')
      })
    })

    it('should have valid variants', () => {
      const courses = getCourses()

      courses.forEach((course: Course) => {
        expect(['emergency', 'wilderness']).toContain(course.variant)
      })
    })

    it('should have 3 levels per course', () => {
      const courses = getCourses()

      courses.forEach((course: Course) => {
        expect(course.levels).toHaveLength(3)
      })
    })

    it('should have levels in correct order', () => {
      const courses = getCourses()
      const expectedOrder: CourseLevel[] = ['basic', 'intermediate', 'advanced']

      courses.forEach((course: Course) => {
        course.levels.forEach((level, index) => {
          expect(level.level).toBe(expectedOrder[index])
        })
      })
    })
  })

  describe('getCourseById', () => {
    it('should return TMR course by id', () => {
      const course = getCourseById('tmr')

      expect(course).toBeDefined()
      expect(course?.id).toBe('tmr')
      expect(course?.abbreviation).toBe('TMR')
      expect(course?.variant).toBe('emergency')
    })

    it('should return WMR course by id', () => {
      const course = getCourseById('wmr')

      expect(course).toBeDefined()
      expect(course?.id).toBe('wmr')
      expect(course?.abbreviation).toBe('WMR')
      expect(course?.variant).toBe('wilderness')
    })

    it('should return undefined for non-existent id', () => {
      const course = getCourseById('non-existent')
      expect(course).toBeUndefined()
    })

    it('should return undefined for empty string', () => {
      const course = getCourseById('')
      expect(course).toBeUndefined()
    })
  })

  describe('getCoursesByVariant', () => {
    it('should return emergency courses', () => {
      const courses = getCoursesByVariant('emergency')

      expect(courses).toHaveLength(1)
      expect(courses[0].id).toBe('tmr')
      expect(courses[0].variant).toBe('emergency')
    })

    it('should return wilderness courses', () => {
      const courses = getCoursesByVariant('wilderness')

      expect(courses).toHaveLength(1)
      expect(courses[0].id).toBe('wmr')
      expect(courses[0].variant).toBe('wilderness')
    })

    it('should return new array (immutability)', () => {
      const courses1 = getCoursesByVariant('emergency')
      const courses2 = getCoursesByVariant('emergency')
      expect(courses1).not.toBe(courses2)
    })
  })

  describe('TMR Course structure', () => {
    let tmr: Course

    beforeAll(() => {
      const course = getCourseById('tmr')
      if (!course) {
        throw new Error('TMR course not found')
      }
      tmr = course
    })

    it('should exist', () => {
      expect(tmr).toBeDefined()
      expect(tmr.id).toBe('tmr')
    })

    it('should have correct title', () => {
      expect(tmr.title).toContain('Tactical Medical Responder')
    })

    it('should have metadata with certification and location', () => {
      expect(tmr.metadata.certification).toContain('TMR')
      expect(tmr.metadata.location).toBeDefined()
    })

    it('should have links with details', () => {
      expect(tmr.links.details).toContain('tmr')
    })

    it('should have images with all formats', () => {
      expect(tmr.images.jpg).toBeDefined()
      expect(tmr.images.webp).toBeDefined()
      expect(tmr.images.avif).toBeDefined()
      expect(tmr.images.alt).toBeDefined()
    })

    it('should have valid level data', () => {
      tmr.levels.forEach(level => {
        expect(level.code).toBeDefined()
        expect(level.name).toBeDefined()
        expect(level.namePt).toBeDefined()
        expect(level.duration).toBeDefined()
        expect(level.description).toBeDefined()
        expect(['open', 'interest', 'closed']).toContain(level.enrollmentStatus)
        expect(level.immersivity).toBeGreaterThanOrEqual(1)
        expect(level.immersivity).toBeLessThanOrEqual(10)
        expect(level.difficulty).toBeGreaterThanOrEqual(1)
        expect(level.difficulty).toBeLessThanOrEqual(10)
        expect(level.skill).toBeGreaterThanOrEqual(1)
        expect(level.skill).toBeLessThanOrEqual(10)
      })
    })
  })

  describe('WMR Course structure', () => {
    let wmr: Course

    beforeAll(() => {
      const course = getCourseById('wmr')
      if (!course) {
        throw new Error('WMR course not found')
      }
      wmr = course
    })

    it('should exist', () => {
      expect(wmr).toBeDefined()
      expect(wmr.id).toBe('wmr')
    })

    it('should have correct title', () => {
      expect(wmr.title).toContain('Wilderness Medical Responder')
    })

    it('should have metadata with certification and location', () => {
      expect(wmr.metadata.certification).toContain('Wilderness')
      expect(wmr.metadata.location).toBeDefined()
    })

    it('should have valid level data', () => {
      wmr.levels.forEach(level => {
        expect(level.code).toBeDefined()
        expect(level.name).toBeDefined()
        expect(level.duration).toBeDefined()
        expect(['open', 'interest', 'closed']).toContain(level.enrollmentStatus)
      })
    })
  })
})
