import { InstructorSchema } from '../../seo/schemas'
import { AboutContent, AboutMetrics, InstructorMedia } from './components'
import {
  INSTRUCTOR_INFO,
  INTERNATIONAL_CREDENTIALS,
  OPERATIONAL_FORCES,
} from './constants'

export default function About() {
  const allCredentials = [
    ...INTERNATIONAL_CREDENTIALS.map(c => c.label),
    ...OPERATIONAL_FORCES.map(c => c.label),
  ]

  return (
    <>
      <InstructorSchema
        name={INSTRUCTOR_INFO.name}
        jobTitle={INSTRUCTOR_INFO.title}
        description={`${INSTRUCTOR_INFO.name}, ${INSTRUCTOR_INFO.highlight}${INSTRUCTOR_INFO.description}`}
        credentials={allCredentials}
        yearsOfExperience={15}
      />
      <section
        id='sobre'
        data-section='sobre'
        className='relative min-h-screen bg-black'
        aria-labelledby='sobre-heading'
      >
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:h-screen'>
          <div className='relative w-full lg:w-1/2 min-h-[280px] sm:min-h-[350px] lg:min-h-0 lg:h-full'>
            <InstructorMedia />
            <div className='hidden lg:block absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10'>
              <AboutMetrics />
            </div>
          </div>
          <div className='w-full lg:w-1/2 flex flex-col lg:items-center lg:justify-center bg-black lg:bg-transparent'>
            <AboutContent />
            <div className='block lg:hidden px-4 pb-6'>
              <AboutMetrics />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
