import { useUniqueId } from '../../../../hooks/useAccessibility'
import { useCourseLevel } from '../../../../hooks/useCourseLevel'
import { getVariantStyles } from '../constants'
import type { CourseCardProps } from '../types'
import { CourseCardContent } from './CourseCardContent'
import { CourseCardFooter } from './CourseCardFooter'
import { CourseCardHeader } from './CourseCardHeader'
import { CourseImage } from './CourseImage'

export const CourseCard = ({ course }: CourseCardProps) => {
  const { id, abbreviation, title, levels, metadata, images, variant } = course
  const cardId = useUniqueId(`course-${id}`)
  const styles = getVariantStyles(variant)
  const {
    selectedLevel,
    setSelectedLevel,
    currentLevel,
    whatsappUrl,
    brochureLink,
  } = useCourseLevel(course)
  const courseTitle = title.split(' - ')[1] || title

  return (
    <article
      id={cardId}
      className={`group flex flex-col h-full bg-primary-800 rounded-xl overflow-hidden shadow-lg border border-primary-700/50 transition-all duration-300 ${styles.border}`}
      aria-labelledby={`${cardId}-title`}
    >
      <div className='relative h-[75%] w-full overflow-hidden'>
        <CourseImage images={images} />
        <div className='absolute top-4 right-4 bg-primary-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-capture-it text-white border border-primary-700 shadow-sm'>
          {abbreviation}
        </div>
      </div>

      <div className='p-6 flex flex-col flex-grow'>
        <CourseCardHeader
          abbreviation={abbreviation}
          courseTitle={courseTitle}
          cardId={cardId}
          levels={levels}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          styles={styles}
        />

        <CourseCardContent
          cardId={cardId}
          selectedLevel={selectedLevel}
          currentLevel={currentLevel}
          variant={variant}
          certification={metadata.certification}
          styles={styles}
        />

        <CourseCardFooter
          location={metadata.location}
          whatsappUrl={whatsappUrl}
          title={title}
          levelCode={currentLevel.code}
          brochureLink={brochureLink}
          styles={styles}
          enrollmentStatus={currentLevel.enrollmentStatus}
        />
      </div>
    </article>
  )
}
