import { memo } from 'react'

import type { CourseLevel, CourseLevelData } from '../../../../data/coursesData'
import type { CourseStyleConfig } from '../types'
import { CourseLevelTabs } from './CourseLevelTabs'

/* eslint-disable no-unused-vars */
interface CourseCardHeaderProps {
  abbreviation: string
  courseTitle: string
  cardId: string
  levels: CourseLevelData[]
  selectedLevel: CourseLevel
  onLevelChange: (level: CourseLevel) => void
  styles: CourseStyleConfig
}
/* eslint-enable no-unused-vars */

export const CourseCardHeader = memo(
  ({
    abbreviation,
    courseTitle,
    cardId,
    levels,
    selectedLevel,
    onLevelChange,
    styles,
  }: CourseCardHeaderProps) => (
    <header className='mb-4'>
      <h3
        id={`${cardId}-title`}
        className='text-xl text-white mb-3 leading-tight'
      >
        <span className='font-capture-it text-2xl'>{abbreviation}</span>
        {' - '}
        {courseTitle}
      </h3>

      <CourseLevelTabs
        levels={levels}
        selectedLevel={selectedLevel}
        onLevelChange={onLevelChange}
        styles={styles}
        courseId={cardId}
      />
    </header>
  )
)

CourseCardHeader.displayName = 'CourseCardHeader'
