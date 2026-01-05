import FundoAboutJpg from '../../../../assets/bg_about.jpg'
import { INSTRUCTOR_CAPTION, INSTRUCTOR_IMAGE_ALT } from '../constants'

export function InstructorMedia() {
  return (
    <figure className='relative w-full h-full min-h-[inherit] overflow-hidden'>
      <div className='absolute inset-0 min-h-[inherit]'>
        <img
          src={FundoAboutJpg}
          alt={INSTRUCTOR_IMAGE_ALT}
          width={1920}
          height={1280}
          className='w-full h-full object-cover grayscale'
          style={{ objectPosition: '23% center' }}
          loading='eager'
          fetchPriority='high'
          decoding='async'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black lg:hidden' />
        <div className='hidden lg:block absolute inset-0 bg-gradient-to-r from-black via-transparent to-black' />
      </div>
      <figcaption className='sr-only'>{INSTRUCTOR_CAPTION}</figcaption>
    </figure>
  )
}
