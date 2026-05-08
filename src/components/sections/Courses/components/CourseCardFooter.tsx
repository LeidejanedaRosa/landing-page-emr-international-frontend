import type { EnrollmentStatus } from '../../../../data/coursesData'
import type { CourseStyleConfig } from '../types'
import { CourseActions } from './CourseActions'
import { CourseLocation } from './CourseLocation'

interface CourseCardFooterProps {
  location: string
  whatsappUrl: string
  title: string
  levelCode: string
  styles: CourseStyleConfig
  enrollmentStatus: EnrollmentStatus
}

export const CourseCardFooter = ({
  location,
  whatsappUrl,
  title,
  levelCode,
  styles,
  enrollmentStatus,
}: CourseCardFooterProps) => (
  <footer className='space-y-4 mt-auto border-t border-primary-700/50 pt-4'>
    <CourseLocation location={location} icon={styles.icon} />
    <CourseActions
      whatsappUrl={whatsappUrl}
      title={title}
      levelCode={levelCode}
      styles={styles}
      enrollmentStatus={enrollmentStatus}
    />
  </footer>
)
