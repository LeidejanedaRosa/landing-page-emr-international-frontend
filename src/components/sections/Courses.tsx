import { memo } from 'react'

import { ArrowRight, Award, Clock, Download, MapPin } from 'lucide-react'

import { type Course, getCourses } from '../../data/coursesData'
import { useUniqueId } from '../../hooks/useAccessibility'
import { AccessibleLink } from '../ui/Accessibility'

interface CoursesHeaderProps {
  titleId: string
  descriptionId: string
}

interface CourseImageProps {
  images: Course['images']
}

interface CourseCardProps {
  course: Course
}

interface CourseStyleConfig {
  border: string
  icon: string
  primary: string
  primaryHover: string
  primaryText: string
  ring: string
  secondary: string
  secondaryHover: string
}

const getVariantStyles = (variant: Course['variant']): CourseStyleConfig => {
  const isEmergency = variant === 'emergency'

  return {
    border: isEmergency ? 'hover:border-cta-500' : 'hover:border-warning-400',
    icon: isEmergency ? 'text-cta-400' : 'text-warning-400',
    primary: isEmergency ? 'bg-cta-600' : 'bg-warning-400',
    primaryHover: isEmergency ? 'hover:bg-cta-700' : 'hover:bg-warning-500',
    primaryText: isEmergency ? 'text-white' : 'text-primary-950',
    ring: isEmergency ? 'focus:ring-cta-500' : 'focus:ring-warning-400',
    secondary: 'text-primary-400',
    secondaryHover: 'hover:text-white',
  }
}

const CourseImage = memo(({ images }: CourseImageProps) => (
  <picture className='w-full h-full'>
    <source
      srcSet={images.avif}
      type='image/avif'
      sizes='(max-width: 768px) 100vw, 50vw'
    />
    <source
      srcSet={images.webp}
      type='image/webp'
      sizes='(max-width: 768px) 100vw, 50vw'
    />
    <img
      src={images.jpg}
      alt={images.alt}
      className='w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105'
      loading='lazy'
      decoding='async'
    />
  </picture>
))

CourseImage.displayName = 'CourseImage'

const CourseMetadata = memo(
  ({
    duration,
    certification,
    icon,
  }: {
    duration: string
    certification: string
    icon: string
  }) => (
    <div className='flex flex-wrap gap-4 text-sm text-primary-300'>
      <div className='flex items-center gap-1.5'>
        <Clock className={`w-4 h-4 ${icon}`} aria-hidden='true' />
        <span>{duration}</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <Award className={`w-4 h-4 ${icon}`} aria-hidden='true' />
        <span>{certification}</span>
      </div>
    </div>
  )
)

CourseMetadata.displayName = 'CourseMetadata'

const CourseLocation = memo(
  ({ location, icon }: { location: string; icon: string }) => (
    <div className='flex items-start gap-2 text-sm text-primary-300'>
      <MapPin
        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${icon}`}
        aria-hidden='true'
      />
      <span>{location}</span>
    </div>
  )
)

CourseLocation.displayName = 'CourseLocation'

const CourseCard = memo(({ course }: CourseCardProps) => {
  const {
    id,
    abbreviation,
    title,
    description,
    metadata,
    links,
    images,
    variant,
  } = course
  const cardId = useUniqueId(`course-${id}`)
  const styles = getVariantStyles(variant)

  return (
    <article
      id={cardId}
      className={`group flex flex-col h-full bg-primary-800 rounded-xl overflow-hidden shadow-lg border border-primary-700/50 transition-all duration-300 ${styles.border}`}
      aria-labelledby={`${cardId}-title`}
    >
      <div className='relative h-full w-full overflow-hidden'>
        <CourseImage images={images} />
        <div className='absolute top-4 right-4 bg-primary-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-primary-700 shadow-sm'>
          {abbreviation}
        </div>
      </div>

      <div className='p-6 flex flex-col flex-grow'>
        <header className='mb-4'>
          <h3
            id={`${cardId}-title`}
            className='text-2xl font-bold text-white mb-2 leading-tight'
          >
            {title}
          </h3>
          <CourseMetadata
            duration={metadata.duration}
            certification={metadata.certification}
            icon={styles.icon}
          />
        </header>

        <p className='text-primary-200 text-base leading-relaxed mb-6 flex-grow border-b border-primary-700/50 pb-6'>
          {description}
        </p>

        <div className='space-y-4 mt-auto'>
          <CourseLocation location={metadata.location} icon={styles.icon} />

          <div className='flex flex-col gap-3 pt-2'>
            <AccessibleLink
              href={links.details}
              className={`flex items-center justify-center w-full py-3.5 px-4 font-bold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 ${styles.primary} ${styles.primaryHover} ${styles.primaryText} ${styles.ring}`}
              aria-label={`Ver detalhes completos do curso ${title}`}
            >
              Ver Detalhes do Curso
              <ArrowRight className='w-5 h-5 ml-2' aria-hidden='true' />
            </AccessibleLink>

            <AccessibleLink
              href={links.brochure}
              className={`flex items-center justify-center w-full py-2 text-sm font-medium ${styles.secondary} ${styles.secondaryHover} ${styles.ring} transition-colors gap-2`}
              aria-label={`Baixar brochura em PDF do curso ${title}`}
            >
              <Download className='w-4 h-4' aria-hidden='true' />
              <span>Baixar PDF técnico</span>
            </AccessibleLink>
          </div>
        </div>
      </div>
    </article>
  )
})

CourseCard.displayName = 'CourseCard'

const CoursesHeader = memo(({ titleId, descriptionId }: CoursesHeaderProps) => (
  <header className='text-center mb-12 md:mb-16'>
    <span className='text-cta-500 font-semibold tracking-wider uppercase text-sm mb-2 block'>
      Formação de Operadores Táticos e de Áreas Remotas
    </span>
    <h2
      id={titleId}
      className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight'
    >
      Cursos de APH Tático e <span lang='en'>Wilderness Medicine</span>
    </h2>
    <p
      id={descriptionId}
      className='text-lg md:text-xl text-primary-300 max-w-2xl mx-auto leading-relaxed'
    >
      Capacitação profissional de excelência em resgate e emergências médicas,
      projetada para quem atua na linha de frente.
    </p>
  </header>
))

CoursesHeader.displayName = 'CoursesHeader'

const Courses = () => {
  const titleId = useUniqueId('courses-title')
  const descriptionId = useUniqueId('courses-description')
  const courses = getCourses()

  return (
    <section
      id='courses'
      data-section='courses'
      className='relative bg-primary-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-800/20 via-primary-900 to-primary-900 pointer-events-none' />

      <div className='relative max-w-7xl mx-auto w-full'>
        <CoursesHeader titleId={titleId} descriptionId={descriptionId} />

        <ul
          className='grid md:grid-cols-2 gap-8 lg:gap-12'
          aria-label='Lista de cursos de especialização disponíveis'
        >
          {courses.map(course => (
            <li key={course.id} className='flex'>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default memo(Courses)
