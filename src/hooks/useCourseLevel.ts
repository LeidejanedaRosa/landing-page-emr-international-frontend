import { useState } from 'react'

import type { Course, CourseLevel } from '../data/coursesData'
import { buildWhatsAppMessageUrl } from '../utils/whatsapp'

export function useCourseLevel(course: Course) {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>(
    course.levels[0]?.level || 'basic'
  )

  const currentLevel =
    course.levels.find(l => l.level === selectedLevel) || course.levels[0]

  const whatsappUrl = buildWhatsAppMessageUrl(
    `Olá! Tenho interesse no curso ${course.title} - ${currentLevel.code} (${currentLevel.namePt}). Gostaria de mais informações.`
  )

  return {
    selectedLevel,
    setSelectedLevel,
    currentLevel,
    whatsappUrl,
  }
}
