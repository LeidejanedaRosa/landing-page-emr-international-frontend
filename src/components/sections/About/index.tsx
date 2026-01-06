import { AboutContent, AboutMetrics, InstructorMedia } from './components'

export default function About() {
  return (
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
  )
}
