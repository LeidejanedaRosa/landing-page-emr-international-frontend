import { getCourses } from '../../../data/coursesData'
import { useUniqueId } from '../../../hooks/useAccessibility'
import { CourseListSchema } from '../../seo/schemas'
import { CourseCard, CoursesHeader } from './components'

const Courses = () => {
  const titleId = useUniqueId('courses-title')
  const descriptionId = useUniqueId('courses-description')
  const courses = getCourses()

  return (
    <>
      <CourseListSchema courses={courses} />
      <section
        id='cursos'
        data-section='cursos'
        className='relative bg-primary-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div
          className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-800/20 via-primary-900 to-primary-900 pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-screen-2xl mx-auto w-full'>
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
    </>
  )
}

export default Courses
