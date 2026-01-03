import { useCallback, useMemo, useState } from 'react'

import type { Course, CourseLevel } from '../../../../data/coursesData'
import { WHATSAPP_BASE_URL } from '../constants'

/* eslint-disable no-unused-vars */
interface UsCourseLevelReturn {
  selectedLevel: CourseLevel
  setSelectedLevel: (level: CourseLevel) => void
  currentLevel: Course['levels'][0]
  whatsappUrl: string
  brochureLink: string
}
/* eslint-enable no-unused-vars */

export const useCourseLevel = (course: Course): UsCourseLevelReturn => {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>('basic')

  const currentLevel = useMemo(
    () =>
      course.levels.find(l => l.level === selectedLevel) || course.levels[0],
    [course.levels, selectedLevel]
  )

  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no curso ${course.title} - ${currentLevel.code} (${currentLevel.namePt}). Gostaria de mais informações.`
    )
    return `${WHATSAPP_BASE_URL}?text=${message}`
  }, [course.title, currentLevel.code, currentLevel.namePt])

  const brochureLink = useMemo(
    () => currentLevel.brochure || course.links.brochure,
    [currentLevel.brochure, course.links.brochure]
  )

  const handleLevelChange = useCallback((level: CourseLevel) => {
    setSelectedLevel(level)
  }, [])

  return {
    selectedLevel,
    setSelectedLevel: handleLevelChange,
    currentLevel,
    whatsappUrl,
    brochureLink,
  }
}
