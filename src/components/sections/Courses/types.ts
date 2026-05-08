/* eslint-disable no-unused-vars */
import type {
  Course,
  CourseLevel,
  CourseLevelData,
  EnrollmentStatus,
} from '../../../data/coursesData'

export interface CourseStyleConfig {
  border: string
  icon: string
  primary: string
  primaryHover: string
  primaryText: string
  ring: string
  secondary: string
  secondaryHover: string
  tabActive: string
  tabActiveText: string
  barFilled: string
}

export interface CoursesHeaderProps {
  titleId: string
  descriptionId: string
}

export interface CourseImageProps {
  images: Course['images']
}

export interface CourseCardProps {
  course: Course
}

export interface CourseLevelTabsProps {
  levels: CourseLevelData[]
  selectedLevel: CourseLevel
  onLevelChange: (newLevel: CourseLevel) => void
  styles: CourseStyleConfig
  courseId: string
}

export interface LevelIndicatorProps {
  label: string
  value: number
  filledColor: string
}

export interface LevelIndicatorsProps {
  levelData: CourseLevelData
  styles: CourseStyleConfig
}

export interface CourseStatusBadgeProps {
  status: EnrollmentStatus
  variant: Course['variant']
}

export interface CourseLocationProps {
  location: string
  icon: string
}

export interface CourseActionsProps {
  whatsappUrl: string
  title: string
  levelCode: string
  styles: CourseStyleConfig
  enrollmentStatus: EnrollmentStatus
}

export interface CourseLevelInfoProps {
  currentLevel: CourseLevelData
  certification: string
  styles: CourseStyleConfig
}
