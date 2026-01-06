import type {
  CourseLevelData,
  CourseVariant,
} from '../../../../data/coursesData'
import type { CourseStyleConfig } from '../types'
import { CourseLevelInfo } from './CourseLevelInfo'
import { CourseStatusBadge } from './CourseStatusBadge'
import { LevelIndicators } from './LevelIndicators'

interface CourseCardContentProps {
  cardId: string
  selectedLevel: string
  currentLevel: CourseLevelData
  variant: CourseVariant
  certification: string
  styles: CourseStyleConfig
}

export const CourseCardContent = ({
  cardId,
  selectedLevel,
  currentLevel,
  variant,
  certification,
  styles,
}: CourseCardContentProps) => (
  <div
    id={`${cardId}-panel-${selectedLevel}`}
    role='tabpanel'
    aria-labelledby={`${cardId}-tab-${selectedLevel}`}
    className='flex-grow flex flex-col'
  >
    <CourseStatusBadge
      status={currentLevel.enrollmentStatus}
      variant={variant}
    />

    <CourseLevelInfo
      currentLevel={currentLevel}
      certification={certification}
      styles={styles}
    />

    <LevelIndicators levelData={currentLevel} styles={styles} />

    <p className='text-primary-200 text-sm leading-relaxed mb-4 flex-grow'>
      {currentLevel.description}
    </p>
  </div>
)
