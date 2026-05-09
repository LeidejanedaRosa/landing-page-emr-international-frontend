import { features } from './constants'

export function FeaturePillars() {
  return (
    <div
      className='grid grid-cols-4 gap-2 sm:gap-4 mb-10 max-w-lg'
      aria-label='Pilares do método'
    >
      {features.map(({ Icon, title, description }) => (
        <div
          key={title}
          className='flex flex-col items-center text-center gap-1.5'
        >
          <div
            className='w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0'
            aria-hidden='true'
          >
            <Icon className='w-5 h-5 sm:w-6 sm:h-6 text-white/80' />
          </div>
          <span className='text-xs sm:text-sm font-bold tracking-widest text-white leading-tight'>
            {title}
          </span>
          <span className='text-xs sm:text-sm text-white/55 leading-snug'>
            {description}
          </span>
        </div>
      ))}
    </div>
  )
}
